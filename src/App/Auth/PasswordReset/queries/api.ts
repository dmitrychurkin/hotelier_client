import gql from "graphql-tag";

export const RESET_PASSWORD_CREDS = gql`
  query ResetPasswordCreds($passwordResetToken: String!) {
    resetPasswordCred(passwordResetToken: $passwordResetToken)
  }
`;
