import http from "..";

export const registerApi = (data) => {
  return http.post("/register", data);
};
export const loginApi = (data) => {
  return http.post("/login", data);
};
export const updateUserApi = (data) => {
  return http.put("/userinfo", data);
};
export const updatePwdApi = (data) => {
  return http.put("/changePassword", data);
};

export const loginAdminApi = (data) => {
  return http.post("/admin", data);
};
export const getAuthcodeApi = (data) => {
  return http.post(`/register/verify?mobile=${data.mobile}`);
};
