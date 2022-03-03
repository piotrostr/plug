import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import { ApplicationModule } from "./app.module";

describe("Token", () => {
  let application: INestApplication;
  let app: HttpServer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();
    application = module.createNestApplication();
    await application.init();
  });

  beforeEach(() => {
    app = application.getHttpServer();
  });

  it("welcomes on the '/' page", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("eyo");
  });

  afterAll(async () => {
    await application.close();
  });
});
