import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner: React.FC = props => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    {...props}
  >
    <CircularProgress />
  </Box>
);

export default memo(Spinner);
