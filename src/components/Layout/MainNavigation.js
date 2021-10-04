import { useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const ctx = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    ctx.toggleLoginHandler();
    history.push("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Password Manager</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/auth" className={ctx.isLoggedIn ? classes.disabled : ""}>
              Login
              <Redirect to={ctx.isLoggedIn ? "/dashboard" : "/auth"}></Redirect>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={ctx.isLoggedIn ? "" : classes.disabled}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <button
              className={ctx.isLoggedIn ? "" : classes.disabled}
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
