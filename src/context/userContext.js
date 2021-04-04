import React from "react";

const UserContext = React.createContext(null);

const UserContextProvider = UserContext.Provider;

export { UserContext, UserContextProvider };
