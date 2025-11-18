import { useState } from "react";
import { getMemberInfo } from "../apis/member";
import { parseNumber } from "../utils/number";
import { getErrorMessage } from "../utils/error";
import type { MemberDisplayInfo } from "../type/member";
import { ERROR_MESSAGES } from "../constants/messages";

export const useMemberList = () => {
  const [memberId, setMemberId] = useState("");
  const [searchedMember, setSearchedMember] =
    useState<MemberDisplayInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeMemberId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
    setError(null);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!memberId.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const memberIdNum = parseNumber(memberId);
      if (memberIdNum === null) {
        setError(ERROR_MESSAGES.INVALID_MEMBER_ID);
        setIsLoading(false);
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
      setError(getErrorMessage(error, ERROR_MESSAGES.SEARCH_FAILED));
      setSearchedMember(null);
    } finally {
      setIsLoading(false);
    }
  };

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
