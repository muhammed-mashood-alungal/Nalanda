import { bookCreateSchema, bookUpdateSchema } from "@/validations";
import z from "zod";

export type CreateBookDto = z.infer<typeof bookCreateSchema>;
export type UpdateBookDto = z.infer<typeof bookUpdateSchema>;

export interface BookResponseDto {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  availableCopies :number
}

export interface BookAdminResponseDto extends BookResponseDto {
   totalCopies : number 
   isActive : boolean
}
