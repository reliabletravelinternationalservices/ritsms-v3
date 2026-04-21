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
export const formatCurrency = (amount: number, currency: string = 'PHP'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    // Optional: Use 'minimumFractionDigits: 0' if you don't want decimals for whole numbers
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};