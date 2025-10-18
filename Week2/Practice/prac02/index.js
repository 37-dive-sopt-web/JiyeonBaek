const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const renderTodos = () => {
  ul.innerHTML = ""; 
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo; 
    ul.appendChild(li);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = input.value.trim();

  if (newTodo) {
    todos.push(newTodo);
    saveTodos();
    renderTodos(); 
    input.value = "";
  }
});

renderTodos();