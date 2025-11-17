import { useState } from "react";
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
      <label className={labelText}>{label}</label>
      <div className={fieldWrapper}>
        <input
          className={input}
          type={inputType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button type="button" onClick={handleTogglePassword}>
            {isPasswordVisible ? (
              <EyeOnIcon className={icon} />
            ) : (
              <EyeOffIcon className={icon} />
            )}
          </button>
        )}
      </div>
      {errorMessage && <p className={error}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
