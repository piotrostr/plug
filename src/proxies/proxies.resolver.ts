import { Resolver } from '@nestjs/graphql';
import { ProxiesService } from './proxies.service';

@Resolver('Proxy')
export class ProxiesResolver {
  constructor(private readonly proxiesService: ProxiesService) {}
}
