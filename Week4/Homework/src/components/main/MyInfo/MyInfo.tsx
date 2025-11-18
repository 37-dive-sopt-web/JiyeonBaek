import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { useMyInfoForm } from "../../../hooks/useMyInfoForm";
import {
  myIdInfo,
  myIdInfoLabel,
  myIdInfoValue,
  myInfoContainer,
  myInfoForm,
  myInfoTitle,
} from "./MyInfo.css";
import { successMessage } from "../../../styles/message.css";
import type { MyInfoProps } from "../../../type/myInfo";
import {
  LOADING_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../../constants/messages";

const MyInfo = ({
  id,
  username,
  name,
  email,
  age,
  onUpdateSuccess,
}: MyInfoProps) => {
  const {
    form,
    isLoading,
    isSuccess,
    handleChange,
    handleUpdate,
    isUpdateButtonEnabled,
  } = useMyInfoForm({
    id,
    name,
    email,
    age,
    onUpdateSuccess,
  });

  return (
    <section className={myInfoContainer}>
      <h2 className={myInfoTitle}>내 정보</h2>
      <form onSubmit={handleUpdate} className={myInfoForm}>
        <dl className={myIdInfo}>
          <dt className={myIdInfoLabel}>아이디</dt>
          <dd className={myIdInfoValue}>{username}</dd>
        </dl>
        <Input
          type="text"
          value={form.name}
          label="이름"
          placeholder="이름을 입력하세요"
          name="name"
          onChange={handleChange("name")}
        />
        <Input
          type="email"
          value={form.email}
          label="이메일"
          placeholder="이메일을 입력하세요"
          name="email"
          onChange={handleChange("email")}
        />
        <Input
          type="text"
          value={form.age}
          label="나이"
          placeholder="나이를 입력하세요"
          name="age"
          onChange={handleChange("age")}
        />
        <div>
          <Button type="submit" disabled={!isUpdateButtonEnabled || isLoading}>
            {isLoading ? LOADING_MESSAGES.SAVE : "저장"}
          </Button>
          {isSuccess && (
            <p className={successMessage} role="status" aria-live="polite">
              {SUCCESS_MESSAGES.UPDATE}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default MyInfo;
