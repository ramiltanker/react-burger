import { combineReducers } from "redux";

import { burgerIngridientsReducer } from "./burgerIngridients.js";
import { authReducer } from "./auth.js";
import { feedReducer } from "./feed.js";
import { userOrdersReducer } from "./userOrders.js";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngridientsReducer,
  authUser: authReducer,
  feed: feedReducer,
  userOrders: userOrdersReducer
});
