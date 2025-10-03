import { Router } from "express";
import {
  analyticsRouter,
  authRouter,
  bookRouter,
  borrowRouter,
  userRouter,
} from "@/routes/v1";

export const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("usres", userRouter);
v1Router.use("/books", bookRouter);
v1Router.use("/borrow", borrowRouter);
v1Router.use("/analytics", analyticsRouter);
