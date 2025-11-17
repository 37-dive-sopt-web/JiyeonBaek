import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/main/Header";
import MemberList from "../components/main/MemberList";
import MyInfo from "../components/main/MyInfo";
import { useMemberList } from "../hooks/useMemberList";
import { getMemberInfo, deleteMember } from "../apis/member";
import { removeUserId } from "../utils/storage";
import { getErrorMessage } from "../utils/error";
import { useRequireAuth } from "../utils/navigation";
import type { TabType } from "../type/components";
import type { MemberInfo } from "../type/member";

export const MyPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("myInfo");
  const [userInfo, setUserInfo] = useState<MemberInfo | null>(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const navigate = useNavigate();
  const { requireAuth } = useRequireAuth();

  const {
    memberId,
    searchedMember,
    error: memberListError,
    isLoading: memberListLoading,
    handleChangeMemberId,
    handleSearch,
    isSearchButtonEnabled,
  } = useMemberList();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    removeUserId();
    navigate("/login");
  };

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

  const handleWithdrawal = async () => {
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
        handleMyInfo={() => handleTabChange("myInfo")}
        handleMemberSearch={() => handleTabChange("memberList")}
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
