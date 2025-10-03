import { Borrow, IBorrowDocument } from "@/models";
import { BaseRepository } from "../base.repository";
import { IBorrowRepository } from "./borrow.interface.repository";
import { IFilterOptions } from "@/types";
import { FilterQuery } from "mongoose";

export class BorrowRepository
  extends BaseRepository<IBorrowDocument>
  implements IBorrowRepository
{
  constructor() {
    super(Borrow);
  }

  async getAllBorrows(
    options: IFilterOptions
  ): Promise<{ borrowList: IBorrowDocument[]; totalCount: number }> {
    const filter: IFilterOptions = {};

    if (options?.status != "All") {
      filter.status = options.status;
    }

    const [borrowList, totalCount] = await Promise.all([
      this.findAndpaginate(
        filter,
        Number(options?.page),
        Number(options?.limit),
        [{ path: "userId" }, { path: "bookId" }]
      ),
      this.count(filter),
    ]);
    return { borrowList, totalCount };
  }

  async borrowBook(borrowDetails: any): Promise<IBorrowDocument> {
    return await this.create(borrowDetails);
  }
  async returnBorrowedBook(borrowId: string): Promise<IBorrowDocument | null> {
    return await this.findByIdAndUpdate(
      borrowId,
      {
        status: "returned",
        returnDate: new Date(),
      },
      [{ path: "userId" }, { path: "bookId" }]
    );
  }

  async borrowHistory(
    userId: string,
    options: IFilterOptions
  ): Promise<{ borrowList: IBorrowDocument[]; totalCount: number }> {
    const filter: FilterQuery<IBorrowDocument> = {};
    if (options?.status != "All") {
      filter.status = options.status;
    }
    const [borrowList, totalCount] = await Promise.all([
      this.findAndpaginate(
        { ...filter, userId },
        Number(options?.page),
        Number(options?.limit),
        [{ path: "userId" }, { path: "bookId" }]
      ),
      this.count(filter),
    ]);
    return { borrowList, totalCount };
  }

  async activeBorrowsOfUser(userId: string): Promise<number> {
    return await this.count({ userId, status: "active" });
  }

  async getBorrowById(borrowId: string): Promise<IBorrowDocument | null> {
    return await this.findById(borrowId, [
      { path: "userId" },
      { path: "bookId" },
    ]);
  }

  async getOverdueBorrows(userId: string): Promise<IBorrowDocument[]> {
    const dueDatedBorrows = await this.find({
      userId,
      dueDate: { $lt: new Date() },
      status: "active",
    });
    return dueDatedBorrows;
  }
}
