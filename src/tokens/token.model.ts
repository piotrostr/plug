import { ObjectType, Field } from '@nestjs/graphql';
// import { Proxy } from 'proxies/entities/proxy.entity';

@ObjectType()
export class Token {
  @Field(() => String, {
    description: 'user token string',
  })
  token: string;

  @Field(() => Boolean, {
    description: 'whether token is used by a bot at the moment',
  })
  isCurrentlyUsed: boolean;

  @Field(() => Boolean, {
    description: 'whether token is banned or not',
  })
  isBanned: boolean;

  @Field(() => Boolean, {
    description: 'whether token requires verification',
  })
  needsVerification: boolean;
}
