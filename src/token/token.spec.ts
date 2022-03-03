import { Model } from "mongoose";
import { TokenController } from "./token.controller";
import { CreateTokenInput } from "./token.mutations";
import { TokenService } from "./token.service";
import { Token } from "./token.schema";

describe("Token", () => {
  let controller: TokenController;
  let service: TokenService;

  const tokenInput: CreateTokenInput = {
    token: "tokenion svp",
  };

  beforeEach(async () => {
    service = new TokenService(new Model<Token>());
    controller = new TokenController(service);
  });

  describe("it works", () => {
    it("should create a token", async () => {
      const result = await controller.createToken(tokenInput);
      console.log(result);
    });
  });
});
