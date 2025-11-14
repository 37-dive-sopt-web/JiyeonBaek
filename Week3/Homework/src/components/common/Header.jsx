import Button from "./Button";

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-primary flex justify-between items-center py-4 px-10 rounded-xl">
      <h1 className="text-3xl font-bold text-text-primary">
        숫자 카드 짝 맞추기
      </h1>
      <nav className="flex gap-4">
        <Button
          isActive={activeTab === "game"}
          onClick={() => onTabChange("game")}
        >
          게임
        </Button>
        <Button
          isActive={activeTab === "ranking"}
          onClick={() => onTabChange("ranking")}
        >
          랭킹
        </Button>
      </nav>
    </header>
  );
};

export default Header;
