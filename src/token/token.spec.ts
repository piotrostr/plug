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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), TokenModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  describe("it works", () => {
    it("should return 200", () => {
      return request(app.getHttpServer()).get("/token").expect(200);
    });
  });

  afterAll(async () => {
    app.close();
    await closeInMongodbConnection();
  });
});
