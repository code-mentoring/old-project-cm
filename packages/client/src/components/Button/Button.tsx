import './button.scss';

import React from 'react';

import { ButtonProps } from './Button.types';

export const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  size
}) => {
  return <button className={`button ${size}`}>{text}</button>;
};
