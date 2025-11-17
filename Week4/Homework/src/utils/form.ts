export const sanitizeAgeInput = (value: string): string => {
  return value.replace(/\D/g, "");
};
