import { useState, useEffect } from "react";
import { getRankings, clearRankings } from "../utils/storage";

const Ranking = () => {
  const [rankings, setRankings] = useState([]);

  {
    /* 컴포넌트 마운트 시 랭킹 데이터 불러오기 및 정렬 */
  }
  useEffect(() => {
    const data = getRankings();
    const sorted = [...data].sort((a, b) => {
      if (b.level !== a.level) {
        return b.level - a.level;
      }
      return a.clearTime - b.clearTime;
    });
    setRankings(sorted);
  }, []);

  {
    /* 랭킹 초기화 버튼 클릭 시 랭킹 데이터 초기화 */
  }
  const handleClear = () => {
    if (confirm("랭킹을 초기화하시겠습니까?")) {
      clearRankings();
      setRankings([]);
    }
  };

  {
    /* 타임스탬프를 한국어 로케일 문자열로 변환 */
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ko-KR");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-text-primary">랭킹보드</h2>
        <button
          onClick={handleClear}
          className="bg-quaternary text-text-primary px-6 py-2 rounded-full hover:opacity-80 transition-opacity"
        >
          초기화
        </button>
      </div>

      <div className="overflow-y-auto h-[750px]">
        {rankings.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            아직 기록이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary text-text-primary">
                  <th className="px-4 py-2 text-left">순위</th>
                  <th className="px-4 py-2 text-left">시각</th>
                  <th className="px-4 py-2 text-left">레벨</th>
                  <th className="px-4 py-2 text-left">클리어 시간</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((record, index) => (
                  <tr
                    key={record.timestamp ?? index}
                    className="border-b border-secondary text-text-secondary"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {formatDate(record.timestamp)}
                    </td>
                    <td className="px-4 py-2">Level {record.level}</td>
                    <td className="px-4 py-2">{record.clearTime}초</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ranking;
