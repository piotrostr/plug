import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ProxyModule } from "./proxy/proxy.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

const host = process.env.MONGO_HOST; // || "http://localhost"
const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
const uri = `mongodb://${host}:27017/db`;
console.log(host, user, pass);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(uri, {
      authSource: "admin",
      user,
      pass,
    }),
    UserModule,
    ProxyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}
