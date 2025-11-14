import { useMemo } from "react";

const Card = ({ card, state, isFlipped, isMatching, onClick, size }) => {
  const sizeClass =
    size === "large" ? "w-24 h-24 text-xl" : "w-24 h-20 text-base";

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
        "card-front w-full h-full flex items-center justify-center rounded-lg absolute inset-0 text-text-primary backface-hidden transition-transform duration-500 ease-in-out",
        state === "matched" ? "bg-quaternary" : "bg-quinary",
      ]
        .filter(Boolean)
        .join(" "),
    [state]
  );

  return (
    <div onClick={onClick} className={containerClassName}>
      <div className="card-back w-full h-full flex items-center justify-center rounded-lg absolute inset-0 bg-secondary text-text-secondary backface-hidden transition-transform duration-500 ease-in-out">
        ?
      </div>
      <div className={frontClassName}>{card.value}</div>
    </div>
  );
};

export default Card;
