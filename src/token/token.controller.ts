import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenInput } from 'token/token.mutations';
import { Token } from 'token/token.schema';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async create(@Body() createTokenInput: CreateTokenInput) {
    await this.tokenService.createToken(createTokenInput);
  }

  @Get()
  async getToken(): Promise<Token> {
    return this.tokenService.getToken();
  }
}
