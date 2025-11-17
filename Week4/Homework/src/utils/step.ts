import type { FormEvent } from "react";

export const createStepSubmitHandler = (onNext?: () => void) => {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext?.();
  };
};
