import { readStorage, writeStorage, generateId } from "./storage.js";
import { renderMembers } from "./render.js";

// 모달 관리
export const initModal = (
  addMemberBtn,
  addModal,
  closeAddModalBtn,
  cancelAddBtn,
  addMemberForm
) => {
  if (addMemberBtn && addModal) {
    addMemberBtn.addEventListener("click", () => {
      addModal.style.display = "block";
      addModal.setAttribute("aria-hidden", "false");
    });
  }

  const closeModal = () => {
    if (addModal) {
      addModal.style.display = "none";
      addModal.setAttribute("aria-hidden", "true");
      if (addMemberForm) addMemberForm.reset();
    }
  };

  [closeAddModalBtn, cancelAddBtn].forEach((btn) => {
    if (btn) btn.addEventListener("click", closeModal);
  });
};

// 폼 유효성 검사
export const checkFormValidity = (addMemberForm) => {
  if (!addMemberForm) return;
  const submitBtn = addMemberForm.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
  }
};

// 멤버 추가
export const initAddMember = (
  addMemberForm,
  addModal,
  setInitialMembers,
  setCurrentMembers,
  renderContainer
) => {
  if (!addMemberForm) return;

  const handleFormChange = () => checkFormValidity(addMemberForm);
  addMemberForm.addEventListener("input", handleFormChange);
  addMemberForm.addEventListener("change", handleFormChange);
  checkFormValidity(addMemberForm);

  addMemberForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = addMemberForm.querySelectorAll(
      "input[required], select[required]"
    );
    const isEmpty = Array.from(inputs).some((input) => {
      if (input.type === "number") {
        return !input.value || Number(input.value) <= 0;
      }
      return !input.value.trim();
    });

    if (isEmpty) {
      alert("👽: 모든 항목을 입력해주세요");
      return;
    }

    const fd = new FormData(addMemberForm);
    const newMember = {
      id: generateId(),
      name: fd.get("name")?.trim() || "",
      englishName: fd.get("englishName")?.trim() || "",
      github: fd.get("github")?.trim() || "",
      gender: fd.get("gender") || "other",
      role: fd.get("role") || "YB",
      codeReviewGroup: Number(fd.get("team")) || 0,
      age: Number(fd.get("age")) || 0,
    };

    const all = readStorage();
    all.push(newMember);
    writeStorage(all);

    addMemberForm.reset();
    addModal.style.display = "none";
    addModal.setAttribute("aria-hidden", "true");

    const updatedMembers = readStorage();
    setInitialMembers(updatedMembers);
    setCurrentMembers(updatedMembers);
    renderMembers(updatedMembers, renderContainer);
  });
};
