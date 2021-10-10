import { combineReducers } from "redux";

import { burgerIngridientsReducer } from "./burgerIngridients";
import { authReducer } from "./auth";
import { feedReducer } from "./feed";
import { userOrdersReducer } from "./userOrders";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngridientsReducer,
  authUser: authReducer,
  feed: feedReducer,
  userOrders: userOrdersReducer,
});
