<script setup lang="ts">
import { ref } from 'vue';
import { useShareModal } from '@/stores/shareModal';
import { X, Copy, Check } from 'lucide-vue-next';
import { Icon } from '@iconify/vue';

const { isOpen, shareUrl, close } = useShareModal();
const isCopied = ref(false);

const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl.value);
    isCopied.value = true;
    setTimeout(() => isCopied.value = false, 2000);
};

const socialLinks = [
    {
        name: 'Messenger',
        icon: 'logos:messenger',
        url: (url: string) =>
            `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}`
    },
    {
        name: 'Facebook',
        icon: 'logos:facebook',
        url: (url: string) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
        name: 'WhatsApp',
        icon: 'logos:whatsapp-icon',
        url: (url: string) =>
            `https://wa.me/?text=${encodeURIComponent(url)}`
    },
    {
        name: 'SMS',
        icon: 'flat-color-icons:sms',
        url: (url: string) =>
            `sms:?body=${encodeURIComponent(url)}`
    },
];
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm" @click.self="close">
      <div class="relative w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 overflow-hidden border border-slate-100">
        
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-slate-800">Share Link</h3>
          <button @click="close" class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Input Group -->
        <div class="flex items-center gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl mb-8 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input type="text" readonly :value="shareUrl" class="w-full px-3 py-2 bg-transparent text-sm text-slate-600 outline-none truncate" />
          <button 
            @click="handleCopy" 
            :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all', isCopied ? 'bg-green-500 text-white' : 'bg-slate-800 text-white hover:bg-slate-900']"
          >
            <component :is="isCopied ? Check : Copy" class="w-4 h-4" />
            {{ isCopied ? 'Copied' : 'Copy' }}
          </button>
        </div>

        <!-- Social Grid -->
        <div class="grid grid-cols-4 gap-1">
          <a v-for="social in socialLinks" :key="social.name" :href="social.url(shareUrl)" target="_blank" 
             class="flex flex-col items-center gap-2 group cursor-pointer">
            <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
              <Icon :icon="social.icon" :class="['w-8 h-8']" />
            </div>
            <span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">{{ social.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>