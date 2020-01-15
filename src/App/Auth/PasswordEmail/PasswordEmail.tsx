import React, { useCallback, memo } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { SendPasswordResetPayload, SendPasswordResetDetails } from "./types";
import { SEND_RESET } from "./mutations/api";
import Form from "../common/Form";
import { LOGIN_ROUTE } from "App/constants";
import { IFormInputs } from "App/types/Form";

const PasswordEmail: React.FC = () => {
  const history = useHistory();
  const [sendReset, { loading }] = useMutation<
    SendPasswordResetPayload,
    SendPasswordResetDetails
  >(SEND_RESET, {
    update: store => {
      store.writeData({ data: { email: "" } });
    }
  });

  const submit = useCallback(
    ({ email: { value: email } }: IFormInputs) => {
      if (email) {
        return sendReset({
          variables: {
            email,
            path: window.location.href
          }
        }).then(() => {
          history.replace(LOGIN_ROUTE);
        });
      }
    },
    [sendReset, history]
  );

  return <Form onSubmit={submit} loading={loading} />;
};

export default memo(PasswordEmail);
