import { rootReducer } from "./reducers/index";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { socketMiddleware } from "./middleware/SocketMiddleware";
import { socketMiddlewareAuth } from "./middleware/socketMiddlewareAuth";

// Constants
import { WSS_NOMOREPARTIES } from "../utils/constants";
// Constants

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    socketMiddleware(`${WSS_NOMOREPARTIES}/orders/all`),
    socketMiddlewareAuth(`${WSS_NOMOREPARTIES}/orders`),
    thunk
  )
);

export const store = createStore(rootReducer, enhancer);
