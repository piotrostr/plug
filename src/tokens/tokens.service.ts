import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTokenInput, UpdateTokenInput } from 'tokens/token.mutations';
import { Token, TokenDocument } from 'tokens/token.schema';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}
  /**
   * creates a new unused, not banned token
   * */
  createToken(createTokenInput: CreateTokenInput): Promise<Token> {
    const addedToken = new this.tokenModel(createTokenInput);
    return addedToken.save();
  }

  /**
   * get token that is not banned, not used,
   * and doesnt need to be verified
   * */
  getToken(): Promise<Token> {
    const token = this.tokenModel.findOne({
      isBanned: false,
      isCurrentlyUsed: false,
      needsVerification: false,
    });

    return token.exec();
    // also mutate
  }

  /**
   * return token, update its status if
   * needed (banned, needs verification)
   * */
  returnToken(updateTokenInput: UpdateTokenInput) {
    return updateTokenInput;
  }

  getUnverifiedToken() {
    return;
  }
}
