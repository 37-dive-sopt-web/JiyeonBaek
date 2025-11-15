import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({ isOpen, title, children, type = "default" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const titleColorClass =
    type === "success" ? "text-text-tertiary" : "text-text-secondary";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="relative p-8 text-center rounded-xl max-w-md w-full mx-4 bg-tertiary shadow-xl">
        {title && (
          <h2 className={`text-2xl font-bold mb-5 ${titleColorClass}`}>
            {title}
          </h2>
        )}

        <div className="text-text-primary">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
