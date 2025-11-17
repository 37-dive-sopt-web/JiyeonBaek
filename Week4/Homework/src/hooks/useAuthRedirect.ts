import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/storage";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/mypage", { replace: true });
    }
  }, [navigate]);
};
