import { useState, useEffect, useMemo } from "react";
import type { MyInfoFormState, UseMyInfoFormProps } from "../type/myInfo";
import { updateMemberInfo } from "../apis/member";
import { parseNumber } from "../utils/number";
import { getErrorMessage } from "../utils/error";

export const useMyInfoForm = ({
  id,
  name,
  email,
  age,
  onUpdateSuccess,
}: UseMyInfoFormProps) => {
  const [form, setForm] = useState<MyInfoFormState>({
    name,
    email,
    age,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialForm = useMemo<MyInfoFormState>(
    () => ({
      name,
      email,
      age,
    }),
    [name, email, age]
  );

  useEffect(() => {
    setForm({
      name,
      email,
      age,
    });
    setIsSuccess(false);
  }, [name, email, age]);

  // 정보 변경
  const handleChange =
    (field: keyof MyInfoFormState) =>
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
      setIsSuccess(false);
    };

  // 정보 수정
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUpdateButtonEnabled) return;

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const userIdNum = parseNumber(id);
      if (userIdNum === null) {
        setError("올바른 사용자 ID가 아닙니다.");
        setIsLoading(false);
        return;
      }

      await updateMemberInfo(userIdNum, {
        name: form.name,
        email: form.email,
        age: form.age ? Number(form.age) : undefined,
      });

      setIsSuccess(true);
      alert("정보가 성공적으로 수정되었습니다.");
      if (onUpdateSuccess) {
        setTimeout(() => {
          onUpdateSuccess();
        }, 1000);
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "정보 수정에 실패했습니다.");
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 빈 필드 여부
  const hasEmptyField =
    form.name.trim().length === 0 ||
    form.email.trim().length === 0 ||
    form.age.trim().length === 0;

  // 변경 여부
  const hasChanged =
    form.name !== initialForm.name ||
    form.email !== initialForm.email ||
    form.age !== initialForm.age;

  // 수정 버튼 활성화 여부
  const isUpdateButtonEnabled = !hasEmptyField && hasChanged;

  return {
    form,
    error,
    isLoading,
    isSuccess,
    handleChange,
    handleUpdate,
    isUpdateButtonEnabled,
  };
};
