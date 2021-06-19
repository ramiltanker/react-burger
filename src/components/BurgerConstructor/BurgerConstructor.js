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
} from "../../services/actions/burgerIngridients.js";
// Redux

// DND
import { useDrop } from "react-dnd";
// DND

// Стили
import burgerConstructorStyles from "./BurgerConstructor.module.css";
// Стили

// Context
import { IngridientsCostContext } from "../../services/ingridientsContext.js";
// Context

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
const initialState = { price: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "calculate":
      return { price: action.price };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor(props) {
  const { burgerConstructorIngridients } = useSelector(
    (state) => state.burgerIngridients
  );

  const [buns, setBuns] = React.useState([]);
  const [orderIngridients, setOrderIngridients] = React.useState([]);
  const [totalPriceState, totalPriceDispatch] = React.useReducer(
    reducer,
    initialState
  );

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const sortBuns = () => {
  //     const bunsArr = burgerConstructorIngridients.filter((item) => item.type === "bun");
  //     setBuns(bunsArr.slice(0, 1));
  //   };
  //   sortBuns();
  //   const sortIngridients = () => {
  //     const sortedIng = burgerConstructorIngridients.filter((item) => item.type !== "bun");
  //     setOrderIngridients(sortedIng);
  //   };
  //   sortIngridients();
  // }, [burgerConstructorIngridients]);

  // React.useEffect(() => {
  //   const handleCalculatePrice = () => {
  //     const price = orderIngridients.concat(buns).reduce((prev, cur) => {
  //       return prev + cur.price;
  //     }, 0);
  //     totalPriceDispatch({ type: "calculate", price: price });
  //   };
  //   handleCalculatePrice();
  // }, [orderIngridients, buns]);

  const [, dropTarget] = useDrop({
    accept: "ingridients",
    drop(item) {
      moveBurgerConstructor(item);
    },
  });

  const moveBurgerConstructor = (item) => {
    dispatch({
      type: GET_BURGER_CONSTRUCTOR_ADD_ITEM,
      id: item.id,
    });
  };

  return (
    <section
      className={`${burgerConstructorStyles.burger_constructor} mt-25 ml-10`}
      ref={dropTarget}
    >
      {buns &&
        buns.map((item, index, arr) => {
          return (
            <div className={burgerConstructorStyles.first_card} key={index}>
              <ConstructorElement
                className={burgerConstructorStyles.card}
                type={"top"}
                isLocked={"locked"}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      <div className={burgerConstructorStyles.elements_container}>
        {burgerConstructorIngridients &&
          burgerConstructorIngridients.map((item, index) => {
            return (
              <div className={burgerConstructorStyles.box} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  className={burgerConstructorStyles.card}
                  isLocked={"locked"}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            );
          })}
      </div>
      {buns &&
        buns.map((item, index, arr) => {
          return (
            <div className={burgerConstructorStyles.last_card} key={index}>
              <ConstructorElement
                className={burgerConstructorStyles.card}
                type={"bottom"}
                isLocked={"locked"}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      <div className={`${burgerConstructorStyles.general_price} mt-10`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <p className={`mr-3`}>{totalPriceState.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={props.handleOpenOrderModal}
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

{
  /* <div className={burgerConstructorStyles.box}>
<ConstructorElement
  type="top"
  isLocked={true}
  text="Краторная булка N-200i (верх)"
  price={200}
  thumbnail={"props.cardsInfo[0].image"}
/>
</div>
<div className={burgerConstructorStyles.box}>
<DragIcon type="primary" />
<ConstructorElement
  text="Соус традиционный галактический"
  price={30}
  thumbnail={"props.cardsInfo[5].image"}
  className={burgerConstructorStyles.element}
/>
</div>
<div className={burgerConstructorStyles.box}>
<DragIcon type="primary" />
<ConstructorElement
  text="Мясо бессмертных моллюсков Protostomia"
  price={300}
  thumbnail={"props.cardsInfo[4].image"}
/>
</div>
<div className={burgerConstructorStyles.box}>
<DragIcon type="primary" />
<ConstructorElement
  text="Плоды Фалленианского дерева"
  price={300}
  thumbnail={"props.cardsInfo[10].image"}
/>
</div>
<div className={burgerConstructorStyles.box}>
<DragIcon type="primary" />
<ConstructorElement
  text="Мясо бессмертных моллюсков Protostomia"
  price={80}
  thumbnail={"props.cardsInfo[7].image"}
/>
</div>
<div className={burgerConstructorStyles.box}>
<DragIcon type="primary" />
<ConstructorElement
  text="Хрустящие минеральные кольца"
  price={80}
  thumbnail={"props.cardsInfo[11].image"}
/>
</div>
<div className={burgerConstructorStyles.box}>
<DragIcon type="primary" />
<ConstructorElement
  text="Хрустящие минеральные кольца"
  price={80}
  thumbnail={"props.cardsInfo[11].image"}
/>
</div>
<ConstructorElement
type="bottom"
isLocked={true}
text="Краторная булка N-200i (верх)"
price={200}
thumbnail={"props.cardsInfo[0].image"}
/> */
}

// {ingridients.map((item, index) => {
//   // const top = index === 0 ? "top" : "";
//   // const bottom = index === props.cardsInfo.length - 1 ? "bottom" : "";
//   const dragIcon =
//     index === 0 || index === ingridients.length - 1 ? null : (
//       <DragIcon type="primary" />
//     );
//   const locked =
//     index === 0 || index === ingridients.length - 1 ? true : false;
//   return (
//     <div className={burgerConstructorStyles.box} key={item._id}>
//       {dragIcon}
//       <ConstructorElement
//         className={burgerConstructorStyles.card}
//         isLocked={locked}
//         text={item.name}
//         price={item.price}
//         thumbnail={item.image}
//       />
//     </div>
//   );
// })}
