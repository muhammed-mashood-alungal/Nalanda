import { AnalyticsController } from "@/controllers";
import { authenticateUser, authorizeAdmin } from "@/middleware";
import { BookRepository, BorrowRepository } from "@/repositories";
import { AnalyticsService } from "@/services";
import { Router } from "express";

export const analyticsRouter = Router();

analyticsRouter.use(authenticateUser, authorizeAdmin);

const bookRepo = new BookRepository();
const borrowRepo = new BorrowRepository();
const analyticsService = new AnalyticsService(borrowRepo, bookRepo);
const analyticsController = new AnalyticsController(analyticsService);

analyticsRouter.get(
  "/most-active-members",
  analyticsController.getActiveMembers.bind(analyticsController)
);

analyticsRouter.get(
  "/most-borrowed-books",
  analyticsController.getMostBorrowedBooks.bind(analyticsController)
);

analyticsRouter.get(
  "/books-availability",
  analyticsController.getBookAvailability.bind(analyticsController)
);
