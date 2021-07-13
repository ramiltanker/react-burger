import React from "react";

// Библиотека UI
import {
  Button,
  Input,
  PasswordInput,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link, useHistory } from "react-router-dom";

// Компоненты
import AppHeader from "../AppHeader/AppHeader";
// Компоненты

import { handleLogin } from "../../services/actions/auth";

// Стили
import signInStyles from "./SignIn.module.css";
// Стили

// Redux
import { useSelector, useDispatch } from "react-redux";
// Redux

import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation.js";

function SignIn() {
  const dispatch = useDispatch();

  const history = useHistory();

  const email = useFormWithValidation();
  const password = useFormWithValidation();

  const handleUserLogin = (e) => {
    e.preventDefault()
    
    const emailValue = email.values.email;
    const passwordValue = password.values.password;

    dispatch(handleLogin(emailValue, passwordValue));
    history.push('/');
  };

  return (
    <section className={signInStyles.sign_in}>
      <AppHeader />
      <div className={signInStyles.container}>
        <h2 className={`${signInStyles.title} mb-6`}>Вход</h2>
        <form className={signInStyles.form} onSubmit={(e) => {
          handleUserLogin(e)
        }}>
          <fieldset className={`${signInStyles.fieldset} mb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={email.handleChange}
            />
          </fieldset>
          <fieldset className={`${signInStyles.fieldset} mb-6`}>
            <PasswordInput
              placeholder="Пароль"
              name="password"
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
