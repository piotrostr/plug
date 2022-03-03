import { Body, Controller, Get, Post } from "@nestjs/common";
import { TokenService } from "./token.service";
import { CreateTokenInput, UpdateTokenInput } from "./token.mutations";
import { Token } from "./token.schema";

@Controller("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post("add")
  async createToken(@Body() createTokenInput: CreateTokenInput) {
    await this.tokenService.createToken(createTokenInput);
  }

  @Get()
  async getToken(): Promise<Token> {
    return await this.tokenService.getToken();
  }

  @Post("return")
  async returnToken(@Body() updateTokenInput: UpdateTokenInput) {
    return await this.tokenService.returnToken(updateTokenInput);
  }

  @Get("unverified")
  async getUnverifiedToken(): Promise<Token> {
    return await this.tokenService.getUnverifiedToken();
  }
}
