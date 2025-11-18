import type { ButtonProps } from "../../../type/components";
import { button } from "./Button.css";

const Button = ({
  children,
  onClick,
  type,
  disabled,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
