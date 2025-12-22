import { MyBig } from '@/lib/big';

export const toCent = (amount: number): number => {
  return new MyBig(amount).mul(100).round(2).toNumber();
};

export const fromCent = (amount: number): number => {
  return new MyBig(amount).div(100).round(2).toNumber();
};

export const toCurrencyFromCent = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(fromCent(amount));
};
