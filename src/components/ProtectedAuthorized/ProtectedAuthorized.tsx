import { FunctionComponent, ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";

// Types
import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { RootState } from "../../types/index";
// Types

interface IProtectedAuthorizedProps {
  children?: ReactNode;
  path: string;
}

type FC<P = {}> = FunctionComponent<P>;
const ProtectedAuthorized: FC<IProtectedAuthorizedProps> = ({
  children,
  ...rest
}) => {
  // Теперь этот хук «знает» структуру хранилища
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

  const user = useSelector((state) => state.authUser.user);

  return (
    <Route {...rest} render={() => (!user ? children : <Redirect to="/" />)} />
  );
};

export default ProtectedAuthorized;
