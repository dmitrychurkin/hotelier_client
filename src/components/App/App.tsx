import React, { memo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { UserData } from "lib/types";
import { USER } from "./queries/api";
import AppRoutes from "components/common/AppRoutes";
import routes from "./routes";

const App: React.FC = () => {
  const { loading, ...rest } = useQuery<UserData, void>(USER);
  console.log("App useQuery => ", rest, loading);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppRoutes
        config={routes.map(route => ({
          ...route,
          exact: true,
          strict: true,
          sensitive: true
        }))}
      />
    </BrowserRouter>
  );
};

export default memo(App);
