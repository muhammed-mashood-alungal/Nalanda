import { BookAdminResponseDto, BookResponseDto } from "@/dtos";
import { IBookDocument } from "@/models";

export class BookMapper {
  static toResponse(book: IBookDocument): BookResponseDto {
    return {
      id: book?._id?.toString(),
      author: book.author,
      title: book.title,
      genre: book.genre,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
      availableCopies: book.availableCopies,
    };
  }
  static toAdminResponse(book: IBookDocument): BookAdminResponseDto {
    return {
      ...BookMapper.toResponse(book),
      totalCopies: book.totalCopies,
      isActive: book.isActive,
    };
  }
}
