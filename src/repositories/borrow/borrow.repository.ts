import { Borrow, IBorrowDocument } from "@/models";
import { BaseRepository } from "../base.repository";
import { IBorrowRepository } from "./borrow.interface.repository";
import { IFilterOptions, MostActiveMember, MostBorrowedBook } from "@/types";
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

    if (options?.status && options?.status != "All") {
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
    if (options?.status && options?.status != "All") {
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

  async getMostBorrowedBooks(limit: number): Promise<MostBorrowedBook[]> {
    return await this.model.aggregate([
      { $group: { _id: "$bookId", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          borrowCount: 1,
          "bookDetails.title": 1,
          "bookDetails.isbn": 1,
        },
      },
    ]);
  }

  async getMostBorrowedUsers(limit: number): Promise<MostActiveMember[]> {
    return this.model.aggregate([
      {
        $group: {
          _id: "$userId",
          borrowCount: { $sum: 1 },
        },
      },
      { $sort: { borrowCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 1,
          borrowCount: 1,
          "userDetails.name": 1,
          "userDetails.email": 1,
        },
      },
    ]);
  }

  async isBookBorrowedByUser(bookId: string, userId: string): Promise<boolean> {
    return (
      (await this.findOne({ bookId, userId, status: "active" })) != undefined
    );
  }
}
