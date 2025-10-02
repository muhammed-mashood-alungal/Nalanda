import { ERROR } from "@/constants";
import z from "zod";

export const bookCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, ERROR.BOOK.TITLE_MIN_LENGTH)
    .max(200, ERROR.BOOK.TITLE_MAX_LENGTH),
  author: z
    .string()
    .trim()
    .min(1, ERROR.BOOK.AUTHOR_MIN_LENGTH)
    .max(100, ERROR.BOOK.AUTHOR_MAX_LENGTH),
  isbn: z
    .string()
    .trim()
    .regex(/^[0-9-]{10,17}$/, ERROR.BOOK.ISBN_INVALID),
  publishedYear: z
    .number(ERROR.BOOK.PUBLISHED_YEAR_REQUIRED)
    .min(1000, ERROR.BOOK.PUBLISHED_YEAR_MIN)
    .max(new Date().getFullYear(), ERROR.BOOK.PUBLISHED_YEAR_MAX),
  genre: z
    .string()
    .trim()
    .min(1, ERROR.BOOK.GENRE_MIN_LENGTH)
    .max(50, ERROR.BOOK.GENRE_MAX_LENGTH),
  totalCopies: z
    .number(ERROR.BOOK.TOTAL_COPIES_REQUIRED)
    .min(1, ERROR.BOOK.TOTAL_COPIES_MIN)
    .default(1),
  availableCopies: z
    .number(ERROR.BOOK.TOTAL_COPIES_REQUIRED)
    .min(0, ERROR.BOOK.AVAILABLE_COPIES_MIN)
    .default(1)
});

export const bookUpdateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, ERROR.BOOK.TITLE_MIN_LENGTH)
    .max(200, ERROR.BOOK.TITLE_MAX_LENGTH)
    .optional(),
  author: z
    .string()
    .trim()
    .min(1, ERROR.BOOK.AUTHOR_MIN_LENGTH)
    .max(100, ERROR.BOOK.AUTHOR_MAX_LENGTH)
    .optional(),
  isbn: z
    .string()
    .trim()
    .regex(/^[0-9-]{10,17}$/, ERROR.BOOK.ISBN_INVALID)
    .optional(),
  publishedYear: z
    .number()
    .min(1000, ERROR.BOOK.PUBLISHED_YEAR_MIN)
    .max(new Date().getFullYear(), ERROR.BOOK.PUBLISHED_YEAR_MAX)
    .optional(),
  genre: z
    .string()
    .trim()
    .min(1, ERROR.BOOK.GENRE_MIN_LENGTH)
    .max(50, ERROR.BOOK.GENRE_MAX_LENGTH)
    .optional(),
  totalCopies: z.number().min(1, ERROR.BOOK.TOTAL_COPIES_MIN).optional(),
  availableCopies: z
    .number()
    .min(0, ERROR.BOOK.AVAILABLE_COPIES_MIN)
    .optional(),
});
