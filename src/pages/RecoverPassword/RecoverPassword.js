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
import { useSelector, useDispatch } from "react-redux";
// Redux

// Actions
import { handleForgotPassword } from "../../services/actions/auth";
// Actions

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
// Компоненты

// Стили
import recoverPasswordStyles from "./RecoverPassword.module.css";
// Стили

// Custom Hooks
import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation";
// Custom Hooks

function RecoverPassword() {
  const location = useLocation();

  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.authUser.user);

  const forgotPasswordSucces = useSelector(
    (state) => state.authUser.forgotPasswordSucces
  );

  const email = useFormWithValidation();

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(handleForgotPassword(email.values.email));
  };

  if (name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={from}
      />
    );
  }

  if (forgotPasswordSucces) {
    return (
      <Redirect
        to="/reset-password"
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
            <Input
              type="email"
              placeholder="Укажите e-mail"
              name="email"
              value={email.values.email || ""}
              onChange={email.handleChange}
            />
          </fieldset>
          <Button
            type="primary"
            size="medium"
            onClick={(e) => {
              forgotPasswordHandler(e);
            }}
          >
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
