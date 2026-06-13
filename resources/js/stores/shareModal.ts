import { ref } from 'vue';

const isOpen = ref(false);
const shareUrl = ref('');

export const useShareModal = () => {
    const open = (url?: string) => {
        shareUrl.value = url || window.location.href;
        isOpen.value = true;
    };
    
    const close = () => {
        isOpen.value = false;
    };

    return { isOpen, shareUrl, open, close };
};