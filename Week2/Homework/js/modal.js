import { readStorage, writeStorage, generateId } from "./storage.js";
import { renderMembers } from "./render.js";

/**
 *  모달 - 멤버 추가 모달 관리
 * @param {*} addModal 모달
 * @param {*} addMemberBtn 모달 열기 버튼
 * @param {*} closeAddModalBtn 모달 닫기 버튼
 * @param {*} addMemberForm 모달 폼
 */
export const initModal = (
  addModal,
  addMemberBtn,
  closeAddModalBtn,
  addMemberForm
) => {
  {
    /* 모달 열기 */
  }
  if (addMemberBtn && addModal) {
    addMemberBtn.addEventListener("click", () => {
      addModal.style.display = "block";
      addModal.setAttribute("aria-hidden", "false");

      // 배경 스크롤 막기
      document.body.style.overflow = "hidden";

      // 첫 번째 입력 필드 포커스
      const firstInput = addModal.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 0);
      }
    });
  }

  {
    /* 모달 닫기 */
  }
  const closeModal = () => {
    if (addModal) {
      addModal.style.display = "none";
      addModal.setAttribute("aria-hidden", "true");
      if (addMemberForm) addMemberForm.reset();

      // 배경 스크롤 복원
      document.body.style.overflow = "";
    }
  };

  {
    /* X 버튼으로 모달 닫기 */
  }
  if (closeAddModalBtn) {
    closeAddModalBtn.addEventListener("click", closeModal);
  }

  {
    /* 배경 클릭으로 모달 닫기 */
  }
  if (addModal) {
    addModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        closeModal();
      }
    });
  }

  {
    /* esc 키로 모달 닫기 */
  }
  if (addModal) {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        addModal.getAttribute("aria-hidden") === "false"
      ) {
        closeModal();
      }
    });
  }
};

/**
 * 멤버 추가 - 멤버 추가 폼 제출 이벤트 처리
 * @param {*} addMemberForm 모달 폼
 * @param {*} addModal 모달
 * @param {*} setInitialMembers 초기 멤버 리스트
 * @param {*} setCurrentMembers 현재 멤버 리스트
 * @param {*} renderContainer 렌더링 컨테이너
 */
export const initAddMember = (
  addMemberForm,
  addModal,
  setInitialMembers,
  setCurrentMembers,
  renderContainer
) => {
  addMemberForm.addEventListener("submit", (e) => {
    e.preventDefault();

    {
      /* 폼 유효성 검사 */
    }
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

    {
      /* 멤버 객체 생성 */
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

    // 배경 스크롤 복원
    document.body.style.overflow = "";

    const updatedMembers = readStorage();
    setInitialMembers(updatedMembers);
    setCurrentMembers(updatedMembers);
    renderMembers(updatedMembers, renderContainer);
  });
};
