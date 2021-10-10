import { store } from "../services/store";
import { TWsActions } from "../services/actions/wsActions";
import { TAuthActions } from "../services/actions/auth";
import { TburgerIngridientsActions } from "../services/actions/burgerIngridients";

import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
  | TWsActions
  | TAuthActions
  | TburgerIngridientsActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
