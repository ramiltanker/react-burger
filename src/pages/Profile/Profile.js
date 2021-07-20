import React from "react";

// Стили
import profileStyles from "./Profile.module.css";
// Стили

import { handleUpdateUser } from "../../services/actions/auth";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux

import { getCookie } from "../../utils/cookie";

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
import AppHeader from "../../components/AppHeader/AppHeader";
import RouteBox from "../../components/RouteBox/RouteBox";
// Компоненты

function Profile() {
  const [isButtonsActive, setIsButtonsActive] = React.useState(false);

  const dispatch = useDispatch();

  const { name, email } = useSelector((store) => store.authUser.user);

  const [user, setUser] = React.useState({
    name: name ? name : "",
    email: email ? email : "",
  });

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    user.email === email && user.name === name
      ? setIsButtonsActive(false)
      : setIsButtonsActive(true);
  }, [email, name, user.email, user.name]);

  const handleUpdateUserData = (e) => {
    e.preventDefault();
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatch(handleUpdateUser(accessToken, user.email, user.name));
    }
  };

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
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </fieldset>
            <fieldset className={`${profileStyles.fieldset} mb-6`}>
              <Input
                name="email"
                placeholder="Email"
                icon="EditIcon"
                value={user.email || ""}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </fieldset>
            <fieldset className={profileStyles.fieldset}>
              <Input
                type={"password"}
                name="password"
                placeholder="Пароль"
                icon="EditIcon"
                value={user.password || ""}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </fieldset>
            <div
              className={
                isButtonsActive
                  ? profileStyles.buttons
                  : profileStyles.buttons_hide
              }
            >
              <Button type="secondary" size="small">
                Отмена
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={(e) => {
                  handleUpdateUserData(e);
                }}
              >
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
