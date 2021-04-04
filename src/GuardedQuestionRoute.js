import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedQuestionRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                user !== null ? <Component user={user} {...props} /> : <Redirect to="/" />
            }
        />
    );
};

export default GuardedQuestionRoute;
