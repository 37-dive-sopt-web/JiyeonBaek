import type { ApiSuccessResponse } from "./common";

// 회원 정보 타입
export interface MemberInfo {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: "ACTIVE" | "INACTIVE";
}

// 회원 정보 수정 요청 타입
export type UpdateMemberRequest = Partial<
  Pick<MemberInfo, "name" | "email" | "age">
>;

// 회원 정보 수정 폼 상태 타입
export type MemberFormState = Pick<MemberInfo, "name" | "email"> & {
  age: string;
};

// 회원 조회 결과 표시용 타입
export type MemberDisplayInfo = {
  userName: string;
  userId: string;
  userEmail: string;
  userAge: string;
};

// 회원 정보 수정/조회/삭제 응답 타입
export type UpdateMemberResponse = ApiSuccessResponse<MemberInfo>;
export type MemberInfoResponse = ApiSuccessResponse<MemberInfo>;
export type DeleteMemberResponse = ApiSuccessResponse<Record<string, never>>;

// 회원 조회 컴포넌트 props
export interface MemberListProps {
  memberId: string;
  searchedMember: MemberDisplayInfo | null;
  error: string | null;
  isLoading: boolean;
  isSearchButtonEnabled: boolean;
  handleChangeMemberId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}
