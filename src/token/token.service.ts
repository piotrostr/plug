import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTokenInput, UpdateTokenInput } from "token/token.mutations";
import { Token, TokenDocument } from "token/token.schema";

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
    const token = this.tokenModel.findOne({
      isBanned: false,
      isCurrentlyUsed: false,
      needsVerification: false,
    });
    // TODO verify it updates (need a spec file I guess)
    return token;
  }

  /**
   * return token, update its status if
   * needed (banned, needs verification)
   * */
  returnToken(updateTokenInput: UpdateTokenInput) {
    return updateTokenInput;
    // TODO update the token entry
  }

  getUnverifiedToken(): Promise<Token> {
    const unverifiedToken = this.tokenModel.findOne({
      needsVerification: true,
    });
    return unverifiedToken.exec();
  }
}
