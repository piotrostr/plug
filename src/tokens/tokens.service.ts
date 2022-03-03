import { Injectable } from '@nestjs/common';
import { CreateTokenInput, UpdateTokenInput } from './token.mutations';

@Injectable()
export class TokensService {
  /**
   * creates a new unused, not banned token
   * */
  createToken(createTokenInput: CreateTokenInput) {
    return createTokenInput;
  }

  /**
   * get token that is not banned, not used,
   * and doesnt need to be verified
   * */
  getToken() {
    return;
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
