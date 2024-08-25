import http from "..";
// 创建账号：在注册时创建
export const createAccountApi = (data) => {
  // password
  console.log(data, "data");
  return http.post("/creatAccount", data);
};
// 交易
export const transferApi = (data) => {
  // password,receipt,amount
  return http.post("/transfer", data);
};
// 钱包
export const walletApi = (params) => {
  // address
  return http.get("/getAccountBalance", { params: { ...params } });
};
// 获取历史记录
export const getHistoryApi = () => {
  return http.get("/getHistoryTrades");
};
//获取所有交易信息
export const getAllTradesApi = () => {
  return http.get("/homepanel");
};
