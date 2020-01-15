import React, { memo, useRef, useCallback } from "react";
import { useParams, Link as RouterLink, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NotFound from "App/NotFound";
import Spinner from "App/common/Spinner";
import { USER_CACHE } from "App/queries/client";
import { RESET_PASSWORD } from "./mutations/api";
import { RESET_PASSWORD_CREDS } from "./queries/api";
import {
  ResetPasswordCredPayload,
  ResetPasswordCredDetails,
  ResetPasswordPayload,
  ResetPasswordDetails
} from "./types";
import useStyles from "../common/Form/styles";
import useValidation from "../hooks/useValidation";
import useFormState from "../hooks/useFormState";
import useChange from "../hooks/useChange";
import useBlur from "../hooks/useBlur";
import Auth, { EMAIL, PASSWORD, CONFIRM } from "../Auth";
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from "App/constants";

const PasswordReset: React.FC = () => {
  const classes = useStyles();

  const formRef = useRef<HTMLFormElement>(null);

  const history = useHistory();
  const { token: passwordResetToken } = useParams<{ token: string }>();
  console.log("token => ", passwordResetToken);

  const {
    data: passwordResetCreds,
    loading: passwordResetCredsLoading,
    error: passwordResetCredsError
  } = useQuery<ResetPasswordCredPayload, ResetPasswordCredDetails>(
    RESET_PASSWORD_CREDS,
    { variables: { passwordResetToken } }
  );

  const [resetPassword, { loading: resetPasswordLoading }] = useMutation<
    ResetPasswordPayload,
    ResetPasswordDetails
  >(RESET_PASSWORD);

  const [formInputs, setFormState] = useFormState(
    passwordResetCreds?.resetPasswordCred
  );

  const change = useChange(setFormState, false);
  const blur = useBlur(setFormState);

  const email = passwordResetCreds?.resetPasswordCred ?? "";
  const password = formInputs[PASSWORD];
  const confirmPassword = formInputs[CONFIRM];

  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;

  const submit = useCallback(
    async e => {
      e.preventDefault();
      if (
        passwordValue &&
        confirmPasswordValue &&
        passwordValue === confirmPasswordValue
      ) {
        try {
          const res = await resetPassword({
            variables: {
              email,
              passwordResetToken,
              password: passwordValue,
              confirmPassword: confirmPasswordValue
            },
            update: (store, { data }) => {
              if (data?.resetPassword) {
                const { resetPassword: user } = data;
                store.writeQuery({ query: USER_CACHE, data: { user } });
              }
            }
          });
          console.log("reset password result => ", res);
          history.replace(DASHBOARD_ROUTE);
        } catch (err) {
          console.log("error occured on reset password err => ", err);
        }
      }
    },
    [
      resetPassword,
      passwordResetToken,
      email,
      passwordValue,
      confirmPasswordValue,
      history
    ]
  );

  const isFormValid = useValidation(
    formInputs,
    passwordValue,
    confirmPasswordValue
  );

  console.log(
    "psswordResetCreds => ",
    passwordResetCreds,
    passwordResetCredsError
  );
  if (passwordResetCredsLoading) {
    return <Spinner />;
  }

  if (passwordResetCredsError) {
    return <NotFound />;
  }

  return (
    <Auth>
      <Avatar className={classes.avatar}>
        <RotateLeftIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reset password
      </Typography>
      <form ref={formRef} noValidate className={classes.form} onSubmit={submit}>
        <TextField
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
          defaultValue={email}
          disabled
        />
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
          inputRef={password.ref}
          inputProps={{ minLength: 8, maxLength: 1000 }}
          error={Boolean(password.error)}
          helperText={password.error}
          value={passwordValue}
          disabled={resetPasswordLoading}
        />
        <TextField
          onChange={change}
          onBlur={blur}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name={CONFIRM}
          label="Confirm password"
          type="password"
          id="confirm-password"
          autoComplete="current-password"
          inputRef={confirmPassword.ref}
          inputProps={{ minLength: 8, maxLength: 1000 }}
          error={Boolean(confirmPassword.error)}
          helperText={confirmPassword.error}
          value={confirmPasswordValue}
          disabled={resetPasswordLoading}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!isFormValid || resetPasswordLoading}
        >
          reset
        </Button>
        <Grid container>
          <Grid item xs className={classes.link}>
            <Link to={LOGIN_ROUTE} variant="body2" component={RouterLink}>
              Back to login
            </Link>
          </Grid>
        </Grid>
      </form>
    </Auth>
  );
};

export default memo(PasswordReset);
