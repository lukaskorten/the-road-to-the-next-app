import { Route } from 'next';
import { ComponentType } from 'react';

export type NavItem = {
  title: string;
  icon: ComponentType;
  href: Route;
  hasSeparator?: boolean;
};
