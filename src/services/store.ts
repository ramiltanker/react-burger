import { rootReducer } from "./reducers/index";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { socketMiddleware } from "./middleware/SocketMiddleware";
import { socketMiddlewareAuth } from "./middleware/socketMiddlewareAuth";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    socketMiddleware("wss://norma.nomoreparties.space/orders/all"),
    socketMiddlewareAuth("wss://norma.nomoreparties.space/orders"),
    thunk
  )
);

export const store = createStore(rootReducer, enhancer);