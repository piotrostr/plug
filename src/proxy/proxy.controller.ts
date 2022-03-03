import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProxyService } from "proxy/proxy.service";
import { Proxy } from "proxy/proxy.schema";
import { CreateProxyInput, UpdateProxyInput } from "proxy/proxy.mutations";

@Controller("proxy")
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post("add")
  async createProxy(createProxyInput: CreateProxyInput): Promise<Proxy> {
    return this.proxyService.createProxy(createProxyInput);
  }

  @Get()
  async getProxy(): Promise<Proxy> {
    return this.proxyService.getProxy();
  }

  @Post()
  async returnProxy(
    @Body() updateProxyInput: UpdateProxyInput,
  ): Promise<boolean> {
    return this.proxyService.returnProxy(updateProxyInput);
  }
}
