import { Link } from "react-router-dom";
import classes from "./DashboardMenu.module.css";

const DashboardMenu = () => {
  return (
    <div className={classes.navigation}>
      <ul className={classes.list}>
        <li>
          <Link to="/dashboard">List of passwords</Link>
        </li>
        <li>
          <Link to="/dashboard/add-new-item">Add new password</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardMenu;
