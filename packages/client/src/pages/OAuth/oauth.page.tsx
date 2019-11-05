import './oauth.page.scss';

import React from 'react';

import { Page } from '../../components/Page/Page';
import logo from '../../images/logo.png';

export const OAuthPage = () => {
  return <Page type='oauth' title='Logging in'>
    <div>
      <img alt="logo" src={logo} />
      Logging in...
    </div>
  </Page>
}
