import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(_req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
  refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  authMe(req: Request, res: Response, next: NextFunction): Promise<void>;
}
