import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { link, title } from "../styles/typography.css";
import { authButtonContainer, authForm, authContainer } from "./AuthPage.css";
import { useLoginForm } from "../hooks/useLoginForm";
import { isLoggedIn } from "../utils/storage";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    id,
    password,
    isLoginValid,
    error,
    isLoading,
    handleChangeId,
    handleChangePassword,
    handleLogin,
  } = useLoginForm();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/mypage", { replace: true });
    }
  }, [navigate]);

  return (
    <main className={authContainer}>
      <h1 className={title}>로그인</h1>
      <form className={authForm} onSubmit={handleLogin}>
        <Input
          type="text"
          label="아이디"
          placeholder="아이디를 입력해주세요"
          name="id"
          value={id}
          onChange={handleChangeId}
        />
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
        {error && <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>}
        <div className={authButtonContainer}>
          <Button type="submit" disabled={!isLoginValid || isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
          <Link className={link} to="/signup">
            회원가입
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
