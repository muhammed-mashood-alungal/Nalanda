import { NextFunction, Request, Response } from "express";

export interface IUserController {
  getUserDetailsById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  restoreUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
