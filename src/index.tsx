import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, from } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import App from "components/App";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/query"
});
const middlewareLink = new ApolloLink((operation, forward) => {
  // console.log("befowareLink => ", args);
  // const [operation, forward] = args;
  console.log("operation => ", operation);
  const beforeReqCtx = operation.getContext();
  console.log("beforeReqCtx => ", beforeReqCtx);
  operation.setContext((args: any) => {
    console.log("setContextArgs => ", args);
    const { headers = {} } = args;
    return {
      headers: {
        ...headers,
        "x-test-context": beforeReqCtx.testContext
      }
    };
  });

  return forward(operation).map(response => {
    console.log("response => ", response);
    const context = operation.getContext();
    console.log("context => ", context);
    const {
      response: { headers }
    } = context;
    console.log("headers => ", headers.get("x-refresh-token"));
    return response;
  });
});
const client = new ApolloClient({
  link: from([middlewareLink, httpLink]),
  cache: new InMemoryCache()
});
const root = document.getElementById("root");
if (root) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    root
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
