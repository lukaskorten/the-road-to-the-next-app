import { Route } from 'next';
import { ReactElement } from 'react';

export type NavItem = {
  title: string;
  icon: ReactElement<Element>;
  href: Route;
};
