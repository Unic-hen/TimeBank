import { createSlice } from "@reduxjs/toolkit";
import {
  getServiceAudit,
  getUserAuditList,
  submitAuditInfoApi,
  submitAuditSignApi,
  submitAuditReleaseApi,
  submitAuditServiceApi,
} from "@/api/apis/audit";

// 使用浏览器缓存数据，持久化
// servises
const _setAuditEventList_ = (events) => {
  window.sessionStorage.setItem("auditEventList", JSON.stringify(events));
};
const _getAuditEventList_ = () => {
  return JSON.parse(window.sessionStorage.getItem("auditEventList"));
};
const _setAuditUsersList_ = (users) => {
  window.sessionStorage.setItem("auditUsersList", JSON.stringify(users));
};
const _getAuditUsersList_ = () => {
  return JSON.parse(window.sessionStorage.getItem("auditUsersList"));
};
// 管理数据
const AuditStore = createSlice({
  name: "audit",
  initialState: {
    auditUsersList: _getAuditUsersList_() || [],
    auditEventList: _getAuditEventList_() || [],
  },
  reducers: {
    setAuditUsersList: (state, action) => {
      state.auditUsersList = action.payload;
      _setAuditUsersList_(action.payload);
    },
    setAuditEventList: (state, action) => {
      state.auditEventList = action.payload;
      _setAuditEventList_(action.payload);
    },
  },
});

const { setAuditEventList, setAuditUsersList } = AuditStore.actions;

const fetchAuditEventList = (params) => {
  return async (dispatch) => {
    const res = await getServiceAudit(params);
    if (res.status === 200) {
      dispatch(setAuditEventList(res.data.data.list));
    }
  };
};

const fetchAuditUsersList = () => {
  return async (dispatch) => {
    const res = await getUserAuditList();
    if (res.status === 200) {
      dispatch(setAuditUsersList(res.data.data));
    }
  };
};
const fetchAuditSignResult = (data) => {
  return async (dispatch) => {
    const res = await submitAuditSignApi(data);
    return res;
  };
};
const fetchAuditRealeaseResult = (data) => {
  return async (dispatch) => {
    const res = await submitAuditReleaseApi(data);
    return res;
  };
};
const fetchAuditInfoResult = (data) => {
  return async (dispatch) => {
    const res = await submitAuditInfoApi(data);
    return res;
  };
};
const fetchServiceResult = (data) => {
  return async (dispatch) => {
    const res = await submitAuditServiceApi(data);
  };
};
export {
  fetchAuditUsersList,
  fetchAuditEventList,
  fetchAuditInfoResult,
  fetchAuditSignResult,
  fetchAuditRealeaseResult,
  fetchServiceResult,
};
const AuditReducer = AuditStore.reducer;
export default AuditReducer;
