import { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getCookie } from "../../utils/cookie";

import { handleGetUserData } from "../../services/actions/auth";


export function ProtectedAuthorized({ children, ...rest }) {
  // const { name } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.authUser.user);

  return (
    <Route {...rest} render={() => (!user ? children : <Redirect to='/' />)} />
  );
}


export default ProtectedAuthorized;
