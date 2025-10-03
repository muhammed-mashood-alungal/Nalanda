import { CreateBorrowDto } from "@/dtos";
import { IBorrowDocument } from "@/models";
import { IFilterOptions, MostActiveMember, MostBorrowedBook } from "@/types";

export interface IBorrowRepository {
  getAllBorrows(
    options: IFilterOptions
  ): Promise<{ borrowList: IBorrowDocument[]; totalCount: number }>;
  borrowBook(borrowDetails: CreateBorrowDto): Promise<IBorrowDocument>;
  returnBorrowedBook(borrowId: string): Promise<IBorrowDocument | null>;
  borrowHistory(
    userId: string,
    options: IFilterOptions
  ): Promise<{ borrowList: IBorrowDocument[]; totalCount: number }>;
  activeBorrowsOfUser(userId: string): Promise<number>;
  getBorrowById(borrowId: string): Promise<IBorrowDocument | null>;
  getOverdueBorrows(userId: string): Promise<IBorrowDocument[]>;
  getMostBorrowedBooks(limit: number): Promise<MostBorrowedBook[]>;
  getMostBorrowedUsers(limit: number): Promise<MostActiveMember[]>;
}
