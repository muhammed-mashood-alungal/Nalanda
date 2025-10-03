import { ERROR } from "@/constants";
import { CreateBorrowDto, BorrowResponseDto } from "@/dtos";
import { BorrowMapper } from "@/mappers";
import { IBorrowRepository } from "@/repositories";
import { IBorrowService, IBookService, IUserService } from "@/services";
import { IFilterOptions, IPagination } from "@/types";
import { createHttpsError, paginate } from "@/utils";
import { StatusCodes } from "http-status-codes";

export class BorrowService implements IBorrowService {
  constructor(
    private _borrowRepository: IBorrowRepository,
    private _bookService: IBookService,
    private _userService: IUserService
  ) {}

  async getAllBorrows(
    options: IFilterOptions
  ): Promise<IPagination<BorrowResponseDto>> {
    const { borrowList, totalCount } =
      await this._borrowRepository.getAllBorrows(options);

    const mappedList = borrowList.map(BorrowMapper.toResponse);

    return paginate(
      mappedList,
      totalCount,
      Number(options.page),
      Number(options.limit)
    );
  }

  
  async borrowBook(borrowDetails: CreateBorrowDto): Promise<BorrowResponseDto> {
    const user = await this._userService.getUserDetailsById(
      borrowDetails.userId
    );
    if (!user.isActive)
      throw createHttpsError(StatusCodes.FORBIDDEN, ERROR.USER.USER_BLOCKED);

    const book = await this._bookService.getBookById(borrowDetails.bookId);

    if (!book)
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.BOOK.NOT_FOUND);

    if (book.availableCopies <= 0) {
      throw createHttpsError(
        StatusCodes.BAD_REQUEST,
        ERROR.BOOK.INSUFFICIENT_COPIES
      );
    }

    const dueDate = borrowDetails.dueDate
      ? new Date(borrowDetails.dueDate)
      : this._calculateDueDate(14);

    borrowDetails.dueDate = dueDate;

    const activeBorrows = await this._borrowRepository.activeBorrowsOfUser(
      borrowDetails.userId
    );

    if (activeBorrows >= 5) {
      throw createHttpsError(
        StatusCodes.BAD_REQUEST,
        ERROR.BORROW.MAX_BORROW_LIMIT
      );
    }

    const overDueBorrows = await this.getOverdueBorrows(borrowDetails.userId);

    if (overDueBorrows.length >= 1) {
      throw createHttpsError(
        StatusCodes.BAD_REQUEST,
        ERROR.BORROW.ALREADY_HAVE_OVERDUE_BOOK
      );
    }

    const newBorrowedData = await this._borrowRepository.borrowBook(
      borrowDetails
    );

    return BorrowMapper.toResponse(newBorrowedData);
  }

  async getOverdueBorrows(userId: string): Promise<BorrowResponseDto[]> {
    const list = await this._borrowRepository.getOverdueBorrows(userId);
    return list.map(BorrowMapper.toResponse);
  }

  async returnBorrowedBook(borrowId: string): Promise<BorrowResponseDto> {
    const borrow = await this._borrowRepository.getBorrowById(borrowId);
    if (!borrow) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.BORROW.NOT_FOUND);
    }

    if (borrow.status === "returned") {
      throw createHttpsError(
        StatusCodes.BAD_REQUEST,
        ERROR.BORROW.ALREADY_RETURNED
      );
    }

    const updatedBorrowRecord = await this._borrowRepository.returnBorrowedBook(
      borrowId
    );
    return BorrowMapper.toResponse(updatedBorrowRecord!);
  }

  async borrowHistory(
    userId: string,
    options: IFilterOptions
  ): Promise<IPagination<BorrowResponseDto>> {
    const { borrowList, totalCount } =
      await this._borrowRepository.borrowHistory(userId, options);

    const mappedList = borrowList.map(BorrowMapper.toResponse);

    return paginate(
      mappedList,
      totalCount,
      Number(options.page),
      Number(options.limit)
    );
  }

  private _calculateDueDate(days: number): Date {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate;
  }
}
