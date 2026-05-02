import type { Updater } from "@tanstack/vue-table"
import type { ClassValue } from "clsx"
import type { Ref } from "vue"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue
}



/**
 * Formats a number into a USD currency string.
 * @param amount - The numeric value to format
 * @returns A formatted string (e.g., "$1,234.56")
 */
export const formatCurrency = (amount: number, currency: string = 'PHP', fractions: number = 0): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    // Optional: Use 'minimumFractionDigits: 0' if you don't want decimals for whole numbers
    minimumFractionDigits: fractions,
    maximumFractionDigits: 2,
  }).format(amount);
};



export const getPackageDurationLabel = (days: number): string => {
  if (days > 1) {
    return `${days}D${days - 1}N`;
  } else {
    return `${days} day`;
  }
};

export const formatPackageDateRange = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;

  const singleFormat: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };

  const rangeStartFormat: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short'
  };

  const rangeEndFormat: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };

  const isSameDate =
    start.getDate() === end.getDate() &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (!endDate || isSameDate) {
    return start.toLocaleDateString('en-US', singleFormat);
  }

  return `${start.toLocaleDateString('en-US', rangeStartFormat)} - ${end.toLocaleDateString('en-US', rangeEndFormat)}`;
};