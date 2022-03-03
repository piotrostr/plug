/* istanbul ignore file */
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TokenService } from "./token.service";
import { Token } from "./token.schema";
import { CreateTokenInput, UpdateTokenInput } from "./token.mutations";

@Resolver(() => Token)
export class TokenResolver {
  constructor(private readonly tokensService: TokenService) {}

  @Mutation(() => Token)
  createToken(@Args("createTokenInput") createTokenInput: CreateTokenInput) {
    return this.tokensService.createToken(createTokenInput);
  }

  @Query(() => Token)
  getToken() {
    return this.tokensService.getToken();
  }

  @Mutation(() => Token)
  returnToken(@Args("updateTokenInput") updateTokenInput: UpdateTokenInput) {
    return this.tokensService.returnToken(updateTokenInput);
  }

  @Query(() => Token)
  getUnverifiedToken() {
    return this.tokensService.getUnverifiedToken();
  }
}
