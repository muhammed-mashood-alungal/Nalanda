import { BorrowResponseDto } from "@/dtos";
import { IBookDocument, IBorrowDocument, IUserDocument } from "@/models";
import { BookMapper } from "./book.mapper";
import { UserMapper } from "./user.mapper";

export class BorrowMapper {
  static toResponse(borrowDetails: IBorrowDocument): BorrowResponseDto {
    return {
      id: borrowDetails?._id?.toString(),
      book: BookMapper.toResponse(borrowDetails.bookId as IBookDocument),
      user: UserMapper.toResponse(borrowDetails.userId as IUserDocument),
      borrowDate: borrowDetails.borrowDate.toISOString(),
      dueDate: borrowDetails.dueDate.toISOString(),
      returnDate: borrowDetails?.returnDate?.toISOString(),
      status: borrowDetails.status,
    };
  }
}
