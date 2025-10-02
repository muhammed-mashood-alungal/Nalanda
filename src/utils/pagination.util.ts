import { IPagination } from "@/types";

export const paginate = <T>(
  data: T[],
  total: number,
  page?: number,
  limit?: number
): IPagination<T> => {
  const safePage = page && page > 0 ? page : 1;
  const safeLimit = limit && limit > 0 ? limit : 10;

  const totalPages = Math.ceil(total / safeLimit);

  return {
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: totalPages || 1,
    },
    data,
  };
};
