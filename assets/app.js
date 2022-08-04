const socket = io();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat:message", input.value);
    input.value = "";
  }
});

socket.on("chat:message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;

  const ul = document.getElementById("messages");
  ul.append(li);
  window.scrollTo(0, document.body.scrollHeight);
});
