import React, { memo } from "react";
import { useLogout } from "./hooks";
import RedirectTo from "components/common/RedirectTo";

const Dashboard: React.FC = () => {
  const logout = useLogout();

  return (
    <>
      <RedirectTo handleFailure />
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default memo(Dashboard);
