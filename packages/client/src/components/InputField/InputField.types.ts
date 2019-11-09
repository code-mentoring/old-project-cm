import { HTMLProps } from 'react';

export interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  className?: string;
  error?: string | Error;
}
