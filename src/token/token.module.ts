import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenResolver } from "./token.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./token.schema";
import { TokenController } from "./token.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Token.name,
        useFactory: async () => TokenSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [TokenController],
  providers: [TokenResolver, TokenService],
})
export class TokenModule {}
