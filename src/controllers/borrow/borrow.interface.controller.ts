import { NextFunction, Request, Response } from "express";

export interface IBorrowController {
  getAllBorrows(req: Request, res: Response, next: NextFunction): Promise<void>;
  borrowBook(req: Request, res: Response, next: NextFunction): Promise<void>;
  returnBorrowedBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  borrowHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
  getOverdueBorrows(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
