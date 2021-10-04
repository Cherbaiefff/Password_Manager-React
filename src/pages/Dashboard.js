import DashboardList from "../components/Dashboard/DashboardList";
import { Switch, Route } from "react-router";
import DashboardMenu from "../components/Dashboard/DashboardMenu";
import DashboardNewItem from "../pages/DashboardNewItem";

const Dashboard = () => {
  return (
    <div>
      <DashboardMenu />
      <Switch>
        <Route path="/dashboard/add-new-item">
          <DashboardNewItem />
        </Route>
        <DashboardList />;
      </Switch>
    </div>
  );
};

export default Dashboard;
