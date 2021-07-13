import { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getCookie } from "../../utils/cookie";

import { handleGetUserData } from "../../services/actions/auth";

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();

  const init = async () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) dispatch(handleGetUserData(accessToken));
  };

  useEffect(() => {
    init();
  }, []);

  if (!getCookie("accessToken")) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return <Route>{children}</Route>;
}

export default ProtectedRoute;
