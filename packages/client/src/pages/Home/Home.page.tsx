import './home.page.scss';

import React from 'react';

import logo from '../../images/logo.png';
import { Page } from '../../components/Page/Page';
import { Button } from '../../components/Button/Button';


export const HomePage = () => <Page title="Code Mentoring" type="home">
  <img alt="logo" src={logo} />
  <h1>Welcome to Project CM</h1>
  <Button text="Text" size="small" />
  <Button text="Text 2" size="medium" />
  <Button text="Text 2" size="large" />
</Page>;
