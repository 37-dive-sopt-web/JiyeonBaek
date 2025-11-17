import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMemberInfo, deleteMember } from "../apis/member";
import { removeUserId } from "../utils/storage";
import { getErrorMessage } from "../utils/error";
import { useRequireAuth } from "../utils/navigation";
import type { TabType } from "../type/components";
import type { MemberInfo } from "../type/member";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  CONFIRM_MESSAGES,
} from "../constants/messages";

export const useMyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requireAuth } = useRequireAuth();

  const getActiveTabFromPath = (path: string): TabType => {
    if (path.includes("/members")) return "memberList";
    return "myInfo";
  };

  const [activeTab, setActiveTab] = useState<TabType>(() =>
    getActiveTabFromPath(location.pathname)
  );
  const [userInfo, setUserInfo] = useState<MemberInfo | null>(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);

  useEffect(() => {
    const tab = getActiveTabFromPath(location.pathname);
    setActiveTab(tab);
  }, [location.pathname]);

  const handleMyInfo = useCallback(() => {
    navigate("/mypage/myinfo");
  }, [navigate]);

  const handleMemberSearch = useCallback(() => {
    navigate("/mypage/members");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    removeUserId();
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userIdNum = requireAuth();
      if (userIdNum === null) {
        setIsLoadingUserInfo(false);
        return;
      }

      try {
        const response = await getMemberInfo(userIdNum);
        setUserInfo(response);
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoadingUserInfo(false);
      }
    };

    fetchUserInfo();
  }, [navigate, requireAuth]);

  const handleWithdrawal = useCallback(async () => {
    const userIdNum = requireAuth();
    if (userIdNum === null) return;

    if (!window.confirm(CONFIRM_MESSAGES.WITHDRAWAL)) {
      return;
    }

    try {
      await deleteMember(userIdNum);
      removeUserId();
      alert(SUCCESS_MESSAGES.WITHDRAWAL);
      navigate("/login");
    } catch (error: unknown) {
      alert(getErrorMessage(error, ERROR_MESSAGES.WITHDRAWAL_FAILED));
    }
  }, [requireAuth, navigate]);

  const refreshUserInfo = useCallback(async () => {
    const userIdNum = requireAuth();
    if (userIdNum === null) return;

    try {
      const response = await getMemberInfo(userIdNum);
      setUserInfo(response);
    } catch (error) {
      navigate("/login");
    }
  }, [requireAuth, navigate]);

  const myInfoProps = useMemo(() => {
    if (!userInfo) return null;
    return {
      id: String(userInfo.id),
      username: userInfo.username,
      name: userInfo.name,
      email: userInfo.email,
      age: String(userInfo.age),
    };
  }, [userInfo]);

  return {
    activeTab,
    userInfo,
    isLoadingUserInfo,
    handleMyInfo,
    handleMemberSearch,
    handleLogout,
    handleWithdrawal,
    refreshUserInfo,
    myInfoProps,
  };
};
