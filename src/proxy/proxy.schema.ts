import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Proxy {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  host: string;

  @Prop({ type: Number, required: true })
  port: number;

  @Prop({ default: "http" })
  protocol: string;

  @Prop({ default: false })
  isCurrentlyUsed: boolean;

  @Prop({ default: false })
  isBanned: boolean;
}

export type ProxyDocument = Proxy & Document;

export const ProxySchema = SchemaFactory.createForClass(Proxy);
