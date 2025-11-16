import type { ChangeEvent } from "react";

export interface InputProps {
  type: "text" | "password" | "email" | "number";
  label: string;
  placeholder: string;
  errorMessage?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
