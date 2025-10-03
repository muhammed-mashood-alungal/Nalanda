import { ERROR } from "@/constants";
import mongoose, { Document, Types, Schema } from "mongoose";

export interface IBookDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  totalCopies: number;
  availableCopies: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, ERROR.BOOK.TITLE_REQUIRED],
      trim: true,
      minLength: [1, ERROR.BOOK.TITLE_MIN_LENGTH],
      maxLength: [50, ERROR.BOOK.TITLE_MAX_LENGTH],
    },
    author: {
      type: String,
      required: [true, ERROR.BOOK.AUTHOR_REQUIRED],
      trim: true,
      minLength: [1, ERROR.BOOK.AUTHOR_MIN_LENGTH],
      maxLength: [50, ERROR.BOOK.AUTHOR_MAX_LENGTH],
    },
    isbn: {
      type: String,
      required: [true, ERROR.BOOK.ISBN_REQUIRED],
      unique: true,
      trim: true,
      match: [/^[0-9-]{10,17}$/, ERROR.BOOK.ISBN_INVALID],
      index: true,
    },
    publishedYear: {
      type: Number,
      required: [true, ERROR.BOOK.PUBLISHED_YEAR_REQUIRED],
      min: [1000, ERROR.BOOK.PUBLISHED_YEAR_MIN],
      max: [new Date().getFullYear(), ERROR.BOOK.PUBLISHED_YEAR_MAX],
    },
    genre: {
      type: String,
      required: [true, ERROR.BOOK.GENRE_REQUIRED],
      trim: true,
      minLength: [1, ERROR.BOOK.GENRE_MIN_LENGTH],
      maxLength: [50, ERROR.BOOK.GENRE_MAX_LENGTH],
    },
    totalCopies: {
      type: Number,
      required: [true, ERROR.BOOK.TOTAL_COPIES_REQUIRED],
      min: [1, ERROR.BOOK.TOTAL_COPIES_MIN],
      default: 1,
    },
    availableCopies: {
      type: Number,
      required: [true, ERROR.BOOK.AVAILABLE_COPIES_REQUIRED],
      min: [0, ERROR.BOOK.AVAILABLE_COPIES_MIN],
      default: function (this: any) {
        return this.totalCopies;
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.index({ title: "text", author: "text", genre: "text" });

export const Book = mongoose.model<IBookDocument>("Book", BookSchema);
