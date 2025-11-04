import Card from "./components/Card";
import Header from "./components/Header";
import { members } from "./data/member.js";
import "./App.css";
import Search from "./components/Search.jsx";
import useSearch from "./data/hooks/useSearch.js";

function App() {
  const { search, filteredMembers, handleSearchChange, handleSearch } =
    useSearch(members);

  return (
    <section>
      <Header />
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      <div className="card-list">
        {filteredMembers.map((member) => (
          <Card key={member.id} {...member} />
        ))}
      </div>
    </section>
  );
}

export default App;
