import React from 'react';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { history } from './history';
import { HomePage } from '../pages/Home/Home.page';

export const AppRouter = () => <Router history={history}><Switch>
  <Route component={HomePage} />
</Switch></Router>
