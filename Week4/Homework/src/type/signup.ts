import type { ChangeEvent } from "react";

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
}
