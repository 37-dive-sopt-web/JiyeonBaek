import Header from "../components/main/Header";
import MemberList from "../components/main/MemberList";
import MyInfo from "../components/main/MyInfo";
import { useMemberList } from "../hooks/useMemberList";
import { useMyPage } from "../hooks/useMyPage";
import { LOADING_MESSAGES } from "../constants/messages";

export const MyPage = () => {
  const {
    activeTab,
    userInfo,
    isLoadingUserInfo,
    handleMyInfo,
    handleMemberSearch,
    handleLogout,
    handleWithdrawal,
    refreshUserInfo,
    myInfoProps,
  } = useMyPage();

  const {
    memberId,
    searchedMember,
    error: memberListError,
    isLoading: memberListLoading,
    handleChangeMemberId,
    handleSearch,
    isSearchButtonEnabled,
  } = useMemberList();

  if (isLoadingUserInfo) {
    return (
      <main>
        <div role="status" aria-live="polite" aria-busy="true">
          {LOADING_MESSAGES.LOADING}
        </div>
      </main>
    );
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
      {activeTab === "myInfo" && myInfoProps && (
        <MyInfo
          id={myInfoProps.id}
          username={myInfoProps.username}
          name={myInfoProps.name}
          email={myInfoProps.email}
          age={myInfoProps.age}
          onUpdateSuccess={refreshUserInfo}
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
