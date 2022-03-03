import { Body, Controller, Get, Post } from "@nestjs/common";
import { TokenService } from "./token.service";
import { CreateTokenInput, UpdateTokenInput } from "token/token.mutations";
import { Token } from "token/token.schema";

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

  @Post()
  async returnToken(@Body() updateTokenInput: UpdateTokenInput) {
    // TODO add awaits where required
    return this.tokenService.returnToken(updateTokenInput);
  }

  @Get("unverified")
  async getUnverifiedToken(): Promise<Token> {
    return this.tokenService.getUnverifiedToken();
  }
}
