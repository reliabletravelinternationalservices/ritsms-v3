import { getImageUrl } from "@/lib/utils";
import { Option } from "./types";

export const INBOUND_HERO_IMAGE = getImageUrl('upload/agency/inbound_image.png');

export const SEASON_FILTER_OPTIONS: Option[] = [
  { label: 'Winter', value: 'winter' },
  { label: 'Summer', value: 'summer' },
];

export const DURATION_FILTER_OPTIONS : Option[] = Array.from({ length: 30 }, (_, index) => {
  const duration = index + 1;
  return {
    label: `${duration} Day${duration === 1 ? '' : 's'}`,
    value: duration,
  };
});
