import { useState } from "react";
import Header from "./components/common/Header";
import Game from "./components/game/Game";
import Ranking from "./components/ranking/Ranking";
import ClickEmoji from "./components/common/ClickEmoji";

const App = () => {
  const [activeTab, setActiveTab] = useState("game");

  return (
    <div className="min-h-screen bg-tertiary py-4 px-40 gap-4 flex flex-col">
      <ClickEmoji />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="px-6 py-4 bg-primary rounded-xl">
        {activeTab === "game" && <Game />}
        {activeTab === "ranking" && <Ranking />}
      </main>
    </div>
  );
};

export default App;
