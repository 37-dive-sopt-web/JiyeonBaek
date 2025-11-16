import { useState } from "react";
import { isValidId } from "../utils/validation";

export const useLoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isLoginValid = isValidId(id) && password.length > 0;

  return {
    id,
    password,
    isLoginValid,
    handleChangeId,
    handleChangePassword,
  };
};
