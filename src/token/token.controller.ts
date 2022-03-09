import { Body, Controller, Get, Post } from "@nestjs/common";
import { TokenService } from "./token.service";
import { CreateTokenInput, UpdateTokenInput } from "./token.mutations";
import { Token } from "./token.schema";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post("add")
  @UseGuards(AuthGuard("apiKey"))
  async createToken(@Body() createTokenInput: CreateTokenInput) {
    await this.tokenService.createToken(createTokenInput);
  }

  @Get()
  @UseGuards(AuthGuard("apiKey"))
  async getToken(): Promise<Token> {
    return await this.tokenService.getToken();
  }

  @Post("return")
  @UseGuards(AuthGuard("apiKey"))
  async returnToken(@Body() updateTokenInput: UpdateTokenInput) {
    return await this.tokenService.returnToken(updateTokenInput);
  }

  @Get("unverified")
  @UseGuards(AuthGuard("apiKey"))
  async getUnverifiedToken(): Promise<Token> {
    return await this.tokenService.getUnverifiedToken();
  }
}
