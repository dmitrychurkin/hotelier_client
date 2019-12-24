import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { AUTH_TOKEN_NAME, TOKEN_HEADER_NAME, GQL_ENDPOINT } from "consts";

const httpLink = new HttpLink({
  uri: GQL_ENDPOINT
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext((args: any) => {
    const { headers = {} } = args;
    const authToken = localStorage.getItem(AUTH_TOKEN_NAME);
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : ""
      }
    };
  });

  return forward(operation).map(response => {
    const {
      response: { headers }
    } = operation.getContext();
    const authToken = headers.get(TOKEN_HEADER_NAME);
    if (authToken) {
      localStorage.setItem(AUTH_TOKEN_NAME, authToken);
    }
    return response;
  });
});

export default middlewareLink.concat(httpLink);
