import { combineReducers } from "redux";

import { burgerIngridientsReducer } from "./burgerIngridients.js";
import { currentIngridientReducer } from "./currentIngridient.js";
import { orderReducer } from "./order.js";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngridientsReducer,
  currentIngridient: currentIngridientReducer,
  order: orderReducer,
});
