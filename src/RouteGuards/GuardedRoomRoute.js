import React from "react";
import {Route, Redirect} from "react-router-dom";

const GuardedRoomRoute = ({component: Component, userData, room, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userData?.name !== "" && room !== null ? (
          <Component userData={userData} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default GuardedRoomRoute;
