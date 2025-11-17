import type { MemberListProps } from "../../type/member";
import Button from "../common/Button";
import Input from "../common/Input";
import {
  memberListContainer,
  memberListForm,
  memberListInfo,
  memberListInfoContainer,
  memberListInfoLabel,
  memberListInfoValue,
  memberListTitle,
} from "./MemberList.css";
import { errorMessage } from "../../styles/message.css";

const MemberList = ({
  memberId,
  searchedMember,
  error,
  isLoading,
  isSearchButtonEnabled,
  handleChangeMemberId,
  handleSearch,
}: MemberListProps) => {
  return (
    <div className={memberListContainer}>
      <h2 className={memberListTitle}>회원 조회</h2>
      <form onSubmit={handleSearch} className={memberListForm}>
        <Input
          type="number"
          label="회원 ID"
          placeholder="회원 ID를 입력하세요"
          name="memberId"
          value={memberId}
          onChange={handleChangeMemberId}
        />
        <Button type="submit" disabled={!isSearchButtonEnabled || isLoading}>
          {isLoading ? "조회 중..." : "조회"}
        </Button>
      </form>
      {error && <p className={errorMessage}>{error}</p>}
      {searchedMember && (
        <div className={memberListInfoContainer}>
          <div className={memberListInfo}>
            <p className={memberListInfoLabel}>이름</p>
            <p className={memberListInfoValue}>{searchedMember.userName}</p>
          </div>
          <div className={memberListInfo}>
            <p className={memberListInfoLabel}>아이디</p>
            <p className={memberListInfoValue}>{searchedMember.userId}</p>
          </div>
          <div className={memberListInfo}>
            <p className={memberListInfoLabel}>이메일</p>
            <p className={memberListInfoValue}>{searchedMember.userEmail}</p>
          </div>
          <div className={memberListInfo}>
            <p className={memberListInfoLabel}>나이</p>
            <p className={memberListInfoValue}>{searchedMember.userAge}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberList;
