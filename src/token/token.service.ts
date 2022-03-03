import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTokenInput, UpdateTokenInput } from "./token.mutations";
import { Token, TokenDocument } from "./token.schema";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  /**
   * creates a new unused, not banned token
   * */
  async createToken(createTokenInput: CreateTokenInput): Promise<Token> {
    const addedToken = new this.tokenModel(createTokenInput);
    return addedToken.save();
  }

  /**
   * get token that is not banned, not used,
   * and doesnt need to be verified
   * */
  async getToken(): Promise<Token> {
    return await this.tokenModel.findOneAndUpdate(
      {
        isBanned: false,
        isCurrentlyUsed: false,
        needsVerification: false,
      },
      { isCurrentlyUsed: true },
    );
  }

  /**
   * return token, update its status if
   * needed (banned, needs verification)
   * */
  async returnToken(updateTokenInput: UpdateTokenInput) {
    await this.tokenModel.updateOne(
      { token: updateTokenInput.token },
      updateTokenInput,
    );
  }

  /**
   * return an unverified token (for the sake of verifying it)
   * */
  async getUnverifiedToken(): Promise<Token> {
    const unverifiedToken = this.tokenModel.findOne({
      needsVerification: true,
    });
    return await unverifiedToken.exec();
  }
}
