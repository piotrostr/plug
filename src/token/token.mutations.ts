import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateTokenInput {
  @Field(() => String, { description: "Token" })
  token: string;
}

@InputType()
export class UpdateTokenInput extends PartialType(CreateTokenInput) {
  @Field(() => Boolean, {
    description: "whether token is used by a bot at the moment",
  })
  isCurrentlyUsed = false;

  @Field(() => Boolean, {
    description: "whether token is banned or not",
  })
  isBanned = false;
  // needs verification could be split into email and phone

  @Field(() => Boolean, {
    description: "whether token requires verification",
  })
  needsVerification = false;
}
