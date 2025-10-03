import {
  BookAdminResponseDto,
  BookResponseDto,
  CreateBookDto,
  UpdateBookDto,
} from "@/dtos";
import { IFilterOptions, IPagination } from "@/types";

export interface IBookService {
  createBook(bookData: CreateBookDto): Promise<BookAdminResponseDto>;
  updateBook(
    bookId: string,
    bookData: UpdateBookDto
  ): Promise<BookAdminResponseDto | null>;
  toggleBookDeletion(bookId: string, status: boolean): Promise<void>;
  getAllBooks(
    options: IFilterOptions
  ): Promise<IPagination<BookAdminResponseDto>>;
  getAllActiveBooks(
    options: IFilterOptions
  ): Promise<IPagination<BookResponseDto>>;
  getBookById(bookId: string): Promise<BookResponseDto | null>;
  updateAvailableCount(bookId: string, change: number): Promise<void>;
}
