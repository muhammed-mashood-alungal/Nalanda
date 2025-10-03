import {
  IBookRepository,
  IBorrowRepository,
  IUserRepository,
} from "@/repositories";
import { IAnalyticsService } from "./analytics.interface";
import { BookAvailability, MostActiveMember, MostBorrowedBook } from "@/types";

export class AnalyticsService implements IAnalyticsService {
  constructor(
    private _borrowReposiotry: IBorrowRepository,
    private _bookRepository: IBookRepository,
  ) {}

  async getMostBorrowedBooks(limit: number): Promise<MostBorrowedBook[]> {
    return await this._borrowReposiotry.getMostBorrowedBooks(limit);
  }

  async getActiveMembers(limit: number): Promise<MostActiveMember[]> {
    return await this._borrowReposiotry.getMostBorrowedUsers(limit);
  }

  async getBookAvailability(): Promise<BookAvailability> {
    return await this._bookRepository.getBookAvailability();
  }
}
