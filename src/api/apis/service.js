import http from "..";
export const createServiceApi = (data) => {
  return http.post("/service", data);
};

export const delServiceApi = (data) => {
  return http.delete("/service/delete", { params: data });
};

export const updateServiceApi = (data) => {
  return http.put("/service/update", data);
};
export const getHistoryServiceApi = (params) => {
  return http.get("/historyServiceList", { params: { ...params } });
};

export const getServicesListApi = (params) => {
  return http.get("/serviceList", { params: { ...params } });
};

export const volunteerSignUpApi = (data) => {
  return http.post(`/volunteerSignUp?id=${data.id}`);
  // /volunteerSignUp
};
export const getHistoryListApi = (params) => {
  return http.get("/historyList", { params: { ...params } });
};
