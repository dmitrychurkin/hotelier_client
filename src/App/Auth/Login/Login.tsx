import React, { memo, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { USER_CACHE } from "App/queries/client";
import { LoginPayload, LoginDetails } from "./types";
import { LOGIN } from "./mutations/api";
import Form from "../common/Form";
import { AuthForm } from "../hooks/useFormState";

const Login: React.FC = () => {
  const [login, { loading }] = useMutation<LoginPayload, LoginDetails>(LOGIN, {
    update: (store, { data }) => {
      if (data?.login) {
        const { login: user } = data;
        store.writeData({ data: { email: "" } });
        store.writeQuery({ query: USER_CACHE, data: { user } });
      }
    }
  });

  const submit = useCallback(
    ({
      email: { value: emailValue },
      password: { value: passwordValue }
    }: AuthForm) => {
      if (emailValue && passwordValue) {
        return login({
          variables: { email: emailValue, password: passwordValue }
        });
      }
    },
    [login]
  );

  return <Form onSubmit={submit} loading={loading} />;
};

export default memo(Login);
