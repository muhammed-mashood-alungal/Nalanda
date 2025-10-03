import { BorrowController } from "@/controllers";
import { authenticateUser, authorizeAdmin, validateSchema } from "@/middleware";
import {
  BookRepository,
  BorrowRepository,
  UserRepository,
} from "@/repositories";
import { BookService, BorrowService, UserService } from "@/services";
import { borrowCreateSchema } from "@/validations";
import { Router } from "express";

export const borrowRouter = Router();

const borrowRepository = new BorrowRepository();
const userRepository = new UserRepository();
const bookRepository = new BookRepository();
const userService = new UserService(userRepository);
const bookService = new BookService(bookRepository);

const borrowService = new BorrowService(
  borrowRepository,
  bookService,
  userService
);

const bookController = new BorrowController(borrowService);
borrowRouter.get(
  "/",
  authenticateUser,
  authorizeAdmin,
  validateSchema(borrowCreateSchema),
  bookController.getAllBorrows.bind(bookController)
);
borrowRouter.post(
  "/",
  authenticateUser,
  bookController.borrowBook.bind(bookController)
);
borrowRouter.get(
  "/history",
  authenticateUser,
  bookController.borrowHistory.bind(bookController)
);

borrowRouter.get(
  "/over-due-borrows",
  authenticateUser,
  bookController.getOverdueBorrows.bind(bookController)
);

borrowRouter.put(
  "/:borrowId/return",
  authenticateUser,
  bookController.returnBorrowedBook.bind(bookController)
);

borrowRouter;
