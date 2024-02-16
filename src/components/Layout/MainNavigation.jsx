import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

const MainNavigation = () => {
  const { isLoggenIn, Logout } = useContext(AuthContext);

  const logout = () => {
    Logout();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggenIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
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
