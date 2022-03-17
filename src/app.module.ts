import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ProxyModule } from "./proxy/proxy.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

const host = process.env.MONGO_HOST || "localhost";
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const uri = `mongodb://${username}:${password}@${host}:27017/db`;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(uri),
    UserModule,
    ProxyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}
