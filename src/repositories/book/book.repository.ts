import { Book, IBookDocument } from "@/models";
import { BaseRepository } from "../base.repository";
import { IBookRepository } from "./book.interface.repository";
import { CreateBookDto, UpdateBookDto } from "@/dtos";
import { BookAvailability, IFilterOptions } from "@/types";
import { FilterQuery } from "mongoose";

export class BookRepository
  extends BaseRepository<IBookDocument>
  implements IBookRepository
{
  constructor() {
    super(Book);
  }

  async createBook(bookData: CreateBookDto): Promise<IBookDocument> {
    return await this.create(bookData);
  }

  async updateBook(
    bookId: string,
    bookData: UpdateBookDto
  ): Promise<IBookDocument | null> {
    return await this.findByIdAndUpdate(bookId, bookData);
  }

  async toggleBookDeletion(bookId: string, status: boolean): Promise<void> {
    await this.findByIdAndUpdate(bookId, { isActive: status });
  }

  async getAllBooks(
    options: IFilterOptions
  ): Promise<{ books: IBookDocument[]; totalCount: number }> {
    const filter = this._generateFilter(options);
    const [books, totalCount] = await Promise.all([
      this.findAndpaginate(
        filter,
        Number(options?.page),
        Number(options?.limit)
      ),
      this.count(filter),
    ]);
    return { books, totalCount };
  }

  async getAllActiveBooks(
    options: IFilterOptions
  ): Promise<{ books: IBookDocument[]; totalCount: number }> {
    const filter = this._generateFilter(options);
    const [books, totalCount] = await Promise.all([
      this.findAndpaginate(
        { ...filter, isActive: true },
        Number(options?.page),
        Number(options?.limit)
      ),
      this.count(filter),
    ]);
    return { books, totalCount };
  }

  async getBookById(bookId: string): Promise<IBookDocument | null> {
    return await this.findById(bookId);
  }

  private _generateFilter(
    options?: IFilterOptions
  ): FilterQuery<IBookDocument> {
    const filter: FilterQuery<IBookDocument> = {};

    if (options?.search) {
      const regex = { $regex: options.search, $options: "i" };

      filter.$or = [
        { title: regex },
        { author: regex },
        { isbn: regex },
        { genre: regex },
      ];
    }

    if (options?.status != undefined) {
      filter.isActive = filter.status;
    }

    return filter;
  }

  async getBookByIsbn(isbn: string): Promise<IBookDocument | null> {
    return await this.findOne({ isbn });
  }

  async getBookAvailability(): Promise<BookAvailability> {
    return this.model
      .aggregate([
        {
          $group: {
            _id: null,
            totalBooks: { $sum: "$totalCopies" },
            availableBooks: { $sum: "$availableCopies" },
            borrowedBooks: {
              $sum: { $subtract: ["$totalCopies", "$availableCopies"] },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalBooks: 1,
            borrowedBooks: 1,
            availableBooks: 1,
          },
        },
      ])
      .then((res) => res[0]);
  }

  async updateAvailableCount(bookId: string , change : number): Promise<void> {
    await this.findByIdAndUpdate(bookId, { $inc: { availableCopies: change} });
  }
}
