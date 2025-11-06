import React from "react";

const Button = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-neodgm text-size-md transition-colors ${
        isActive
          ? "bg-quaternary text-text-primary"
          : "bg-transparent text-text-secondary hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
