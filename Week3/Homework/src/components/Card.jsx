import { useMemo } from "react";

const Card = ({ card, state, isFlipped, isMatching, onClick, size }) => {
  const sizeClass =
    size === "large" ? "w-44 h-44 text-4xl" : "w-28 h-28 text-2xl";

  const containerClassName = useMemo(
    () =>
      [
        sizeClass,
        "rounded-lg cursor-pointer card-flipping relative",
        isFlipped && "flipped",
        isMatching && "match-success-animation",
      ]
        .filter(Boolean)
        .join(" "),
    [sizeClass, isFlipped, isMatching]
  );

  const frontClassName = useMemo(
    () =>
      [
        "card-front w-full h-full flex items-center justify-center rounded-lg absolute inset-0 text-text-primary",
        state === "matched" ? "bg-quaternary" : "bg-quinary",
      ]
        .filter(Boolean)
        .join(" "),
    [state]
  );

  return (
    <div onClick={onClick} className={containerClassName}>
      <div className="card-back w-full h-full flex items-center justify-center rounded-lg absolute inset-0 bg-secondary text-text-secondary">
        ?
      </div>
      <div className={frontClassName}>{card.value}</div>
    </div>
  );
};

export default Card;
