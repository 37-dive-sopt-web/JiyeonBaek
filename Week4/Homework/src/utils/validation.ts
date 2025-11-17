export const isValidId = (id: string) => {
  // 영어(대소문자 무관) + 숫자 포함, 각 1개 이상, 전체 6자 이상, 50자 이하
  if (id.length > 50) return false;
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return pattern.test(id);
};

export const getIdErrorMessage = (id: string): string | undefined => {
  if (id.length === 0) return undefined;
  if (id.length > 50) return "아이디는 50자 이하여야 합니다.";
  if (!isValidId(id)) return "영문, 숫자 포함 6자 이상 입력해주세요.";
  return undefined;
};

export const isValidEmail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const isPasswordMismatch = (
  password: string,
  passwordConfirm: string
) => {
  return (
    password.length > 0 &&
    passwordConfirm.length > 0 &&
    password !== passwordConfirm
  );
};

export const isValidPassword = (password: string): boolean => {
  if (password.length < 8 || password.length > 64) return false;

  if (/\s/.test(password)) return false;

  if (!/[A-Z]/.test(password)) return false;

  if (!/[a-z]/.test(password)) return false;

  if (!/\d/.test(password)) return false;

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;

  return true;
};

export const getPasswordErrorMessage = (
  password: string
): string | undefined => {
  if (password.length === 0) return undefined;

  if (password.length < 8 || password.length > 64) {
    return "비밀번호는 8~64자여야 합니다.";
  }

  if (/\s/.test(password)) {
    return "비밀번호에 공백을 포함할 수 없습니다.";
  }

  if (!/[A-Z]/.test(password)) {
    return "비밀번호에 대문자를 1자 이상 포함해야 합니다.";
  }

  if (!/[a-z]/.test(password)) {
    return "비밀번호에 소문자를 1자 이상 포함해야 합니다.";
  }

  if (!/\d/.test(password)) {
    return "비밀번호에 숫자를 1자 이상 포함해야 합니다.";
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return "비밀번호에 특수문자를 1자 이상 포함해야 합니다.";
  }

  return undefined;
};
