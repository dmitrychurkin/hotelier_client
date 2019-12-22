import gql from "graphql-tag";

export const USER_CACHE = gql`
  query User {
    user @client {
      id
      email
      firstName
      lastName
      role
      createdAt
    }
  }
`;
