import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { link, title } from "../styles/typography.css";
import {
  loginButtonContainer,
  loginForm,
  loginContainer,
} from "./LoginPage.css";

export const LoginPage = () => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인");
    // TODO: 로그인 로직 구현
  };

  return (
    <main className={loginContainer}>
      <h1 className={title}>로그인</h1>
      <form className={loginForm} onSubmit={handleLogin}>
        <Input type="text" label="아이디" placeholder="아이디를 입력해주세요" />
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
        />
        <div className={loginButtonContainer}>
          <Button type="submit">로그인</Button>
          <Link className={link} to="/signup">
            회원가입
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
