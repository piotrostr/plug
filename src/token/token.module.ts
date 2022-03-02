import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';

@Module({
  providers: [TokenResolver, TokenService],
})
export class TokenModule {}

// after the registartion completes successfully,
// proxy and token pair is sent back so that they are used both by the workers
// there can be different token/proxy pairs I reckon, but worst case scenario
// they can also be used sepearately
