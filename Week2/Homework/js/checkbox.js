import { readStorage, writeStorage } from "./storage.js";
import { renderMembers } from "./render.js";

/**
 * 체크박스
 * @param {*} lists 목록
 * @param {*} deleteSelectedBtn 선택 삭제 버튼
 * @param {*} setInitialMembers 초기 멤버 리스트
 * @param {*} setCurrentMembers 현재 멤버 리스트
 * @param {*} renderContainer 렌더링 컨테이너
 */
export const initCheckbox = (
  lists,
  deleteSelectedBtn,
  setInitialMembers,
  setCurrentMembers,
  renderContainer
) => {
  {
    /* 전체 선택 버튼 */
  }
  const updateMasterCheckbox = () => {
    const allChecks = lists.querySelectorAll(".row-check");
    const checkedChecks = lists.querySelectorAll(".row-check:checked");
    const masterCheck = lists.querySelector("#master-check");
    if (masterCheck) {
      masterCheck.checked =
        allChecks.length > 0 && checkedChecks.length === allChecks.length;
    }
  };

  {
    /* 선택 삭제 버튼 */
  }
  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", () => {
      const checkedBoxes = lists.querySelectorAll(".row-check:checked");
      if (checkedBoxes.length === 0) return;

      const selectedIds = Array.from(checkedBoxes).map((cb) =>
        Number(cb.getAttribute("data-id"))
      );

      const remainingMembers = readStorage().filter(
        (m) => !selectedIds.includes(Number(m.id))
      );

      writeStorage(remainingMembers);

      const updatedMembers = readStorage();
      setInitialMembers(updatedMembers);
      setCurrentMembers(updatedMembers);
      renderMembers(updatedMembers, renderContainer);
    });
  }

  {
    /* 체크박스 변경 */
  }
  lists.addEventListener("change", (e) => {
    const { target } = e;

    if (target.id === "master-check") {
      const isChecked = target.checked;
      lists.querySelectorAll(".row-check").forEach((cb) => {
        cb.checked = isChecked;
      });
    } else if (target.classList.contains("row-check")) {
      updateMasterCheckbox();
    }
  });
};
