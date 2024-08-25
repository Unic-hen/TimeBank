const ws = require("nodejs-websocket");

const socket = ws.createServer((conn) => {
  conn.on("text", (str) => {
    console.log("Received " + str);
  });
  conn.on("close", () => {
    console.log("Connection closed");
  });
  conn.on("error", (err) => {
    console.log("error" + err);
  });
});

socket.listen(3000, "0.0.0.0", () => {
  console.log("Server started on port 3000");
});
