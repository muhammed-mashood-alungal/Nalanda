import { BorrowResponseDto, CreateBorrowDto } from "@/dtos";
import { IFilterOptions, IPagination } from "@/types";

export interface IBorrowService {
  getAllBorrows(
    options: IFilterOptions
  ): Promise<IPagination<BorrowResponseDto>>;
  borrowBook(borrowDetails: CreateBorrowDto): Promise<BorrowResponseDto>;
  returnBorrowedBook(borrowId: string): Promise<BorrowResponseDto>;
  borrowHistory(
    userId: string,
    options: IFilterOptions
  ): Promise<IPagination<BorrowResponseDto>>;
  getOverdueBorrows(userId: string): Promise<BorrowResponseDto[]>;
}
