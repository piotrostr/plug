import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TokensService } from './tokens.service';
import { Token } from './token.schema';
import { CreateTokenInput, UpdateTokenInput } from './token.mutations';

@Resolver(() => Token)
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Mutation(() => Token)
  createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokensService.createToken(createTokenInput);
  }

  @Query(() => Token)
  getToken() {
    return this.tokensService.getToken();
  }

  @Mutation(() => Token)
  returnToken(@Args('updateTokenInput') updateTokenInput: UpdateTokenInput) {
    return this.tokensService.returnToken(updateTokenInput);
  }

  @Query(() => Token)
  getUnverifiedToken() {
    return this.tokensService.getUnverifiedToken();
  }
}
