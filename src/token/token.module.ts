import { Module } from '@nestjs/common';
import { TokenService } from 'token/token.service';
import { TokenResolver } from 'token/token.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'token/token.schema';
import { TokenController } from 'token/token.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [TokenController],
  providers: [TokenResolver, TokenService],
})
export class TokenModule {}
