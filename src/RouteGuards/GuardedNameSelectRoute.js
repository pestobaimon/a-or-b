import React from "react";
import {Route, Redirect} from "react-router-dom";

const GuardedNameSelectRoute = ({
  component: Component,
  room,
  setUser,
  userData,
  setUserData,
  setOppositeUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        room !== null && userData.name === "" ? (
          <Component
            room={room}
            setUserData={setUserData}
            setOppositeUser={setOppositeUser}
            {...props}
          />
        ) : (
          <Redirect to="/room" />
        )
      }
    />
  );
};

export default GuardedNameSelectRoute;
