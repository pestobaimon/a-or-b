import React from "react";
import {Route, Redirect} from "react-router-dom";

const GuardedQuestionRoute = ({
  component: Component,
  user,
  signInWithFacebook,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user === null ? (
          <Component
            {...props}
            user={user}
            signInWithFacebook={signInWithFacebook}
          />
        ) : (
          <Redirect to="/room-select" />
        )
      }
    />
  );
};

export default GuardedQuestionRoute;
