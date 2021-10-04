import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./DashboardList.module.css";

const DashboardList = () => {
  const [userPasswordsList, setUserPasswordsList] = useState([]);
  const [otherPasswordList, setOtherPasswordList] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const passwords = JSON.parse(localStorage.getItem("passwords"));

    if (currentUser === null) {
      return;
    }

    const otherPasswords = passwords.filter(
      (password) => password.user_id !== currentUser.id
    );

    const userPasswords = passwords.filter(
      (password) => password.user_id === currentUser.id
    );
    setUserPasswordsList(userPasswords);
    setOtherPasswordList(otherPasswords);
  }, []);

  const deletePasswordHandler = (id) => {
    const newUserPasswordList = userPasswordsList.filter(
      (password) => password.id !== id
    );

    setUserPasswordsList(newUserPasswordList);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...otherPasswordList, ...newUserPasswordList])
    );
  };

  const saveNewPasswordHandler = (id, newPassword) => {
    const updatedPasswordList = userPasswordsList.map((password) => {
      return password.id === id ? { ...password, ...newPassword } : password;
    });

    setUserPasswordsList([...updatedPasswordList]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...otherPasswordList, ...updatedPasswordList])
    );
  };

  return (
    <section>
      <h2 className={classes.heading}>
        You've got <span>{userPasswordsList.length} </span>
        saved passwords
      </h2>
      <ul className={classes.list}>
        {userPasswordsList.map((passwordObject) => {
          return (
            <li key={passwordObject.id}>
              <Card
                text={passwordObject.text}
                password={passwordObject.password}
                onDeletePassword={deletePasswordHandler}
                onSaveNewPassword={saveNewPasswordHandler}
                passId={passwordObject.id}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DashboardList;
