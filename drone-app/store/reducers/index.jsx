import isLoggedReducer from "./isLogged";
import CountReducer from "./count";
import FinalCostReducer from "./finalCost";
import DiscountCodeReducer from "./discountCode";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "isLoggedReducer",
    "CountReducer",
    "FinalCostReducer",
    "DiscountCodeReducer",
  ],
};

const rootReducer = combineReducers({
  isLoggedReducer,
  CountReducer,
  FinalCostReducer,
  DiscountCodeReducer,
});

export default persistReducer(persistConfig, rootReducer);
