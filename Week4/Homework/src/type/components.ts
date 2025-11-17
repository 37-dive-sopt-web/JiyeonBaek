import type { ChangeEvent } from "react";

// Input 컴포넌트
export interface InputProps {
  type: "text" | "password" | "email" | "number";
  label: string;
  placeholder: string;
  errorMessage?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// Button 컴포넌트
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

// Header 컴포넌트
export type TabType = "myInfo" | "memberList";

export interface HeaderProps {
  userName: string;
  activeTab: TabType;
  handleMyInfo: () => void;
  handleMemberSearch: () => void;
  handleLogout: () => void;
  handleWithdrawal: () => void;
}
