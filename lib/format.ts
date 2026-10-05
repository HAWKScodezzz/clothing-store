import { SITE } from './config';

const indianNumberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  const formattedNumber = indianNumberFormatter.format(Math.round(amount));
  if (SITE.currencyStyle === 'Rs.') {
    return `Rs. ${formattedNumber}`;
  }
  return `₹${formattedNumber}`;
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatOrderId(id: string): string {
  const clean = id.replace('#', '').trim();
  return `#${clean}`;
}
