import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ProxyModule } from "./proxy/proxy.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

const host = process.env.MONGO_HOST || "localhost";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${host}:27017/db`),
    UserModule,
    ProxyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}
