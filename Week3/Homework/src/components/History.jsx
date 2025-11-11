const History = ({ history }) => {
  return (
    <div className="p-4 rounded-lg bg-secondary">
      <h3 className="text-lg text-text-primary mb-2">최근 히스토리</h3>
      {history.length === 0 ? (
        <div className="text-start text-sm h-70 text-text-tertiary">
          아직 뒤집은 카드가 없어요
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-70 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-md border-2 ${
                item.result === "success"
                  ? "bg-green-500/20 border-green-500 text-green-600"
                  : "bg-red-500/20 border-red-500 text-red-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{item.cards.join(", ")}</span>
                <span className="font-bold">
                  {item.result === "success" ? "성공" : "실패"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
