export interface IPagination<T> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: T[];
}

export interface IFilterOptions {
  [key: string]: string | number | boolean;
}
