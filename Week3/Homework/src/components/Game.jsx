import { useState, useEffect, useCallback, useRef } from "react";
import { buildDeck, getTimeLimit, LEVEL_TO_GRID } from "../utils/game";
import { saveRanking } from "../utils/storage";
import Modal from "./Modal";
import GameBoard from "./GameBoard";
import History from "./History";
import Message from "./Message";
import GameInfo from "./GameInfo";

const HISTORY_LIMIT = 20;

const Game = () => {
  const [deckInfo, setDeckInfo] = useState(() => {
    const initialLevel = 1;
    const data = buildDeck(initialLevel);
    return {
      status: "ready",
      data,
      level: initialLevel,
    };
  });

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameStatus, setGameStatus] = useState("ready");
  const [history, setHistory] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [message, setMessage] = useState("");
  const hasSavedRef = useRef(false);
  const [matchingCards, setMatchingCards] = useState(new Set());
  const [countdown, setCountdown] = useState(null);
  const [clearTime, setClearTime] = useState(null);

  const levelGrid = LEVEL_TO_GRID[deckInfo.level] ?? [4, 4];
  const cols = levelGrid[1];

  {
    /* 선택한 레벨에 맞춰 새로운 덱 생성 및 게임 상태 초기화 */
  }
  const generateDeck = useCallback(
    (level = deckInfo.level) => {
      const data = buildDeck(level);
      setDeckInfo({ status: "ready", data, level });
      setFlippedCards([]);
      setMatchedCards([]);
      setTimeLeft(getTimeLimit(level));
      setGameStatus("ready");
      setHistory([]);
      setStartTime(null);
      setMessage("");
      hasSavedRef.current = false;
      setMatchingCards(new Set());
      setCountdown(null);
      setClearTime(null);
    },
    [deckInfo.level]
  );

  {
    /* 첫 카드 클릭 시 게임 시작 및 타이머 기록 */
  }
  const startGame = useCallback(() => {
    setGameStatus("playing");
    setStartTime(Date.now());
  }, []);

  {
    /* 카드 클릭 시 뒤집기, 매칭, 히스토리 갱신 처리 */
  }
  const handleCardClick = (cardId) => {
    if (gameStatus === "ready") {
      startGame();
      setFlippedCards([cardId]);
      setMessage("");
      return;
    }

    if (gameStatus !== "playing") return;
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) {
      setMessage("이미 선택한 카드입니다.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    if (matchedCards.includes(cardId)) return;

    setFlippedCards((prev) => {
      const newFlipped = [...prev, cardId];
      setMessage("");

      if (newFlipped.length === 2) {
        const [firstId, secondId] = newFlipped;
        const firstCard = deckInfo.data?.find((c) => c.id === firstId);
        const secondCard = deckInfo.data?.find((c) => c.id === secondId);

        if (firstCard.value === secondCard.value) {
          setHistory((prevHistory) => {
            const alreadyRecorded = prevHistory.some(
              (h) =>
                h.cardIds &&
                ((h.cardIds[0] === firstId && h.cardIds[1] === secondId) ||
                  (h.cardIds[0] === secondId && h.cardIds[1] === firstId)) &&
                h.result === "success"
            );
            if (alreadyRecorded) {
              return prevHistory;
            }
            return [
              {
                cards: [firstCard.value, secondCard.value],
                cardIds: [firstId, secondId],
                result: "success",
              },
              ...prevHistory,
            ].slice(0, HISTORY_LIMIT);
          });

          setMatchingCards(new Set([firstId, secondId]));
          setTimeout(() => {
            setMatchingCards((prev) => {
              const next = new Set(prev);
              next.delete(firstId);
              next.delete(secondId);
              return next;
            });
          }, 800);

          setMatchedCards((prevMatched) => {
            const matchedSet = new Set(prevMatched);
            if (matchedSet.has(firstId) || matchedSet.has(secondId)) {
              return prevMatched;
            }
            return [...prevMatched, firstId, secondId];
          });

          return [];
        } else {
          setHistory((prevHistory) => {
            const alreadyRecorded = prevHistory.some(
              (h) =>
                h.cardIds &&
                ((h.cardIds[0] === firstId && h.cardIds[1] === secondId) ||
                  (h.cardIds[0] === secondId && h.cardIds[1] === firstId)) &&
                h.result === "fail"
            );
            if (alreadyRecorded) {
              return prevHistory;
            }
            return [
              {
                cards: [firstCard.value, secondCard.value],
                cardIds: [firstId, secondId],
                result: "fail",
              },
              ...prevHistory,
            ].slice(0, HISTORY_LIMIT);
          });
          setTimeout(() => {
            setFlippedCards([]);
          }, 700);
          return newFlipped;
        }
      }
      return newFlipped;
    });
  };

  {
    /* 모든 카드가 매칭되었는지 확인해 승리 상태를 결정 */
  }
  useEffect(() => {
    if (
      gameStatus === "playing" &&
      deckInfo.data &&
      matchedCards.length === deckInfo.data.length &&
      matchedCards.length % 2 === 0
    ) {
      const pairsCount = matchedCards.length / 2;
      const expectedPairs = deckInfo.data.length / 2;
      if (pairsCount === expectedPairs) {
        if (startTime) {
          const time = ((Date.now() - startTime) / 1000).toFixed(2);
          setClearTime(parseFloat(time));
        }
        setGameStatus("won");
      }
    }
  }, [matchedCards.length, deckInfo.data, gameStatus, startTime]);

  {
    /* 게임이 끝났을 때 뒤집힌 카드 초기화 및 3초 카운트다운 시작 */
  }
  useEffect(() => {
    if ((gameStatus === "won" || gameStatus === "lost") && countdown === null) {
      setFlippedCards([]);
      setCountdown(3);
    }
  }, [gameStatus, countdown]);

  {
    /* 카운트다운 값을 매초 감소시키고 완료 시 새 덱 생성 */
  }
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev != null ? prev - 1 : prev));
      }, 1000);
      return () => clearTimeout(timer);
    }

    generateDeck(deckInfo.level);
    setCountdown(null);
  }, [countdown, deckInfo.level, generateDeck]);

  {
    /* 승리 시 랭킹에 한 번만 기록 저장 */
  }
  useEffect(() => {
    if (gameStatus === "won" && !hasSavedRef.current && startTime) {
      const clearTime = ((Date.now() - startTime) / 1000).toFixed(2);
      saveRanking({
        timestamp: new Date().toISOString(),
        level: deckInfo.level,
        clearTime: parseFloat(clearTime),
      });
      hasSavedRef.current = true;
    }
  }, [gameStatus, startTime, deckInfo.level]);

  {
    /* 플레이 중 남은 시간을 10ms 간격으로 업데이트 */
  }
  useEffect(() => {
    if (gameStatus !== "playing" || !startTime) return;

    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = getTimeLimit(deckInfo.level) - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setGameStatus("lost");
      } else {
        setTimeLeft(remaining);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [gameStatus, startTime, deckInfo.level]);

  {
    /* 개별 카드의 표시 상태 반환 */
  }
  const getCardState = (cardId) => {
    if (matchedCards.includes(cardId)) return "matched";
    if (flippedCards.includes(cardId)) return "flipped";
    return "hidden";
  };

  const matchedPairs = matchedCards.length / 2;

  const totalPairs = deckInfo.data?.length ? deckInfo.data.length / 2 : 0;
  const remainingPairs = totalPairs - matchedPairs;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl text-text-primary">게임보드</h2>
      <div className="flex gap-6">
        {deckInfo.status === "ready" && deckInfo.data && (
          <div className="flex-1 flex items-center justify-center">
            <div
              style={{
                minHeight: "750px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GameBoard
                deck={deckInfo.data}
                cols={cols}
                getCardState={getCardState}
                matchingCards={matchingCards}
                onCardClick={handleCardClick}
                level={deckInfo.level}
              />
            </div>
          </div>
        )}

        <div className="w-80 flex flex-col gap-4">
          <div className="flex flex-col gap-4 p-4 rounded-lg bg-secondary">
            <GameInfo
              level={deckInfo.level}
              gameStatus={gameStatus}
              timeLeft={timeLeft > 0 ? timeLeft.toFixed(2) : "0.00"}
              matchedPairs={matchedPairs}
              totalPairs={totalPairs}
              remainingPairs={remainingPairs}
              onLevelChange={generateDeck}
              onReset={() => generateDeck(deckInfo.level)}
            />
          </div>

          <Message message={message} gameStatus={gameStatus} />

          {deckInfo.status === "ready" && <History history={history} />}
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
                레벨 {deckInfo.level}을(를) {clearTime}초만에 클리어했어요!
              </p>
            </>
          )}
          {gameStatus === "lost" && (
            <p className="text-xl font-bold text-text-primary">
              레벨 {deckInfo.level}을(를) 클리어하지 못했어요
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
