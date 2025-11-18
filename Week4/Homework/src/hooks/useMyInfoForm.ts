import { useState, useEffect, useMemo } from "react";
import type { MyInfoFormState, UseMyInfoFormProps } from "../type/myInfo";
import { updateMemberInfo } from "../apis/member";
import { parseNumber } from "../utils/number";
import { getErrorMessage } from "../utils/error";
import { sanitizeAgeInput } from "../utils/form";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  DELAY_MS,
} from "../constants/messages";

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

  const handleChange =
    (field: keyof MyInfoFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (field === "age") {
        value = sanitizeAgeInput(value);
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
      setIsSuccess(false);
    };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUpdateButtonEnabled) return;

    setIsLoading(true);
    setIsSuccess(false);

    try {
      const userIdNum = parseNumber(id);
      if (userIdNum === null) {
        alert(ERROR_MESSAGES.INVALID_USER_ID);
        setIsLoading(false);
        return;
      }

      await updateMemberInfo(userIdNum, {
        name: form.name,
        email: form.email,
        age: form.age ? Number(form.age) : undefined,
      });

      setIsSuccess(true);
      alert(SUCCESS_MESSAGES.UPDATE);
      if (onUpdateSuccess) {
        setTimeout(() => {
          onUpdateSuccess();
        }, DELAY_MS.UPDATE_SUCCESS);
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, ERROR_MESSAGES.UPDATE_FAILED);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const hasEmptyField =
    form.name.trim().length === 0 ||
    form.email.trim().length === 0 ||
    form.age.trim().length === 0;

  const hasChanged =
    form.name !== initialForm.name ||
    form.email !== initialForm.email ||
    form.age !== initialForm.age;

  const isUpdateButtonEnabled = !hasEmptyField && hasChanged;

  return {
    form,
    isLoading,
    isSuccess,
    handleChange,
    handleUpdate,
    isUpdateButtonEnabled,
  };
};
