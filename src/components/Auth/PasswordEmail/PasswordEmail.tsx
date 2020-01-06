import React, { useRef, useCallback, memo } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SendPasswordResetPayload, SendPasswordResetDetails } from "./types";
import { SEND_RESET } from "./mutations/api";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";

const PasswordEmail: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [sendReset, { loading }] = useMutation<
    SendPasswordResetPayload,
    SendPasswordResetDetails
  >(SEND_RESET);
  const history = useHistory();
  const match = useRouteMatch();
  const { token } = useParams<{ token: string }>();
  console.log("route match => ", match);
  console.log("token => ", token);
  const submit = useCallback(
    async e => {
      e.preventDefault();
      const emailEl = emailRef.current;
      if (emailEl) {
        try {
          const result = await sendReset({
            variables: {
              email: emailEl.value.trim(),
              path: window.location.href
            }
          });
          console.log("sendPasswordReset result => ", result);
          history.replace("/login");
        } catch (err) {
          console.log("err occured => ", err);
        }
      }
    },
    [sendReset, history]
  );
  return (
    <>
      <h1>Send reset email</h1>
      <form onSubmit={submit}>
        <input ref={emailRef} type="email" name="email" />
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </>
  );
};

export default memo(PasswordEmail);
