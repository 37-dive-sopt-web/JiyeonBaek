const GameInfo = ({
  level,
  gameStatus,
  timeLeft,
  matchedPairs,
  totalPairs,
  remainingPairs,
  onLevelChange,
  onReset,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <select
          id="level-select"
          value={level}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          disabled={gameStatus === "playing"}
          className="px-4 py-2 rounded-lg bg-tertiary text-text-primary border-none outline-none focus:ring-2 focus:ring-quaternary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value={1}>레벨 1</option>
          <option value={2}>레벨 2</option>
          <option value={3}>레벨 3</option>
        </select>
        {(gameStatus === "ready" || gameStatus === "playing") && (
          <>
            <div className="text-lg text-text-primary">
              남은 시간: <span className="text-xl">{timeLeft}초</span>
            </div>
            <div className="text-lg text-text-primary">
              성공한 짝:{" "}
              <span className="text-xl">
                {matchedPairs}/{totalPairs}
              </span>
            </div>
            <div className="text-lg text-text-primary">
              남은 짝: <span className="text-xl">{remainingPairs}</span>
            </div>
          </>
        )}
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2 rounded-full bg-quaternary text-text-primary hover:opacity-80 transition-opacity"
      >
        리셋
      </button>
    </div>
  );
};

export default GameInfo;
