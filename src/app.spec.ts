import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import { ApplicationModule } from "./app.module";
import { ConfigModule } from "@nestjs/config";

describe("App", () => {
  let application: INestApplication;
  let app: HttpServer;
  let apiKey: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule, ConfigModule.forRoot()],
    }).compile();
    apiKey = process.env.API_KEY;
    application = module.createNestApplication();
    await application.init();
  });

  beforeEach(() => {
    app = application.getHttpServer();
  });

  it("requires api key", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(401);
  });

  it("welcomes on the '/' page", async () => {
    const res = await request(app).get("/").set("Authorization", apiKey);
    expect(res.status).toBe(200);
    expect(res.text).toBe("eyo");
  });

  afterAll(async () => {
    await application.close();
  });
});
