import { useState } from "react";
import {
  headerContainer,
  headerNav,
  headerSubtitle,
  headerTitle,
  navBtn,
  navBtnActive,
  menuToggle,
  headerRightSection,
} from "./Header.css";
import MenuIcon from "../../../assets/icons/menu.svg?react";
import type { HeaderProps } from "../../../type/components";

const Header = ({
  userName,
  activeTab,
  handleMyInfo,
  handleMemberSearch,
  handleLogout,
  handleWithdrawal,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClick = (handler: () => void) => {
    return () => {
      setIsMenuOpen(false);
      handler();
    };
  };

  return (
    <header className={headerContainer}>
      <div>
        <h1 className={headerTitle}>마이페이지</h1>
        <p className={headerSubtitle}>안녕하세요, {userName}님</p>
      </div>
      <div className={headerRightSection}>
        <nav>
          <ul id="header-nav" className={headerNav} data-open={isMenuOpen}>
            <li>
              <button
                className={`${navBtn} ${
                  activeTab === "myInfo" ? navBtnActive : ""
                }`}
                type="button"
                onClick={handleMenuClick(handleMyInfo)}
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
                onClick={handleMenuClick(handleMemberSearch)}
                aria-label="회원 조회"
              >
                회원 조회
              </button>
            </li>
            <li>
              <button
                className={navBtn}
                type="button"
                onClick={handleMenuClick(handleLogout)}
                aria-label="로그아웃"
              >
                로그아웃
              </button>
            </li>
            <li>
              <button
                className={navBtn}
                type="button"
                onClick={handleMenuClick(handleWithdrawal)}
                aria-label="회원탈퇴"
              >
                회원탈퇴
              </button>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className={menuToggle}
          onClick={handleToggleMenu}
          aria-label="메뉴"
          aria-expanded={isMenuOpen}
          aria-controls="header-nav"
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
