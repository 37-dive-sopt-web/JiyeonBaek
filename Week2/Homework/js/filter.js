import { readStorage } from "./storage.js";
import { renderMembers } from "./render.js";

/**
 * 텍스트 검색 - 검색 대상에 검색 쿼리가 포함되어 있는지 확인
 * @param {*} target 검색 대상
 * @param {*} query 검색 쿼리
 * @returns {boolean} 텍스트 검색 결과
 */
export const includesText = (target, query) => {
  if (!query) return true;
  if (target == null) return false;
  return String(target).toLowerCase().includes(String(query).toLowerCase());
};

/**
 * 검색 필터링 - 검색 조건에 맞는 멤버 목록 필터링
 * @param {*} formData 검색 폼 데이터
 * @param {*} container 렌더링 컨테이너
 * @param {*} setCurrentMembers 현재 멤버 리스트
 */
export const applyFilter = (formData, container, setCurrentMembers) => {
  const name = formData.get("name");
  const englishName = formData.get("englishName");
  const github = formData.get("github");
  const gender = formData.get("gender");
  const role = formData.get("role");
  const team = formData.get("team");
  const age = formData.get("age");

  const initialMembers = readStorage();

  const filtered = initialMembers.filter((m) => {
    const byName = includesText(m.name, name);
    const byEnglish = includesText(m.englishName, englishName);
    const byGithub = includesText(m.github, github);
    const byGender = !gender || m.gender === gender;
    const byRole = !role || m.role === role;
    const byTeam = !team || Number(m.codeReviewGroup) === Number(team);
    const byAge = !age || Number(m.age) === Number(age);
    return (
      byName && byEnglish && byGithub && byGender && byRole && byTeam && byAge
    );
  });

  setCurrentMembers(filtered);
  renderMembers(filtered, container);
};
