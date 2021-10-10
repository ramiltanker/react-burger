import React from "react";

// Стили
import profileStyles from "./Profile.module.css";
// Стили

import { handleUpdateUser } from "../../services/actions/auth";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux

import { getCookie } from "../../utils/cookie";

// Types
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { RootState, AppThunk, AppDispatch } from "../../types/index";
// Types

// UI
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// UI

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
import RouteBox from "../../components/RouteBox/RouteBox";
// Компоненты

function Profile() {
  // Теперь этот хук «знает» структуру хранилища
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  // Хук не даст отправить экшен, который ему не знаком
  const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

  const [isButtonsActive, setIsButtonsActive] = React.useState<boolean>(false);

  const { name, email } = useSelector((store) => store.authUser.user);

  const [user, setUser] = React.useState({
    name: "",
    email: "",
  });

  React.useEffect(() => {
    if (name && email) {
      setUser({ name: name, email: email });
    }
  }, [email, name]);

  const dispatch = useDispatch();

  const onChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    user.email === email && user.name === name
      ? setIsButtonsActive(false)
      : setIsButtonsActive(true);
  }, [email, name, user.email, user.name]);

  const handleUpdateUserData = () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatch(handleUpdateUser(accessToken, user.email, user.name));
    }
  };

  const handleResetChanges = () => {
    setUser({ name: name, email: email });
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
                value={user.name}
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
                value={""}
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
              <Button
                type="secondary"
                size="small"
                onClick={() => {
                  handleResetChanges();
                }}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  handleUpdateUserData();
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
