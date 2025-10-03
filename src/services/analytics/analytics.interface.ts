import { BookAvailability, MostActiveMember, MostBorrowedBook } from "@/types";

export interface IAnalyticsService {
  getMostBorrowedBooks(limit: number): Promise<MostBorrowedBook[]>;
  getActiveMembers(limit: number): Promise<MostActiveMember[]>;
  getBookAvailability(): Promise<BookAvailability>;
}
