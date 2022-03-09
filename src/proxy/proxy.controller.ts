import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProxyService } from "./proxy.service";
import { Proxy } from "./proxy.schema";
import { CreateProxyInput, UpdateProxyInput } from "./proxy.mutations";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("proxy")
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post("add")
  @UseGuards(AuthGuard("apiKey"))
  async createProxy(@Body() createProxyInput: CreateProxyInput) {
    return await this.proxyService.createProxy(createProxyInput);
  }

  @Get()
  @UseGuards(AuthGuard("apiKey"))
  async getProxy(): Promise<Proxy> {
    return await this.proxyService.getProxy();
  }

  @Post("return")
  @UseGuards(AuthGuard("apiKey"))
  async returnProxy(
    @Body() updateProxyInput: UpdateProxyInput,
  ): Promise<boolean> {
    return await this.proxyService.returnProxy(updateProxyInput);
  }
}
