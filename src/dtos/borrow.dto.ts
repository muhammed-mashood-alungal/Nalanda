import { borrowCreateSchema } from "@/validations";
import z from "zod";
import { BookResponseDto, UserResponseDto } from "@/dtos";

export type CreateBorrowDto = z.infer<typeof borrowCreateSchema> & {
  userId: string;
  bookId: string;
};

export interface BorrowResponseDto {
  id: string;
  user: UserResponseDto;
  book: BookResponseDto;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: "active" | "returned" | "overdue";
}
