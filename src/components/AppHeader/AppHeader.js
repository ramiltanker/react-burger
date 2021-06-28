import React from "react";
import { Link, useLocation } from "react-router-dom";

// Стили
import headerStyles from "./AppHeader.module.css";
// Стили

// Библиотека UI-компонентов
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI-компонентов

// Компоненты

// Компоненты

// Кастомные хуки
import useHover from '../../hooks/useHover'
// Кастомные хуки

// Картинки

// Картинки

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={`${headerStyles.container} mt-8 mb-8`}>
        <nav className={headerStyles.nav}>
          <ul className={headerStyles.list}>
            <li className={headerStyles.li}>
              <Link
                className={`${headerStyles.nav_link_contructor} ${headerStyles.li}  text_type_main-default mr-2`}
                to="#"
                id="constructor"
              >
                Конструктор
                <BurgerIcon type="primary" />
              </Link>
            </li>
            <li className={headerStyles.li}>
              <Link
                className={`${headerStyles.nav_link_tape} ${headerStyles.li} text_type_main-default`}
                to="#"
                id="tape"
              >
                Лента заказов
                <ListIcon type="primary" />
              </Link>
            </li>
          </ul>
        </nav>
        <Logo />
        <div className={headerStyles.profile_box}>
          <Link
            className={`${headerStyles.personal_account} ${headerStyles.li} text_type_main-default ml-2`}
            to="#"
            id="profile"
          >
            Личный кабинет
            <ProfileIcon type="primary" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
