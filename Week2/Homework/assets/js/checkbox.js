import { readStorage, writeStorage } from "./storage.js";
import { renderMembers } from "./render.js";

// 체크박스
export const initCheckbox = (
  lists,
  selectAllBtn,
  deleteSelectedBtn,
  setInitialMembers,
  setCurrentMembers,
  renderContainer
) => {
  if (!lists) return;

  const updateMasterCheckbox = () => {
    const allChecks = lists.querySelectorAll(".row-check");
    const checkedChecks = lists.querySelectorAll(".row-check:checked");
    const masterCheck = lists.querySelector("#master-check");
    if (masterCheck) {
      masterCheck.checked =
        allChecks.length > 0 && checkedChecks.length === allChecks.length;
    }
  };

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

  if (selectAllBtn) {
    selectAllBtn.addEventListener("click", () => {
      const masterCheck = lists.querySelector("#master-check");
      if (masterCheck) {
        const nextState = !masterCheck.checked;
        masterCheck.checked = nextState;
        lists.querySelectorAll(".row-check").forEach((cb) => {
          cb.checked = nextState;
        });
      }
    });
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
};
