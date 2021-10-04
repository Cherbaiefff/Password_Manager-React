import classes from "./Card.module.css";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react/cjs/react.development";

const Card = (props) => {
  const [showPass, setShowPass] = useState(false);
  const [editingPass, setEditingPass] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState("");
  const [newText, setNewText] = useState(props.text);
  const [newPass, setNewPass] = useState(props.password);

  useEffect(() => {
    [...props.password].forEach((i) =>
      setHiddenPassword((prevState) => {
        return (prevState += "*");
      })
    );
  }, []);

  const togglePasswordHandler = () => {
    setShowPass((prevState) => {
      return !prevState;
    });
  };

  const toggleEditPassword = () => {
    setEditingPass((prevState) => {
      return !prevState;
    });
  };

  const deleteItemHandler = () => {
    props.onDeletePassword(props.passId);
  };

  const saveItemHandler = () => {
    props.onSaveNewPassword(props.passId, { text: newText, password: newPass });
  };

  const enteredTitleHandler = (event) => {
    setNewText(event.target.value);
  };

  const enteredPassHandler = (event) => {
    setNewPass(event.target.value);
  };

  return (
    <div className={classes.box}>
      <div className={classes.passwordFor}>
        Password for:
        {editingPass ? (
          <input
            type="text"
            value={newText}
            onChange={enteredTitleHandler}
            className={classes.inp}
          />
        ) : (
          <span> "{props.text}" </span>
        )}
      </div>
      <div className={classes.password}>
        Password:
        {editingPass ? (
          <input
            type="text"
            value={newPass}
            onChange={enteredPassHandler}
            className={classes.inp}
          />
        ) : (
          <span>{showPass ? props.password : hiddenPassword}</span>
        )}
      </div>
      <div className={classes.btnWrap}>
        {editingPass ? (
          <button className={classes.save} onClick={saveItemHandler}>
            Save
          </button>
        ) : (
          ""
        )}
        <button className={classes.btn} onClick={togglePasswordHandler}>
          <FaEye className={classes.show} />
        </button>
        <button className={classes.btn} onClick={toggleEditPassword}>
          <FaEdit className={classes.edit} />
        </button>
        <button className={classes.btn} onClick={deleteItemHandler}>
          <FaTrashAlt className={classes.show} />
        </button>
      </div>
    </div>
  );
};

export default Card;
