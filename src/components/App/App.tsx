import React from "react";
import {
  Route,
  Switch,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";

import "./App.css";

// Компоненты
import AppHeader from "../AppHeader/AppHeader.js";
import Main from "../Main/Main.js";
// Компоненты

// Информация для карточек
import cardsInfo from "../../constants/cards.json";
// Информация для карточек

function App() {
  return (
    <>
      <AppHeader />
      <Main cardsInfo={cardsInfo} />
    </>
  );
}

export default App;
