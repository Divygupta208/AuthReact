import { createContext, useEffect, useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const AuthContext = createContext({
  token: "",
  isLoggenIn: false,
  Login: (token) => {},
  Logout: () => {},
});

const AuthProvider = (props) => {
  const history = useHistory();
  const intialToken = localStorage.getItem("user");
  const [token, setToken] = useState(intialToken);

  let userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem("user", token);
    setToken(token);
    setTimeout(() => {
      logoutHandler();
    }, 300000);
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
