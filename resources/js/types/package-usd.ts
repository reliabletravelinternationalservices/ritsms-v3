import type { Package } from './package';

export interface PackageInUSD extends Package {
    base_price: number; // USD price
    original_price_php: number; // Original PHP price for reference
}