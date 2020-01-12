import React, { memo, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { USER_CACHE } from "App/queries/client";
import { LoginPayload, LoginDetails, ILoginForm } from "./types";
import { LOGIN } from "./mutations/api";
import Form from "../common/Form";

const Login: React.FC = () => {
  const [login, { loading }] = useMutation<LoginPayload, LoginDetails>(LOGIN, {
    update: (store, { data }) => {
      if (data?.login) {
        const { login: user } = data;
        store.writeQuery({ query: USER_CACHE, data: { user } });
      }
    }
  });

  const submit = useCallback(
    async ({
      email: { value: emailValue },
      password: { value: passwordValue }
    }: ILoginForm) => {
      if (emailValue && passwordValue) {
        try {
          await login({
            variables: { email: emailValue, password: passwordValue }
          });
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    },
    [login]
  );

  return <Form onSubmit={submit} loading={loading} />;
};

export default memo(Login);
