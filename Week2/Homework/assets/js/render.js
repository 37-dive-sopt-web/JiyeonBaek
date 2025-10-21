// 텍스트 검색
export const includesText = (target, query) => {
  if (!query) return true;
  if (target == null) return false;
  return String(target).toLowerCase().includes(String(query).toLowerCase());
};

// 테이블 렌더링
export const renderMembers = (list, container) => {
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<p style="text-align: center; padding: 20px; background-color: white;">검색 결과가 없습니다.</p>`;
    return;
  }

  const thead = `
    <thead>
      <tr>
        <th><input type="checkbox" id="master-check" /></th>
        <th>이름</th>
        <th>영문 이름</th>
        <th>깃허브</th>
        <th>성별</th>
        <th>역할</th>
        <th>금잔디조</th>
        <th>나이</th>
      </tr>
    </thead>`;

  const tbody = `
    <tbody>
      ${list
        .map(
          (member) => `
        <tr data-id="${member.id}">
          <td><input type="checkbox" class="row-check" data-id="${member.id}" /></td>
          <td>${member.name}</td>
          <td>${member.englishName}</td>
          <td><a href="https://github.com/${member.github}" target="_blank" rel="noopener noreferrer">${member.github}</a></td>
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
