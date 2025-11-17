import { useState, useId } from "react";
import type { InputProps } from "../../type/components";
import EyeOnIcon from "../../assets/icons/eye-on.svg?react";
import EyeOffIcon from "../../assets/icons/eye-off.svg?react";
import {
  wrapper,
  labelText,
  fieldWrapper,
  input,
  icon,
  error,
} from "./Input.css";

const Input = ({
  type,
  label,
  errorMessage,
  placeholder,
  name,
  value,
  onChange,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = useId();
  const errorId = useId();

  const isPassword = type === "password";
  const inputType = isPassword
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={wrapper}>
      <label htmlFor={inputId} className={labelText}>
        {label}
      </label>
      <div className={fieldWrapper}>
        <input
          id={inputId}
          className={input}
          type={inputType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={errorMessage ? "true" : "false"}
          aria-describedby={errorMessage ? errorId : undefined}
        />
        {isPassword && (
          <button
            type="button"
            onClick={handleTogglePassword}
            aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {isPasswordVisible ? (
              <EyeOnIcon className={icon} />
            ) : (
              <EyeOffIcon className={icon} />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <p id={errorId} className={error} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
