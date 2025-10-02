import { ERROR } from "@/constants";
import mongoose, { Document, Types, Schema } from "mongoose";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role : 'user' | 'admin'
  membershipDate: Date;
  password: String;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, ERROR.USER.NAME_REQUIRED],
    trim: true,
    minLength: [2, ERROR.USER.NAME_MIN_LENGTH],
    maxLength: [50, ERROR.USER.NAME_MAX_LENGTH],
  },
  email: {
    type: String,
    required: [true, ERROR.USER.EMAIL_REQUIRED],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      ERROR.USER.EMAIL_REQUIRED,
    ],
    index: true,
  },
  password: {
    type: String,
    required: [true, ERROR.USER.PASSWORD_REQUIRED],
    minLength: [6, ERROR.USER.MIN_PASSWORD_LENGTH],
  },
  role : {
    type : String,
    enum : ['user', 'admin'],
    default : 'user'
  },
  membershipDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const User = mongoose.model<IUserDocument>("User", UserSchema);
