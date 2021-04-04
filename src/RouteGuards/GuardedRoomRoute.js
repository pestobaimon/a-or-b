import React from "react";
import {Route, Redirect} from "react-router-dom";

const GuardedRoomRoute = ({component: Component, user, room, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null && room !== null ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default GuardedRoomRoute;
