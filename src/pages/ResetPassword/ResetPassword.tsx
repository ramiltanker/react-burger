import React from "react";

// Библиотека UI
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link, Redirect, useLocation } from "react-router-dom";

// Actions
import { handleResetPassword } from "../../services/actions/auth";
// Actions

// Custom hooks
import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation";
// Custom hooks

// Стили
import resetPasswordStyles from "./ResetPassword.module.css";
// Стили

// Types
import { TLocation } from "../../types";

import { useDispatch, useSelector } from "../../types/typedHooks";
// Types

function ResetPassword() {
  const location = useLocation<TLocation>();

  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.authUser.user);

  const resetPasswordSucces = useSelector(
    (state) => state.authUser.resetPasswordSucces
  );

  const forgotPasswordSucces = useSelector(
    (state) => state.authUser.forgotPasswordSucces
  );

  const password: any = useFormWithValidation();
  const code: any = useFormWithValidation();

  const resetPasswordHandler = (e: any) => {
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
      <div className={resetPasswordStyles.container}>
        <h2 className={`${resetPasswordStyles.title} mb-6`}>
          Восстановление пароля
        </h2>
        <form
          className={resetPasswordStyles.form}
          onSubmit={(e) => {
            resetPasswordHandler(e);
          }}
        >
          <fieldset className={`${resetPasswordStyles.fieldset} mb-6`}>
            <PasswordInput
              name="password"
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
