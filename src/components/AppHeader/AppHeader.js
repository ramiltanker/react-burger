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

// Картинки

// Картинки

class AppHeader extends React.Component {
  state = {
    isHoveredConstructorIcon: false,
    isHoveredTapeIcon: false,
    isHoveredProfileIcon: false,
  };

  handleHoverIcon = (event) => {
    if (event.target.id === "constructor") {
      this.setState({
        ...this.state,
        isHoveredConstructorIcon: !this.state.isHoveredConstructorIcon,
      });
    }
    if (event.target.id === "tape") {
      this.setState({
        ...this.state,
        isHoveredTapeIcon: !this.state.isHoveredTapeIcon,
      });
    }
    if (event.target.id === "profile") {
      this.setState({
        ...this.state,
        isHoveredProfileIcon: !this.state.isHoveredProfileIcon,
      });
    }
  };

  handleUnHoverIcon = (event) => {
    if (event.target.id === "constructor") {
      this.setState({
        ...this.state,
        isHoveredConstructorIcon: !this.state.isHoveredConstructorIcon,
      });
    }
    if (event.target.id === "tape") {
      this.setState({
        ...this.state,
        isHoveredTapeIcon: !this.state.isHoveredTapeIcon,
      });
    }
    if (event.target.id === "profile") {
      this.setState({
        ...this.state,
        isHoveredProfileIcon: !this.state.isHoveredProfileIcon,
      });
    }
  };

  render() {
    return (
      <header className={headerStyles.header}>
        <div className={headerStyles.container}>
          <nav className={headerStyles.nav}>
            <ul className={headerStyles.list}>
              <li className={headerStyles.li}>
                {this.state.isHoveredConstructorIcon ? (
                  <BurgerIcon type="secondary" />
                ) : (
                  <BurgerIcon type="primary" />
                )}
                <Link
                  className={`${headerStyles.nav_link_contructor}  text_type_main-default`}
                  to="#"
                  id="constructor"
                  onMouseEnter={this.handleHoverIcon}
                  onMouseLeave={this.handleUnHoverIcon}
                >
                  Конструктор
                </Link>
              </li>
              <li className={headerStyles.li}>
                {this.state.isHoveredTapeIcon ? (
                  <ListIcon type="secondary" />
                ) : (
                  <ListIcon type="primary" />
                )}
                <Link
                  className={`${headerStyles.nav_link_tape}  text_type_main-default`}
                  to="#"
                  id="tape"
                  onMouseEnter={this.handleHoverIcon}
                  onMouseLeave={this.handleUnHoverIcon}
                >
                  Лента заказов
                </Link>
              </li>
            </ul>
          </nav>
          <Logo />
          <div className={headerStyles.profile_box}>
            {this.state.isHoveredProfileIcon ? (
              <ProfileIcon type="secondary" />
            ) : (
              <ProfileIcon type="primary" />
            )}
            <Link
              className={`${headerStyles.personal_account}  text_type_main-default`}
              to="#"
              id="profile"
              onMouseEnter={this.handleHoverIcon}
              onMouseLeave={this.handleUnHoverIcon}
            >
              Личный кабинет
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
