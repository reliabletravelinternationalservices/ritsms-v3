
const delays = Object.freeze({
    destination: 0.05,
    inbound: 0.10,
    outbound: 0.15,
    services: 0.20,
    about: 0.25,
    partner: 0.30,
    inquiry: 0.35,
    feedback: 0.40,
});

const VALID_FOR_FOREIGN_ONLY_TAG = 'VALID FOR FOREIGN ONLY!';

export function useLanding() {
    return {
        delays,
        VALID_FOR_FOREIGN_ONLY_TAG,
    };
}