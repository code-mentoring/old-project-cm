import './home.page.scss';

import React from 'react';

import logo from '../../images/logo.png';
import { Page } from '../../components/Page/Page';


export const HomePage = () => <Page title="Code Mentoring" type="home">
  <img alt="logo" src={logo} />
  <h1>Welcome to Project CM</h1>
</Page>
