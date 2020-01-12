import React, { memo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { UserData } from "./types/User";
import { USER } from "./queries/api";
import AppRoutes from "./common/AppRoutes";
import Spinner from "./common/Spinner";
import routes from "./routes";
import theme from "./theme";

const App: React.FC = () => {
  const { loading } = useQuery<UserData, void>(USER);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Spinner />
      ) : (
        <BrowserRouter>
          <AppRoutes config={routes} />
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
};

export default memo(App);
