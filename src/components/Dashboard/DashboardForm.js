import { useState, useEffect } from "react";
import classes from "./DashboardForm.module.css";

const DashboardForm = () => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [textIsValid, setTextIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      enteredText.trim().length > 0 && enteredPass.trim().length > 6
    );
  }, [enteredText, enteredPass]);

  const enteredTextHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const enteredPassHandler = (event) => {
    setEnteredPass(event.target.value);
  };

  const validatePassHandler = () => {
    setPasswordIsValid(enteredPass.trim().length > 6);
  };

  const validateTextlHandler = () => {
    setTextIsValid(enteredText.trim().length > 0);
  };

  const createPasswordHandler = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const passwords = JSON.parse(localStorage.getItem("passwords"));
    const newUserPassword = {
      user_id: currentUser.id,
      id: Date.now(),
      text: enteredText,
      password: enteredPass,
    };

    passwords.push(newUserPassword);

    localStorage.setItem("passwords", JSON.stringify(passwords));
    setEnteredText("");
    setEnteredPass("");
  };

  return (
    <div className={classes.wrapper}>
      <h2>Create a new password</h2>
      <form className={classes.form}>
        <div
          className={`${classes.controls} ${
            textIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="site">Password for:</label>
          <input
            type="text"
            id="site"
            required
            value={enteredText}
            onChange={enteredTextHandler}
            onBlur={validateTextlHandler}
          />
        </div>
        <div
          className={`${classes.controls} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Your Password:</label>
          <input
            type="password"
            id="password"
            required
            value={enteredPass}
            onChange={enteredPassHandler}
            onBlur={validatePassHandler}
          />
        </div>
        <div className={classes.controls}>
          <button
            type="button"
            onClick={createPasswordHandler}
            disabled={!formIsValid}
            className={classes.addBtn}
          >
            Add New Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardForm;
