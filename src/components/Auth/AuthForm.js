import { useState, useContext } from "react";
import { sha256 } from "js-sha256";
import AuthContext from "../context/auth-context";
import classes from "./AuthForm.module.css";
import { useEffect } from "react/cjs/react.development";

const AuthForm = () => {
  const ctx = useContext(AuthContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, [enteredEmail, enteredPassword]);

  const switchAuthModeHandler = () => {
    setIsLoginForm((prevState) => !prevState);
  };

  const createNewUsers = () => {
    const users = JSON.parse(localStorage.getItem("users"));

    const isExist = users.find((user) => user.email === enteredEmail);

    if (isExist) {
      setUserMessage("THIS EMAIL IS ALREADY USED");
      return null;
    }

    users.push({
      id: users.length + 1,
      email: enteredEmail,
      password: sha256(enteredPassword),
    });
    return users;
  };

  const checkUser = (currentUser, users) => {
    const result = users.find((user) => user.email === currentUser.email);

    if (result) {
    }

    if (!result || result.password !== currentUser.password) {
      return null;
    }
    return result;
  };

  const createCurrentUser = (users) => {
    const currentUserInfo = {
      email: enteredEmail,
      password: sha256(enteredPassword),
    };
    const currentUser = checkUser(currentUserInfo, users);
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      ctx.toggleLoginHandler();
    }
  };

  const createNewAccHandler = (event) => {
    event.preventDefault();
    const users = createNewUsers();

    if (users === null) {
      return;
    }

    localStorage.setItem("users", JSON.stringify(users));

    createCurrentUser(users);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));

    createCurrentUser(users);
  };

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  return (
    <section className={classes.auth}>
      <div className={userMessage !== "" ? classes.emailErr : ""}>
        {isLoginForm ? "" : userMessage !== "" ? userMessage : ""}
      </div>
      <h1>{isLoginForm ? "Login" : "Sign Up"}</h1>
      <form>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={enteredEmail}
            onChange={emailHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={enteredPassword}
            onChange={passHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <button
            className={classes.loginBtn}
            onClick={isLoginForm ? loginHandler : createNewAccHandler}
            disabled={!formIsValid}
          >
            {isLoginForm ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLoginForm ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
