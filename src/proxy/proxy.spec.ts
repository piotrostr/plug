import * as request from "supertest";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import { ProxyModule } from "./proxy.module";
import {
  rootMongooseTestModule,
  closeInMongodbConnection,
} from "../mongo-memory";
import { factory } from "fakingoose";
import { Proxy, ProxySchema, ProxyDocument } from "./proxy.schema";

describe("Proxy", () => {
  const proxyFactory = factory(ProxySchema, {}).setGlobalObjectIdOptions({
    tostring: false,
  });
  let application: INestApplication;
  let app: HttpServer;
  let proxyModel: Model<ProxyDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), ProxyModule],
    }).compile();
    application = module.createNestApplication();
    await application.init();
    proxyModel = module.get<Model<ProxyDocument>>(getModelToken(Proxy.name));
    for (let i = 0; i < 1000; i++) {
      proxyModel.create(proxyFactory.generate());
    }
  });

  beforeEach(() => {
    app = application.getHttpServer();
  });

  it("gets a proxy", async () => {
    const res = await request(app).get("/proxy");
    expect(res.status).toBe(200);
    const proxy = res.body;
    expect(proxy.host).toBeTruthy;
    expect(proxy.port).toBeTruthy;
    expect(proxy.username).toBeTruthy;
    expect(proxy.password).toBeTruthy;
    expect(proxy.isBanned).toBe(false);
    expect(proxy.isCurrentlyUsed).toBe(false);
  });

  it("adds a proxy", async () => {
    const proxy = {
      username: "asdf",
      password: "asdf",
      host: "asdf",
      port: 1234,
    };
    const res = await request(app).post("/proxy/add").send(proxy);
    expect(res.status).toBe(201);
    const proxyDb = await proxyModel.findOne({
      host: proxy.host,
      port: proxy.port,
    });
    expect(proxyDb).toBeTruthy;
    expect(proxyDb.username).toEqual(proxy.username);
    expect(proxyDb.password).toEqual(proxy.password);
  });

  it("returns proxy", async () => {
    const res = await request(app).get("/proxy");
    expect(res.status).toBe(200);
    const proxy = res.body;
    expect(proxy.isBanned).toBe(false);
    proxy.isBanned = true;
    // delete _id as it is immutable
    delete proxy._id;
    const res2 = await request(app).post("/proxy/return").send(proxy);
    expect(res2.status).toBe(201);
    // delete banned coz it wont get matched otherwise
    delete proxy.isBanned;
    const proxyDb = await proxyModel.findOne(proxy);
    expect(proxyDb.isBanned).toBe(true);
  });

  afterAll(async () => {
    await application.close();
    await closeInMongodbConnection();
  });
});
