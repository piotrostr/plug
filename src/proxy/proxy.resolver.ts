import { Resolver } from "@nestjs/graphql";
import { ProxyService } from "./proxy.service";

@Resolver()
export class ProxyResolver {
  constructor(private readonly proxyService: ProxyService) {}
}
