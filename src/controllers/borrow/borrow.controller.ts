import { IBorrowService } from "@/services";
import { Request, Response, NextFunction } from "express";
import { IBorrowController } from "./borrow.interface.controller";
import { successResponse } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { SUCCESS } from "@/constants";
import { IFilterOptions } from "@/types";

export class BorrowController implements IBorrowController {
  constructor(private _borrowService: IBorrowService) {}

  async getAllBorrows(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const options: unknown = req.query;
      const borrows = await this._borrowService.getAllBorrows(
        options as IFilterOptions
      );
      successResponse(res, StatusCodes.CREATED, ReasonPhrases.OK, borrows);
    } catch (error) {
      next(error);
    }
  }

  async borrowBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { bookId } = req.params;
      const userId = req?.user?.id;
      const borrowDetails = req.body;
      const newBorrowRecord = await this._borrowService.borrowBook({
        ...borrowDetails,
        userId,
        bookId,
      });
      successResponse(
        res,
        StatusCodes.CREATED,
        SUCCESS.BORROW.BORROWED,
        newBorrowRecord
      );
    } catch (error) {
      next(error);
    }
  }

  async borrowHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req?.user?.id;
      const options: unknown = req.query;
      const borrowList = await this._borrowService.borrowHistory(
        userId,
        options as IFilterOptions
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, borrowList);
    } catch (error) {
      next(error);
    }
  }
  async getOverdueBorrows(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      const overDueBorrows = await this._borrowService.getOverdueBorrows(
        userId
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, {
        overDueBorrows,
      });
    } catch (error) {
      next(error);
      next();
    }
  }

  async returnBorrowedBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { borrowId } = req.params;
      const borrowDetails = await this._borrowService.returnBorrowedBook(
        borrowId
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, borrowDetails);
    } catch (error) {
      next(error);
      next();
    }
  }
}
