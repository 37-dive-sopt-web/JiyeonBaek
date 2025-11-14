import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { buildDeck, getTimeLimit, LEVEL_TO_GRID } from "../utils/game";
import { saveRanking } from "../utils/storage";

const INITIAL_LEVEL = 1;
const HISTORY_LIMIT = 20;

const emptySet = () => new Set();

const useGameState = () => {
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [deck, setDeck] = useState(() => buildDeck(INITIAL_LEVEL));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState("ready");
  const [timeLeft, setTimeLeft] = useState(() => getTimeLimit(INITIAL_LEVEL));
  const [countdown, setCountdown] = useState(null);
  const [clearTime, setClearTime] = useState(null);
  const [matchingCards, setMatchingCards] = useState(() => emptySet());
  const [startTime, setStartTime] = useState(null);

  const hasSavedRef = useRef(false);
  const deadlineRef = useRef(null);
  const historyIdRef = useRef(0);

  const cols = useMemo(() => {
    const grid = LEVEL_TO_GRID[level] ?? [4, 4];
    return grid[1];
  }, [level]);

  const cardLookup = useMemo(() => {
    const map = new Map();
    deck.forEach((card) => {
      map.set(card.id, card);
    });
    return map;
  }, [deck]);

  const matchedPairs = useMemo(
    () => matchedCards.length / 2,
    [matchedCards.length]
  );
  const totalPairs = useMemo(
    () => (deck.length > 0 ? deck.length / 2 : 0),
    [deck.length]
  );
  const remainingPairs = useMemo(
    () => totalPairs - matchedPairs,
    [matchedPairs, totalPairs]
  );

  // 공용 게임 상태 초기화 함수
  const resetGameState = useCallback((targetLevel) => {
    setDeck(buildDeck(targetLevel));
    setFlippedCards([]);
    setMatchedCards([]);
    setMessage("");
    setHistory([]);
    setGameStatus("ready");
    setTimeLeft(getTimeLimit(targetLevel));
    setCountdown(null);
    setClearTime(null);
    setMatchingCards(emptySet());
    setStartTime(null);
    hasSavedRef.current = false;
    deadlineRef.current = null;
    historyIdRef.current = 0;
  }, []);

  // 레벨 변경 시 게임 상태 초기화
  const handleLevelChange = useCallback(
    (nextLevel) => {
      setLevel(nextLevel);
      resetGameState(nextLevel);
    },
    [resetGameState]
  );

  // 동일 레벨에서 게임 상태 초기화
  const handleReset = useCallback(() => {
    resetGameState(level);
  }, [level, resetGameState]);

  // 첫 카드 클릭 시 게임 시작 처리
  const startGame = useCallback(() => {
    setGameStatus("playing");
    const now = Date.now();
    setStartTime(now);
    deadlineRef.current = now + getTimeLimit(level) * 1000;
    setTimeLeft(getTimeLimit(level));
  }, [level]);

  // 히스토리 중복 기록 방지 후 저장
  const recordHistory = useCallback((firstCard, secondCard, result) => {
    if (!firstCard || !secondCard) return;

    setHistory((prevHistory) => {
      const alreadyRecorded = prevHistory.some(
        (entry) =>
          entry.cardIds &&
          ((entry.cardIds[0] === firstCard.id &&
            entry.cardIds[1] === secondCard.id) ||
            (entry.cardIds[0] === secondCard.id &&
              entry.cardIds[1] === firstCard.id)) &&
          entry.result === result
      );
      if (alreadyRecorded) {
        return prevHistory;
      }

      historyIdRef.current += 1;
      const nextEntry = {
        id: historyIdRef.current,
        cards: [firstCard.value, secondCard.value],
        cardIds: [firstCard.id, secondCard.id],
        result,
      };

      return [nextEntry, ...prevHistory].slice(0, HISTORY_LIMIT);
    });
  }, []);

  // 카드 클릭 시 매칭 및 상태 갱신 처리
  const handleCardClick = useCallback(
    (cardId) => {
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
          const firstCard = cardLookup.get(firstId);
          const secondCard = cardLookup.get(secondId);

          if (firstCard && secondCard && firstCard.value === secondCard.value) {
            setTimeout(() => {
              recordHistory(firstCard, secondCard, "success");
            }, 500);

            setMatchingCards(new Set([firstId, secondId]));
            setTimeout(() => {
              setMatchingCards((prevSet) => {
                const next = new Set(prevSet);
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
          }

          if (firstCard && secondCard) {
            // 카드 뒤집기 애니메이션(500ms) 완료 후 히스토리 기록
            setTimeout(() => {
              recordHistory(firstCard, secondCard, "fail");
            }, 500);
          }

          setTimeout(() => {
            setFlippedCards([]);
          }, 700);
          return newFlipped;
        }

        return newFlipped;
      });
    },
    [
      cardLookup,
      flippedCards,
      gameStatus,
      matchedCards,
      recordHistory,
      startGame,
    ]
  );

  // 모든 카드 매칭 시 승리 상태 설정 및 클리어 타임 기록
  useEffect(() => {
    if (
      gameStatus === "playing" &&
      deck.length > 0 &&
      matchedCards.length === deck.length &&
      matchedCards.length % 2 === 0
    ) {
      const pairsCount = matchedCards.length / 2;
      const expectedPairs = deck.length / 2;
      if (pairsCount === expectedPairs) {
        if (startTime) {
          const time = ((Date.now() - startTime) / 1000).toFixed(2);
          setClearTime(parseFloat(time));
        }
        setGameStatus("won");
      }
    }
  }, [deck.length, gameStatus, matchedCards.length, startTime]);

  // 승패 확정 시 뒤집힌 카드 초기화 및 카운트다운 시작
  useEffect(() => {
    if ((gameStatus === "won" || gameStatus === "lost") && countdown === null) {
      setFlippedCards([]);
      setCountdown(3);
      deadlineRef.current = null;
    }
  }, [countdown, gameStatus]);

  // 카운트다운 완료 시 새 게임 자동 시작
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev != null ? prev - 1 : prev));
      }, 1000);
      return () => clearTimeout(timer);
    }

    handleReset();
    setCountdown(null);
  }, [countdown, handleReset]);

  // 승리 시 랭킹을 한 번만 저장
  useEffect(() => {
    if (gameStatus === "won" && !hasSavedRef.current && startTime) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      saveRanking({
        timestamp: new Date().toISOString(),
        level,
        clearTime: parseFloat(elapsed),
      });
      hasSavedRef.current = true;
    }
  }, [gameStatus, level, startTime]);

  // 게임 플레이 중 남은 시간을 10ms 간격으로 갱신
  useEffect(() => {
    if (gameStatus !== "playing" || !startTime || !deadlineRef.current) return;

    const timer = setInterval(() => {
      const remainingMs = deadlineRef.current - Date.now();

      if (remainingMs <= 0) {
        setTimeLeft(0);
        setGameStatus("lost");
      } else {
        setTimeLeft(remainingMs / 1000);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [gameStatus, startTime]);

  // 카드 상태 식별 함수
  const getCardState = useCallback(
    (cardId) => {
      if (matchedCards.includes(cardId)) return "matched";
      if (flippedCards.includes(cardId)) return "flipped";
      return "hidden";
    },
    [flippedCards, matchedCards]
  );

  return {
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
  };
};

export default useGameState;