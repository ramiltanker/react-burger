import { FunctionComponent, ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";

// Types
import { useSelector } from "../../types/typedHooks";
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
  const user = useSelector((state) => state.authUser.user);

  return (
    <Route {...rest} render={() => (!user ? children : <Redirect to="/" />)} />
  );
};

export default ProtectedAuthorized;
