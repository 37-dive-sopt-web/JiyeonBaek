export const isValidId = (id: string) => {
  // 영어(대소문자 무관) + 숫자 포함, 각 1개 이상, 전체 6자 이상
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return pattern.test(id);
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
