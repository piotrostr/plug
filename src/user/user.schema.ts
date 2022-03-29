import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User {
  @Prop({ type: String, unique: true })
  token: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, unique: true, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  number: string;

  @Prop({ type: Number })
  dayOfBirth: number;

  @Prop({ type: Number })
  monthOfBirth: number;

  @Prop({ type: Number })
  yearOfBirth: number;

  @Prop({ type: Boolean, default: false })
  isCurrentlyUsed: boolean;

  @Prop({ type: Boolean, default: false })
  isUnderVerification: boolean;

  @Prop({ type: Boolean, default: false })
  isBanned: boolean;

  @Prop({ type: Boolean, default: false })
  phoneVerified: boolean;

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: String })
  sessionId: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
