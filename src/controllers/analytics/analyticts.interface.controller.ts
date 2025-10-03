import { NextFunction, Request, Response } from "express";

export interface IAnalyticsController {
  getMostBorrowedBooks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getActiveMembers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getBookAvailability(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
