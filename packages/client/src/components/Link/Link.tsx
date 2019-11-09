import './link.scss';

import React from 'react';
import { Link as A } from 'react-router-dom';

import { LinkProps } from './Link.types';
import classnames from 'classnames';

export const Link: React.FunctionComponent<LinkProps> = ({
  className,
  to,
  children,
  button
}) => {
  return <A to={to} className={classnames(className, { button })}>{children}</A>;
};
