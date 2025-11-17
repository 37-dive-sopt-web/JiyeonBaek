import type { MemberInfo, MemberFormState } from "./member";

// 내 정보 컴포넌트 props
export type MyInfoProps = Omit<MemberInfo, "id" | "age" | "status"> & {
  id: string;
  age: string;
  onUpdateSuccess?: () => void;
};

// 내 정보 폼 상태 타입
export type MyInfoFormState = MemberFormState;

// 내 정보 폼 hook props
export type UseMyInfoFormProps = Pick<
  MyInfoProps,
  "id" | "name" | "email" | "age"
> & {
  onUpdateSuccess?: () => void;
};
