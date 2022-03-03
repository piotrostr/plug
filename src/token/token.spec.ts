import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { TokenModule } from "./token.module";
import {
  rootMongooseTestModule,
  closeInMongodbConnection,
} from "../mongo-memory";

describe("Token", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), TokenModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  describe("it works", () => {
    it("should return 200", async () => {
      const res = await request(app.getHttpServer()).get("/token");
      expect(res.status).toBe(200);
    });

    it("should return error if no tokens available", () => {
      // return request(app.getHttpServer()).get("/token").expect(200);
    });

    it("doesnt allow empty tokens", () => {
      // TODO
    });

    it("adds token", async () => {
      const res = await request(app.getHttpServer())
        .post("/token/add")
        .send({ token: "asdf" });
      expect(res.status).toBe(201);
    });

    it("returns added token", async () => {
      const res = await request(app.getHttpServer()).get("/token");
      expect(res.status).toBe(200);
      expect(res.body.token).toBe("asdf");
    });
  });

  afterAll(async () => {
    await app.close();
    await closeInMongodbConnection();
  });
});
