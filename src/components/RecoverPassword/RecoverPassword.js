import React from "react";

// Библиотека UI
import {
  Button,
  Input,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link, Redirect, useLocation } from "react-router-dom";

import { getCookie } from "../../utils/cookie";

// Redux
import { useSelector } from "react-redux";
// Redux

// Компоненты
import AppHeader from "../AppHeader/AppHeader";
// Компоненты

// Стили
import recoverPasswordStyles from "./RecoverPassword.module.css";
// Стили

function RecoverPassword() {
  const location = useLocation();

  const { name } = useSelector((state) => state.authUser.user);

  if (name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={from}
      />
    );
  }

  return (
    <section className={recoverPasswordStyles.recover}>
      <AppHeader />
      <div className={recoverPasswordStyles.container}>
        <h2 className={`${recoverPasswordStyles.title} mb-6`}>
          Восстановление пароля
        </h2>
        <form className={recoverPasswordStyles.form}>
          <fieldset className={`${recoverPasswordStyles.fieldset} mb-6`}>
            <Input type="email" placeholder="Укажите e-mail" name="email" />
          </fieldset>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <div className={`${recoverPasswordStyles.recover_box} mt-20`}>
          <p className={recoverPasswordStyles.recover_box}>Вспомнили пароль?</p>
          <Link className={`${recoverPasswordStyles.link} ml-2`} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecoverPassword;
