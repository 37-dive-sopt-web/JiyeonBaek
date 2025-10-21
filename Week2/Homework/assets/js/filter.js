import { readStorage } from "./storage.js";
import { includesText, renderMembers } from "./render.js";

// 검색 필터링
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
    const byTeam =
      !team || String(m.codeReviewGroup).includes(String(team).trim());
    const byAge = !age || String(m.age).includes(String(age).trim());
    return (
      byName && byEnglish && byGithub && byGender && byRole && byTeam && byAge
    );
  });

  setCurrentMembers(filtered);
  renderMembers(filtered, container);
};
