import { createSlice } from "@reduxjs/toolkit";

import {
  createServiceApi,
  delServiceApi,
  updateServiceApi,
  getHistoryServiceApi,
  getServicesListApi,
  volunteerSignUpApi,
  getHistoryListApi,
} from "@/api/apis/service";
// 数据持久化
const _setServicesList_ = (services) => {
  window.sessionStorage.setItem("servicesList", JSON.stringify(services));
};
const _getServicesList_ = () => {
  return JSON.parse(window.sessionStorage.getItem("servicesList"));
};

const _setDemanderHistory_ = (services) => {
  window.sessionStorage.setItem("DemanderHistory", JSON.stringify(services));
};
const _getDemanderHistory_ = () => {
  return JSON.parse(window.sessionStorage.getItem("DemanderHistory"));
};
const _setvolunteerHistory_ = (services) => {
  window.sessionStorage.setItem("volunteerHistory", JSON.stringify(services));
};
const _getvolunteerHistory_ = () => {
  return JSON.parse(window.sessionStorage.getItem("volunteerHistory"));
};
const _removeHistory_ = () => {
  window.localStorage.removeItem("demanderHistory");
  window.localStorage.removeItem("volunteerHistory");
};
// store
const ServiceStore = createSlice({
  name: "service",
  initialState: {
    servicesList: _getServicesList_() || [], // 志愿者获取的活动列表
    demanderHistory: _getDemanderHistory_() || [], // 需求者的历史服务
    volunteerHistory: _getvolunteerHistory_() || [], // 志愿者的历史服务
  },
  reducers: {
    setServicesList: (state, action) => {
      state.servicesList = action.payload;
      _setServicesList_(action.payload);
    },
    setDemanderHistory: (state, action) => {
      state.demanderHistory = action.payload;
      _setDemanderHistory_(action.payload);
    },
    setVolunteerHistory: (state, action) => {
      state.volunteerHistory = action.payload;
      _setvolunteerHistory_(action.payload);
    },
    clear: (state) => {
      state.demanderHistory = [];
      state.volunteerHistory = [];
      _removeHistory_();
    },
  },
});

const { setServicesList, clear, setDemanderHistory, setVolunteerHistory } =
  ServiceStore.actions;
//  当用户登出后清除用户的历史数据
export const clearHistory = () => {
  return (dispatch) => {
    dispatch(clear());
  };
};
// 获取服务列表
export const fetchServices = (request) => {
  return async (dispatch) => {
    const res = await getServicesListApi(request);
    if (res.status === 200) {
      // redux管理和持久化
      dispatch(setServicesList(res.data.data.list));
    }
  };
};
// 获取志愿者服务历史
export const fetchVolunteer = (request) => {
  return async (dispatch) => {
    const res = await getHistoryListApi(request);
    if (res.status === 200) {
      dispatch(setVolunteerHistory(res.data.data.list));
    }
  };
};
// 获取需求者服务历史
export const fetchDemander = (request) => {
  return async (dispatch) => {
    const res = await getHistoryServiceApi(request);
    if (res.status === 200) {
      dispatch(setDemanderHistory(res.data.data.list));
    }
  };
};
// 创建新活动
export const createService = (data) => {
  return async (dispatch) => {
    const res = await createServiceApi(data);
    if (res.status === 200) {
      return res.data.msg;
    }
    console.log("createService Error", res);
  };
};
// 删除活动
export const delService = (data) => {
  return async () => {
    const res = await delServiceApi(data);
    if (res.status === 200) {
      return res.data.msg;
    }
    console.log("delService Error");
  };
};
// 更新活动
export const updateService = (data) => {
  return async () => {
    const res = await updateServiceApi(data);
    if (res.status === 200) {
      return res.data.msg;
    }
    console.log("updateService Error", res);
  };
};
// 志愿者参与
export const volunteerSignUp = (data) => {
  return async () => {
    const res = await volunteerSignUpApi(data);
    if (res.status === 200) {
      return res.data.msg;
    }
    console.log("volunteerSignUp Error");
  };
};

const serviceReducer = ServiceStore.reducer;
export default serviceReducer;
