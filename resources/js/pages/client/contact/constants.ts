import { getImageUrl } from "@/lib/utils";


export const SECTION_DELAYS = Object.freeze({
    offer: 0.05,
    inquiry: 0.10, 
    social: 0.15,
    faq: 0.20,   
});



export const AGENCY_SOCIAL_MEDIA = Object.freeze({
    facebook: {
        label: 'Facebook',
        link: 'https://www.facebook.com/reliableinternationaltravelservices',
        icon: 'ic:baseline-facebook',
    },
    instagram: {
        label: 'Instagram',
        link: 'https://www.instagram.com/reliabletravelph',
        icon: 'mdi:instagram',
    },
    tiktok: {
        label: 'Tiktok',
        link: 'https://www.tiktok.com/@reliabletravelph',
        icon: 'ic:baseline-tiktok',
    },
    youtube: {
        label: 'Youtube',
        link: 'https://www.youtube.com/@reliabletravelservices',
        icon: 'mdi:youtube',
    }
})


export const AGENCY_OFFER_IMAGE = getImageUrl('upload/agency/services.png');


export const AGENCY_BOOKING_PROCESS = [
    {
        step: 1,
        title: 'Inquiry',
        description: 'From the time you noticed our Facebook Ads, Website, or Instagram story, you\'ve been looking for a trip. We just need your personal and desired travel information.'
    },
    {
        step: 2,
        title: 'Travel Consultation',
        description: 'You will be assigned to our professional travel consultant and serve as your expert partner in your long-awaited travel.'
    },
    {
        step: 3,
        title: 'Review and Decide',
        description: 'You will receive a travel proposal based on the information you\'ve submitted in our destination form. Just review it and decide if you\'re up to it.'
    },
    {
        step: 4,
        title: 'Pay and Seal The Deal',
        description: 'Proceed to payment. After successful payment, please submit a proof of payment.'
    }
]