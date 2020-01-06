import React, { memo, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { RESET_PASSWORD_CREDS } from "./queries/api";
import {
  ResetPasswordCredPayload,
  ResetPasswordCredDetails,
  ResetPasswordPayload,
  ResetPasswordDetails
} from "./types";
import NotFound from "components/NotFound";
import { RESET_PASSWORD } from "./mutations/api";
import { USER_CACHE } from "lib/queries/client";

// TODO: refactor gql type PasswordResetCreds into just an email string
// should we really send confirmPassword, we may check and compare on client side :)
const PasswordReset = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { token: passwordResetToken } = useParams<{ token: string }>();
  console.log("token => ", passwordResetToken);
  const {
    data: passwordResetCreds,
    loading: passwordResetCredsLoading,
    error: passwordResetCredsError
  } = useQuery<ResetPasswordCredPayload, ResetPasswordCredDetails>(
    RESET_PASSWORD_CREDS,
    { variables: { passwordResetToken } }
  );
  const [resetPassword, { loading: resetPasswordLoading }] = useMutation<
    ResetPasswordPayload,
    ResetPasswordDetails
  >(RESET_PASSWORD, {
    update: (store, { data }) => {
      if (data?.resetPassword) {
        const { resetPassword: user } = data;
        store.writeQuery({ query: USER_CACHE, data: { user } });
      }
    }
  });
  const submit = useCallback(
    async e => {
      e.preventDefault();
      const passwordEl = passwordRef.current;
      const confirmPasswordEl = confirmPasswordRef.current;
      if (
        passwordResetCreds &&
        passwordEl &&
        confirmPasswordEl &&
        passwordEl.value.trim() === confirmPasswordEl.value.trim()
      ) {
        try {
          const res = await resetPassword({
            variables: {
              email: passwordResetCreds.resetPasswordCred,
              password: passwordEl.value.trim(),
              confirmPassword: confirmPasswordEl.value.trim(),
              passwordResetToken
            }
          });
          console.log("reset password result => ", res);
        } catch (err) {
          console.log("error occured on reset password err => ", err);
        }
      }
    },
    [resetPassword, passwordResetToken, passwordResetCreds]
  );
  console.log(
    "psswordResetCreds => ",
    passwordResetCreds,
    passwordResetCredsError
  );
  if (passwordResetCredsLoading) {
    return <div>Loading...</div>;
  }

  if (passwordResetCredsError) {
    return <NotFound />;
  }

  return (
    <>
      <h1>Reset password</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          defaultValue={passwordResetCreds?.resetPasswordCred}
          disabled
        />
        <input ref={passwordRef} type="password" name="password" />
        <input
          ref={confirmPasswordRef}
          type="password"
          name="confirmPassword"
        />
        <button type="submit" disabled={resetPasswordLoading}>
          Send
        </button>
      </form>
    </>
  );
};

export default memo(PasswordReset);
