import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Ranking from "./components/Ranking";
import ClickEmoji from "./components/ClickEmoji";

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
