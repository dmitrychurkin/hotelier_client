import React, { memo, useCallback } from "react";
// import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
// import Avatar from "@material-ui/core/Avatar";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import Link from "@material-ui/core/Link";
import { USER_CACHE } from "lib/queries/client";
import { LoginPayload, LoginDetails } from "./types";
import { LOGIN } from "./mutations/api";
// import useCommonStyles from "../PasswordEmail/styles";
import Form from "../common/Form";
import { IFormInputs } from "../common/Form/Form";

interface ILoginInputs {
  readonly email: typeof input;
  readonly password: typeof input;
}

const input = { value: "", error: "", ref: null };
const Login: React.FC = () => {
  // const commonClasses = useCommonStyles();
  // const emailRef = useRef<HTMLInputElement>();
  // const passRef = useRef<HTMLInputElement>();
  // const formRef = useRef<HTMLFormElement>(null);

  // const [loginForm, setLoginFormState] = useState(() => ({
  //   email: {
  //     ...input,
  //     ref: emailRef
  //   },
  //   password: {
  //     ...input,
  //     ref: passRef
  //   }
  // }));

  const [login, { loading }] = useMutation<LoginPayload, LoginDetails>(LOGIN, {
    update: (store, { data }) => {
      if (data?.login) {
        const { login: user } = data;
        store.writeQuery({ query: USER_CACHE, data: { user } });
      }
    }
  });

  // const change = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = target;
  //   setLoginFormState(state => {
  //     const inputField = state[name as keyof ILoginInputs];
  //     let error = "";
  //     if (inputField.error) {
  //       error = inputField.ref.current?.validationMessage ?? "";
  //     }

  //     const updateInput = {
  //       [name]: {
  //         ...inputField,
  //         error,
  //         value: value.trim()
  //       }
  //     };
  //     return { ...state, ...updateInput };
  //   });
  // }, []);

  // const blur = useCallback(({ target }) => {
  //   const { name } = target;
  //   setLoginFormState(state => {
  //     const updateInput = {
  //       [name]: {
  //         ...state[name as keyof ILoginInputs],
  //         error: target.validationMessage
  //       }
  //     };
  //     return { ...state, ...updateInput };
  //   });
  // }, []);

  // const { email, password } = loginForm;
  const submit = useCallback(
    async ({
      email: { value: emailValue },
      password: { value: passwordValue }
    }: IFormInputs) => {
      if (emailValue && passwordValue) {
        try {
          await login({
            variables: { email: emailValue, password: passwordValue }
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
    [login]
  );

  // const isFormValid = Object.values(loginForm).every(({ ref }) => {
  //   const el = ref.current;
  //   if (!el) {
  //     return false;
  //   }
  //   return !Boolean(el.validationMessage);
  // });

  // return (
  //   <>
  //     <Avatar className={commonClasses.avatar}>
  //       <VpnKeyIcon />
  //     </Avatar>
  //     <Typography component="h1" variant="h5">
  //       Login
  //     </Typography>
  //     <form
  //       ref={formRef}
  //       noValidate
  //       className={commonClasses.form}
  //       onSubmit={submit}
  //     >
  //       <TextField
  //         onChange={change}
  //         onBlur={blur}
  //         type="email"
  //         variant="outlined"
  //         margin="normal"
  //         required
  //         fullWidth
  //         id="email"
  //         label="Email Address"
  //         name="email"
  //         autoComplete="email"
  //         autoFocus
  //         inputMode="email"
  //         inputRef={emailRef}
  //         inputProps={{ maxLength: 1000 }}
  //         error={Boolean(email.error)}
  //         helperText={email.error}
  //         value={email.value}
  //       />
  //       <TextField
  //         onChange={change}
  //         onBlur={blur}
  //         variant="outlined"
  //         margin="normal"
  //         required
  //         fullWidth
  //         name="password"
  //         label="Password"
  //         type="password"
  //         id="password"
  //         autoComplete="current-password"
  //         inputRef={passRef}
  //         inputProps={{ minLength: 8, maxLength: 1000 }}
  //         error={Boolean(password.error)}
  //         helperText={password.error}
  //         value={password.value}
  //       />
  //       {/* <FormControlLabel
  //         control={<Checkbox value="remember" color="primary" />}
  //         label="Remember me"
  //       /> */}
  //       <Button
  //         type="submit"
  //         fullWidth
  //         variant="contained"
  //         color="primary"
  //         className={commonClasses.submit}
  //         disabled={!isFormValid || loading}
  //       >
  //         login
  //       </Button>
  //       <Grid container>
  //         <Grid item xs className={commonClasses.link}>
  //           <Link to="reset" variant="body2" component={RouterLink}>
  //             Forgot password?
  //           </Link>
  //         </Grid>
  //       </Grid>
  //     </form>
  //   </>
  // );
  return <Form onSubmit={submit} loading={loading} />;
};

export default memo(Login);
