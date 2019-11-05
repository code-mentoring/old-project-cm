import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { AppRouter } from './router/AppRouter';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();

const PORT = process.env.PORT || 4000;
const link = new HttpLink({
  uri: `http://localhost:${PORT}/`
});

const client = new ApolloClient({
  cache,
  link
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('root')
);
