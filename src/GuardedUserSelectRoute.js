import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedUserSelectRoute = ({
    component: Component,
    room,
    setUser,
    setOppositeUser,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                room !== null ? (
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

export default GuardedUserSelectRoute;
