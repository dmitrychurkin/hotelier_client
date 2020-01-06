import React, { memo, useCallback, useRef, useState, ChangeEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { USER_CACHE } from "lib/queries/client";
import { LoginPayload, LoginDetails } from "./types";
import { LOGIN } from "./mutations/api";
import useCommonStyles from "../PasswordEmail/styles";

interface ILoginInputs {
  readonly email: typeof input;
  readonly password: typeof input;
}

const input = { value: "", error: "", ref: null };
const Login: React.FC = () => {
  const commonClasses = useCommonStyles();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setFormValidity] = useState(false);
  const [loginForm, setLoginFormState] = useState(() => ({
    email: {
      ...input,
      ref: emailRef
    },
    password: {
      ...input,
      ref: passRef
    }
  }));

  const [login, { loading }] = useMutation<LoginPayload, LoginDetails>(LOGIN, {
    update: (store, { data }) => {
      if (data?.login) {
        const { login: user } = data;
        store.writeQuery({ query: USER_CACHE, data: { user } });
      }
    }
  });

  const change = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target;
      setLoginFormState(state => {
        const updateInput = {
          [name]: {
            ...state[name as keyof ILoginInputs],
            value: value.trim()
          }
        };
        return { ...state, ...updateInput };
      });
    },
    [setLoginFormState]
  );

  const blur = useCallback(
    ({ target }) => {
      const { name } = target;
      setLoginFormState(state => {
        const updateInput = {
          [name]: {
            ...state[name as keyof ILoginInputs],
            error: target.validationMessage
          }
        };
        return { ...state, ...updateInput };
      });
    },
    [setLoginFormState]
  );
  const { email, password } = loginForm;
  const submit = useCallback(
    async e => {
      e.preventDefault();
      if (email.value.length && password.value.length) {
        try {
          await login({
            variables: { email: email.value, password: password.value }
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
    [login, email, password]
  );

  // useEffect(() => {
  //   setFormValidity(Boolean(formRef.current?.checkValidity()));
  // }, [setFormValidity]);
  console.log("isFormValid ", isFormValid, setFormValidity);
  return (
    <>
      <Avatar className={commonClasses.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
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
          name="email"
          autoComplete="email"
          autoFocus
          inputMode="email"
          inputRef={emailRef}
          inputProps={{ maxLength: 1000 }}
          error={Boolean(email.error)}
          helperText={email.error}
          value={email.value}
        />
        <TextField
          onChange={change}
          onBlur={blur}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
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
          login
        </Button>
        <Grid container>
          <Grid item xs className={commonClasses.link}>
            <Link to="reset" variant="body2" component={RouterLink}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default memo(Login);
