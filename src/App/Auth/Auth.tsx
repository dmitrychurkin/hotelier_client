import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AppRoutes from "App/common/AppRoutes";
import useStyles from "./styles";
import routes from "./routes";

export const EMAIL = "email";
export const PASSWORD = "password";
export const CONFIRM = "confirmPassword";

const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {children ? (
            children
          ) : (
            <AppRoutes wrapWithSwitch={false} config={routes} />
          )}
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Made with ❤ by Dmitry. "}
              {"Copyright © "}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(Auth);
