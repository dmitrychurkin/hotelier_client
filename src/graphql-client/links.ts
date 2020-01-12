// import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/query",
  credentials: "include"
});

/* const middlewareLink = new ApolloLink((operation, forward) => {
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
}); */

export default httpLink; // middlewareLink.concat(httpLink);
