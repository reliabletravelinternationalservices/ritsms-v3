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

export const HERO_CAROUSEL_IMAGES : ImageProps[] = [
    {
        id: 1,
        src: getImageUrl('upload/agency/carousel_1.png'),
        alt: 'Reliable International Travel Image Destination 1',
        
    },
    {
        id: 2,
        src: getImageUrl('upload/agency/carousel_2.png'),
        alt: 'Reliable International Travel Image Destination 2',
    },
    {
        id: 3,
        src: getImageUrl('upload/agency/carousel_3.png'),
        alt: 'Reliable International Travel Image Destination 3',
    },
]


export const CLIENT_FEEDBACK : ImageProps[] =  [

    {
        id: 1,
        alt: 'client feedback 1',
        src: getImageUrl('upload/agency/review_1.png'),
    },
    {
        id: 2,
        alt: 'client feedback 2',
        src: getImageUrl('upload/agency/review_2.png'),
    },
    {
        id: 3,
        alt: 'client feedback 3',
        src: getImageUrl('upload/agency/review_3.png'),
    },
    {
        id: 4,
        alt: 'client feedback 4',
        src: getImageUrl('upload/agency/review_4.png'),
    },
    {
        id: 5,
        alt: 'client feedback 5',
        src: getImageUrl('upload/agency/review_5.png'),
    },
    {
        id: 6,
        alt: 'client feedback 6',
        src: getImageUrl('upload/agency/review_6.png'),
    }

]


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







export const CLIENT_IMAGES: ImageProps[] = [
    {
        id: 1,
        alt: 'Reliable International Travel Satisfied Client 1',
        src: getImageUrl('upload/agency/client_1.png'),
    },
    {
        id: 2,
        alt: 'Reliable International Travel Satisfied Client 2',
        src: getImageUrl('upload/agency/client_2.png'),
    },
    {
        id: 3,
        alt: 'Reliable International Travel Satisfied Client 3',
        src: getImageUrl('upload/agency/client_3.png'),
    },
    {
        id: 4,
        alt: 'Reliable International Travel Satisfied Client 4',
        src: getImageUrl('upload/agency/client_4.png'),
    },
    {
        id: 5,
        alt: 'Reliable International Travel Satisfied Client 5',
        src: getImageUrl('upload/agency/client_5.png'),
    },
    {
        id: 6,
        alt: 'Reliable International Travel Satisfied Client 6',
        src: getImageUrl('upload/agency/client_6.png'),
    },
    {
        id: 7,
        alt: 'Reliable International Travel Satisfied Client 7',
        src: getImageUrl('upload/agency/client_7.png'),
    },
    {
        id: 8,
        alt: 'Reliable International Travel Satisfied Client 8',
        src: getImageUrl('upload/agency/client_8.png'),
    },
    {
        id: 9,
        alt: 'Reliable International Travel Satisfied Client 9',
        src: getImageUrl('upload/agency/client_9.png'),
    },
    {
        id: 10,
        alt: 'Reliable International Travel Satisfied Client 10',
        src: getImageUrl('upload/agency/client_10.png'),
    },
    {
        id: 11,
        alt: 'Reliable International Travel Satisfied Client 11',
        src: getImageUrl('upload/agency/client_11.png'),
    },
    {
        id: 12,
        alt: 'Reliable International Travel Satisfied Client 12',
        src: getImageUrl('upload/agency/client_12.png'),
    },
    {
        id: 13,
        alt: 'Reliable International Travel Satisfied Client 13',
        src: getImageUrl('upload/agency/client_13.png'),
    },
    {
        id: 14,
        alt: 'Reliable International Travel Satisfied Client 14',
        src: getImageUrl('upload/agency/client_14.png'),
    },
    {
        id: 15,
        alt: 'Reliable International Travel Satisfied Client 15',
        src: getImageUrl('upload/agency/client_15.png'),
    },
];


export const AGENCY_RATINGS = Object.freeze({
    experience: {
        label: 'YEARS OF EXPERIENCE',
        value: 17,
        icon: 'lucide:circle-star',
    },

    tour: {
        label: 'SUCCESSFUL TOURS',
        value: 2500,
        icon: 'boxicons:plane-land',
    },
    client: {
        label: 'HAPPY CLIENTS',
        value: 1600,
        icon: 'mdi:emoticon-happy-outline',
    },
    review: {
        label: 'AVERAGE CLIENT RATING',
        value: 4.8,
        icon: 'material-symbols:reviews-outline',
    }

});