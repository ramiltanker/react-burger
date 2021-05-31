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

// Стили
import burgerConstructorStyles from "./BurgerConstructor.module.css";
// Стили

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

  return (
    <section
      className={`${burgerConstructorStyles.burger_constructor} mt-25 ml-10`}
    >
      <div className={burgerConstructorStyles.elements_container}>
        {props.cardsInfo.map((item, index) => {
          const top = index === 0 ? "top" : "";
          const bottom = index === props.cardsInfo.length - 1 ? "bottom" : "";
          const dragIcon =
            index === 0 || index === props.cardsInfo.length - 1 ? (
              null
            ) : <DragIcon type="primary" />;
            const locked = index === 0 || index === props.cardsInfo.length - 1 ? true : false
          return (
            <div className={burgerConstructorStyles.box} key={index}>
              {dragIcon}
              <ConstructorElement
                className={burgerConstructorStyles.card}
                type={top ? top : bottom}
                isLocked={locked}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      </div>
      <div className={`${burgerConstructorStyles.general_price} mt-10`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <p className={`mr-3`}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={props.handleOpenOrderModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  cardsInfo: cardsInfoPropTypes.isRequired,
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
