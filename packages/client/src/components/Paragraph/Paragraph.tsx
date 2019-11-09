import './paragraph.scss';

import React from 'react';

import { ParagraphProps } from './Paragraph.types';
import classnames from 'classnames';

export const Paragraph: React.FunctionComponent<ParagraphProps> = ({
  children,
  className,
  large
}) => {
  return <p className={classnames(className, { large })}>{children}</p>;
};
