import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "./storage";
import { parseNumber } from "./number";

export const useRequireAuth = () => {
  const navigate = useNavigate();

  const requireAuth = useCallback((): number | null => {
    const userId = getUserId();
    if (!userId) {
      navigate("/login");
      return null;
    }

    const userIdNum = parseNumber(userId);
    if (userIdNum === null) {
      navigate("/login");
      return null;
    }

    return userIdNum;
  }, [navigate]);

  return { requireAuth };
};
