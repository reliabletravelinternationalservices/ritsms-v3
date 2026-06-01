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


// Helper to format date strings
export const formatDateString = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};


export const getPackageDurationLabel = (days: number): string => {
  if (days > 1) {
    return `${days}D${days - 1}N`;
  } else {
    return `${days} day`;
  }
};

export const formatPackageDateRange = (
    startDate?: string | null,
    endDate?: string | null
): string => {
    const singleFormat: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    const rangeStartFormat: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
    };

    const rangeEndFormat: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    // No start date → show only end date
    if (!startDate && endDate) {
        return `Ends at ${new Date(endDate).toLocaleDateString('en-US', singleFormat)}`;
    }

    const start = new Date(startDate!);
    const end = endDate ? new Date(endDate) : start;

    const isSameDate =
        start.getDate() === end.getDate() &&
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear();

    if (!endDate || isSameDate) {
        return start.toLocaleDateString('en-US', singleFormat);
    }

    return `${start.toLocaleDateString('en-US', rangeStartFormat)} - ${end.toLocaleDateString('en-US', rangeEndFormat)}`;
};


export const truncateText = (
    text: string,
    maxLength: number = 20
): string => {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength)}...`;
};


export const packageSellingStatus = (endDate: string): string => {
    const today = new Date();
    const end = new Date(endDate);

    return today > end ? 'ENDED' : 'SELLING';
};

export const getSeasonColor = (season: string): string => {
    switch (season) {
        case 'spring':
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';

        case 'summer':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';

        case 'autumn':
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';

        case 'winter':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';

        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
};




export const scrollToSection = (id:string) => {
    const element = document.getElementById(id);

    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
};


export const formatItinerariesForEdit = (
    itineraries: Array<{
        day: number;
        title: string;
        activity: string[];
    }>,
    unescapeJsonString: (val: string) => string
): string => {
    if (!Array.isArray(itineraries) || itineraries.length === 0) {
        return '';
    }

    return itineraries
        .map((item) => {
            const title = unescapeJsonString(item.title ?? '');

            const activities = Array.isArray(item.activity)
                ? item.activity.map(unescapeJsonString).join('\n')
                : unescapeJsonString(item.activity ?? '');

            return `${title}\n${activities}`;
        })
        .join('\n\n');
};