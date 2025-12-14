import { Route } from 'next';

export const homePath = (): Route => '/' as Route;

export const ticketPath = (ticketId: string): Route =>
  `/tickets/${ticketId}` as Route;

export const ticketsPath = (): Route => '/tickets' as Route;
