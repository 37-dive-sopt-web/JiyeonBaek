import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_SIGNUP_FORM } from "../constants/signup";
import type { SignupFormState } from "../type/auth";
import { isValidId, isValidEmail } from "../utils/validation";
import { signup } from "../apis/auth";
import { getErrorMessage } from "../utils/error";

export const useSignupForm = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<SignupFormState>(INITIAL_SIGNUP_FORM);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 뒤로 가기
  const handleBack = () => {
    if (step === 1) {
      navigate("/login");
      return;
    }

    setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev));
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  };

  // 정보 변경
  const handleChange =
    (field: keyof SignupFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (field === "age") {
        value = value.replace(/\D/g, "");
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
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

  // 이메일 유효성 검사 메시지
  const emailErrorMessage =
    form.email.length > 0 && !isValidEmail(form.email)
      ? "올바른 이메일 형식이 아닙니다."
      : undefined;

  // 회원가입
  const handleSignup = async () => {
    if (!isStep3Valid) return;

    setIsLoading(true);
    setError(null);

    try {
      await signup({
        username: form.id,
        password: form.password,
        name: form.name,
        email: form.email,
        age: Number(form.age),
      });

      alert("회원가입에 성공했습니다.");
      navigate("/login");
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "회원가입에 실패했습니다.");
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    form,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    emailErrorMessage,
    error,
    isLoading,
    handleBack,
    handleNextStep,
    handleChange,
    handleSignup,
  };
};
