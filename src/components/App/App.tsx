import React, { memo, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Login from "components/Login";
import Dashboard from "components/Dashboard";
import { UserData } from "lib/types";
import { USER } from "./queries/api";
import "./App.css";

const App: React.FC = () => {
  const { data, loading } = useQuery<UserData, void>(USER);
  const history = useHistory();

  useEffect(() => {
    if (!loading) {
      history.replace(data?.user ? "/dashboard" : "/login");
    }
  }, [data, history, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default memo(App);
