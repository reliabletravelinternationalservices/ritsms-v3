<script setup lang="ts">
import { ref } from 'vue';
import { formatCurrency, formatDateString } from '@/lib/utils';
import { PackageSchedule } from '@/types/package';
import { Link, router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import { openDeleteDialog } from '@/stores/deleteDialog';
import { 
    Calendar, 
    CheckCircle2, 
    XCircle, 
    FileText,
    Pencil,
} from 'lucide-vue-next';
interface Props {
    packageId: number;
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

const props = defineProps<Props>();

// State for managing active tabs inside details
const activeTab = ref<'itinerary' | 'inclusions' | 'schedules' | 'notes'>('itinerary');

const deleteSchedule = (scheduleId: number) => {
    openDeleteDialog({
        title: 'Delete travel batch',
        message: 'Delete this travel batch? This action cannot be undone.',
        confirmText: 'Delete batch',
        cancelText: 'Cancel',
        onConfirm: () => {
            router.delete(route('admin.packages.batches.destroy', { id: props.packageId, scheduleId }), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Travel batch deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete travel batch');
                },
            });
        },
    });
};

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
            <div v-if="activeTab === 'schedules'" class="space-y-5">
                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-50">Batch Travel Schedules</h3>
                        <p class="text-sm text-zinc-500 dark:text-zinc-400">Add or update schedule entries for this package.</p>
                    </div>
                    <Link :href="route('admin.packages.batches.create', { id: packageId })" class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900">
                        <Pencil class="w-4 h-4" /> Add batch schedule
                    </Link>
                </div>

                <div class="overflow-x-auto rounded-3xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
                    <table class="min-w-full divide-y text-left text-sm text-zinc-700 dark:text-zinc-300">
                        <thead>
                            <tr class="text-zinc-500 dark:text-zinc-400">
                                <th class="px-4 py-3 font-medium">Departure</th>
                                <th class="px-4 py-3 font-medium">Return</th>
                                <th class="px-4 py-3 font-medium">Price</th>
                                <th class="px-4 py-3 font-medium">Status</th>
                                <th class="px-4 py-3 text-right font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
                            <tr v-for="sched in schedules" :key="sched.id" class="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                                <td class="px-4 py-4">
                                    <div class="flex items-center gap-2">
                                        <Calendar class="w-4 h-4 text-zinc-400" />
                                        <div>
                                            <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">{{ formatDateString(sched.departure_date) }}</p>
                                            <p class="text-xs text-zinc-500 dark:text-zinc-400">Departure</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-4">
                                    <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">{{ sched.return_date ? formatDateString(sched.return_date) : '-' }}</p>
                                    <p class="text-xs text-zinc-500 dark:text-zinc-400">Return</p>
                                </td>
                                <td class="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">{{ formatCurrency(sched.price, 'PHP') }}</td>
                                <td class="px-4 py-4">
                                    <span class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" :class="sched.is_available ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'">
                                        <span class="h-2.5 w-2.5 rounded-full" :class="sched.is_available ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                                        {{ sched.is_available ? 'Available' : 'Sold out' }}
                                    </span>
                                    <p v-if="sched.is_limited && sched.is_available" class="mt-1 text-xs text-amber-600 dark:text-amber-400">Limited slots</p>
                                </td>
                                <td class="px-4 py-4 text-right">
                                    <div class="flex flex-wrap justify-end gap-2">
                                        <Link :href="route('admin.packages.batches.edit', { id: packageId, scheduleId: sched.id })" class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900">
                                            <Pencil class="w-3.5 h-3.5" /> Edit
                                        </Link>
                                        <button type="button" @click="deleteSchedule(sched.id)" class="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300 dark:hover:bg-rose-900">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="!schedules?.length">
                                <td colspan="5" class="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">No batch schedules configured.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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