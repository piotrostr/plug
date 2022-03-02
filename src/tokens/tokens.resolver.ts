import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TokensService } from './tokens.service';
import { Token } from './entities/token.entity';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';

@Resolver(() => Token)
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Mutation(() => Token)
  createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokensService.create(createTokenInput);
  }

  @Query(() => [Token], { name: 'tokens' })
  findAll() {
    return this.tokensService.findAll();
  }

  @Query(() => Token, { name: 'token' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tokensService.findOne(id);
  }

  @Mutation(() => Token)
  updateToken(@Args('updateTokenInput') updateTokenInput: UpdateTokenInput) {
    return this.tokensService.update(updateTokenInput.id, updateTokenInput);
  }

  @Mutation(() => Token)
  removeToken(@Args('id', { type: () => Int }) id: number) {
    return this.tokensService.remove(id);
  }
}
