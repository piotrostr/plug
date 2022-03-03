import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateProxyInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  host: string;

  @Field(() => Number)
  port: number;

  @Field(() => String)
  protocol = "http";
}

@InputType()
export class UpdateProxyInput extends PartialType(CreateProxyInput) {
  @Field(() => Boolean, {
    description: "whether proxy is used at the moment",
  })
  isCurrentlyUsed = false;

  @Field(() => Boolean, {
    description: "whether proxy is banned or not",
  })
  isBanned = false;
}
