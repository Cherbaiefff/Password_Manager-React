import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./components/context/auth-context";

const App = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const toggleLoginHandler = () => {
    setUserIsLoggedIn((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    const usersStore = JSON.parse(localStorage.getItem("users"));
    const passwordsStore = JSON.parse(localStorage.getItem("passwords"));

    if (usersStore === null && passwordsStore === null) {
      localStorage.setItem("users", JSON.stringify([]));
      localStorage.setItem("passwords", JSON.stringify([]));
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser === null) {
      return;
    }
    toggleLoginHandler();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: userIsLoggedIn,
        toggleLoginHandler: toggleLoginHandler,
      }}
    >
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Layout>
    </AuthContext.Provider>
  );
};

export default App;
