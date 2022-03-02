import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';

@Resolver('Token')
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation('createToken')
  create(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokenService.create(createTokenInput);
  }

  @Query('token')
  findAll() {
    return this.tokenService.findAll();
  }

  @Query('token')
  findOne(@Args('id') id: number) {
    return this.tokenService.findOne(id);
  }

  @Mutation('updateToken')
  update(@Args('updateTokenInput') updateTokenInput: UpdateTokenInput) {
    return this.tokenService.update(updateTokenInput.id, updateTokenInput);
  }

  @Mutation('removeToken')
  remove(@Args('id') id: number) {
    return this.tokenService.remove(id);
  }
}
