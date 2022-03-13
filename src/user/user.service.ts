import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserInput, UpdateUserInput } from "./user.mutations";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const addedUser = new this.userModel(createUserInput);
    return addedUser.save();
  }

  async getUser(): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      {
        isBanned: false,
        isCurrentlyUsed: false,
        phoneVerified: true,
        emailVerified: true,
      },
      { isCurrentlyUsed: true },
    );
  }

  async returnUser(updateUserInput: UpdateUserInput) {
    await this.userModel.updateOne(
      { _id: updateUserInput._id },
      updateUserInput,
    );
  }

  async getPhoneUnverifiedUser(): Promise<User> {
    const unverifiedUser = this.userModel.findOne({
      phoneVerified: false,
      emailVerified: true,
    });
    return await unverifiedUser.exec();
  }
}
