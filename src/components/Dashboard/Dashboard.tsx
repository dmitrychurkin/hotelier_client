import React, { memo } from "react";
import { useLogout } from "lib/hooks";

const Dashboard: React.FC = () => {
  const onLogout = useLogout();

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default memo(Dashboard);
