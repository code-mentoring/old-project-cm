import React from 'react';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { HomePage } from '../pages/Home/Home.page';
import { OAuthPage } from '../pages/OAuth/oauth.page';
import { history } from './history';
import { AuthContainer } from '../containers/Auth.container';
import { Loading } from '../components/Loading/Loading';

export const AppRouter = () => {
  const { verifying } = AuthContainer.useContainer();

  if (verifying) return <Loading />;

  return <Router history={history}><Switch>
    <Route path="/oauth/github" component={OAuthPage} />
    <Route component={HomePage} />
  </Switch></Router>;
};

