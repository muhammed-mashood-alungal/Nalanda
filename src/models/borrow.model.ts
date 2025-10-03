import { ERROR } from "@/constants";
import mongoose, { Document, Types, Schema } from "mongoose";
import { IUserDocument } from "./user.model";
import { IBookDocument } from "./book.model";

export interface IBorrowDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId | IUserDocument;
  bookId: Types.ObjectId | IBookDocument;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "active" | "returned" | "overdue";
  createdAt: Date;
  updatedAt: Date;
}

const BorrowSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, ERROR.BORROW.USER_ID_REQUIRED],
      index: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, ERROR.BORROW.BOOK_ID_REQUIRED],
      index: true,
    },
    borrowDate: {
      type: Date,
      required: [true, ERROR.BORROW.BORROW_DATE_REQUIRED],
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, ERROR.BORROW.DUE_DATE_REQUIRED],
    },
    returnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "returned", "overdue"],
        message: ERROR.BORROW.STATUS_INVALID,
      },
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Borrow = mongoose.model<IBorrowDocument>("Borrow", BorrowSchema);
