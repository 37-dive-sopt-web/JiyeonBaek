export interface MemberListProps {
  memberId: string;
  searchedMember: {
    userName: string;
    userId: string;
    userEmail: string;
    userAge: string;
  } | null;
  isSearchButtonEnabled: boolean;
  handleChangeMemberId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}
