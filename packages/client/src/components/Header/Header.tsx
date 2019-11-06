import './header.scss';

import React from 'react';
import { API_HOST } from '../../config';
import { MeContainer } from '../../containers/Me.container';
import { HeaderUser } from './User/HeaderUser';

export interface HeaderProps {
}

export const Header: React.FunctionComponent<HeaderProps> = ({
}) => {
  const { me } = MeContainer.useContainer();

  return <header>
    {me
      ? <HeaderUser me={me} />
      : <a className="button" href={`${API_HOST}/oauth/github`}>Login with Github</a>
    }
  </header>;
};
