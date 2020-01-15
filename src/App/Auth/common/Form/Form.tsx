import React, { useRef, memo, useState, useCallback, useEffect } from "react";
import {
  Route,
  Link as RouterLink,
  useRouteMatch,
  RouteProps
} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { useQuery } from "@apollo/react-hooks";
import { LOGIN_ROUTE } from "App/constants";
import { PASSWORD_EMAIL_ROUTE } from "App/Auth/routes";
import { EMAIL, PASSWORD } from "App/Auth/Auth";
import useChange from "App/Auth/hooks/useChange";
import useBlur from "App/Auth/hooks/useBlur";
import useFormState, { AuthForm } from "App/Auth/hooks/useFormState";
import useValidation from "App/Auth/hooks/useValidation";
import { FORM_EMAIL } from "App/Auth/queries/client";
import { IFormInputs } from "App/types/Form";
import useStyles from "./styles";
import { ExecutionResult } from "graphql";

const ExactRoute: React.FC<RouteProps> = ({ children, ...rest }) => (
  <Route exact strict {...rest}>
    {children}
  </Route>
);

type FormProps = {
  readonly onSubmit: (
    formInputs: IFormInputs
  ) => Promise<ExecutionResult | void> | undefined;
  readonly loading: boolean;
};
const Form: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const [, forceUpdate] = useState();

  const commonClasses = useStyles();

  const formRef = useRef<HTMLFormElement>(null);

  const { path } = useRouteMatch();

  const { data: formEmail } = useQuery<{ email: string }, void>(FORM_EMAIL, {
    fetchPolicy: "cache-only"
  });

  const [formInputs, setFormState] = useFormState(formEmail?.email);

  const change = useChange(setFormState);
  const blur = useBlur(setFormState);

  const submit = useCallback(
    async e => {
      e.preventDefault();
      try {
        await onSubmit(formInputs);
      } catch {
        // TODO: reset state only on specific error
        setFormState(
          state =>
            new AuthForm(
              Object.entries(state).reduce(
                (acc, [k, v]) => ({
                  ...acc,
                  [k]: {
                    ...v,
                    value: ""
                  }
                }),
                {}
              )
            )
        );
        // Welcome to React (:
        forceUpdate({});
      }
    },
    [onSubmit, formInputs, setFormState]
  );

  const email = formInputs[EMAIL];
  const password = formInputs[PASSWORD];

  const isFormValid = useValidation(formInputs);

  useEffect(() => {
    if (path === PASSWORD_EMAIL_ROUTE) {
      forceUpdate({});
    }
  }, [path]);

  return (
    <>
      <Avatar className={commonClasses.avatar}>
        <ExactRoute path={LOGIN_ROUTE}>
          <VpnKeyIcon />
        </ExactRoute>
        <ExactRoute path={PASSWORD_EMAIL_ROUTE}>
          <EmailIcon />
        </ExactRoute>
      </Avatar>
      <Typography component="h1" variant="h5">
        <ExactRoute path={LOGIN_ROUTE}>Login</ExactRoute>
        <ExactRoute path={PASSWORD_EMAIL_ROUTE}>Send reset email</ExactRoute>
      </Typography>
      <form
        ref={formRef}
        noValidate
        className={commonClasses.form}
        onSubmit={submit}
      >
        <TextField
          onChange={change}
          onBlur={blur}
          type="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name={EMAIL}
          autoComplete="email"
          autoFocus
          inputMode="email"
          inputRef={email.ref}
          inputProps={{ maxLength: 1000 }}
          error={Boolean(email.error)}
          helperText={email.error}
          value={email.value}
          disabled={loading}
        />
        <ExactRoute path={LOGIN_ROUTE}>
          <TextField
            onChange={change}
            onBlur={blur}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name={PASSWORD}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={password?.ref}
            inputProps={{ minLength: 8, maxLength: 1000 }}
            error={Boolean(password?.error)}
            helperText={password?.error}
            value={password?.value}
            disabled={loading}
          />
        </ExactRoute>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={commonClasses.submit}
          disabled={!isFormValid || loading}
        >
          <ExactRoute path={LOGIN_ROUTE}>login</ExactRoute>
          <ExactRoute path={PASSWORD_EMAIL_ROUTE}>send</ExactRoute>
        </Button>
        <Grid container>
          <Grid item xs className={commonClasses.link}>
            <ExactRoute path={LOGIN_ROUTE}>
              <Link
                to={PASSWORD_EMAIL_ROUTE}
                variant="body2"
                component={RouterLink}
              >
                Forgot password?
              </Link>
            </ExactRoute>
            <ExactRoute path={PASSWORD_EMAIL_ROUTE}>
              <Link to={LOGIN_ROUTE} variant="body2" component={RouterLink}>
                Back to login
              </Link>
            </ExactRoute>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default memo(Form);
