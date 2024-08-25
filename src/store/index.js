import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./modules/user";
import ServiceReducer from "./modules/service";
import AuditReducer from "./modules/audit";
import ControlReducer from "./modules/control";
import TradeReducer from "./modules/trade";
const store = new configureStore({
  reducer: {
    // 添加reducer
    user: UserReducer,
    service: ServiceReducer,
    audit: AuditReducer,
    control: ControlReducer,
    trade: TradeReducer,
  },
});

export default store;
