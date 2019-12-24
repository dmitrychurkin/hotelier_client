import React, { memo, useCallback, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "./mutations/api";
import { LoginPayload, LoginDetails } from "./types";
import RedirectTo from "components/common/RedirectTo";
import { USER_CACHE } from "lib/queries/client";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [login, { loading }] = useMutation<LoginPayload, LoginDetails>(LOGIN, {
    update: (store, { data }) => {
      if (data?.login) {
        const { login: user } = data;
        store.writeQuery({ query: USER_CACHE, data: { user } });
      }
    }
  });

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      const emailEl = emailRef.current;
      const passwordEl = passRef.current;

      if (emailEl && passwordEl) {
        try {
          await login({
            variables: {
              email: emailEl.value.trim(),
              password: passwordEl.value.trim()
            }
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
    [login]
  );

  return (
    <>
      <RedirectTo handleSuccess />
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input ref={emailRef} type="email" name="email" />
        <input ref={passRef} type="password" name="password" />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </>
  );
};

export default memo(Login);
