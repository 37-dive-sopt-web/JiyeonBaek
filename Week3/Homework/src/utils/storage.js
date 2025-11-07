const RANKING_KEY = "cardGameRanking";

{/* 랭킹 데이터 불러오기 */}
export const getRankings = () => {
  try {
    const data = localStorage.getItem(RANKING_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("랭킹 불러오기 실패:", error);
    return [];
  }
};

{/* 랭킹 데이터 저장하기 */}
export const saveRanking = (record) => {
  try {
    const rankings = getRankings();
    rankings.push(record);
    localStorage.setItem(RANKING_KEY, JSON.stringify(rankings));
  } catch (error) {
    console.error("랭킹 저장 실패:", error);
  }
};

{/* 랭킹 데이터 초기화 */}
export const clearRankings = () => {
  try {
    localStorage.removeItem(RANKING_KEY);
  } catch (error) {
    console.error("랭킹 초기화 실패:", error);
  }
};
