export const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };

// 배열 셔플 함수
export const shuffle = (array, rng = Math.random) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// 덱 생성 함수
export const buildDeck = (level = 1) => {
  const [rows, cols] = LEVEL_TO_GRID[level] ?? [4, 4];
  const total = rows * cols;

  if (total % 2 !== 0) throw new Error("카드 개수는 짝수여야 해요.");

  const pairs = total / 2;
  const base = Array.from({ length: pairs }, (_, i) => i + 1);

  const duplicated = [];
  for (let i = 0; i < base.length; i += 1) {
    const v = base[i];
    duplicated.push({ id: `${v}-a`, value: v });
    duplicated.push({ id: `${v}-b`, value: v });
  }

  return shuffle(duplicated);
};

// 시간 제한 함수
export const getTimeLimit = (level) => {
  const TIME_LIMITS = { 1: 45, 2: 60, 3: 100 };
  return TIME_LIMITS[level] ?? 45;
};

// 시간 포맷팅 함수
export const formattedTime = (timeLeft) => {
  return timeLeft > 0 ? timeLeft.toFixed(2) : "0.00";
};
