const data = require("./data");
const config = require("./config");
const TOKEN = config.TOKEN[0];
const addservice = (data) => {
  const serviceid = Math.floor(Math.random() * 100000000000).toString();
  const filePath = path.join(__dirname, "../data.json");
  const fileData = fs.readFileSync(filePath);
  console.log(fileData);
  const jsonData = JSON.parse(fileData);

  jsonData.service.push({
    ...data,
    serviceid,
  });
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  return serviceid;
};

const deleteservice = (serviceid) => {
  // 删除data.json文件中id为req.body.serviceid的属性
  try {
    const filePath = path.join(__dirname, "data.json");
    const fileData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(fileData);
    jsonData.service = jsonData.service.filter(
      (item) => item.serviceid !== serviceid
    );
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  } catch (err) {
    console.log(err);
  }
  return true;
};

const updateservice = (serviceid, data) => {
  const filePath = path.join(__dirname, "data.json");
  const fileData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(fileData);
  const serviceIndex = jsonData.service.findIndex(
    (item) => item.serviceid === serviceid
  );
  if (serviceIndex !== -1) {
    jsonData.service[serviceIndex] = data;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    return true;
  }
  return false;
};

const getHistoryServices = async () => {
  const datas = await data.getData();
  return datas.historyservice;
};

const getServices = data.getServices;

// getHistoryServices().then((res) => {
//   console.log(res);
// });

const signUp = async ({ serviceId, volunteer }) => {
  const datas = await data.getData();
  const index = datas.services.findIndex(
    (item) => item.serviceid === serviceId
  );
  datas.services[index].volunteers.push(volunteer);
  data.write(datas);
  return index;
};

// signUp({serviceid:1,volunteer:"sai"}).then(res=>{
//     console.log(res);
// })
module.exports = {
  addservice,
  deleteservice,
  updateservice,
  getServices,
  signUp,
  getHistoryServices,
};
