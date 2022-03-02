import { Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';

@Injectable()
export class TokensService {
  create(createTokenInput: CreateTokenInput) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all tokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenInput: UpdateTokenInput) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
