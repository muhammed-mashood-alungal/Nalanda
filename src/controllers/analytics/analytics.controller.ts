import { IAnalyticsService } from "@/services";
import { IAnalyticsController } from "./analyticts.interface.controller";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class AnalyticsController implements IAnalyticsController {
  constructor(private _analyticsService: IAnalyticsService) {}

  async getActiveMembers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { limit } = req.query;
      const activeMembers = await this._analyticsService.getActiveMembers(
        limit ? Number(limit) : 10
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, activeMembers);
    } catch (error) {
      next(error);
    }
  }

  async getBookAvailability(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bookAvailability =
        await this._analyticsService.getBookAvailability();
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, bookAvailability);
    } catch (error) {
      next(error);
    }
  }

  async getMostBorrowedBooks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { limit } = req.query;
    const mostBorrowedBooks = await this._analyticsService.getMostBorrowedBooks(
      limit ? Number(limit) : 10
    );
    successResponse(res, StatusCodes.OK, ReasonPhrases.OK, mostBorrowedBooks);
    try {
    } catch (error) {
      next(error);
    }
  }
}
