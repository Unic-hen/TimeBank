const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const app = express();
// 跨域
app.use(cors());
// 使用express.urlencoded()中间件，以解析URL编码的请求体，并将其转换为普通对象
// 解析表单
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);
app.use((err,req,res,next)=>{
  res.send({
    "server error":err.message
  })
})


app.listen(3000, "0.0.0.0",() => {
  console.log("Server is running on port 3000");
});
