import { readStorage } from "./storage.js";
import { renderMembers } from "./render.js";
import { applyFilter } from "./filter.js";
import { initModal, initAddMember } from "./modal.js";
import { initCheckbox } from "./checkbox.js";

const form = document.getElementById("search-filter-form");
const lists = document.getElementById("lists");
const deleteSelectedBtn = document.getElementById("delete-selected");
const addMemberBtn = document.getElementById("add-member");
const addModal = document.getElementById("add-modal");
const closeAddModalBtn = document.getElementById("close-add-modal");
const addMemberForm = document.getElementById("add-member-form");

/* 상태 관리 */
let initialMembers = readStorage();
let currentMembers = [...initialMembers];

/* 전체 멤버 목록 업데이트 */
const setInitialMembers = (members) => {
  initialMembers = members;
};

/* 현재 멤버 목록 업데이트 */
const setCurrentMembers = (members) => {
  currentMembers = members;
};

/* 데이터 초기화 */
const refreshData = () => {
  const members = readStorage();
  setInitialMembers(members);
  setCurrentMembers(members);
  renderMembers(members, lists);
};

/* 검색 필터 이벤트 */
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    applyFilter(formData, lists, setCurrentMembers);
  });

  form.addEventListener("reset", refreshData);
}

/* 모달 초기화 */
initModal(addModal, addMemberBtn, closeAddModalBtn, addMemberForm);

/* 멤버 추가 기능 초기화 */
initAddMember(
  addMemberForm,
  addModal,
  setInitialMembers,
  setCurrentMembers,
  lists
);

/* 체크박스 기능 초기화 */
initCheckbox(
  lists,
  deleteSelectedBtn,
  setInitialMembers,
  setCurrentMembers,
  lists
);

/* 초기 렌더링 */
renderMembers(currentMembers, lists);
