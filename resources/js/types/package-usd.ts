import type { Package, PackageSchedule } from './package';

export interface PackageInUSD extends Package {
    base_price: number; // USD price
    original_price_php: number; // Original PHP price for reference
    down_payment: number;
}
