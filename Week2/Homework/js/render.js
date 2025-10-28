/* 테이블 렌더링 - 멤버 목록 테이블 렌더링 */
export const renderMembers = (list, container) => {
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<p id="no-results">조건에 맞는 데이터가 없어요 👽</p>`;
    return;
  }

  const thead = `
    <thead>
      <tr>
        <th scope="col"><input type="checkbox" id="master-check" aria-label="전체 선택" /></th>
        <th scope="col">이름</th>
        <th scope="col">영문 이름</th>
        <th scope="col">깃허브</th>
        <th scope="col">성별</th>
        <th scope="col">역할</th>
        <th scope="col">금잔디조</th>
        <th scope="col">나이</th>
      </tr>
    </thead>`;

  const tbody = `
    <tbody>
      ${list
        .map(
          (member) => `
        <tr data-id="${member.id}">
          <td><input type="checkbox" class="row-check" data-id="${member.id}" aria-label="${member.name} 선택" /></td>
          <td>${member.name}</td>
          <td>${member.englishName}</td>
          <td><a href="https://github.com/${member.github}" target="_blank" rel="noopener noreferrer" aria-label="${member.name}의 깃허브 프로필">${member.github}</a></td>
          <td>${member.gender}</td>
          <td>${member.role}</td>
          <td>${member.codeReviewGroup}</td>
          <td>${member.age}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>`;

  container.innerHTML = `<table class="member-table">${thead}${tbody}</table>`;
};
