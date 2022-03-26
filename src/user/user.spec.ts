import * as request from "supertest";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import { UserModule } from "./user.module";
import {
  rootMongooseTestModule,
  closeInMongodbConnection,
} from "../mongo-memory";
import { factory } from "fakingoose";
import { User, UserSchema, UserDocument } from "./user.schema";
import { ConfigModule } from "@nestjs/config";

describe("User", () => {
  const userFactory = factory(UserSchema, {}).setGlobalObjectIdOptions({
    tostring: false,
  });
  let apiKey: string;
  let application: INestApplication;
  let app: HttpServer;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), UserModule, ConfigModule.forRoot()],
    }).compile();
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    apiKey = process.env.API_KEY || "";
    for (let i = 0; i < 1000; i++) {
      userModel.create(userFactory.generate());
    }
    application = module.createNestApplication();
    await application.init();
  });

  beforeEach(() => {
    app = application.getHttpServer();
  });

  test("requires an api key", async () => {
    const res = await request(app).get("/user");
    expect(res.status).toBe(401);
  });

  test("get user returns an unbanned, unused, verified user", async () => {
    const res = await request(app).get("/user").set("Authorization", apiKey);
    expect(res.status).toBe(200);
    const user = res.body;
    expect(user.token).toBeTruthy();
    expect(user.username).toBeTruthy();
    expect(user.password).toBeTruthy();
    expect(user.phoneVerified).toBe(true);
    expect(user.emailVerified).toBe(true);
    expect(user.isCurrentlyUsed).toBe(false);
    expect(user.isBanned).toBe(false);
  });

  test("user is marked as used after it is sent", async () => {
    const res = await request(app).get("/user").set("Authorization", apiKey);
    const user = res.body;
    const userDb = await userModel.findOne({ _id: user._id });
    expect(userDb.isCurrentlyUsed).toBe(true);
  });

  test("user is marked as under verification", async () => {
    const res = await request(app)
      .get("/user/phone-unverified")
      .set("Authorization", apiKey);
    expect(res.status).toBe(200);
    const user = res.body;
    const userDb = await userModel.findOne({ _id: user._id });
    expect(userDb.isUnderVerification).toBe(true);
  });

  test("it returns user successfully", async () => {
    const res = await request(app).get("/user").set("Authorization", apiKey);
    expect(res.status).toBe(200);
    const user = res.body;
    user.isBanned = true;
    const res2 = await request(app)
      .post("/user/return")
      .send(user)
      .set("Authorization", apiKey);
    expect(res2.status).toBe(201);
    const dbUser = await userModel.findOne({ _id: user._id });
    expect(dbUser.isBanned).toBe(true);
    expect(dbUser.isCurrentlyUsed).toBe(false);
  });

  test("adds user successfully", async () => {
    const user = {
      token: "asdf",
      username: "asdf",
      password: "asdf",
      email: "asdf",
      country: "asdf",
      number: "asdf",
    };
    const res = await request(app)
      .post("/user/add")
      .send(user)
      .set("Authorization", apiKey);
    expect(res.status).toBe(201);
    const created = await userModel.findOne({ token: user.token });
    expect(created).toBeTruthy();
    expect(created.username).toBe(user.username);
    expect(created.password).toBe(user.password);
  });

  test("returns empty if no users available", async () => {
    await userModel.deleteMany({
      isBanned: false,
      isCurrentlyUsed: false,
      needsVerification: false,
    });
    const res = await request(app).get("/user").set("Authorization", apiKey);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  test("it returns phone unverified, currently not under verifiaction", async () => {
    const res = await request(app)
      .get("/user/phone-unverified")
      .set("Authorization", apiKey);
    expect(res.status).toBe(200);
    const user = res.body;
    expect(user.phoneVerified).toBe(false);
    expect(user.emailVerified).toBe(true);
    expect(user.isUnderVerification).toBe(false);
  });

  test("it returns mail unverified, currently not under verifiaction", async () => {
    const res = await request(app)
      .get("/user/mail-unverified")
      .set("Authorization", apiKey);
    expect(res.status).toBe(200);
    const user = res.body;
    expect(user.token).toBeTruthy();
    expect(user.emailVerified).toBe(false);
    expect(user.isUnderVerification).toBe(false);
  });

  afterAll(async () => {
    await application.close();
    await closeInMongodbConnection();
  });
});
