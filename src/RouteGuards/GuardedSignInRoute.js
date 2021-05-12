import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../context";

const GuardedSignInRoute = ({component: Component, ...rest}) => {
  const {state, dispatch} = useContext(AuthContext);
  const {user} = state;
  return (
    <Route
      {...rest}
      render={(props) =>
        user === null ? (
          <Redirect to="/sign-in" />
        ) : (
          <Component {...props} user={user} />
        )
      }
    />
  );
};

export default GuardedSignInRoute;
