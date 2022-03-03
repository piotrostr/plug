import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProxyService } from "./proxy.service";
import { Proxy } from "./proxy.schema";
import { CreateProxyInput, UpdateProxyInput } from "./proxy.mutations";

@Controller("proxy")
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post("add")
  async createProxy(@Body() createProxyInput: CreateProxyInput) {
    return await this.proxyService.createProxy(createProxyInput);
  }

  @Get()
  async getProxy(): Promise<Proxy> {
    return await this.proxyService.getProxy();
  }

  @Post()
  async returnProxy(
    @Body() updateProxyInput: UpdateProxyInput,
  ): Promise<boolean> {
    return await this.proxyService.returnProxy(updateProxyInput);
  }
}
