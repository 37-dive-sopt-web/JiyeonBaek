import Button from "../common/Button";
import Input from "../common/Input";
import { useMyInfoForm } from "../../hooks/useMyInfoForm";
import {
  myIdInfo,
  myIdInfoLabel,
  myIdInfoValue,
  myInfoContainer,
  myInfoForm,
  myInfoTitle,
} from "./MyInfo.css";
import type { MyInfoProps } from "../../type/myInfo";

const MyInfo = ({ userId, userName, userEmail, userAge }: MyInfoProps) => {
  const { form, handleChange, handleUpdate, isUpdateButtonEnabled } =
    useMyInfoForm({
      userName,
      userEmail,
      userAge,
    });

  return (
    <div className={myInfoContainer}>
      <h2 className={myInfoTitle}>내 정보</h2>
      <form onSubmit={handleUpdate} className={myInfoForm}>
        <div className={myIdInfo}>
          <p className={myIdInfoLabel}>아이디</p>
          <p className={myIdInfoValue}>{userId}</p>
        </div>
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
        <Button type="submit" disabled={!isUpdateButtonEnabled}>
          저장
        </Button>
      </form>
    </div>
  );
};

export default MyInfo;
