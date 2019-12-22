import React, { memo, useCallback, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { LOGIN } from "./mutations/api";
import { LoginPayload, LoginDetails } from "./types";
import { REFERRER_STATE_KEY } from "consts";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [login] = useMutation<LoginPayload, LoginDetails>(LOGIN);
  const history = useHistory();

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      const emailEl = emailRef.current;
      const passwordEl = passRef.current;

      if (emailEl && passwordEl) {
        try {
          const result = await login({
            variables: {
              email: emailEl.value.trim(),
              password: passwordEl.value.trim()
            }
          });
          console.log(
            "result => ",
            result,
            history.location.state?.[REFERRER_STATE_KEY]
          );
          history.replace(
            history.location.state?.[REFERRER_STATE_KEY] || "/dashboard"
          );
        } catch (err) {
          console.log("login err => ", err);
        }
      }
    },
    [login, history]
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input ref={emailRef} type="email" name="email" />
        <input ref={passRef} type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default memo(Login);
