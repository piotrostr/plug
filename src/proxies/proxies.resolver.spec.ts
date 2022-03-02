import { Test, TestingModule } from '@nestjs/testing';
import { ProxiesResolver } from './proxies.resolver';
import { ProxiesService } from './proxies.service';

describe('ProxiesResolver', () => {
  let resolver: ProxiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProxiesResolver, ProxiesService],
    }).compile();

    resolver = module.get<ProxiesResolver>(ProxiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
