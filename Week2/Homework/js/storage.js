import { members } from "../data/member.js";

const STORAGE_KEY = "membersData";

// localStorage 초기화 (처음 한번만 실행)
(function initStorageOnce() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    try {
      const seed = Array.isArray(members) ? members : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    } catch (error) {
      console.error("localStorage 초기화 실패", error);
    }
  }
})();

// 데이터 불러오기
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
  } catch (error) {
    console.error("데이터 저장 실패", error);
  }
};

// 새 ID 생성
let lastGeneratedId = 0;
export const generateId = () => {
  const all = readStorage();
  if (all.length === 0) {
    return 1;
  }
  const maxId = all.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);
  lastGeneratedId = maxId + 1;
  return lastGeneratedId;
};
