import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import type { Step2Props } from "../../type/auth";
import { isPasswordMismatch } from "../../utils/validation";
import { authForm } from "../../pages/Auth/AuthPage.css";
import { createStepSubmitHandler } from "../../utils/step";

const Step2 = ({
  password,
  passwordConfirm,
  onChangePassword,
  onChangePasswordConfirm,
  onNext,
  isValid,
  passwordErrorMessage,
}: Step2Props) => {
  const handleSubmit = createStepSubmitHandler(onNext);

  const passwordMismatch = isPasswordMismatch(password, passwordConfirm);

  return (
    <form onSubmit={handleSubmit} className={authForm}>
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        name="password"
        value={password}
        onChange={onChangePassword}
        errorMessage={passwordErrorMessage}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 입력해주세요"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
        errorMessage={
          passwordMismatch ? "비밀번호가 일치하지 않습니다." : undefined
        }
      />
      <Button type="submit" disabled={!isValid}>
        다음
      </Button>
    </form>
  );
};

export default Step2;
