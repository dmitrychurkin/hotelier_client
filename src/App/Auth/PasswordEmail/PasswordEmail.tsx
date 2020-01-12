import React, { useCallback, memo } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import {
  SendPasswordResetPayload,
  SendPasswordResetDetails,
  IPasswordEmailForm
} from "./types";
import { SEND_RESET } from "./mutations/api";
import Form from "../common/Form";
import { LOGIN_ROUTE } from "../routes";

const PasswordEmail: React.FC = () => {
  const history = useHistory();
  const [sendReset, { loading, ...rest }] = useMutation<
    SendPasswordResetPayload,
    SendPasswordResetDetails
  >(SEND_RESET);

  console.log("PasswordEmail rest => ", rest);
  const submit = useCallback(
    async ({ email: { value: email } }: IPasswordEmailForm) => {
      if (email) {
        try {
          const result = await sendReset({
            variables: {
              email,
              path: window.location.href
            }
          });
          console.log("sendPasswordReset result => ", result);
          history.replace(LOGIN_ROUTE);
        } catch (err) {
          console.log("err occured => ", err);
        }
      }
    },
    [sendReset, history]
  );

  return <Form onSubmit={submit} loading={loading} />;
};

export default memo(PasswordEmail);
