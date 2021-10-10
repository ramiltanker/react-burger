import React, { FunctionComponent } from "react";
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

// Types
import { TLocation } from "../../types";
// Types

type FC<P = {}> = FunctionComponent<P>;

const AppHeader: FC<{}> = () => {
  const location = useLocation<TLocation>();

  const isProfileActive: boolean = location.pathname === "/profile";
  const isFeedActive: boolean = location.pathname === "/feed";
  const isConstructor: boolean = location.pathname === "/";

  return (
    <header className={headerStyles.header}>
      <div className={`${headerStyles.container} mt-8 mb-8`}>
        <nav className={headerStyles.nav}>
          <ul className={headerStyles.list}>
            <li className={headerStyles.li}>
              <Link
                className={`${headerStyles.nav_link_contructor} ${
                  headerStyles.li
                } ${
                  isConstructor
                    ? headerStyles.link_active
                    : headerStyles.nav_link_tape
                } text_type_main-default mr-15`}
                to={{ pathname: `/`, state: { from: location } }}
                id="constructor"
              >
                Конструктор
                <BurgerIcon type={isConstructor ? "secondary" : "primary"} />
              </Link>
            </li>
            <li className={headerStyles.li}>
              <Link
                className={`${headerStyles.nav_link_tape} ${headerStyles.li} ${
                  isFeedActive
                    ? headerStyles.link_active
                    : headerStyles.nav_link_tape
                } text_type_main-default mr-15`}
                to={{ pathname: `/feed`, state: { from: location } }}
                id="tape"
              >
                Лента заказов
                <ListIcon type={isFeedActive ? "secondary" : "primary"} />
              </Link>
            </li>
          </ul>
        </nav>
        <Logo />
        <div className={headerStyles.profile_box}>
          <Link
            className={`${headerStyles.personal_account} ${headerStyles.li} ${
              isProfileActive
                ? headerStyles.link_active
                : headerStyles.personal_account
            } text_type_main-default`}
            to={{ pathname: `/profile`, state: { from: location } }}
            id="profile"
          >
            Личный кабинет
            <ProfileIcon type={isProfileActive ? "secondary" : "primary"} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
