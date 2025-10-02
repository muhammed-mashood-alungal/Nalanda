import { CreateBookDto, UpdateBookDto } from "@/dtos";
import { IBookDocument } from "@/models";
import { IFilterOptions } from "@/types";

export interface IBookRepository {
  createBook(bookData: CreateBookDto): Promise<IBookDocument>;
  updateBook(
    bookId: string,
    bookData: UpdateBookDto
  ): Promise<IBookDocument | null>;
  toggleBookDeletion(bookId: string, status: boolean): Promise<void>;
  getAllBooks(
    options: IFilterOptions
  ): Promise<{ books: IBookDocument[]; totalCount: number }>;
  getAllActiveBooks(
    options: IFilterOptions
  ): Promise<{ books: IBookDocument[]; totalCount: number }>;
  getBookById(bookId: string): Promise<IBookDocument | null>;
  getBookByIsbn(isbn: string): Promise<IBookDocument | null>;
}
