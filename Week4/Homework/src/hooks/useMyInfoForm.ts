import { useState, useEffect } from "react";
import type { MyInfoFormState, UseMyInfoFormProps } from "../type/myInfo";

export const useMyInfoForm = ({
  userName,
  userEmail,
  userAge,
}: UseMyInfoFormProps) => {
  const [form, setForm] = useState<MyInfoFormState>({
    name: userName,
    email: userEmail,
    age: userAge,
  });

  const initialForm: MyInfoFormState = {
    name: userName,
    email: userEmail,
    age: userAge,
  };

  useEffect(() => {
    setForm({
      name: userName,
      email: userEmail,
      age: userAge,
    });
  }, [userName, userEmail, userAge]);

  const handleChange =
    (field: keyof MyInfoFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("수정", form);
    // TODO: API 호출
  };

  // 빈 필드 체크
  const hasEmptyField =
    form.name.trim().length === 0 ||
    form.email.trim().length === 0 ||
    form.age.trim().length === 0;

  // 초기값과 비교
  const hasChanged =
    form.name !== initialForm.name ||
    form.email !== initialForm.email ||
    form.age !== initialForm.age;

  const isUpdateButtonEnabled = !hasEmptyField && hasChanged;

  return {
    form,
    handleChange,
    handleUpdate,
    isUpdateButtonEnabled,
  };
};
