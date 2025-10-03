export interface MostBorrowedBook {
  borrowCount: number;
  bookDetails: {
    title: string;
    isbn: string;
  };
}

export interface MostActiveMember {
  borrowCount: number;
  userDetails: {
    name: string;
    email: string;
  };
}

export interface BookAvailability {
  _id: string;
  title: string;
  totalCopies: number;
  borrowedCopies: number;
  availableCopies: number;
}
