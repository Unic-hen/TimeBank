import http from "..";
// 获取用户审核列表
export const getUserAuditList = () => {
  return http.get("/audit/users");
};
// 获取服务审核列表
export const getServiceAudit = (params) => {
  return http.get("/audit/serviceList", { params: { ...params } });
};

// 提交审核结果api
// http://localhost:3000/api/audit/service/result
export const submitAuditInfoApi = (data) => {
  return http.post("/audit/info", data);
};
export const submitAuditSignApi = (data) => {
  return http.post("/audit/sign", data);
};
export const submitAuditReleaseApi = (data) => {
  return http.post("/audit/release", data);
};
export const submitAuditServiceApi = (data) => {
  return http.post("/audit/service/result", data);
};
