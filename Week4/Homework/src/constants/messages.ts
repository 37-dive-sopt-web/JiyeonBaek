export const LOADING_MESSAGES = {
  LOGIN: "로그인 중...",
  SIGNUP: "회원가입 중...",
  SAVE: "저장 중...",
  SEARCH: "조회 중...",
  LOADING: "로딩 중...",
} as const;

export const SUCCESS_MESSAGES = {
  SIGNUP: (name: string) => `${name}님, 회원가입에 성공했습니다.`,
  UPDATE: "정보가 성공적으로 수정되었습니다.",
  WITHDRAWAL: "회원탈퇴가 완료되었습니다.",
} as const;

export const ERROR_MESSAGES = {
  INVALID_USER_ID: "올바른 사용자 ID가 아닙니다.",
  INVALID_MEMBER_ID: "올바른 회원 ID를 입력해주세요.",
  INVALID_EMAIL: "올바른 이메일 형식이 아닙니다.",
  LOGIN_FAILED: "로그인에 실패했습니다.",
  SIGNUP_FAILED: "회원가입에 실패했습니다.",
  UPDATE_FAILED: "정보 수정에 실패했습니다.",
  SEARCH_FAILED: "회원 정보 조회에 실패했습니다.",
  WITHDRAWAL_FAILED: "회원탈퇴에 실패했습니다.",
} as const;

export const CONFIRM_MESSAGES = {
  WITHDRAWAL: "정말 회원탈퇴를 하시겠습니까?",
} as const;

export const DELAY_MS = {
  UPDATE_SUCCESS: 1000,
} as const;
