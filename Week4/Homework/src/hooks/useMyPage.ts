import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getMemberInfo, deleteMember } from "../apis/member";
import { removeUserId } from "../utils/storage";
import { getErrorMessage } from "../utils/error";
import { useRequireAuth } from "../utils/navigation";
import type { TabType } from "../type/components";
import type { MemberInfo } from "../type/member";

export const useMyPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("myInfo");
  const [userInfo, setUserInfo] = useState<MemberInfo | null>(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const navigate = useNavigate();
  const { requireAuth } = useRequireAuth();

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleMyInfo = useCallback(() => {
    setActiveTab("myInfo");
  }, []);

  const handleMemberSearch = useCallback(() => {
    setActiveTab("memberList");
  }, []);

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

    if (!window.confirm("정말 회원탈퇴를 하시겠습니까?")) {
      return;
    }

    try {
      await deleteMember(userIdNum);
      removeUserId();
      navigate("/login");
    } catch (error: unknown) {
      alert(getErrorMessage(error, "회원탈퇴에 실패했습니다."));
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
    handleTabChange,
    handleMyInfo,
    handleMemberSearch,
    handleLogout,
    handleWithdrawal,
    refreshUserInfo,
    myInfoProps,
  };
};
