import React from "react";

// Библиотека UI
import {
  Button,
  Input,
  PasswordInput,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link, Redirect, useLocation } from "react-router-dom";

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
// Компоненты

// Redux
import { useDispatch, useSelector } from "react-redux";

import { handleRegistrationUser } from "../../services/actions/auth.js";

import {} from "../../services/actions/burgerIngridients.js";
// Redux

// Стили
import signUpStyles from "./SignUp.module.css";
// Стили

import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation.js";

function SignUp() {
  const dispatch = useDispatch();

  const location = useLocation();

  const { name } = useSelector((state) => state.authUser.user);

  const nameInput = useFormWithValidation();
  const email = useFormWithValidation();
  const password = useFormWithValidation();

  const handleRegister = (e) => {
    e.preventDefault();

    const nameValue = nameInput.values.name;
    const emailValue = email.values.email;
    const passwordValue = password.values.password;

    dispatch(handleRegistrationUser(nameValue, emailValue, passwordValue));
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

  return (
    <section className={signUpStyles.sign_up}>
      <AppHeader />
      <div className={signUpStyles.container}>
        <h2 className={`${signUpStyles.title} mb-6`}>Регистрация</h2>
        <form
          className={signUpStyles.form}
          onSubmit={(e) => {
            handleRegister(e);
          }}
        >
          <fieldset className={`${signUpStyles.fieldset} mb-6`}>
            <Input
              type="text"
              placeholder="Имя"
              name="name"
              onChange={nameInput.handleChange}
              value={nameInput.values.name || ""}
            />
          </fieldset>
          <fieldset className={`${signUpStyles.fieldset} mb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={email.handleChange}
              value={email.values.name || ""}
            />
          </fieldset>
          <fieldset className={`${signUpStyles.fieldset} mb-6`}>
            <PasswordInput
              placeholder="Пароль"
              name="password"
              onChange={password.handleChange}
              value={password.values.name || ""}
            />
          </fieldset>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={`${signUpStyles.signup_box} mt-20 mb-4`}>
          <p className={signUpStyles.signup_text}>Уже зарегистрированы?</p>
          <Link className={`${signUpStyles.link} ml-2`} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
