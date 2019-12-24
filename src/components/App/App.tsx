import React, { memo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import RedirectTo from "components/common/RedirectTo";
import Login from "components/Login";
import Dashboard from "components/Dashboard";
import { UserData } from "lib/types";
import { USER } from "./queries/api";

const App: React.FC = () => {
  const { loading } = useQuery<UserData, void>(USER);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RedirectTo />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default memo(App);
