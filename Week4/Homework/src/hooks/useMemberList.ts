import { useState } from "react";

export const useMemberList = () => {
  const [memberId, setMemberId] = useState("");
  const [searchedMember, setSearchedMember] = useState<{
    userName: string;
    userId: string;
    userEmail: string;
    userAge: string;
  } | null>(null);

  const handleChangeMemberId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: API 호출로 회원 정보 조회
    // 임시로 더미 데이터
    setSearchedMember({
      userName: "백지연",
      userId: memberId,
      userEmail: "test@test.com",
      userAge: "20",
    });
  };

  const isSearchButtonEnabled = memberId.trim().length > 0;

  return {
    memberId,
    searchedMember,
    handleChangeMemberId,
    handleSearch,
    isSearchButtonEnabled,
  };
};
