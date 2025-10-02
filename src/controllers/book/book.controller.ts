import { IBookService } from "@/services";
import { IBookController } from "./book.interface.controller";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { SUCCESS } from "@/constants";
import { IFilterOptions } from "@/types";

export class BookController implements IBookController {
  constructor(private _bookService: IBookService) {}

  async createBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bookData = req.body;
      const newBook = await this._bookService.createBook(bookData);

      successResponse(res, StatusCodes.CREATED, SUCCESS.BOOK.CREATED, newBook);
    } catch (error) {
      next(error);
    }
  }

  async updateBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bookData = req.body;
      const { bookId } = req.params;
      const updatedBook = await this._bookService.updateBook(bookId, bookData);
      successResponse(res, StatusCodes.OK, SUCCESS.BOOK.UPDATED, updatedBook);
    } catch (error) {
      next(error);
    }
  }

  async getBookById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { bookId } = req.params;
      const book = await this._bookService.getBookById(bookId);
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, book);
    } catch (error) {
      next(error);
    }
  }

  async getAllBooks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const options: unknown = req.query;
      const books = await this._bookService.getAllBooks(
        options as IFilterOptions
      );

      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, books);
    } catch (error) {
      next(error);
    }
  }
  async getAllActiveBooks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const options: unknown = req.query;
      const books = await this._bookService.getAllActiveBooks(
        options as IFilterOptions
      );

      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, books);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { bookId } = req.params;
      await this._bookService.toggleBookDeletion(bookId, false);
      successResponse(res, StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async restoreBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { bookId } = req.params;
      await this._bookService.toggleBookDeletion(bookId, true);
      successResponse(res, StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}
