import http from "..";
export const getUserListApi = (data) => {
  return http.post("/admin/getUserList", data);
};
