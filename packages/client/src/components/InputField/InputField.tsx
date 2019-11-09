import './input-field.scss';

import React from 'react';
import classnames from 'classnames';

import { InputFieldProps } from './InputField.types';

export const InputField: React.FunctionComponent<InputFieldProps> = ({
  name,
  label,
  className,
  value,
  error,
  disabled
}) => {
  return <>
    <label htmlFor={name}>{label}</label>
    <input id={name}
      className={classnames({
        className,
        error,
        disabled,
        filled: value
      })}
      value={value}
      disabled={disabled} />
  </>;
};
