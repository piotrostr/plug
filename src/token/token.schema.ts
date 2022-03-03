import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export interface Error {
  error: string;
}

@Schema()
export class Token {
  @Prop()
  token: string;

  @Prop({ default: false })
  isCurrentlyUsed: boolean;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop({ default: false })
  needsVerification: boolean;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
