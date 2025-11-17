import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/main/Header";
import MemberList from "../components/main/MemberList";
import MyInfo from "../components/main/MyInfo";
import { useMemberList } from "../hooks/useMemberList";
import { getMemberInfo, deleteMember } from "../apis/member";
import { getUserId, removeUserId } from "../utils/storage";
import { parseNumber } from "../utils/number";
import { getErrorMessage } from "../utils/error";
import type { TabType } from "../type/components";
import type { MemberInfo } from "../type/member";

export const MyPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("myInfo");
  const [userInfo, setUserInfo] = useState<MemberInfo | null>(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const navigate = useNavigate();

  const {
    memberId,
    searchedMember,
    error: memberListError,
    isLoading: memberListLoading,
    handleChangeMemberId,
    handleSearch,
    isSearchButtonEnabled,
  } = useMemberList();

  const handleMyInfo = () => {
    setActiveTab("myInfo");
  };

  const handleMemberSearch = () => {
    setActiveTab("memberList");
  };

  const handleLogout = () => {
    removeUserId();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = getUserId();
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const userIdNum = parseNumber(userId);
        if (userIdNum !== null) {
          const response = await getMemberInfo(userIdNum);
          setUserInfo(response);
        }
      } catch (error) {
        console.error("사용자 정보 조회 실패", error);
        navigate("/login");
      } finally {
        setIsLoadingUserInfo(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleWithdrawal = async () => {
    const userId = getUserId();
    if (!userId) {
      navigate("/login");
      return;
    }

    if (!window.confirm("정말 회원탈퇴를 하시겠습니까?")) {
      return;
    }

    try {
      const userIdNum = parseNumber(userId);
      if (userIdNum !== null) {
        await deleteMember(userIdNum);
        removeUserId();
        navigate("/login");
      }
    } catch (error: unknown) {
      alert(getErrorMessage(error, "회원탈퇴에 실패했습니다."));
    }
  };

  if (isLoadingUserInfo) {
    return <div>로딩 중...</div>;
  }

  if (!userInfo) {
    return null;
  }

  return (
    <main>
      <Header
        userName={userInfo.name}
        activeTab={activeTab}
        handleMyInfo={handleMyInfo}
        handleMemberSearch={handleMemberSearch}
        handleLogout={handleLogout}
        handleWithdrawal={handleWithdrawal}
      />
      {activeTab === "myInfo" && (
        <MyInfo
          id={String(userInfo.id)}
          username={userInfo.username}
          name={userInfo.name}
          email={userInfo.email}
          age={String(userInfo.age)}
        />
      )}
      {activeTab === "memberList" && (
        <MemberList
          memberId={memberId}
          searchedMember={searchedMember}
          error={memberListError}
          isLoading={memberListLoading}
          isSearchButtonEnabled={isSearchButtonEnabled}
          handleChangeMemberId={handleChangeMemberId}
          handleSearch={handleSearch}
        />
      )}
    </main>
  );
};

export default MyPage;
