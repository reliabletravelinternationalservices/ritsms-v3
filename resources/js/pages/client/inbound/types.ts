export interface FilterState {
  destination: string;
  season: string;
  duration: number | null;
}

export interface Option {
  label: string;
  value: string | number | null;
}