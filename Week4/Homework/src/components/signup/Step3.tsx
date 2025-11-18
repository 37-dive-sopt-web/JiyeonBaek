import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import type { Step3Props } from "../../type/auth";
import { authForm } from "../../pages/Auth/auth-page.css";
import { createStepSubmitHandler } from "../../utils/step";
import { LOADING_MESSAGES } from "../../constants/messages";

const Step3 = ({
  name,
  email,
  age,
  onChangeName,
  onChangeEmail,
  onChangeAge,
  onSubmit,
  isValid,
  emailErrorMessage,
  isLoading = false,
}: Step3Props) => {
  const handleSubmit = createStepSubmitHandler(onSubmit);

  return (
    <form onSubmit={handleSubmit} className={authForm}>
      <Input
        type="text"
        label="이름"
        placeholder="이름을 입력해주세요"
        name="name"
        value={name}
        onChange={onChangeName}
      />
      <Input
        type="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        name="email"
        value={email}
        onChange={onChangeEmail}
        errorMessage={emailErrorMessage}
      />
      <Input
        type="number"
        label="나이"
        placeholder="나이를 입력해주세요"
        name="age"
        value={age}
        onChange={onChangeAge}
      />
      <Button type="submit" disabled={!isValid || isLoading}>
        {isLoading ? LOADING_MESSAGES.SIGNUP : "회원가입"}
      </Button>
    </form>
  );
};

export default Step3;
