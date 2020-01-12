import React, { memo } from "react";
import { useLogout } from "./hooks";

const Dashboard: React.FC = () => {
  const logout = useLogout();

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default memo(Dashboard);
