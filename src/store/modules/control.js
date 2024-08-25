import { createSlice } from "@reduxjs/toolkit";
import { getUserListApi } from "@/api/apis/control";
// location
const _setUserList_ = (events) => {
  window.sessionStorage.setItem("userList", JSON.stringify(events)); // 将userInfo对象转换为JSON字符串，并存储在session
};
const _getUserList_ = () => {
  return JSON.parse(window.sessionStorage.getItem("userList"));
};
const ControlStore = createSlice({
  name: "control",
  initialState: {
    userList: _getUserList_() || [],
  },
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload;
      _setUserList_(action.payload);
    },
  },
});

const { setUserList } = ControlStore.actions;
const fetchUserList = (data) => {
  return async (dispatch) => {
    const res = await getUserListApi(data);
    // console.log(res.data, "control");
    if (res.status === 200) {
      dispatch(setUserList(res.data.data));
    }
  };
};
export { fetchUserList };
const ControlReducer = ControlStore.reducer;
export default ControlReducer;
