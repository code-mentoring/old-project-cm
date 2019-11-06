import './header-user.scss';

import { EUser } from 'cm-api';
import React from 'react';

export interface HeaderUserProps {
  me: EUser;
}

export const HeaderUser: React.FunctionComponent<HeaderUserProps> = ({
  me
}) => {
  return <div className='header-user'>
    <img src={me.socialPic} alt={`${me.firstName} ${me.lastName}`} />
    <span>{me.firstName}</span>
  </div>
}
