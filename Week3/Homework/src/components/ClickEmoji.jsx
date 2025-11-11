import { useEffect, useState } from "react";

let emojiId = 0;
const EMOJIS = ["👽", "👾", "🛠️", "🤖", "🤩", "🌀", "👩🏻‍💻", "🔥"];

// 클릭 이모지 컴포넌트 - 클릭 시 3개의 이모지가 랜덤한 위치에 표시되도록
const ClickEmoji = () => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const handleClick = (event) => {
      const { clientX, clientY } = event;
      const emojiCount = 3;
      const newEmojis = [];

      for (let i = 0; i < emojiCount; i++) {
        const id = emojiId++;
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const angle = (Math.PI * 2 * i) / emojiCount;
        const offset = 30;
        const x = clientX + Math.cos(angle) * offset;
        const y = clientY + Math.sin(angle) * offset;

        newEmojis.push({ id, x, y, emoji });

        setTimeout(() => {
          setEmojis((prev) => prev.filter((emojiItem) => emojiItem.id !== id));
        }, 800);
      }

      setEmojis((prev) => [...prev, ...newEmojis]);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {emojis.map((emojiItem) => (
        <span
          key={emojiItem.id}
          className="emoji-ripple"
          style={{
            position: "fixed",
            left: emojiItem.x,
            top: emojiItem.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {emojiItem.emoji}
        </span>
      ))}
    </div>
  );
};

export default ClickEmoji;
