import { BookController } from "@/controllers";
import { authenticateUser, authorizeAdmin, validateSchema } from "@/middleware";
import { BookRepository } from "@/repositories";
import { BookService } from "@/services";
import { bookCreateSchema, bookUpdateSchema } from "@/validations";
import { Router } from "express";

export const bookRouter = Router();

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

bookRouter.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  validateSchema(bookCreateSchema),
  bookController.createBook.bind(bookController)
);

bookRouter.get(
  "/",
  authenticateUser,
  authorizeAdmin,
  bookController.getAllBooks.bind(bookController)
);

bookRouter.get(
  "/active",
  authenticateUser,
  bookController.getAllActiveBooks.bind(bookController)
);

bookRouter.get(
  "/:bookId",
  authenticateUser,
  bookController.getBookById.bind(bookController)
);

bookRouter.delete(
  "/:bookId",
  authenticateUser,
  authorizeAdmin,
  bookController.deleteBook.bind(bookController)
);

bookRouter.put(
  "/:bookId/restore",
  authenticateUser,
  authorizeAdmin,
  bookController.restoreBook.bind(bookController)
);

bookRouter.put(
  "/:bookId",
  authenticateUser,
  authorizeAdmin,
  validateSchema(bookUpdateSchema),
  bookController.updateBook.bind(bookController)
);
