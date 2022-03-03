import * as request from "supertest";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import { TokenModule } from "./token.module";
import {
  rootMongooseTestModule,
  closeInMongodbConnection,
} from "../mongo-memory";
import { factory } from "fakingoose";
import { Token, TokenSchema, TokenDocument } from "./token.schema";

describe("Token", () => {
  const tokenFactory = factory(TokenSchema, {}).setGlobalObjectIdOptions({
    tostring: false,
  });
  let application: INestApplication;
  let app: HttpServer;
  let tokenModel: Model<TokenDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), TokenModule],
    }).compile();
    application = module.createNestApplication();
    await application.init();
    tokenModel = module.get<Model<TokenDocument>>(getModelToken(Token.name));
    for (let i = 0; i < 1000; i++) {
      tokenModel.create(tokenFactory.generate());
    }
  });

  beforeEach(() => {
    app = application.getHttpServer();
  });

  describe("it works", () => {
    test("get token returns an unbanned, unused, verified token", async () => {
      const res = await request(app).get("/token");
      expect(res.status).toBe(200);
      const token = res.body;
      expect(token.needsVerification).toBe(false);
      expect(token.isBanned).toBe(false);
      expect(token.isCurrentlyUsed).toBe(false);
    });

    test("token is marked as used after it is sent", async () => {
      const res = await request(app).get("/token");
      const token = res.body;
      const tokenDb = await tokenModel.findOne({ token: token.token });
      expect(tokenDb.isCurrentlyUsed).toBe(true);
    });

    test("it returns token successfully", async () => {
      const res = await request(app).get("/token");
      expect(res.status).toBe(200);
      const token = res.body;
      token.isBanned = true;
      const res2 = await request(app).post("/token/return").send(token);
      expect(res2.status).toBe(201);
      const dbToken = await tokenModel.findOne({ token: token.token });
      expect(dbToken.isBanned).toBe(true);
      expect(dbToken.isCurrentlyUsed).toBe(false);
    });

    test("adds token successfully", async () => {
      const token = "asdf";
      const res = await request(app).post("/token/add").send({ token });
      expect(res.status).toBe(201);
      const created = await tokenModel.findOne({ token });
      expect(created).toBeTruthy();
      expect(created.token).toBe(token);
    });

    test("returns empty if no tokens available", async () => {
      await tokenModel.deleteMany({
        isBanned: false,
        isCurrentlyUsed: false,
        needsVerification: false,
      });
      const res = await request(app).get("/token");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });

    test("it returns unverified token if asked", async () => {
      const res = await request(app).get("/token/unverified");
      expect(res.status).toBe(200);
      expect(res.body.needsVerification).toBe(true);
    });
  });

  afterAll(async () => {
    await application.close();
    await closeInMongodbConnection();
  });
});
