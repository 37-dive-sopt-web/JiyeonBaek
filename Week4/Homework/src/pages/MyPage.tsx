import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/main/Header";
import MemberList from "../components/main/MemberList";
import MyInfo from "../components/main/MyInfo";
import { useMemberList } from "../hooks/useMemberList";
import type { TabType } from "../type/header";

export const MyPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("myInfo");
  const navigate = useNavigate();

  const {
    memberId,
    searchedMember,
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
    // TODO: 로그아웃 API 호출
    console.log("로그아웃");
    navigate("/login");
  };

  const handleWithdrawal = () => {
    // TODO: 회원탈퇴 API 호출
    console.log("회원탈퇴");
    navigate("/login");
  };

  return (
    <main>
      <Header
        userName="백지연"
        activeTab={activeTab}
        handleMyInfo={handleMyInfo}
        handleMemberSearch={handleMemberSearch}
        handleLogout={handleLogout}
        handleWithdrawal={handleWithdrawal}
      />
      {activeTab === "myInfo" && (
        <MyInfo
          userId="1234567890"
          userName="백지연"
          userEmail="test@test.com"
          userAge="20"
        />
      )}
      {activeTab === "memberList" && (
        <MemberList
          memberId={memberId}
          searchedMember={searchedMember}
          isSearchButtonEnabled={isSearchButtonEnabled}
          handleChangeMemberId={handleChangeMemberId}
          handleSearch={handleSearch}
        />
      )}
    </main>
  );
};

export default MyPage;
