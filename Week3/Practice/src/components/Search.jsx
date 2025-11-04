import { css } from "@emotion/react";

const searchContainerStyle = css`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 16px 0;
`;

const buttonStyle = css`
  background-color: #c08300;
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
`;

const inputStyle = css`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  width: 600px;
`;

const Search = ({ search, handleSearchChange, handleSearch }) => {
  return (
    <div css={searchContainerStyle}>
      <input
        type="text"
        placeholder="이름을 입력하라"
        value={search}
        onChange={handleSearchChange}
        css={inputStyle}
      />
      <button css={buttonStyle} onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default Search;
