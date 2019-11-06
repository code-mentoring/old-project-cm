import './header.scss';

import React from 'react';
import { API_HOST } from '../../config';

export interface HeaderProps {
}

export const Header: React.FunctionComponent<HeaderProps> = ({
}) => {
  return <header>
    <a className="button" href={`${API_HOST}/oauth/github`}>Login with Github</a>
  </header>
}
