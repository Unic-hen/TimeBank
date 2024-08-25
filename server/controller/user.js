const userUtils = require("../utils/user");
// 基本测试
const test = (req, res) => {
  res.send({
    status: "200",
    message: "测试请求成功",
  });
};
// 登录
const login = (req, res) => {
  userUtils.checkPwd(req.body).then((resp) => {
    // 检查用户密码
    if (resp) {
      //密码正确
      userUtils.getUser(req.body).then((user) => {
        // 登录成功，返回token
        res.send({
          code: 0,
          msg: "登录成功",
          data: { ...user, token: userUtils.generateToken() },
        });
      });
      return;
    }

    res.status(400).json({
      //其他情况都输出不存在
      msg: "密码错误或用户不存在",
    });
  });
  return;
};

// 注册
const register = (req, res) => {
  if (!userUtils.validateAC(req.body.authCode)) {
    return res.send({
      status: 0,
      msg: "验证码错误",
    });
  } else if (userUtils.findUser(req.body)) {
    return res.send({
      msg: "用户已存在",
    });
  }
  res.send({
    status: 1,
    msg: "注册成功",
  });
  // 添加用户
  delete req.body.authCode;
  req.body.role = "default";
  switch (req.body.code) {
    case 1:
      req.body.role = "older";
      break;
    case 2:
      req.body.role = "volunteer";
      break;
    case 0:
      req.body.role = "admin";
      break;
  }
  userUtils
    .addUser({ ...req.body, status: 0, timeCoin: 0 })
    .then((res) => {})
    .catch((e) => {
      console.log(e);
    });
};

// 登出
const logout = (req, res) => {
  res.send({
    status: 1,
    msg: "登出成功",
  });
};

// 更新信息
const updateUser = (req, res) => {
  userUtils
    .updateUser(req.body)
    .then((res) => {})
    .catch((e) => {
      console.log(e);
    });
  // 用一点延时防止消息不对等
  setTimeout(() => {
    userUtils.getUser(req.body).then((user) => {
      res.send({
        status: 1,
        code: 0,
        msg: "更新信息成功",
        userinfo: user,
      });
    });
  }, 100);
};

const logoff = (req, res) => {
  userUtils.logoff(req.body);
  // 注销账号
  res.send({
    status: 1,
    msg: "注销成功",
  });
};

module.exports = {
  login,
  register,
  logout,
  updateUser,
  logoff,
  test,
};
