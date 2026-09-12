import { getImageUrl } from "@/lib/utils";


export const SECTION_DELAYS = Object.freeze({
    rating: 0.05,
    about: 0.10, 
    video: 0.15,
    partner: 0.20,  
    offer: 0.25,
    inquiry: 0.30,
    social: 0.35,
    faq: 0.40, 
});

export const AGENCY_RATING_IMAGE = getImageUrl('upload/agency/about_agency.png');