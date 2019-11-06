import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import { API_HOST } from '../config';

const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri: `${API_HOST}/graphql` });
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
  return forward(operation);
});

const link = middlewareLink.concat(httpLink);

export const client = new ApolloClient({
  cache,
  link
});
