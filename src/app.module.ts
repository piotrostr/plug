import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TokenModule } from "./token/token.module";
import { ProxyModule } from "./proxy/proxy.module";
import { ConfigModule } from "@nestjs/config";

const host = process.env.MONGO_HOST || "localhost";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${host}:27017/db`),
    TokenModule,
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}
