const socket = io();
const ul = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat:message", input.value);
    input.value = "";
  }
});

clear.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("chat:clear");
  ul.innerHTML = "";
  input.value = "";
});

socket.on("chat:message", (msg) => {
  ul.innerHTML += `<li>${msg}</li>`;
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("chat:clear", () => {
  ul.innerHTML = "";
});
