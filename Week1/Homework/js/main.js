document.addEventListener("DOMContentLoaded", function () {
  /**
   * 소개 문구 변경 버튼
   */
  const originalText =
    "다같이 멋진 개발자가 되었으면 좋겠습니다!!! 재밌고 열정적으로 해요!!!";
  const newText = "눌러주셨군요! 좋은 하루 보내세요ㅎㅎㅎ";

  const changeTextBtn = document.getElementById("change-text-btn");
  const resetTextBtn = document.getElementById("reset-text-btn");
  const introParagraph = document.querySelector("#intro p");

  if (changeTextBtn && resetTextBtn && introParagraph) {
    changeTextBtn.addEventListener("click", () => {
      introParagraph.textContent = newText;
    });

    resetTextBtn.addEventListener("click", () => {
      introParagraph.textContent = originalText;
    });
  }
});
