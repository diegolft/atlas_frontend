export interface ApiResponse<T = unknown> {
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  stack?: string;
}
