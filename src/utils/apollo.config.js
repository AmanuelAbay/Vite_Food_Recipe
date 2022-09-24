import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { LoggedIn, token } from "./user.js";

import { ApolloLink, from } from "apollo-link";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_URL,
});

const default_auth_link = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();
  const h = {
    ...headers,
  };
  if (LoggedIn) {
    h.authorization = `Bearer ${token}`;
  }

  operation.setContext({
    headers: h,
  });

  return forward(operation);
});
const cache = new InMemoryCache({
  addTypename: false,
});
const apolloClient = new ApolloClient({
  link: from([default_auth_link, httpLink]),
  cache,
});

export { apolloClient};
