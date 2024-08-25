const data = require("./data");
const config = require("./config");
const TOKEN = config.TOKEN;
const AUTH_CODE = config.AUTH_CODE;
const validateAC = (authCode) => {
  if (AUTH_CODE.indexOf(authCode) == -1) return false;
  return true; //验证成功
};

// 使用uuid生成token并返回
const generateToken = () => {
  const uuidv4 = require("uuid").v4;
  // return uuidv4();
  return TOKEN[0];
};
const checkPwd = async ({ mobile, idCard, password }) => {
  const users = await data.getUsers();
  const targetUser = users.filter((user) => {
    return user.mobile == mobile || user.idCard == idCard;
  })[0];
  if (!targetUser) return 0;
  else if (targetUser.password == password) {
    return 1;
  }
};

const addUser = async (user) => {
  const datas = await data.getData();
  datas.user.push(user);
  data.write(datas);
};

const getUser = async ({ mobile, idCard }) => {
  const users = await data.getUsers();
  const User = users.filter(
    (item) => item.mobile == mobile || item.idCard == idCard
  )[0];
  return User;
};

const findUser = async (user) => {
  const datas = await data.getData();
  const index = datas.user.findIndex(
    (item) => item.idCard == user.idCard || item.mobile == user.mobile
  );
  if (index) {
    return index;
  }
  return 0;
};

const updateUser = async (user) => {
  const datas = await data.getData();
  const index = findUser(user);
  datas.user[index] = user;
  data.write(datas);
};
const logoff = async (idCard) => {
  const datas = await data.getData();
  const index = datas.user.findIndex((item) => item.idCard == idCard);
  datas.user.splice(index);
  data.write(datas);
};
const validToken = (token) => {
  return TOKEN[0] == token;
};

module.exports = {
  checkPwd,
  addUser,
  getUser,
  updateUser,
  logoff,
  findUser,
  generateToken,
  validateAC,
  validToken,
};

// checkPwd({ mobile: "13800138007", password: "123456789a" }).then((res) => {
//   console.log(res);
// });

// getUser({mobile:"13800138001",idCard:"4406821996010033"}).then(res=>{

// }
