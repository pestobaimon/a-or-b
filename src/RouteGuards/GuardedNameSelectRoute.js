import React from "react";
import {Route, Redirect} from "react-router-dom";

const GuardedNameSelectRoute = ({
  component: Component,
  room,
  setUser,
  user,
  setOppositeUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        room !== null && user !== null ? (
          <Component
            room={room}
            setUser={setUser}
            setOppositeUser={setOppositeUser}
            {...props}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default GuardedNameSelectRoute;
