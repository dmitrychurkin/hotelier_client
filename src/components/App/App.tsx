import React, { memo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserData } from "lib/types";
import { USER } from "./queries/api";
import AppRoutes from "components/common/AppRoutes";
import routes from "./routes";
import theme from "./theme";

const App: React.FC = () => {
  const { loading } = useQuery<UserData, void>(USER);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes config={routes} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default memo(App);
