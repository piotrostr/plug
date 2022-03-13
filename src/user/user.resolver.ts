import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.schema";
import { CreateUserInput, UpdateUserInput } from "./user.mutations";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => User)
  getUser() {
    return this.usersService.getUser();
  }

  @Mutation(() => User)
  returnUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.returnUser(updateUserInput);
  }

  @Query(() => User)
  getUnverifiedUser() {
    return this.usersService.getUnverifiedUser();
  }
}
