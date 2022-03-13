import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserInput, UpdateUserInput } from "./user.mutations";
import { User } from "./user.schema";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("add")
  @UseGuards(AuthGuard("apiKey"))
  async createUser(@Body() createUserInput: CreateUserInput) {
    await this.userService.createUser(createUserInput);
  }

  @Get()
  @UseGuards(AuthGuard("apiKey"))
  async getUser(): Promise<User> {
    return await this.userService.getUser();
  }

  @Post("return")
  @UseGuards(AuthGuard("apiKey"))
  async returnUser(@Body() updateUserInput: UpdateUserInput) {
    return await this.userService.returnUser(updateUserInput);
  }

  @Get("phone-unverified")
  @UseGuards(AuthGuard("apiKey"))
  async getPhoneUnverifiedUser(): Promise<User> {
    return await this.userService.getPhoneUnverifiedUser();
  }
}
