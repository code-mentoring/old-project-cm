import './styles/app.scss';

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

import { client } from './lib/apollo';
import { AppRouter } from './router/AppRouter';
import { ContainerWrapper } from './containers/Wrapper';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContainerWrapper>
      <AppRouter />
    </ContainerWrapper>
  </ApolloProvider>,
  document.getElementById('root')
);
