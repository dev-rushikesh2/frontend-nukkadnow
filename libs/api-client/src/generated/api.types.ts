export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
  requestId: string;
}

export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  details?: Record<string, unknown>;
  requestId: string;
}
