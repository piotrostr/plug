import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensResolver } from './tokens.resolver';

@Module({
  providers: [TokensResolver, TokensService]
})
export class TokensModule {}
