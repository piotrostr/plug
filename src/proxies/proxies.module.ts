import { Module } from '@nestjs/common';
import { ProxiesService } from './proxies.service';
import { ProxiesResolver } from './proxies.resolver';

@Module({
  providers: [ProxiesResolver, ProxiesService]
})
export class ProxiesModule {}
