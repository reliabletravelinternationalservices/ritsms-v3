<script setup lang="ts">
import { ref } from 'vue';
import { formatCurrency, formatDateString } from '@/lib/utils';
import { PackageSchedule } from '@/types/package';
import { 
    Calendar, 
    CheckCircle2, 
    XCircle, 
    FileText,
} from 'lucide-vue-next';
interface Props {
    itineraries: Array<{
        day: number;
        title: string;
        activity: string[];
    }>;
    inclusions: string[];
    exclusions: string[];
    schedules: PackageSchedule[];
    notes: string[];
}

defineProps<Props>();

// State for managing active tabs inside details
const activeTab = ref<'itinerary' | 'inclusions' | 'schedules' | 'notes'>('itinerary');



</script>

<template>
    <section class="border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden">
        <div class="flex border-b bg-zinc-50/50 dark:bg-zinc-900/50 dark:border-zinc-800 overflow-x-auto">
            <button 
                @click="activeTab = 'itinerary'"
                :class="['px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors', activeTab === 'itinerary' ? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50' : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400']"
            >
                Itineraries ({{ itineraries?.length || 0 }})
            </button>
            <button 
                @click="activeTab = 'inclusions'"
                :class="['px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors', activeTab === 'inclusions' ? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50' : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400']"
            >
                Inclusions & Exclusions
            </button>
            <button 
                @click="activeTab = 'schedules'"
                :class="['px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors', activeTab === 'schedules' ? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50' : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400']"
            >
                Batch Schedules ({{ schedules?.length || 0 }})
            </button>
            <button 
                @click="activeTab = 'notes'"
                :class="['px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors', activeTab === 'notes' ? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50' : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400']"
            >
                Important Notes
            </button>
        </div>

        <div class="p-6">
            <!-- Tab: Itinerary -->
            <div v-if="activeTab === 'itinerary'" class="relative border-l border-zinc-200 dark:border-zinc-800 pl-6 ml-3 space-y-6">
                <div v-for="day in itineraries" :key="day.day" class="relative">
                    <span class="absolute -left-[35px] mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] text-white dark:bg-zinc-50 dark:text-zinc-900 font-bold">
                        {{ day.day }}
                    </span>
                    <h4 class="text-base font-semibold text-zinc-900 dark:text-zinc-50">Day {{ day.day }}: {{ day.title }}</h4>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1 whitespace-pre-line" v-for="(act, idx) in day.activity" :key="idx" >{{ act }}</p>
                </div>
                <p v-if="!itineraries?.length" class="text-sm text-zinc-500 text-center py-4">No itinerary setup yet.</p>
            </div>

            <!-- Tab: Inclusions & Exclusions -->
            <div v-if="activeTab === 'inclusions'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                    <h4 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-1.5">
                        <CheckCircle2 class="w-4 h-4 text-green-500" /> What's Included
                    </h4>
                    <ul class="space-y-2">
                        <li v-for="(inc, idx) in inclusions" :key="idx" class="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                            <span class="text-green-500 mt-0.5">•</span> {{ inc }}
                        </li>
                        <p v-if="!inclusions?.length" class="text-xs text-zinc-400 italic">None listed.</p>
                    </ul>
                </div>

                <div class="space-y-3">
                    <h4 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-1.5">
                        <XCircle class="w-4 h-4 text-red-500" /> What's Excluded
                    </h4>
                    <ul class="space-y-2">
                        <li v-for="(exc, idx) in exclusions" :key="idx" class="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                            <span class="text-red-500 mt-0.5">•</span> {{ exc }}
                        </li>
                        <p v-if="!exclusions?.length" class="text-xs text-zinc-400 italic">None listed.</p>
                    </ul>
                </div>
            </div>

            <!-- Tab: Batch Schedules -->
            <div v-if="activeTab === 'schedules'" class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="border-b dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                            <th class="pb-3 font-medium">Dates</th>
                            <th class="pb-3 font-medium">Price Override</th>
                            <th class="pb-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y dark:divide-zinc-800">
                        <tr v-for="sched in schedules" :key="sched.id" class="text-zinc-700 dark:text-zinc-300">
                            <td class="py-3">
                                <div class="flex items-center gap-2">
                                    <Calendar class="w-4 h-4 text-zinc-400" />
                                    <span>{{ formatDateString(sched.departure_date) }}</span>
                                </div>
                            </td>
                            <td class="py-3 font-medium text-zinc-900 dark:text-zinc-100">
                                {{ formatCurrency(sched.price, 'PHP') }}
                            </td>
                            <td class="py-3">
                                <div class="flex items-center gap-1.5">
                                    <span :class="['w-2 h-2 rounded-full', sched.is_available ? 'bg-green-500' : 'bg-red-500']"></span>
                                    <span class="text-xs">
                                        {{ sched.is_available ? 'Available' : 'Sold Out' }}
                                        <span v-if="sched.is_limited && sched.is_available" class="text-amber-600 dark:text-amber-400 font-medium">(Limited)</span>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!schedules?.length">
                            <td colspan="3" class="text-center py-4 text-sm text-zinc-500">No batch schedules configured.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Tab: Notes -->
            <div v-if="activeTab === 'notes'" class="space-y-3">
                <h4 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-1.5">
                    <FileText class="w-4 h-4 text-zinc-400" /> Terms & Conditions Notes
                </h4>
                <ul class="space-y-3">
                    <li v-for="(note, idx) in notes" :key="idx" class="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800">
                        {{ note }}
                    </li>
                    <p v-if="!notes?.length" class="text-sm text-zinc-500 text-center py-4">No special notes added.</p>
                </ul>
            </div>
        </div>
    </section>
</template>