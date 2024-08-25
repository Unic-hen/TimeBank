// // 接受data.js文件的数据
// const dataObj = require('./data');
// console.log(dataObj);
const serviceUtils = require("../utils/service");
const service = (req, res) => {
  // 读取data.json文件“service”属性，返回的是列表，在列表中添加data对象
  try {
    res.send({
      status: 1,
      code: 1,
      msg: "创建服务成功",
      // 随机生成12位的数字作为id
      serviceid: serviceUtils.addservice(req.body),
    });
  } catch (err) {
    res.send({
      status: 0,
      code: 0,
      msg: "创建服务失败",
    });
    console.log(err);
  }
};

const deleteService = (req, res) => {
  try {
    serviceUtils.deleteservice(req.body.serviceid);
    res.send({
      status: 1,
      code: 1,
      msg: "删除服务成功",
    });
  } catch (err) {
    res.send({
      status: 1,
      code: 1,
      msg: "删除服务失败",
    });
    console.log(err);
  }
};

const updateService = (req, res) => {
  // 更新data.json文件中id为req.body.serviceid的属性
  try {
    serviceUtils.updateservice(req.body);
    res.send({
      status: 1,
      code: 1,
      msg: "更新服务成功",
    });
  } catch (err) {
    res.send({
      status: 0,
      code: 1,
      msg: "该服务不存在",
    });
    console.log(err);
  }
};

const getServices = (req, res) => {
  try {
    serviceUtils.getServices().then((services) => {
      console.log(services);
      res.send({
        status: 1,
        code: 2,
        msg: "获取服务列表成功",
        service: services,
        total: services.length,
      });
    });
  } catch (err) {
    res.send({
      status: 0,
      code: 2,
      msg: "获取服务列表失败",
    });
    console.log(err);
  }
};

const getHistory = (req, res) => {
  try {
    serviceUtils.getHistoryServices().then((services) => {
      return res.send({
        status: 1,
        code: 2,
        msg: "获取历史服务列表成功",
        historyservice: services,
      });
    });
  } catch (err) {
    res.send({
      status: 0,
      code: 2,
      msg: "获取历史服务列表失败",
    });
  }
};

const volunteerSignUp = (req, res) => {
  try {
    const { serviceId, volunteer } = req.body;
    if (!serviceId || !volunteer) {
      res.status(406).send({
        code: 2,
        msg: "参数不完整",
      });
    }
    serviceUtils.signUp(req.body).then(() => {
      res.send({
        code: 2,
        msg: "报名成功",
      });
    });
  } catch (err) {
    res.send({
      code: 2,
      msg: "报名失败",
    });
    console.log(err);
  }
};

module.exports = {
  updateService,
  getServices,
  getHistory,
  service,
  deleteService,
  volunteerSignUp,
};
