import React, { FunctionComponent } from "react";

// Библиотека UI-компонентов
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI-компонентов

import { useHistory } from "react-router";

import {
  GET_BURGER_CONSTRUCTOR_ADD_ITEM,
  GET_BURGER_CONSTRUCTOR_DELETE_ITEM,
  COST_TOTAL_PRICE,
  DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER,
} from "../../services/actions/burgerIngridients";
// Redux

// DND
import { useDrop } from "react-dnd";
// DND

// Стили
import burgerConstructorStyles from "./BurgerConstructor.module.css";
// Стили

// Actions
import { sendOrder } from "../../services/actions/burgerIngridients";
// Actions

// Компоненты
import ConstructorBurgerCard from "../ConstructorBurgerCard/ConstructorBurgerCard";
import { getCookie } from "../../utils/cookie";
// Компоненты

// Types
import { useDispatch, useSelector } from "../../types/typedHooks";

import { TIngridient } from "../../types/burgerIngridients";
import { TBurgerIngridient } from "../../types";
// Types

interface IBurgerConstructorProps {
  handleOpenOrderDetailsModal: () => void;
  isSauce: Boolean;
  isMain: Boolean;
}

type FC<P = IBurgerConstructorProps> = FunctionComponent<P>;

const BurgerConstructor: FC<IBurgerConstructorProps> = (props) => {
  const { burgerConstructorIngridients, bun, totalPrice } = useSelector(
    (state) => state.burgerIngridients
  );

  const history = useHistory();

  const [orderIngridients, setOrderIngridients] = React.useState<
    Array<TIngridient>
  >([]);

  const dispatch = useDispatch();

  // Перетаскивание внутри конструктора
  const moveBurgerConstructor = (item: TBurgerIngridient) => {
    dispatch({
      type: GET_BURGER_CONSTRUCTOR_ADD_ITEM,
      id: item._id,
      ingType: item.type,
      item: item.ing,
    });
    dispatch({ type: COST_TOTAL_PRICE });
  };
  // Перетаскивание внутри конструктора

  const [, dropTarget] = useDrop({
    accept: "ingridients",
    drop(item: TBurgerIngridient) {
      moveBurgerConstructor(item);
    },
  });

  // Удаление ингридиента
  const deleteIngridient = (index: number) => {
    dispatch({ type: GET_BURGER_CONSTRUCTOR_DELETE_ITEM, ingIndex: index });
    dispatch({ type: COST_TOTAL_PRICE });
  };
  // Удаление ингридиента

  // Сортировка ингридиентов
  React.useEffect(() => {
    const sortIngridients = () => {
      const sortedIng = burgerConstructorIngridients.filter(
        (item) => item.type !== "bun"
      );
      setOrderIngridients(sortedIng);
    };
    sortIngridients();
  }, [burgerConstructorIngridients]);
  // Сортировка ингридиентов

  const content = React.useMemo(
    () =>
      orderIngridients &&
      orderIngridients.map((item: TIngridient, index: number) => {
        return (
          <ConstructorBurgerCard
            key={index}
            item={item}
            ingIndex={index}
            close={() => {
              deleteIngridient(index);
            }}
          />
        );
      }),
    [orderIngridients]
  );

  const ingridientsIds = React.useMemo(() => {
    let ingridientsIdArr;
    ingridientsIdArr = burgerConstructorIngridients.map((ing) => {
      return ing._id!;
    });
    if (bun) {
      ingridientsIdArr.push(bun._id!, bun._id!);
    }
    return ingridientsIdArr;
  }, [burgerConstructorIngridients, bun]);

  // Отправка заказа
  const handleSendOrder = () => {
    if (!getCookie("accessToken")) {
      history.push("/login");
    } else {
      const accessToken = getCookie("accessToken");

      const burgerConstructorIngridientsTypes =
        burgerConstructorIngridients.map((ing) => {
          return ing.type;
        });
      const isSauce = burgerConstructorIngridientsTypes.indexOf("sauce") !== -1;
      const isMain = burgerConstructorIngridientsTypes.indexOf("main") !== -1;

      if ((isSauce && bun) || (isMain && bun)) {
        props.handleOpenOrderDetailsModal();
        dispatch(sendOrder(ingridientsIds, accessToken));
      }

      dispatch({ type: DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER });
    }
  };

  // Отправка заказа

  return (
    <section
      className={`${burgerConstructorStyles.burger_constructor} mt-25 ml-10`}
      ref={dropTarget}
      data-testid="burger-constructor"
    >
      {bun.name && (
        <div className={burgerConstructorStyles.first_card}>
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={bun.name}
            price={bun.price!}
            thumbnail={bun.image!}
          />
        </div>
      )}
      <div
        className={burgerConstructorStyles.elements_container}
        data-testid="ingridients-container"
      >
        {content}
      </div>
      {bun.name && (
        <div className={burgerConstructorStyles.last_card}>
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={bun.name}
            price={bun.price!}
            thumbnail={bun.image!}
          />
        </div>
      )}
      <div className={`${burgerConstructorStyles.general_price} mt-10`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <p className={`mr-3`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={handleSendOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
