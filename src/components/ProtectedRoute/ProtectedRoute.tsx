import { useEffect, FunctionComponent, ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";

import { getCookie } from "../../utils/cookie";

import { handleGetUserData } from "../../services/actions/auth";

interface IProtectedRouteProps {
  children?: ReactNode;
  path: string;
  exact: boolean;
}

type FC<P = IProtectedRouteProps> = FunctionComponent<P>;

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const dispatch = useDispatch();

  const init = async () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) dispatch(handleGetUserData());
  };

  useEffect(() => {
    init();
  }, []);

  if (!getCookie("accessToken")) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
