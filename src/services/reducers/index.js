import { combineReducers } from "redux";

import { burgerIngridientsReducer } from "./burgerIngridients.js";
import { currentIngridientReducer } from "./currentIngridient.js";
import { authReducer } from "./auth.js";
import { orderReducer } from "./order.js";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngridientsReducer,
  authUser: authReducer,
  currentIngridient: currentIngridientReducer,
  order: orderReducer,
});
