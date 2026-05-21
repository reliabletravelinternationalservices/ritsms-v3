<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { PackageGroup } from '@/types/package-group';

// Shadcn Components
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

// Icons
import { 
    Plus, 
    MoreHorizontal, 
    Eye, 
    Edit, 
    Trash2, 
    Layers, 
    Compass, 
    Star, 
    Sparkles,
    Calendar,
    ArrowRight
} from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Package Groups', href: route('admin.packages.groups') },
];

// --- DUMMY DATA ---
const dummyPackageGroups = ref<PackageGroup[]>([
    {
        id: 101,
        title: "Premium Japan Autumn Escapes",
        description: "Curated high-end multi-city tours focusing on the breathtaking fall foliage across Kyoto, Tokyo, and Hokkaido.",
        include_as_outbound: true,
        include_as_inbound: false,
        is_featured: true,
        created_at: "2026-05-20T10:00:00Z", 
        updated_at: "2026-05-21T08:30:00Z", // Updated Today!
        image: {
            id: 1,
            mediable_id: 101,
            mediable_type: "PackageGroup",
            file_name: "japan-autumn.jpg",
            file_path: "groups/japan-autumn.jpg",
            url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
            disk: "cloudinary",
            type: "image",
            mime_type: "image/jpeg",
            size: 204800,
            alt_text: "Mt. Fuji framed by autumn red maple leaves",
            order_number: 1,
            is_primary: true
        },
        packages: [
            { id: 1, name: "Tokyo & Kyoto Express", duration: 7, base_price: 2499, destination: "Japan", season: "autumn", is_featured: true, itineraries_array: [], inclusions_array: [], exclusions_array: [], notes_array: [], schedules: [], created_at: "", updated_at: "" },
            { id: 2, name: "Hokkaido Hidden Gems", duration: 10, base_price: 3899, destination: "Japan", season: "autumn", is_featured: false, itineraries_array: [], inclusions_array: [], exclusions_array: [], notes_array: [], schedules: [], created_at: "", updated_at: "" }
        ]
    },
    {
        id: 102,
        title: "Tropical Paradise Domestic Getaways",
        description: "Affordable luxury packages showcasing local white-sand beaches, crystal clear waters, and heritage island hopping trails.",
        include_as_outbound: false,
        include_as_inbound: true,
        is_featured: true,
        created_at: "2026-05-21T01:15:00Z", // Created Today!
        updated_at: "2026-05-21T01:15:00Z",
        image: {
            id: 2,
            mediable_id: 102,
            mediable_type: "PackageGroup",
            file_name: "boracay.jpg",
            file_path: "groups/boracay.jpg",
            url: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=600&q=80",
            disk: "cloudinary",
            type: "image",
            mime_type: "image/jpeg",
            size: 154000,
            alt_text: "Clear turquoise water hitting tropical beach",
            order_number: 1,
            is_primary: true
        },
        packages: [
            { id: 3, name: "Boracay Luxury 4D3N", duration: 4, base_price: 850, destination: "Philippines", season: "summer", is_featured: true, itineraries_array: [], inclusions_array: [], exclusions_array: [], notes_array: [], schedules: [], created_at: "", updated_at: "" }
        ]
    },
    {
        id: 103,
        title: "Classic European Highlights",
        description: "The definitive grand tour through Europe's cultural capitals including Paris, Rome, Amsterdam, and Swiss alpine peaks. Perfect for first timers.",
        include_as_outbound: true,
        include_as_inbound: true,
        is_featured: false,
        created_at: "2026-03-10T11:15:00Z",
        updated_at: "2026-04-02T16:45:00Z", // Older entry
        image: {
            id: 3,
            mediable_id: 103,
            mediable_type: "PackageGroup",
            file_name: "europe.jpg",
            file_path: "groups/europe.jpg",
            url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
            disk: "s3",
            type: "image",
            mime_type: "image/jpeg",
            size: 312000,
            alt_text: "Eiffel tower under clear sky",
            order_number: 1,
            is_primary: true
        },
        packages: []
    }
]);

// --- FILTERING & SEPARATION LOGIC ---
const fortyEightHoursAgo = new Date().getTime() - (48 * 60 * 60 * 1000);

const isRecent = (dateString: string) => {
    return new Date(dateString).getTime() > fortyEightHoursAgo;
};

