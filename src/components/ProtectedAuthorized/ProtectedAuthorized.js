import { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getCookie } from "../../utils/cookie";

import { handleGetUserData } from "../../services/actions/auth";

export function ProtectedAuthorized({ children, ...rest }) {
  const dispatch = useDispatch();

  const location = useLocation();

  const init = async () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) dispatch(handleGetUserData(accessToken));
  };

  useEffect(() => {
    init();
  }, []);

  const path = location.pathname;

    console.log(location);

  if (getCookie("accessToken")) {
    return <Route>{children}</Route>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
    />
  );
}

export default ProtectedAuthorized;
