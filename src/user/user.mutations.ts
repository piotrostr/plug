import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "User" })
  user: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Boolean)
  isCurrentlyUsed: boolean;

  @Field(() => Boolean)
  isBanned: boolean;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => Boolean)
  phoneVerified: boolean;

  // add rest
}
