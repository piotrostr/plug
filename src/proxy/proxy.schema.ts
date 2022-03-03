import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Proxy {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  host: string;

  @Prop()
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
