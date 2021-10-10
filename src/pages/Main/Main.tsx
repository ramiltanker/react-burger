import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";

// Компоненты
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
// Компоненты

// DND
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
// DND

// Стили
import mainStyles from "./Main.module.css";
// Стили

interface IMainProps {
  handleOpenIngridientsModal: (item: any) => void;
  handleOpenOrderDetailsModal: () => void;
  isSauce: Boolean;
  isMain: Boolean;
}

type FC<P = IMainProps> = FunctionComponent<P>;

const Main: FC<IMainProps> = (props) => {
  return (
    <>
      <main className={mainStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            handleOpenIngridientsModal={props.handleOpenIngridientsModal}
          />
          <BurgerConstructor
            handleOpenOrderDetailsModal={props.handleOpenOrderDetailsModal}
            isSauce={props.isSauce}
            isMain={props.isMain}
          />
        </DndProvider>
      </main>
    </>
  );
};

export default Main;
