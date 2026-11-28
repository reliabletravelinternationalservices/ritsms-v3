import { getImageUrl } from "@/lib/utils";
import { ImageProps, ServiceProps } from './types'

export const LANDING_DELAYS = Object.freeze({
    destinationSection: 0.05,
    inboundSection: 0.10,
    outboundSection: 0.15,
    servicesSection: 0.20,
    aboutSection: 0.25,
    partnerSection: 0.30,
    inquirySection: 0.35,
    feedbackSection: 0.40,
});


export const VALID_FOR_FOREIGN_ONLY_TAG = 'VALID FOR FOREIGN ONLY!';


export const PARTNER_AGENCIES = [
    {
        name: 'Department of Tourism',
        logo: getImageUrl('upload/agency/pa_dot.png'),
        alt: 'Department of Tourism',
    },
    {
        name: 'TPB',
        logo: getImageUrl('upload/agency/pa_tpb.png'),
        alt: 'TPB',
    },
    {
        name: 'RTAA',
        logo: getImageUrl('upload/agency/pa_rtaa.png'),
        alt: 'RTAA',
    },
    {
        name: 'NITAS',
        logo: getImageUrl('upload/agency/pa_nitas.png'),
        alt: 'NITAS',
    },
    {
        name: 'TBA',
        logo: getImageUrl('upload/agency/pa_tba.png'),
        alt: 'TBA',
    },
];



export const AGENCY_CONTACTS = Object.freeze({
    email: {
        primary: 'inquiry@reliabletravelph.com',
        secondary: 'reliabletravelinfo@gmail.com',
    },
    phone: {
        primary: '+639085721338',
        secondary: '+639279275207',
    },
    address: {
        primary: {
            label: 'JJSS Commercial Building Brgy Navarro General Trias, Cavite, Philippines',
            link: "https://maps.app.goo.gl/sTjrppGkWkyQxLVd6",
        },
        secondary: {
            label: 'Nomangonan, San Manuel, Pangasinan, Philippines',
            link: "https://maps.app.goo.gl/CtAbm3yECPD9qU78A",
        }
    }
})

export const HERO_CAROUSEL_IMAGES: ImageProps[] = Array.from(
    { length: 3 },
    (_, index) => ({
        id: index + 1,
        src: getImageUrl(`assets/landing/carousel_${index + 1}.webp`),
        alt: `Carousel Image ${index + 1}`,
    })
);

export const CLIENT_FEEDBACK: Record<string, ImageProps[]> = {
    '2009_2024': Array.from({ length: 6 }, (_, index) => ({
        id: index + 1,
        alt: `Client feedback ${index + 1}`,
        src: getImageUrl(`assets/feedbacks/19-24/review_${index + 1}.webp`),
    })),

    '2025_2026': Array.from({ length: 6 }, (_, index) => ({
        id: index + 1,
        alt: `Client feedback ${index + 1}`,
        src: getImageUrl(`assets/feedbacks/25-26/review_${index + 1}.webp`),
    })),
};


export const AGENCY_SERVICES: ServiceProps[] = [
    {
        id: 1,
        name: 'Domestic & International Ticketing',
        description: 'Seamless flight bookings with the best routes and competitive fares for any destination.',
        icon: 'material-symbols-light:person-pin-sharp',
    },
    {
        id: 2,
        name: 'Hotels & Resorts Booking',
        description: 'Curated accommodations ranging from budget-friendly stays to 5-star luxury retreats.',
        icon: 'icon-park-solid:plan',
    },
    {
        id: 3,
        name: 'Passporting | Visa Processing',
        description: 'Expert assistance to handle your documentation and travel permits with ease and speed.',
        icon: 'fontisto:passport-alt',
    },
    {
        id: 4,
        name: 'Tour Packages',
        description: 'All-inclusive itineraries designed to showcase the best of the Philippines and the world.',
        icon: 'ic:sharp-travel-explore',
    },
    {
        id: 5,
        name: 'Travel Insurance',
        description: 'Travel with peace of mind. Our insurance protects you from unexpected costs and emergencies.',
        icon: 'mdi:security',
    },
    {
        id: 6,
        name: 'Cruises',
        description: ' Sail away on luxury liners to the world\'s most beautiful ports and coastal wonders.',
        icon: 'mdi:boat',
    }
]




export const CLIENT_IMAGES: ImageProps[] = Array.from(
    { length: 15 },
    (_, index) => ({
        id: index + 1,
        alt: `Reliable International Client Travel Pictures`,
        src: getImageUrl(`assets/clients/client_${index + 1}.webp`),
    })
);


export const AGENCY_RATINGS = Object.freeze({
    experience: {
        label: 'YEARS OF EXPERIENCE',
        value: 17,
        icon: 'lucide:circle-star',
    },

    tour: {
        label: 'SUCCESSFUL TOURS',
        value: 10000,
        icon: 'boxicons:plane-land',
    },
    client: {
        label: 'HAPPY CLIENTS',
        value: 10000,
        icon: 'mdi:emoticon-happy-outline',
    },
    review: {
        label: 'AVERAGE CLIENT RATING',
        value: 4.8,
        icon: 'material-symbols:reviews-outline',
    }

});