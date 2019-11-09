import { LinkProps as ReactRouterDomLinkProps } from 'react-router-dom';

export interface LinkProps extends ReactRouterDomLinkProps {
  className?: string;
  button?: boolean;
}
