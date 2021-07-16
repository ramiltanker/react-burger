import React from "react";

import { useHistory, useLocation, useRouteMatch, Link } from "react-router-dom";

// Стили
import profileStyles from "./Profile.module.css";
// Стили

// redux
import { useSelector } from "react-redux";
// redux

// UI
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// UI

import { useFormWithValidation } from "../../customHooks/FormValidation/FormValidation.js";

// Компоненты
import AppHeader from "../AppHeader/AppHeader";
import RouteBox from "../RouteBox/RouteBox";
// Компоненты

function Profile() {
  const [isButtonsActive, setIsButtonsActive] = React.useState(false);

  const user = useSelector((store) => store.authUser.user);

  const name = useFormWithValidation();
  const email = useFormWithValidation();
  const password = useFormWithValidation();

  return (
    <>
      <AppHeader />
      <section className={profileStyles.profile}>
        <div className={profileStyles.container}>
          <RouteBox />
          <form className={profileStyles.form}>
            <fieldset className={`${profileStyles.fieldset} mb-6`}>
              <Input
                type="text"
                name="name"
                value={user.name || ""}
                placeholder="Имя"
                icon="EditIcon"
                onChange={name.handleChange}
              />
            </fieldset>
            <fieldset className={`${profileStyles.fieldset} mb-6`}>
              <EmailInput
                name="eamil"
                placeholder="Email"
                icon="EditIcon"
                value={user.email || ""}
                onChange={email.handleChange}
              />
            </fieldset>
            <fieldset className={profileStyles.fieldset}>
              <Input
                type={"password"}
                name="password"
                placeholder="Пароль"
                icon="EditIcon"
                value={""}
                onChange={password.handleChange}
              />
            </fieldset>
            <div className={isButtonsActive ? profileStyles.buttons : profileStyles.buttons_hide}>
              <Button type="secondary" size="small">
                Отмена
              </Button>
              <Button type="primary" size="small">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
