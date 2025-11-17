import type { FormEvent } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import type { Step1Props } from "../../type/auth";
import { authForm } from "../../pages/AuthPage.css";

const Step1 = ({
  id,
  onChangeId,
  onNext,
  isValid,
  errorMessage,
}: Step1Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext?.();
  };

  return (
    <form onSubmit={handleSubmit} className={authForm}>
      <Input
        type="text"
        label="아이디"
        placeholder="영문, 숫자 포함 6자 이상 입력해주세요"
        name="id"
        value={id}
        onChange={onChangeId}
        errorMessage={errorMessage}
      />
      <Button type="submit" disabled={!isValid}>
        다음
      </Button>
    </form>
  );
};

export default Step1;
