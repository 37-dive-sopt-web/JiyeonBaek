import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { link, title } from "../styles/typography.css";
import { authButtonContainer, authForm, authContainer, authLinkContainer } from "./AuthPage.css";
import { errorMessage } from "../styles/message.css";
import { useLoginForm } from "../hooks/useLoginForm";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { LOADING_MESSAGES } from "../constants/messages";

export const LoginPage = () => {
  useAuthRedirect();
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

        <div className={authButtonContainer}>
          {error && (
            <p className={errorMessage} role="alert" aria-live="assertive">
              {error}
            </p>
          )}
          <Button type="submit" disabled={!isLoginValid || isLoading}>
            {isLoading ? LOADING_MESSAGES.LOGIN : "로그인"}
          </Button>
          <div className={authLinkContainer}>
            <p>이미 회원이신가요?</p>
            <Link className={link} to="/signup">
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
