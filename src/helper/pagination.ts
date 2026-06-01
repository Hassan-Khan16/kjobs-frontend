import type { ListMeta, PaginatedResult } from "@/types/pagination";

export type KjobsPagination = {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
  has_more?: boolean;
};

export function mapPagination(
  pagination: KjobsPagination,
): ListMeta {
  return {
    page: pagination.page,
    limit: pagination.per_page,
    total: pagination.total,
    totalPages: pagination.last_page,
  };
}

export function emptyPaginated<T>(page = 1, limit = 10): PaginatedResult<T> {
  return {
    items: [],
    meta: { page, limit, total: 0, totalPages: 0 },
  };
}
