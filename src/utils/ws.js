const ws = new WebSocket("ws://localhost:3000/webSocket/test");
ws.onopen = () => {
  console.log("open");
};
// 写个websocket示例
ws.onmessage = (event) => {
  console.log("收到消息:", event.data);
};
ws.onclose = (event) => {
  console.log("WebSocket 连接已关闭", event.code, event.reason);
};
ws.onerror = (error) => {
  console.error("WebSocket 发生错误:", error);
};
