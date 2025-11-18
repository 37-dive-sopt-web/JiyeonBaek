import type { ApiErrorResponse } from "../type/common";

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string
): string => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as { response: { data: ApiErrorResponse } };
    const errorData = axiosError.response.data;
    return errorData.message || defaultMessage;
  }
  return defaultMessage;
};
