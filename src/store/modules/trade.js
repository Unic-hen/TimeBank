import { createSlice } from "@reduxjs/toolkit";
import {
  createAccountApi,
  transferApi,
  getHistoryApi,
  getAllTradesApi,
} from "@/api/apis/trade";
import Cookies from "js-cookie";
export const _getAddress_ = () => {
  return Cookies.get("address");
};
const _setAddress_ = (address) => {
  Cookies.set("address", address);
};
const _getHistoryTrade_ = () => {
  return JSON.parse(window.sessionStorage.getItem("historyTrade"));
};
const _setHistoryTrade_ = (historyTrade) => {
  window.sessionStorage.setItem("historyTrade", JSON.stringify(historyTrade));
};
const _getTardes_ = () => {
  return JSON.parse(window.sessionStorage.getItem("trade"));
};
const _setTardes_ = (trades) => {
  window.sessionStorage.setItem("trade", JSON.stringify(trades));
};
const tradeStore = createSlice({
  name: "trade",
  initialState: {
    address: _getAddress_() || "",
    historyTrade: _getHistoryTrade_() || [],
    trades: _getTardes_() || [],
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
      _setAddress_(action.payload);
    },
    setHistoryTrade: (state, action) => {
      state.historyTrade = action.payload;
      _setHistoryTrade_(action.payload);
    },
    setTrades: (state, action) => {
      state.trades = action.payload;
      _setTardes_(action.payload);
    },
  },
});

const { setAddress, setTrades, setHistoryTrade } = tradeStore.actions;

export const createAccount = (data) => {
  return async (dispatch) => {
    const res = await createAccountApi(data);
    if (res.status === 200) {
      dispatch(setAddress(res.data.data.address));
    }
  };
};

export const transfer = (data) => {
  return async (dispatch) => {
    const res = await transferApi(data);
    if (res.status === 200) {
      return res.data.msg;
    }
  };
};

export const history = () => {
  return async (dispatch) => {
    const res = await getHistoryApi();
    if (res.status === 200) {
      dispatch(setHistoryTrade(res.data.data));
      // console.log(res.data.data);
    }
  };
};
export const getTrades = () => {
  return async (dispatch) => {
    const res = await getAllTradesApi();
    if (res.status === 200) {
      dispatch(setTrades(res.data.data));
    }
  };
};

const TradeReducer = tradeStore.reducer;
export default TradeReducer;
