import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isLoggenIn: false,
  Login: (token) => {},
  Logout: () => {},
});

import React from "react";

const AuthProvider = (props) => {
  const [token, setToken] = useState("");

  let userIsLoggedIn = !!token;

  if (localStorage.getItem("user")) {
    userIsLoggedIn = true;
  }
  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("user");
  };

  const contextVal = {
    token: token,
    isLoggenIn: userIsLoggedIn,
    Login: loginHandler,
    Logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextVal}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
