import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import { PORT } from '../config';


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://localhost:${PORT}/`
});

export const client = new ApolloClient({
  cache,
  link
})
