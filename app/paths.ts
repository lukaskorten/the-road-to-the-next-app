import { Route } from 'next';

export const ticketPath = (ticketId: string): Route =>
  `/tickets/${ticketId}` as Route;

export const ticketsPath = (): Route => '/tickets' as Route;
