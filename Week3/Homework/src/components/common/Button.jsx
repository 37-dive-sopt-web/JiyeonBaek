const Button = ({ children, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-1.5 rounded-full text-sm transition-all duration-200 hover:scale-105 ${
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
