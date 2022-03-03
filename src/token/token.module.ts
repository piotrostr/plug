import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenResolver } from "./token.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./token.schema";
import { TokenController } from "./token.controller";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Token.name,
        useFactory: async () => TokenSchema,
        // schema.plugin(require('mongoose-autopopulate'));
        // could use this once I run successfully
      },
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenResolver, TokenService],
})
export class TokenModule {}
