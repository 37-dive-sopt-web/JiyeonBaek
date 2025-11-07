import React from "react";

const Button = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-md transition-all duration-200 hover:scale-105 ${
        isActive
          ? "bg-quaternary text-text-primary"
          : "bg-tertiary text-text-tertiary hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
