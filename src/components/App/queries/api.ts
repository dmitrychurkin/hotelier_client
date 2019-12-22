import gql from "graphql-tag";

export const USER = gql`
  query User {
    user {
      id
      email
      firstName
      lastName
      role
      createdAt
    }
  }
`;
