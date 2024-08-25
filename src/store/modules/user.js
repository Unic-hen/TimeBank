import { createSlice } from "@reduxjs/toolkit";
import { registerApi, loginApi, getAuthcodeApi } from "@/api/apis/user";
import { clearHistory } from "./service";
import Cookies from "js-cookie";
import { updatePwdApi, updateUserApi } from "@/api/apis/user";
// 用户信息持久化
const _setToken_ = (token) => {
  Cookies.set("token", token); // 设置名为'token'的cookie，值为token
};
const _getToken_ = () => {
  return Cookies.get("token"); // 获取名为'token'的cookie的值
};
const _removeToken_ = () => {
  Cookies.remove("token"); // 删除名为'token'的cookie
};
const _setUserInfo_ = (userInfo) => {
  window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo)); // 将userInfo对象转换为JSON字符串，并存储在session
};
const _getUserInfo_ = () => {
  return JSON.parse(window.sessionStorage.getItem("userInfo")); // 获取session中的userInfo对象，并转换为JavaScript对象
};
const _removeUserInfo_ = () => {
  window.sessionStorage.removeItem("userInfo"); // 删除session中的userInfo对象
};
// store redux
const userStore = createSlice({
  name: "user",
  initialState: {
    token: _getToken_() || "",
    userInfo: _getUserInfo_() || {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // 持久化token
      _setToken_(action.payload);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      // 持久化用户信息
      _setUserInfo_(action.payload);
    },
    clearInfo: (state) => {
      (state.token = ""), (state.userInfo = {});
      _removeToken_();
      _removeUserInfo_();
    },
  },
});

const { setToken, setUserInfo, clearInfo } = userStore.actions;

const fetchRegister = (data) => {
  return async (dispatch) => {
    const res = await registerApi(data);
    console.log(res);
    if (res.status == 200) {
      return res.data.msg;
    }
  };
};

const fetchLogin = (data) => {
  return async (dispatch) => {
    const res = await loginApi(data);
    if (res.status === 200) {
      console.log(res, "res");
      dispatch(setToken(res.data.data.token)); // 设置token到redux store中
      dispatch(setUserInfo({ ...res.data.data.userinfo })); // 设置用户信息到redux store中
      return res.data.data.code;
    }
    return res.response.data.msg;
  };
};

const logout = () => {
  return async (dispatch) => {
    dispatch(clearInfo());
    dispatch(clearHistory());
  };
};

const updateInfo = (data) => {
  return async (dispatch) => {
    const res = await updateUserApi(data);
    console.log(res, "res/update");
    if (res.status === 200) {
      dispatch(setUserInfo({ ...res.data.data.userinfo }));
    }
    return res.data.data.userinfo;
  };
};

const updatePwd = (data) => {
  return async (dispatch) => {
    const res = await updatePwdApi(data);
    console.log(res, "res/updatePwd");
    // if (res.status===200){
    //   dispatch(setUserInfo({...res.data.data.userinfo}))
    // }
  };
};
const getAuthcode = (data) => {
  console.log(data, "data");
  return async (dispatch) => {
    const res = await getAuthcodeApi(data);
    return res;
  };
};

export {
  fetchRegister,
  fetchLogin,
  logout,
  _getToken_,
  updateInfo,
  updatePwd,
  getAuthcode,
};

// 导出UserReducer
const UserReducer = userStore.reducer;
export default UserReducer;
