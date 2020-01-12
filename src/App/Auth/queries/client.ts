import gql from 'graphql-tag';

export const FORM_EMAIL = gql`
  {
    email @client
  }
`;