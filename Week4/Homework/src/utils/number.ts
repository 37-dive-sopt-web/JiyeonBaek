// 문자열 숫자로 변환 & 유효성 검사
export const parseNumber = (
  value: string | null | undefined
): number | null => {
  if (!value) return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
};
