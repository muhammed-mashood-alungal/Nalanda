import { NextFunction, Response, Request } from "express";

export interface IBookController {
  createBook(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateBook(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllActiveBooks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getBookById(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteBook(req: Request, res: Response, next: NextFunction): Promise<void>;
  restoreBook(req: Request, res: Response, next: NextFunction): Promise<void>;
}
