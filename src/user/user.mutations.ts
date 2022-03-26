import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  token: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  country: string;

  @Field(() => Number)
  dayOfBirth: number;

  @Field(() => Number)
  monthOfBirth: number;

  @Field(() => Number)
  yearOfBirth: number;
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
}
