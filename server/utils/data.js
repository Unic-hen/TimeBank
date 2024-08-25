const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "../data.json");
const getUsers = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const dataObj = JSON.parse(data);
    // 现在你可以安全地使用dataObj了
    return dataObj.user;
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
};

const getServices = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const dataObj = JSON.parse(data);
    // 现在你可以安全地使用dataObj了
    return dataObj.services;
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
};

const serviceAudit = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const dataObj = JSON.parse(data);
    return dataObj.serviceAudit;
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
};

const userAudit = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const dataObj = JSON.parse(data);
    return dataObj.userAudit;
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
};

const getData = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const dataObj = JSON.parse(data);
    return dataObj;
  } catch (e) {
    console.log(e);
  }
};

const write = async (datas) => {
  try {
    await fs.writeFile(
      path.join(__dirname, "../data.json"),
      JSON.stringify(datas, null, 2),
      (err) => {
        if (err) return console.log(err);
        console.log("写入成功");
      }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getData,
  serviceAudit,
  userAudit,
  write,
  getServices,
  getUsers,
};

// 使用示例
// // 调用函数
// getData().then(dataObj => {
// // 在这里使用dataObj
//   // console.log(dataObj);
// }).catch(err => {
// // 处理错误
// console.log(err);
// });
