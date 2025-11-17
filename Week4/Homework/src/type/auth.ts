import type { ChangeEvent } from "react";
import type { ApiSuccessResponse } from "./common";

// 로그인/회원가입 요청/응답 타입
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponseData {
  userId: number;
  message: string;
}

export type LoginResponse = ApiSuccessResponse<LoginResponseData>;

export interface SignupRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export interface SignupResponseData {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: "ACTIVE" | "INACTIVE";
}

export type SignupResponse = ApiSuccessResponse<SignupResponseData>;

// 회원가입 폼 관련 타입
export interface SignupFormState {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  age: string;
}

export interface Step1Props {
  id: string;
  onChangeId: (e: ChangeEvent<HTMLInputElement>) => void;
  onNext?: () => void;
  isValid: boolean;
}

export interface Step2Props {
  password: string;
  passwordConfirm: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: ChangeEvent<HTMLInputElement>) => void;
  onNext?: () => void;
  isValid: boolean;
}

export interface Step3Props {
  name: string;
  email: string;
  age: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAge: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  isValid: boolean;
  emailErrorMessage?: string;
  isLoading?: boolean;
}
