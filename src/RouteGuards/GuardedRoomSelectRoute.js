import React from "react";
import {Route, Redirect} from "react-router-dom";

const GuardedRoomSelectRoute = ({
  component: Component,
  user,
  setRoom,
  savedRooms,
  setSavedRooms,
  room,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        room === null ? (
          <Component
            user={user}
            room={room}
            setRoom={setRoom}
            savedRooms={savedRooms}
            setSavedRooms={setSavedRooms}
            {...props}
          />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

export default GuardedRoomSelectRoute;
