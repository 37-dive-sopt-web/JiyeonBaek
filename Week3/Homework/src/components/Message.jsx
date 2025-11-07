const Message = ({ message, gameStatus }) => {
  const defaultMessage =
    gameStatus === "ready"
      ? "카드를 클릭하여 게임을 시작하세요"
      : gameStatus === "playing"
      ? "게임 진행 중..."
      : "";

  const displayMessage = message || defaultMessage;
  const messageClass = message
    ? "text-text-tertiary text-md"
    : "text-text-tertiary text-sm";

  return (
    <div className="p-4 rounded-lg bg-secondary min-h-32">
      <h3 className="text-lg text-text-primary mb-2">안내 메시지</h3>
      <p className={messageClass}>{displayMessage}</p>
    </div>
  );
};

export default Message;
