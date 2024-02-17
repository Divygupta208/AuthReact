import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainNavigation = () => {
  const { isLoggenIn, Logout } = useContext(AuthContext);
  const history = useHistory();
  const notify = (text) => toast(text);

  const logout = () => {
    notify("Successfully logged out");
    Logout();

    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggenIn && (
            <>
              <li>
                <Link to="/auth">Login</Link>
              </li>
            </>
          )}
          {isLoggenIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggenIn && (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
