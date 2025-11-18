import type { MemberListProps } from "../../../type/member";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import {
  memberListContainer,
  memberListForm,
  memberListInfoContainer,
  memberListInfoItem,
  memberListInfoLabel,
  memberListInfoValue,
  memberListTitle,
} from "./MemberList.css";
import { errorMessage } from "../../../styles/message.css";
import { LOADING_MESSAGES } from "../../../constants/messages";

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
    <section className={memberListContainer}>
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
        <div>
          <Button type="submit" disabled={!isSearchButtonEnabled || isLoading}>
            {isLoading ? LOADING_MESSAGES.SEARCH : "조회"}
          </Button>
          {error && (
            <p className={errorMessage} role="alert" aria-live="assertive">
              {error}
            </p>
          )}
        </div>
      </form>

      {searchedMember && (
        <dl className={memberListInfoContainer}>
          <div className={memberListInfoItem}>
            <dt className={memberListInfoLabel}>이름</dt>
            <dd className={memberListInfoValue}>{searchedMember.userName}</dd>
          </div>
          <div className={memberListInfoItem}>
            <dt className={memberListInfoLabel}>아이디</dt>
            <dd className={memberListInfoValue}>{searchedMember.userId}</dd>
          </div>
          <div className={memberListInfoItem}>
            <dt className={memberListInfoLabel}>이메일</dt>
            <dd className={memberListInfoValue}>{searchedMember.userEmail}</dd>
          </div>
          <div className={memberListInfoItem}>
            <dt className={memberListInfoLabel}>나이</dt>
            <dd className={memberListInfoValue}>{searchedMember.userAge}</dd>
          </div>
        </dl>
      )}
    </section>
  );
};

export default MemberList;
