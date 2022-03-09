import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import Strategy from "passport-headerapikey";

type Done = (error: Error, data: any) => any;

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  "api-key",
) {
  constructor(private readonly configService: ConfigService) {
    super(
      { header: "Authorization", prefix: "" },
      true,
      async (apiKey: string, done: Done) => {
        return this.validate(apiKey, done);
      },
    );
  }

  public validate = (apiKey: string, done: Done) => {
    if (this.configService.get<string>("API_KEY") === apiKey) {
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  };
}
