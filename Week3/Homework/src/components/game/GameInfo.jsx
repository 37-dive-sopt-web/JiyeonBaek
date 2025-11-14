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
    <>
      <div className="flex gap-2 items-center">
        <select
          id="level-select"
          value={level}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          disabled={gameStatus === "playing"}
          className="flex-1 px-4 py-2 rounded-lg bg-tertiary text-text-primary border-none outline-none focus:ring-2 focus:ring-quaternary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value={1}>레벨 1 (4X4)</option>
          <option value={2}>레벨 2 (4X6)</option>
          <option value={3}>레벨 3 (6X6)</option>
        </select>
      </div>

      {(gameStatus === "ready" || gameStatus === "playing") && (
        <div className="text-md text-text-primary">
          <p>
            남은 시간: <span className="font-bold">{timeLeft}초</span>
          </p>
          <p>
            성공한 짝:{" "}
            <span className="font-bold">
              {matchedPairs}/{totalPairs}
            </span>
          </p>
          <p>
            남은 짝: <span className="font-bold">{remainingPairs}</span>
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onReset}
        className="w-full px-6 py-2 rounded-lg bg-quaternary text-text-primary hover:opacity-80 transition-opacity"
      >
        리셋
      </button>
    </>
  );
};

export default GameInfo;
