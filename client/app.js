// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  //Showing message
  console.log("Message from server ", event.data);
  const para = document.createElement("p");
  const node = document.createTextNode(event.data);
  para.appendChild(node);
  const element = document.getElementById("data");
  element.appendChild(para);
});

const sendMessage = () => {
  socket.send("Hello From Client1!");
};
