import React from "react";

// Библиотека UI
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link, Redirect, useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
// Redux

// Actions
import { handleResetPassword } from "../../services/actions/auth";
// Actions

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
// Компоненты

// Custom hooks
import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation";
// Custom hooks

// Стили
import resetPasswordStyles from "./ResetPassword.module.css";
// Стили

function ResetPassword() {
  const location = useLocation();

  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.authUser.user);

  const resetPasswordSucces = useSelector(
    (state) => state.authUser.resetPasswordSucces
  );

  const forgotPasswordSucces = useSelector(
    (state) => state.authUser.forgotPasswordSucces
  );

  const password = useFormWithValidation();
  const code = useFormWithValidation();

  const resetPasswordHandler = (e) => {
    e.preventDefault();

    const passwordValue = password.values.password;
    const codeValue = code.values.code;

    dispatch(handleResetPassword(passwordValue, codeValue));
  };

  if (resetPasswordSucces) {
    return <Redirect to="/" />;
  }

  if (!forgotPasswordSucces) {
    const { from } = location.state || { from: { pathname: "/" } };
    console.log(from);
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={from}
      />
    );
  }

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
            <PasswordInput
              type="password"
              placeholder="Введите новый пароль"
              name="password"
              icon="ShowIcon"
              value={password.values.password || ""}
              onChange={password.handleChange}
            />
          </fieldset>
          <fieldset className={`${resetPasswordStyles.fieldset} mb-6`}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              name="code"
              value={code.values.code || ""}
              onChange={code.handleChange}
            />
          </fieldset>
          <Button
            type="primary"
            size="medium"
            onClick={(e) => {
              resetPasswordHandler(e);
            }}
          >
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
