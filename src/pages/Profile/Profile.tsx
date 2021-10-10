import React from "react";

// Стили
import profileStyles from "./Profile.module.css";
// Стили

import { handleUpdateUser } from "../../services/actions/auth";

import { getCookie } from "../../utils/cookie";

// Types
import { useDispatch, useSelector } from "../../types/typedHooks";
// Types

// UI
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// UI

// Компоненты
import RouteBox from "../../components/RouteBox/RouteBox";
// Компоненты

function Profile() {
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

  const handleUpdateUserData = (e: any) => {
    e.preventDefault();
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatch(handleUpdateUser(accessToken, user.email, user.name));
    }
  };

  const handleResetChanges = (e: any) => {
    e.preventDefault();
    setUser({ name: name, email: email });
  };

  return (
    <>
      <section className={profileStyles.profile}>
        <div className={profileStyles.container}>
          <RouteBox />
          <form
            className={profileStyles.form}
            onSubmit={(e) => {
              handleUpdateUserData(e);
            }}
            onReset={(e) => {
              handleResetChanges(e);
            }}
          >
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
