import { ERROR } from "@/constants";
import z from "zod";

export const borrowCreateSchema = z.object({
  dueDate: z
    .preprocess(
      (val) => (val ? new Date(val as string) : undefined),
      z.date(ERROR.BORROW.DUE_DATE_REQUIRED)
    )
    .optional(),
});
