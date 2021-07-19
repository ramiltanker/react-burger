import React from "react";

// Библиотека UI
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link, Redirect, useLocation } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
// Redux

// Компоненты
import AppHeader from "../AppHeader/AppHeader";
// Компоненты

// Стили
import resetPasswordStyles from "./ResetPassword.module.css";
// Стили

function ResetPassword() {
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
    <section className={resetPasswordStyles.reset}>
      <AppHeader />
      <div className={resetPasswordStyles.container}>
        <h2 className={`${resetPasswordStyles.title} mb-6`}>
          Восстановление пароля
        </h2>
        <form className={resetPasswordStyles.form}>
          <fieldset className={`${resetPasswordStyles.fieldset} mb-6`}>
            <Input
              type="password"
              placeholder="Введите новый пароль"
              name="password"
              icon="ShowIcon"
            />
          </fieldset>
          <fieldset className={`${resetPasswordStyles.fieldset} mb-6`}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              name="code"
            />
          </fieldset>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div className={`${resetPasswordStyles.recover_box} mt-20`}>
          <p className={resetPasswordStyles.recover_box}>Вспомнили пароль?</p>
          <Link className={`${resetPasswordStyles.link} ml-2`} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
