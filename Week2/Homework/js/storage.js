import { members } from "../data/member.js";

const STORAGE_KEY = "membersData";

// localStorage 초기화
(function initStorageOnce() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    try {
      const seed = Array.isArray(members) ? members : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    } catch (_) {}
  }
})();

// 데이터 읽기
export const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
};

// 데이터 저장
export const writeStorage = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
};

// 새 ID 생성
export const generateId = () => {
  const all = readStorage();
  const maxId = all.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);
  return maxId + 1;
};
