// types/api.ts
export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  error: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
