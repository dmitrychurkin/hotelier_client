import { ApolloClient } from "apollo-client";
import link from "./links";
import cache from "./cache";
import resolvers from "./resolvers";

export default new ApolloClient({
  link,
  cache,
  resolvers
});
