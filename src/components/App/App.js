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
import Main from "../Main/Main.js";
// Компоненты

// Информация для карточек
import cardsInfo from "../../constants/cards.json";
// Информация для карточек

function App() {

  function useHover() {
    const [isHovered, setIsHovered] = React.useState(false);
    const on = () => setIsHovered(true);
    const off = () => setIsHovered(false);
    return { isHovered, on, off };
  }

  return (
    <>
      <Main cardsInfo={cardsInfo} useHover={useHover} />
    </>
  );
}

export default App;
