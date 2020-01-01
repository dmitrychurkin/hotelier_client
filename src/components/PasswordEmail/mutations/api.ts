import gql from "graphql-tag";

export const SEND_RESET = gql`
  mutation SendPasswordResetLink($email: String!, $path: String!) {
    sendPasswordResetLink(email: $email, path: $path)
  }
`;
