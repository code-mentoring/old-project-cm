import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import { API_HOST } from '../config';


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${API_HOST}/graphql`
});

export const client = new ApolloClient({
  cache,
  link
})
