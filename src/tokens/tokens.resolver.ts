import { Resolver } from '@nestjs/graphql';
import { TokensService } from './tokens.service';

@Resolver('Token')
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}
}
