import React from "react";

// Библиотека UI
import {
  Button,
  Input,
  PasswordInput,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI

import { Link,Redirect } from "react-router-dom";

// Компоненты
import AppHeader from "../AppHeader/AppHeader";
// Компоненты

import { getCookie } from "../../utils/cookie";

// Redux
import { useDispatch, useSelector } from "react-redux";

import { handleRegistrationUser } from "../../services/actions/auth.js";

import {

} from "../../services/actions/burgerIngridients.js";
// Redux

// Стили
import signUpStyles from "./SignUp.module.css";
// Стили

import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation.js";

function SignUp() {

  const dispatch = useDispatch();

  const name = useFormWithValidation();
  const email = useFormWithValidation();
  const password = useFormWithValidation();

  const handleRegister = (e) => {
    e.preventDefault();

    const nameValue = name.values.name;
    const emailValue = email.values.email;
    const passwordValue = password.values.password;

    dispatch(handleRegistrationUser(nameValue, emailValue, passwordValue));
  }

  if (getCookie("accessToken")) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <section className={signUpStyles.sign_up}>
      <AppHeader />
      <div className={signUpStyles.container}>
        <h2 className={`${signUpStyles.title} mb-6`}>Регистрация</h2>
        <form className={signUpStyles.form} onSubmit={(e) => {
            handleRegister(e);
          }}>
          <fieldset className={`${signUpStyles.fieldset} mb-6`}>
            <Input type="text" placeholder="Имя" name="name" onChange={name.handleChange} />
          </fieldset>
          <fieldset className={`${signUpStyles.fieldset} mb-6`}>
            <Input type="email" placeholder="E-mail" name="email" onChange={email.handleChange}/>
          </fieldset>
          <fieldset className={`${signUpStyles.fieldset} mb-6`}>
            <PasswordInput
              placeholder="Пароль"
              name="password"
              onChange={password.handleChange}
            />
          </fieldset>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={`${signUpStyles.signup_box} mt-20 mb-4`}>
          <p className={signUpStyles.signup_text}>Уже зарегистрированы?</p>
          <Link className={`${signUpStyles.link} ml-2`} to="/login">Войти</Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
