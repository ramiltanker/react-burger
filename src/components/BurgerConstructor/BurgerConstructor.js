import React from "react";

// Библиотека UI-компонентов
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI-компонентов

// Стили
import burgerConstructorStyles from "./BurgerConstructor.module.css";
// Стили

class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={burgerConstructorStyles.burger_constructor}>
        <div className={burgerConstructorStyles.elements_container} >
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={this.props.cardsInfo[0].image}
          />
          <ConstructorElement
            text="Соус традиционный галактический"
            price={30}
            thumbnail={this.props.cardsInfo[5].image}
          />
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={300}
            thumbnail={this.props.cardsInfo[4].image}
          />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={300}
            thumbnail={this.props.cardsInfo[10].image}
          />
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={80}
            thumbnail={this.props.cardsInfo[7].image}
          />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={this.props.cardsInfo[11].image}
          />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={this.props.cardsInfo[11].image}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={this.props.cardsInfo[0].image}
          />
        </div>
        <div className={burgerConstructorStyles.general_price}>
          <div className={burgerConstructorStyles.price}>
            <p className={burgerConstructorStyles.price_number}>610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;
