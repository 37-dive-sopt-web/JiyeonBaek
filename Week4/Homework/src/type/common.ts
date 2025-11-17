// 공통 에러 응답 타입
export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  data?: {
    code: string;
    message: string;
    errors?: Array<{
      field: string;
      value: string;
      reason: string;
    }>;
  };
}

// 공통 성공 응답 타입
export interface ApiSuccessResponse<T> {
  success: true;
  code: string;
  message: string;
  data: T;
}
