import { getImageUrl } from "@/lib/utils";
import { Option } from "./types";

export const OUTBOUND_IMAGE = getImageUrl('upload/agency/outbound_image.png');

export const SEASON_FILTER_OPTIONS: Option[] = [
  { label: 'Winter', value: 'winter' },
  { label: 'Summer', value: 'summer' },
  { label: 'Autumn', value: 'autumn' },
  { label: 'Spring', value: 'spring' },
];

export const DURATION_FILTER_OPTIONS : Option[] = Array.from({ length: 30 }, (_, index) => {
  const duration = index + 1;
  return {
    label: `${duration} Day${duration === 1 ? '' : 's'}`,
    value: duration,
  };
});
