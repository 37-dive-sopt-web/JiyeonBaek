import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_SIGNUP_FORM } from "../constants/signup";
import type { SignupFormState } from "../type/signup";
import { isValidId, isValidEmail } from "../utils/validation";

export const useSignupForm = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<SignupFormState>(INITIAL_SIGNUP_FORM);
  const navigate = useNavigate();

  // 뒤로 가기
  const handleBack = () => {
    if (step === 1) {
      navigate("/login");
      return;
    }

    setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev));
  };

  const handleNextStep = () => {
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  };

  // 입력 값 변경
  const handleChange =
    (field: keyof SignupFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  // 유효성 검사
  const isStep1Valid = isValidId(form.id);

  const isStep2Valid =
    form.password.length > 0 &&
    form.passwordConfirm.length > 0 &&
    form.password === form.passwordConfirm;

  const isStep3Valid =
    form.name.trim().length > 0 &&
    isValidEmail(form.email) &&
    form.age.trim().length > 0 &&
    isStep2Valid;

  const emailErrorMessage =
    form.email.length > 0 && !isValidEmail(form.email)
      ? "올바른 이메일 형식이 아닙니다."
      : undefined;

  // 회원가입
  const handleSignup = () => {
    // TODO: 회원가입 API 호출
    console.log("회원가입 요청");
  };

  return {
    step,
    form,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    emailErrorMessage,
    handleBack,
    handleNextStep,
    handleChange,
    handleSignup,
  };
};
