<script setup lang="ts">
import DropdownField from '@/components/DropdownField.vue';
import { Icon } from '@iconify/vue';
import { useForm } from '@inertiajs/vue3';


type TForm = {
    Location: string;
    departure: string;
    duration: string;
};


const form = useForm<TForm>({
    Location: '',
    departure: '',
    duration: '',
});


interface Option {
  label: string;
  value: string | number;
}

const locationOptions: Option[] = [
    { label: 'Boracay', value: 'boracay' },
    { label: 'Baguio', value: 'baguio' },
    { label: 'Cebu', value: 'cebu' },
    { label: 'Davao', value: 'davao' },
    { label: 'Palawan', value: 'palawan' },
    { label: 'Siargao', value: 'siargao' },
    { label: 'Vigan', value: 'vigan' },
    { label: 'Bohol', value: 'bohol' },
    { label: 'Tagaytay', value: 'tagaytay' },
    { label: 'Coron', value: 'coron' },
    { label: 'El Nido', value: 'el_nido' },
    { label: 'Camiguin', value: 'camiguin' },
];

</script>

<template>
    <section class="w-full relative flex">
        <div class="max-w-5xl m-auto w-full flex flex-col md:flex-row items-stretch md:items-end justify-start gap-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                
                <div class="space-y-2">
                    <span class="flex items-end text-[var(--secondary-custom)]">
                        <Icon icon="lucide:map-pinned" width="20" height="20" />
                        <label class="ml-2 text-sm font-bold uppercase tracking-wider">Destination</label>
                    </span>
                    <DropdownField 
                        v-model="form.Location"
                        placeholder="Where to?"
                        :options="locationOptions"
                    />
                </div>

                <div class="space-y-2">
                    <span class="flex items-end text-[var(--secondary-custom)]">
                        <Icon icon="lucide:calendar" width="20" height="20" />
                        <label class="ml-2 text-sm font-bold uppercase tracking-wider">Season</label>
                    </span>
                    <DropdownField 
                        v-model="form.departure"
                        placeholder="When?"
                        :options="locationOptions"
                    />
                </div>

                <div class="space-y-2 sm:col-span-2 md:col-span-1">
                    <span class="flex items-end text-[var(--secondary-custom)]">
                        <Icon icon="lucide:clock-4" width="20" height="20" />
                        <label class="ml-2 text-sm font-bold uppercase tracking-wider">Duration</label>
                    </span>
                    <DropdownField 
                        v-model="form.duration"
                        placeholder="How long?"
                        :options="locationOptions"
                    />
                </div>
            </div>

            <div class="w-full md:w-auto">
                <button class="w-full md:w-auto bg-[var(--inbound-custom)] text-[var(--primary-custom)] h-[50px] md:h-[44px] px-8 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--outbound-opacity-custom)] transition-all duration-200">
                    <span class="whitespace-nowrap uppercase ">Search</span>
                    <Icon icon="material-symbols:search" width="24" height="24" />
                </button>
            </div>
            
        </div>
    </section>
</template>