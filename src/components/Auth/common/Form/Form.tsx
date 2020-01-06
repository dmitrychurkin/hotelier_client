import React, { useRef, memo, useState, useCallback, ChangeEvent } from "react";
import { Route, Link as RouterLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import useStyles from "./styles";

const LOGIN_PATH = "/login";
const SEND_RESET_EMAIL_PATH = "/reset";
const RESET_PASSWORD_PATH = "/reset/:token";
const EMAIL = "email";
const PASSWORD = "password";
const CONFIRM = "confirmPassword";
const input: IInput = { value: "", error: "", ref: null };

type FormProps = {
  readonly onSubmit: (loginForm: IFormInputs) => void;
  readonly loading: boolean;
};
const Form: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const commonClasses = useStyles();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const confirmPassRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>(null);

  const [formInputs, setFormState] = useState(() => ({
    [EMAIL]: {
      ...input,
      ref: emailRef
    },
    [PASSWORD]: {
      ...input,
      ref: passRef
    },
    [CONFIRM]: {
      ...input,
      ref: confirmPassRef
    }
  }));

  const change = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState(state => {
      const inputField = state[name as keyof IFormInputs];
      let error = "";
      if (inputField.error) {
        error = inputField.ref.current?.validationMessage ?? "";
      }

      const updateInput = {
        [name]: {
          ...inputField,
          error,
          value: value.trim()
        }
      };
      return { ...state, ...updateInput };
    });
  }, []);

  const blur = useCallback(({ target }) => {
    const { name } = target;
    setFormState(state => {
      const updateInput = {
        [name]: {
          ...state[name as keyof IFormInputs],
          error: target.validationMessage
        }
      };
      return { ...state, ...updateInput };
    });
  }, []);

  const submit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(formInputs);
    },
    [onSubmit, formInputs]
  );

  const email = formInputs[EMAIL];
  const password = formInputs[PASSWORD];
  const confirmPassword = formInputs[CONFIRM];
  const isFormValid = Object.values(formInputs).every(({ ref }) => {
    const el = ref.current;
    if (!el) {
      return false;
    }
    return !Boolean(el.validationMessage);
  });

  return (
    <>
      <Avatar className={commonClasses.avatar}>
        <Route path={LOGIN_PATH}>
          <VpnKeyIcon />
        </Route>
        <Route path={SEND_RESET_EMAIL_PATH}>
          <EmailIcon />
        </Route>
        <Route path={RESET_PASSWORD_PATH}>
          <RotateLeftIcon />
        </Route>
      </Avatar>
      <Typography component="h1" variant="h5">
        <Route path={LOGIN_PATH}>Login</Route>
        <Route path={SEND_RESET_EMAIL_PATH}>Send reset email</Route>
        <Route path={RESET_PASSWORD_PATH}>Reset password</Route>
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
          inputRef={emailRef}
          inputProps={{ maxLength: 1000 }}
          error={Boolean(email.error)}
          helperText={email.error}
          value={email.value}
        />
        <Route path={[LOGIN_PATH, RESET_PASSWORD_PATH]}>
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
            inputRef={passRef}
            inputProps={{ minLength: 8, maxLength: 1000 }}
            error={Boolean(password.error)}
            helperText={password.error}
            value={password.value}
          />
        </Route>
        <Route path={RESET_PASSWORD_PATH}>
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
            inputRef={confirmPassRef}
            inputProps={{ minLength: 8, maxLength: 1000 }}
            error={Boolean(confirmPassword.error)}
            helperText={confirmPassword.error}
            value={confirmPassword.value}
          />
        </Route>
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
          <Route path={LOGIN_PATH}>login</Route>
          <Route path={SEND_RESET_EMAIL_PATH}>send</Route>
          <Route path={RESET_PASSWORD_PATH}>reset</Route>
        </Button>
        <Grid container>
          <Grid item xs className={commonClasses.link}>
            <Route path={LOGIN_PATH}>
              <Link
                to={SEND_RESET_EMAIL_PATH}
                variant="body2"
                component={RouterLink}
              >
                Forgot password?
              </Link>
            </Route>
            <Route path={[SEND_RESET_EMAIL_PATH, RESET_PASSWORD_PATH]}>
              <Link to={LOGIN_PATH} variant="body2" component={RouterLink}>
                Login
              </Link>
            </Route>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export interface IFormInputs {
  readonly email: IInput;
  readonly password: IInput;
  readonly confirmPassword: IInput;
}

interface IInput {
  value: string;
  error: string;
  ref: React.MutableRefObject<HTMLInputElement | undefined> | null;
}

export default memo(Form);
