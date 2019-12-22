import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { AUTH_TOKEN_NAME, TOKEN_HEADER_NAME } from "consts";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/query"
});

const middlewareLink = new ApolloLink((operation, forward) => {
  // console.log("befowareLink => ", args);
  // const [operation, forward] = args;
  // console.log("operation => ", operation);
  // const beforeReqCtx = operation.getContext();
  // console.log("beforeReqCtx => ", beforeReqCtx);
  operation.setContext((args: any) => {
    // console.log("setContextArgs => ", args);
    const { headers = {} } = args;
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    return {
      headers: {
        ...headers,
        // "x-test-context": beforeReqCtx.testContext
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  return forward(operation).map(response => {
    console.log("response => ", response);
    const context = operation.getContext();
    console.log("context => ", context);
    const {
      response: { headers }
    } = operation.getContext();
    const authToken = headers.get(TOKEN_HEADER_NAME);
    // console.log("headers => ", authToken);
    if (authToken) {
      localStorage.setItem(AUTH_TOKEN_NAME, authToken);
    }
    return response;
  });
});

export default middlewareLink.concat(httpLink);
