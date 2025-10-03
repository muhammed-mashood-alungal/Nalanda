import { ERROR } from "@/constants";
import z from "zod";

export const borrowCreateSchema = z.object({
  borrowDate : z.date(ERROR.BORROW.DUE_DATE_REQUIRED).optional(),
  dueDate: z.date(ERROR.BORROW.DUE_DATE_REQUIRED).optional(),
  status: z
    .enum(["active", "returned", "overdue"], ERROR.BORROW.STATUS_INVALID)
    .optional()
    .default("active"),
  returnDate: z.date().nullable().optional(),
});
