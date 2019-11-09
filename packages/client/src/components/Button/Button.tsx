import './button.scss';

import React from 'react';

export interface ButtonProps {
  text: string;
  size: 'small' | 'medium' | 'large';
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  size
}) => {
  return <button className={`button ${size}`}>{text}</button>;
};
