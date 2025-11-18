const USER_ID_KEY = "userId";

// userId 조회
export const getUserId = (): string | null => {
  try {
    return localStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.error("userId 조회 실패", error);
    return null;
  }
};

// userId 저장
export const setUserId = (userId: number | string): void => {
  try {
    localStorage.setItem(USER_ID_KEY, String(userId));
  } catch (error) {
    console.error("userId 저장 실패", error);
  }
};

// userId 삭제
export const removeUserId = (): void => {
  try {
    localStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error("userId 삭제 실패", error);
  }
};

// userId 조회
export const isLoggedIn = (): boolean => {
  return getUserId() !== null;
};
