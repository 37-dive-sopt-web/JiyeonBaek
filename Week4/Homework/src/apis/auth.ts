import { axiosInstance } from "./instance";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../type/auth";

// 로그인
export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    request
  );
  return response.data;
};

// 회원가입
export const signup = async (
  request: SignupRequest
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>("/users", request);
  return response.data;
};
