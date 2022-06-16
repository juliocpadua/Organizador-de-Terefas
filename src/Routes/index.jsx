import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

function Routes() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@Doit:token");

    if (token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Home authenticated={authenticated} />
      </Route>
      <Route exact path="/signup">
        <Signup authenticated={authenticated} />
      </Route>
      <Route exact path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard authenticated={authenticated} />
      </Route>
    </Switch>
  );
}

export default Routes;
