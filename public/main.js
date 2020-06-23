const ws = new WebSocket(`ws://localhost:3000`);

const username = prompt("What's your name? ");

const generateDate = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};

const log = document.getElementById("log");

Notification.requestPermission();

let notificationMessage = false;
document.querySelector("button").onclick = () => {
  let text = document.getElementById("text").value;
  ws.send(JSON.stringify({ content: text, user: username }));
  log.innerHTML += generateDate() + " You: " + text + "<br>";
};

ws.onmessage = (event) => {
  let message = JSON.parse(event.data);
  log.innerHTML +=
    generateDate() +
    ` ${message.user.charAt(0).toUpperCase() + message.user.slice(1)}: ` +
    message.content +
    "<br>";
  new Notification(`New message from ${message.user}`);
  console.log(`New message from ${message.user}: ${message.content}`);
};

ws.onerror = (error) => {
  console.log("Server error message: ", error.message);
};
