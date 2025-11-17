import {
  headerContainer,
  headerNav,
  headerSubtitle,
  headerTitle,
  navBtn,
  navBtnActive,
} from "./Header.css";
import type { HeaderProps } from "../../type/components";

const Header = ({
  userName,
  activeTab,
  handleMyInfo,
  handleMemberSearch,
  handleLogout,
  handleWithdrawal,
}: HeaderProps) => {
  return (
    <header className={headerContainer}>
      <div>
        <h1 className={headerTitle}>마이페이지</h1>
        <p className={headerSubtitle}>안녕하세요, {userName}님</p>
      </div>
      <nav>
        <ul className={headerNav}>
          <li>
            <button
              className={`${navBtn} ${
                activeTab === "myInfo" ? navBtnActive : ""
              }`}
              type="button"
              onClick={handleMyInfo}
              aria-label="내 정보"
            >
              내 정보
            </button>
          </li>
          <li>
            <button
              className={`${navBtn} ${
                activeTab === "memberList" ? navBtnActive : ""
              }`}
              type="button"
              onClick={handleMemberSearch}
              aria-label="회원 조회"
            >
              회원 조회
            </button>
          </li>
          <li>
            <button
              className={navBtn}
              type="button"
              onClick={handleLogout}
              aria-label="로그아웃"
            >
              로그아웃
            </button>
          </li>
          <li>
            <button
              className={navBtn}
              type="button"
              onClick={handleWithdrawal}
              aria-label="회원탈퇴"
            >
              회원탈퇴
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
