import { IBookRepository } from "@/repositories";
import { IBookService } from "./book.interface.service";
import {
  CreateBookDto,
  BookAdminResponseDto,
  UpdateBookDto,
  BookResponseDto,
} from "@/dtos";
import { createHttpsError, paginate } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ERROR } from "@/constants";
import { BookMapper } from "@/mappers";
import { IFilterOptions, IPagination } from "@/types";

export class BookService implements IBookService {
  constructor(private _bookRepository: IBookRepository) {}

  async createBook(bookData: CreateBookDto): Promise<BookAdminResponseDto> {
    const isBookExists = await this._bookRepository.getBookByIsbn(
      bookData.isbn
    );

    if (isBookExists) {
      throw createHttpsError(StatusCodes.CONFLICT, ERROR.BOOK.BOOK_EXISTS);
    }

    const newBook = await this._bookRepository.createBook(bookData);
    return BookMapper.toAdminResponse(newBook);
  }

  async updateBook(
    bookId: string,
    bookData: UpdateBookDto
  ): Promise<BookAdminResponseDto | null> {
    const newBook = await this._bookRepository.updateBook(bookId, bookData);
    if (!newBook) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.BOOK.NOT_FOUND);
    }
    return BookMapper.toAdminResponse(newBook);
  }

  async getBookById(bookId: string): Promise<BookResponseDto | null> {
    const book = await this._bookRepository.getBookById(bookId);
    if (!book) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.BOOK.NOT_FOUND);
    }
    return BookMapper.toResponse(book);
  }

  async getAllBooks(
    options: IFilterOptions
  ): Promise<IPagination<BookAdminResponseDto>> {
    const { books, totalCount } = await this._bookRepository.getAllBooks(
      options
    );
    const mappedBooks = books.map(BookMapper.toAdminResponse);
    const paginatedData = paginate(
      mappedBooks,
      totalCount,
      Number(options.page),
      Number(options.limit)
    );
    return paginatedData;
  }

  async getAllActiveBooks(
    options: IFilterOptions
  ): Promise<IPagination<BookResponseDto>> {
    const { books, totalCount } = await this._bookRepository.getAllBooks(
      options
    );
    const mappedBooks = books.map(BookMapper.toResponse);
    const paginatedData = paginate(
      mappedBooks,
      totalCount,
      Number(options.page),
      Number(options.limit)
    );
    return paginatedData;
  }

  async toggleBookDeletion(bookId: string, status: boolean): Promise<void> {
    await this._bookRepository.toggleBookDeletion(bookId, status);
  }
}
