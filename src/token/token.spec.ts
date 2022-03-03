import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { TokenModule } from "./token.module";
import { INestApplication } from "@nestjs/common";

describe("Token", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TokenModule],
    }).compile();
    app = module.createNestApplication();
  });

  describe("it works", () => {
    it("should create a token", () => {
      return request(app.getHttpServer()).get("/token").expect(200);
    });
  });
});
