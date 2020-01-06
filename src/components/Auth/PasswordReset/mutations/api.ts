import gql from "graphql-tag";

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $email: String!
    $password: String!
    $passwordResetToken: String!
  ) {
    resetPassword(
      email: $email
      password: $password
      passwordResetToken: $passwordResetToken
    ) {
      id
      email
      firstName
      lastName
      role
      createdAt
    }
  }
`;
