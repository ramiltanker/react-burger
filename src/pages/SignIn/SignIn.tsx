import React from "react";

// Библиотека UI
import {
  Button,
  Input,
  PasswordInput,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link, useHistory, Redirect, useLocation } from "react-router-dom";

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
// Компоненты

import { handleLogin } from "../../services/actions/auth";

// Стили
import signInStyles from "./SignIn.module.css";
// Стили

// Redux
import { useSelector, useDispatch } from "react-redux";
// Redux

// Types
import { TLocation } from "../../types";

import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { RootState, AppThunk, AppDispatch } from "../../types/index";
// Types

import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation";
import { getCookie } from "../../utils/cookie";

function SignIn() {
  // Теперь этот хук «знает» структуру хранилища
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  // Хук не даст отправить экшен, который ему не знаком
  const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.authUser.user);

  const email = useFormWithValidation();
  const password = useFormWithValidation();

  const handleUserLogin = (e: any) => {
    e.preventDefault();
    const emailValue = email.values.email;
    const passwordValue = password.values.password;
    dispatch(handleLogin(emailValue, passwordValue));
  };

  const location = useLocation<TLocation>();

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
    <section className={signInStyles.sign_in}>
      <AppHeader />
      <div className={signInStyles.container}>
        <h2 className={`${signInStyles.title} mb-6`}>Вход</h2>
        <form
          className={signInStyles.form}
          onSubmit={(e) => {
            handleUserLogin(e);
          }}
        >
          <fieldset className={`${signInStyles.fieldset} mb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              name="email"
              value={email.values.email || ""}
              onChange={email.handleChange}
            />
          </fieldset>
          <fieldset className={`${signInStyles.fieldset} mb-6`}>
            <PasswordInput
              name="password"
              value={password.values.password || ""}
              onChange={password.handleChange}
            />
          </fieldset>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div className={`${signInStyles.signup_box} mt-20 mb-4`}>
          <p className={signInStyles.signup_text}>Вы — новый пользователь?</p>
          <Link className={`${signInStyles.link} ml-2`} to="/register">
            Зарегистрироваться
          </Link>
        </div>
        <div className={signInStyles.recover_box}>
          <p className={signInStyles.recover_box}>Забыли пароль?</p>
          <Link className={`${signInStyles.link} ml-2`} to="/forgot-password">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
