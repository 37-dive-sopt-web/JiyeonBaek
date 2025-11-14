import Modal from "../common/Modal";
import GameBoard from "./GameBoard";
import History from "./History";
import Message from "../common/Message";
import GameInfo from "./GameInfo";
import useGameState from "../../hooks/useGameState";

const Game = () => {
  const {
    level,
    deck,
    cols,
    gameStatus,
    message,
    history,
    timeLeft,
    countdown,
    clearTime,
    matchingCards,
    matchedPairs,
    totalPairs,
    remainingPairs,
    handleCardClick,
    handleLevelChange,
    handleReset,
    getCardState,
  } = useGameState();

  const formattedTime = timeLeft > 0 ? timeLeft.toFixed(2) : "0.00";

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl text-text-primary">게임보드</h2>
      <div className="flex gap-6">
        {deck.length > 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div
              style={{
                minHeight: "750px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GameBoard
                deck={deck}
                cols={cols}
                getCardState={getCardState}
                matchingCards={matchingCards}
                onCardClick={handleCardClick}
                level={level}
              />
            </div>
          </div>
        )}

        <div className="w-80 flex flex-col gap-4">
          <div className="flex flex-col gap-4 p-4 rounded-lg bg-secondary">
            <GameInfo
              level={level}
              gameStatus={gameStatus}
              timeLeft={formattedTime}
              matchedPairs={matchedPairs}
              totalPairs={totalPairs}
              remainingPairs={remainingPairs}
              onLevelChange={handleLevelChange}
              onReset={handleReset}
            />
          </div>

          <Message message={message} gameStatus={gameStatus} />

          <History history={history} />
        </div>
      </div>

      <Modal
        isOpen={gameStatus === "won" || gameStatus === "lost"}
        title={gameStatus === "won" ? "축하해요!" : "아쉬워요ㅠㅠ"}
        type={gameStatus === "won" ? "success" : "error"}
      >
        <div className="flex flex-col gap-4 text-center">
          {gameStatus === "won" && clearTime !== null && (
            <>
              <p className="text-xl font-bold text-text-primary">
                레벨 {level}을(를) {clearTime}초만에 클리어했어요!
              </p>
            </>
          )}
          {gameStatus === "lost" && (
            <p className="text-xl font-bold text-text-primary">
              레벨 {level}을(를) 클리어하지 못했어요
            </p>
          )}
          <p className="text-lg text-text-secondary">
            {countdown !== null
              ? `${countdown}초 후 자동으로 새 게임을 시작해요`
              : "3초 후 자동으로 새 게임을 시작해요"}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Game;