// Top shelf: newly created or updated items ordered by latest activity
const recentGroups = computed(() => {
    return dummyPackageGroups.value
        .filter(g => isRecent(g.updated_at || g.created_at))
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
});

// Regular shelf: standard catalog items
const olderGroups = computed(() => {
    return dummyPackageGroups.value
        .filter(g => !isRecent(g.updated_at || g.created_at))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
});

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });
};
</script>

<template>
    <Head title="Package Groups Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
            
            <!-- Page Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Package Groups</h1>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage your curated marketing bundles and package catalog collections.
                    </p>
                </div>
                <Button class="sm:w-auto w-full flex items-center gap-2 shadow-sm">
                    <Plus class="w-4 h-4" /> New Package Group
                </Button>
            </div>

            <!-- SECTION 1: NEWLY CREATED OR UPDATED (Top Shelf Feature) -->
            <div v-if="recentGroups.length > 0" class="space-y-4">
                <div class="flex items-center gap-2">
                    <div class="p-1 rounded bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40">
                        <Sparkles class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Recently Active Groups</h2>
                    <Badge variant="outline" class="text-[11px] bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/30">
                        Last 48 Hours
                    </Badge>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card 
                        v-for="group in recentGroups" 
                        :key="group.id" 
                        class="overflow-hidden group flex flex-col justify-between border-indigo-200 dark:border-indigo-900/50 shadow-sm bg-gradient-to-b from-indigo-50/10 to-transparent dark:from-indigo-950/5"
                    >
                        <!-- Top Header Wrapper -->
                        <div>
                            <!-- Card Image Segment -->
                            <div class="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-b dark:border-zinc-800">
                                <img 
                                    v-if="group.image?.url" 
                                    :src="group.image.url" 
                                    :alt="group.title"
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div v-else class="w-full h-full flex items-center justify-center text-zinc-400">
                                    <Compass class="w-10 h-10 stroke-[1.5]" />
                                </div>
                                
                                <!-- Floating Status Badges -->
                                <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start max-w-[85%]">
                                    <span class="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-600 text-white shadow-sm">
                                        <Sparkles class="w-2.5 h-2.5 fill-current" /> Active
                                    </span>
                                    <span v-if="group.is_featured" class="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-white shadow-sm">
                                        <Star class="w-2.5 h-2.5 fill-current" /> Featured
                                    </span>
                                </div>

                                <!-- Action Dropdown -->
                                <div class="absolute top-3 right-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger as-child>
                                            <Button variant="secondary" size="icon" class="h-7 w-7 rounded-md opacity-90 backdrop-blur hover:opacity-100 shadow-sm">
                                                <MoreHorizontal class="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" class="w-40 dark:bg-zinc-950 dark:border-zinc-800">
                                            <DropdownMenuItem class="gap-2 cursor-pointer"><Eye class="w-4 h-4 text-zinc-400" /> View Details</DropdownMenuItem>
                                            <DropdownMenuItem class="gap-2 text-red-600 focus:text-red-600 dark:focus:bg-red-950/20 cursor-pointer"><Trash2 class="w-4 h-4" /> Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <CardHeader class="p-4 space-y-2">
                                <div class="flex items-start justify-between gap-2">
                                    <CardTitle class="text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                        {{ group.title }}
                                    </CardTitle>
                                </div>
                                <CardDescription class="text-xs line-clamp-2 min-h-[32px] leading-relaxed">
                                    {{ group.description || 'No description summary added.' }}
                                </CardDescription>
                            </CardHeader>
                        </div>

                        <!-- Card Footing/Metrics Segment -->
                        <div>
                            <CardContent class="px-4 pb-3 pt-0 space-y-3">
                                <!-- Type Scopes badges -->
                                <div class="flex flex-wrap gap-1">
                                    <Badge v-if="group.include_as_outbound" variant="secondary" class="text-[10px] font-normal px-2 py-0">
                                        <PlaneOutbound class="w-2.5 h-2.5 mr-1 text-sky-500" /> Outbound
                                    </Badge>
                                    <Badge v-if="group.include_as_inbound" variant="secondary" class="text-[10px] font-normal px-2 py-0">
                                        <PlaneInbound class="w-2.5 h-2.5 mr-1 text-emerald-500" /> Inbound
                                    </Badge>
                                </div>
                                
                                <Separator class="dark:bg-zinc-800" />
                                
                                <!-- Attached Packages Meta -->
                                <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                                    <span class="flex items-center gap-1.5"><Layers class="w-3.5 h-3.5" /> Inside Collection:</span>
                                    <span class="font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                        {{ group.packages?.length || 0 }} items
                                    </span>
                                </div>
                            </CardContent>

                            <CardFooter class="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-t dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                                <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> Modified {{ formatDate(group.updated_at) }}</span>
                                <Button variant="link" size="sm" class="h-auto p-0 text-xs font-medium text-indigo-600 dark:text-indigo-400 gap-1">
                                    Manage <ArrowRight class="w-3 h-3" />
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                </div>
            </div>

            <!-- SECTION 2: REGULAR CATALOG LIST -->
            <div class="space-y-4 mt-2">
                <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">All Collections</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card v-for="group in olderGroups" :key="group.id" class="overflow-hidden group flex flex-col justify-between dark:border-zinc-800 shadow-sm">
                        <div>
                            <!-- Image Frame -->
                            <div class="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-b dark:border-zinc-800">
                                <img 
                                    v-if="group.image?.url" 
                                    :src="group.image.url" 
                                    :alt="group.title"
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div v-else class="w-full h-full flex items-center justify-center text-zinc-400">
                                    <Compass class="w-10 h-10 stroke-[1.5]" />
                                </div>

                                <div v-if="group.is_featured" class="absolute top-3 left-3">
                                    <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-white shadow-sm">
                                        <Star class="w-2.5 h-2.5 fill-current" /> Featured
                                    </span>
                                </div>

                                <div class="absolute top-3 right-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger as-child>
                                            <Button variant="secondary" size="icon" class="h-7 w-7 rounded-md opacity-90 backdrop-blur hover:opacity-100 shadow-sm">
                                                <MoreHorizontal class="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" class="w-40 dark:bg-zinc-950 dark:border-zinc-800">
                                            <DropdownMenuItem class="gap-2 cursor-pointer"><Eye class="w-4 h-4 text-zinc-400" /> View Details</DropdownMenuItem>
                                            <DropdownMenuItem class="gap-2 text-red-600 focus:text-red-600 dark:focus:bg-red-950/20 cursor-pointer"><Trash2 class="w-4 h-4" /> Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <CardHeader class="p-4 space-y-2">
                                <CardTitle class="text-lg font-bold group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-1">
                                    {{ group.title }}
                                </CardTitle>
                                <CardDescription class="text-xs line-clamp-2 min-h-[32px] leading-relaxed">
                                    {{ group.description || 'No description summary added.' }}
                                </CardDescription>
                            </CardHeader>
                        </div>

                        <div>
                            <CardContent class="px-4 pb-3 pt-0 space-y-3">
                                <div class="flex flex-wrap gap-1">
                                    <Badge v-if="group.include_as_outbound" variant="secondary" class="text-[10px] font-normal px-2 py-0">
                                        <PlaneOutbound class="w-2.5 h-2.5 mr-1 text-sky-500" /> Outbound
                                    </Badge>
                                    <Badge v-if="group.include_as_inbound" variant="secondary" class="text-[10px] font-normal px-2 py-0">
                                        <PlaneInbound class="w-2.5 h-2.5 mr-1 text-emerald-500" /> Inbound
                                    </Badge>
                                </div>
                                <Separator class="dark:bg-zinc-800" />
                                <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                                    <span class="flex items-center gap-1.5"><Layers class="w-3.5 h-3.5" /> Inside Collection:</span>
                                    <span class="font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                        {{ group.packages?.length || 0 }} items
                                    </span>
                                </div>
                            </CardContent>

                            <CardFooter class="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-t dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                                <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> Modified {{ formatDate(group.updated_at) }}</span>
                                <Button variant="link" size="sm" class="h-auto p-0 text-xs font-medium text-zinc-600 dark:text-zinc-400 gap-1">
                                    Manage <ArrowRight class="w-3 h-3" />
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                </div>
                
                <!-- Empty State Fallback -->
                <div v-if="olderGroups.length === 0 && recentGroups.length === 0" class="text-center py-12 border border-dashed rounded-xl dark:border-zinc-800">
                    <Compass class="w-10 h-10 mx-auto text-zinc-400 stroke-[1.25] mb-2" />
                    <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">No collections found</h3>
                    <p class="text-xs text-zinc-500 mt-1">Get started by creating your first package group container.</p>
                </div>
            </div>

        </div>
    </AppLayout>
</template>