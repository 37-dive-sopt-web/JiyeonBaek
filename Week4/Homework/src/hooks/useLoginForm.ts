import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidId } from "../utils/validation";
import { login } from "../apis/auth";
import { setUserId } from "../utils/storage";
import { getErrorMessage } from "../utils/error";
import { ERROR_MESSAGES } from "../constants/messages";

export const useLoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    setError(null);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoginValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await login({
        username: id,
        password,
      });

      if (response.data.userId) {
        setUserId(response.data.userId);
      }

      navigate("/mypage");
    } catch (error: unknown) {
      setError(getErrorMessage(error, ERROR_MESSAGES.LOGIN_FAILED));
    } finally {
      setIsLoading(false);
    }
  };

  const isLoginValid = isValidId(id) && password.length > 0;

  return {
    id,
    password,
    isLoginValid,
    error,
    isLoading,
    handleChangeId,
    handleChangePassword,
    handleLogin,
  };
};
