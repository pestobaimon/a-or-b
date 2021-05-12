import React from "react";
import {firebaseAuth} from "../Reducer/authReducer";

export const AuthContext = React.createContext(null);

const initialState = {
  user: null,
};

export const AuthProvider = (props) => {
  const [state, dispatch] = React.useReducer(firebaseAuth, initialState);
  const value = {state, dispatch};

  const {children} = props;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
