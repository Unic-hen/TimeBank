const express = require("express");
const cors = require("cors");
const app = express();

// Express内置中间件
// app.use(express.static()) //托管静态资源的内置中间件
// app.use(express.json()) //解析json格式请求数据的中间件，4.16版本以上可用
// app.use(express.urlencoded({ extended: false })) //解析url-encoded格式请求体数据，4.16版本以上可用

// 中间件案例：解析表单
const urlencoded = (req, res, next) => {
  let str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  req.on("end", () => {
    const result = {};
    str = str.split("&");
    str.forEach((item) => {
      const [key, value] = item.split("=");
      result[key] = decodeURIComponent(value);
    });

    console.log(result);
  });

  next();
};

app.use(cors()); // 全局启用cors

// 中间件
const log = (req, res, next) => {
  console.log(`中间件`);
  next();
};
// 全局中间件，所有中间件公用同一份req和res
// app.use(log)

// 局部中间件
const logs = (req, res, next) => {
  console.log("这是局部中间件");
  next();
};
// 多个局部中间件采用数组存放
app.get("/testlogs", [logs], (req, res) => {
  res.send("这是局部中间件");
});

app.post("/test", [urlencoded], (req, res) => {
  // throw new Error('测试错误'); // 抛出一个错误
  // console.log(req);
  res.json({ message: "Hello from /test endpoint!" });
});

// 捕获所有路由错误的中间件中间件
app.use((err, req, res, next) => {
  console.log(err.message);
  res.send({ error: err.message });
});

// 监听80端口

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
// // 使用websocket案例
// const WebSocket = require("ws");

// // 创建WebSocket服务器
// const wss = new WebSocket.Server({ port: 8080 });

// // 监听客户端连接事件
// wss.on("connection", (ws) => {
//   console.log("客户端已连接");

//   // 监听客户端发送的消息
//   ws.on("message", (message) => {
//     console.log("收到消息：", message);

//     // 向客户端发送消息
//     ws.send("服务器收到了你的消息：" + message);
//   });

//   // 监听客户端断开连接事件
//   ws.on("close", () => {
//     console.log("客户端已断开连接");
//   });
// });
