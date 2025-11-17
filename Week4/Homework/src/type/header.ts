export type TabType = "myInfo" | "memberList";

export interface HeaderProps {
  userName: string;
  activeTab: TabType;
  handleMyInfo: () => void;
  handleMemberSearch: () => void;
  handleLogout: () => void;
  handleWithdrawal: () => void;
}
