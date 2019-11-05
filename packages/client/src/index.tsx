import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { AppRouter } from './router/AppRouter';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);
