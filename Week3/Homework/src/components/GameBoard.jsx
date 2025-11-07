import { useMemo } from "react";
import Card from "./Card";

const GameBoard = ({
  deck,
  cols,
  getCardState,
  matchingCards,
  onCardClick,
  level,
}) => {
  const cardSize = useMemo(() => (level === 3 ? "small" : "large"), [level]);

  const gridStyle = useMemo(
    () => ({ gridTemplateColumns: `repeat(${cols}, 1fr)` }),
    [cols]
  );

  return (
    <div className="grid gap-2 mx-auto w-fit" style={gridStyle}>
      {deck.map((card) => {
        const state = getCardState(card.id);
        const isMatching = matchingCards.has(card.id);
        const isFlipped = state === "flipped" || state === "matched";

        return (
          <Card
            key={card.id}
            card={card}
            state={state}
            isFlipped={isFlipped}
            isMatching={isMatching}
            onClick={() => onCardClick(card.id)}
            size={cardSize}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
