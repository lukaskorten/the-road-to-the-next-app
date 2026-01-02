import { Route } from 'next';

export const homePath = (): Route => '/' as Route;

export const ticketPath = (ticketId: string): Route =>
  `/tickets/${ticketId}` as Route;

export const ticketEditPath = (ticketId: string): Route =>
  `/tickets/${ticketId}/edit` as Route;

export const ticketsPath = (): Route => '/tickets' as Route;

export const signUpPath = (): Route => '/sign-up' as Route;

export const signInPath = (): Route => '/sign-in' as Route;

export const passwordForgotPath = (): Route => '/password-forgot' as Route;

export const accountProfilePath = (): Route => '/account/profile' as Route;
export const accountPasswordPath = (): Route => '/account/password' as Route;
