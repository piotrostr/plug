import * as request from "supertest";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import { TokenModule } from "./token.module";
import {
  rootMongooseTestModule,
  closeInMongodbConnection,
} from "../mongo-memory";
import { factory } from "fakingoose";
import { Token, TokenSchema } from "./token.schema";

describe("Token", () => {
  const tokenFactory = factory(TokenSchema, {}).setGlobalObjectIdOptions({
    tostring: false,
  });
  let application: INestApplication;
  let app: HttpServer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), TokenModule],
    }).compile();
    application = module.createNestApplication();
    await application.init();
    const tokenModel = module.get(getModelToken(Token.name));
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

    test("returns error if no tokens available", () => {
      // return request(app.getHttpServer()).get("/token").expect(200);
    });

    test("doesnt allow creating empty tokens", () => {
      // TODO
    });

    test("adds token", async () => {
      const res = await request(app)
        .post("/token/add")
        .send({ token: "asdf" });
      expect(res.status).toBe(201);
    });

    test("can update token after getting it", async () => {
      const res = await request(app).get("/token");
      expect(res.status).toBe(200);
      const token = res.body;
      token.isBanned = true;
      // ...
    });
  });

  afterAll(async () => {
    await application.close();
    await closeInMongodbConnection();
  });
});
