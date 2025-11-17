import { useState } from "react";
import { getMemberInfo } from "../apis/member";
import { parseNumber } from "../utils/number";
import { getErrorMessage } from "../utils/error";
import type { MemberDisplayInfo } from "../type/member";

export const useMemberList = () => {
  const [memberId, setMemberId] = useState("");
  const [searchedMember, setSearchedMember] =
    useState<MemberDisplayInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 회원 ID 변경
  const handleChangeMemberId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
    setError(null);
  };

  // 회원 조회
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!memberId.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const memberIdNum = parseNumber(memberId);
      if (memberIdNum === null) {
        setError("올바른 회원 ID를 입력해주세요.");
        return;
      }

      const response = await getMemberInfo(memberIdNum);

      setSearchedMember({
        userName: response.name,
        userId: String(response.id),
        userEmail: response.email,
        userAge: String(response.age),
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error, "회원 정보 조회에 실패했습니다."));
      setSearchedMember(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 버튼 활성화 여부
  const isSearchButtonEnabled = memberId.trim().length > 0;

  return {
    memberId,
    searchedMember,
    error,
    isLoading,
    handleChangeMemberId,
    handleSearch,
    isSearchButtonEnabled,
  };
};
