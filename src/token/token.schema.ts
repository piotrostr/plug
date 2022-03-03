import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
// proxy could be added here at some point, depending on the impl
// import { Proxy, ProxySchema } from "../proxy/proxy.schema";

@Schema()
export class Token {
  @Prop({ type: String, required: true, unique: true })
  token: string;

  @Prop({ default: false })
  isCurrentlyUsed: boolean;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop({ default: false })
  needsVerification: boolean;

  /* 
    @Prop({ type: ProxySchema })
    proxy: Proxy;
  */
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
