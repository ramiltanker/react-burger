import React from "react";

import PropTypes from "prop-types";
// Библиотека UI-компонентов
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI-компонентов

// Redux
import { useDispatch, useSelector } from "react-redux";

import {
  GET_BURGER_CONSTRUCTOR_ADD_ITEM,
  GET_BURGER_CONSTRUCTOR_DELETE_ITEM,
  COST_TOTAL_PRICE,
  DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER
} from "../../services/actions/burgerIngridients.js";
// Redux

// DND
import { useDrop, useDrag } from "react-dnd";
// DND

// Стили
import burgerConstructorStyles from "./BurgerConstructor.module.css";
// Стили

// Actions
import { sendOrder } from "../../services/actions/burgerIngridients.js";
// Actions

// Компоненты
import ConstructorBurger from "../ConstructorBurgerCard/ConstructorBurgerCard.js";
// Компоненты

const cardsInfoPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    _id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.any,
    image_mobile: PropTypes.any,
    image_large: PropTypes.any,
    __v: PropTypes.number.isRequired,
  })
);


function BurgerConstructor(props) {
  const { burgerConstructorIngridients, bun, totalPrice } = useSelector(
    (state) => state.burgerIngridients
  );


  const [orderIngridients, setOrderIngridients] = React.useState([]);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingridients",
    drop(item) {
      moveBurgerConstructor(item);
    },
  });

  // Перетаскивание внутри конструктора
  const moveBurgerConstructor = (item) => {
    dispatch({
      type: GET_BURGER_CONSTRUCTOR_ADD_ITEM,
      id: item.id,
      ingType: item.type,
      item: item.ing,
    });
    dispatch({type: COST_TOTAL_PRICE});
  };
  // Перетаскивание внутри конструктора

  // Удаление ингридиента
  const deleteIngridient = (index) => {
    dispatch({ type: GET_BURGER_CONSTRUCTOR_DELETE_ITEM, ingIndex: index });
    dispatch({ type: COST_TOTAL_PRICE});
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
      orderIngridients.map((item, index) => {
        return (
          <ConstructorBurger
            key={index}
            item={item}
            ingIndex={index}
            сlose={() => {
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
      return ing._id;
    });
    if (bun) {
      ingridientsIdArr.push(bun._id, bun._id);
    }
    return ingridientsIdArr;
  }, [burgerConstructorIngridients, bun]);

  // Отправка заказа
  const handleSendOrder = (e) => {
    e.preventDefault();
    const burgerConstructorIngridientsTypes = burgerConstructorIngridients.map(
      (ing) => {
        return ing.type;
      }
    );
    const isSauce = burgerConstructorIngridientsTypes.indexOf("sauce") !== -1;
    const isMain = burgerConstructorIngridientsTypes.indexOf("main") !== -1;

    if ((isSauce && bun) || (isMain && bun)) {
      props.handleOpenOrderModal();
      dispatch(sendOrder(ingridientsIds));
    }

    dispatch({type: DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER});
  };
  // Отправка заказа

  return (
    <section
      className={`${burgerConstructorStyles.burger_constructor} mt-25 ml-10`}
      ref={dropTarget}
    >
      {bun.name && (
        <div className={burgerConstructorStyles.first_card}>
          <ConstructorElement
            className={burgerConstructorStyles.card}
            type={"top"}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={burgerConstructorStyles.elements_container}>
        {content}
      </div>
      {bun.name && (
        <div className={burgerConstructorStyles.last_card}>
          <ConstructorElement
            className={burgerConstructorStyles.card}
            type={"bottom"}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={`${burgerConstructorStyles.general_price} mt-10`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <p className={`mr-3`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={(e) => {
            handleSendOrder(e);
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  handleOpenOrderModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
