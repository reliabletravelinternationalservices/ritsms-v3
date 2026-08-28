<script setup lang="ts">
// import InputError from '@/components/InputError.vue';
import InputError from '@/components/InputError.vue';
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import TiptapTextArea from '@/components/tiptap/TextArea.vue';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { useTourFormStore } from '@/stores/tourForm';


interface Props {
    isLoading?: boolean
}

defineProps<Props>()

const tourForm = useTourFormStore();


const categories: SelectOption[] = [
    {
        label: 'Outbound Tour',
        value: 'outbound',
    },
    {
        label: 'Inbound Tour',
        value: 'inbound',
    },
    {
        label: 'Domestic Tour',
        value: 'domestic',
    }
]

const daysDurations: SelectOption[] = Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    return {
        label: `${day} Day${day === 1 ? '' : 's'}`,
        value: day.toString(),
    };
})


const itineraryTypes: SelectOption[] = [
    {
        label: 'Round Trip',
        value: 'round_trip',
    },
    {
        label: 'One Way',
        value: 'one_way',
    },
    {
        label: 'Tri City',
        value: 'tri_city',
    },
    {
        label: 'Multi City',
        value: 'multi_city',
    }
]



</script>

<template>
    <div>
        <!-- TOUR OVERVIEW -->
        <div>
            <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
                <span>Tour Overview</span>
            </div>
            <div class="flex flex-col gap-4 p-4">
                <div class="space-y-2">
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Tour name <span
                            class="text-red-600">*</span></label>
                    <Input v-model="tourForm.form.overviewItems.name" :disabled="isLoading" name="name" placeholder="Enter tour name"
                        class="font-roboto text-sm" />
                    <InputError :message="tourForm.errors['overview.name']" />
                </div>

                <div class="flex items-start gap-4">
                    <div class="space-y-2 w-full">
                        <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Category <span
                                class="text-red-600">*</span></label>
                        <SelectMenu :disabled="isLoading"v-model="tourForm.form.overviewItems.category" name="category"
                            placeholder="Select category" :options="categories" class="font-roboto text-sm" />
                        <InputError :message="tourForm.errors['overview.category']" />
                    </div>
                    <div class="space-y-2 w-full">
                        <label for="duration" class="block text-sm font-medium leading-6 text-gray-900">Duration <span
                                class="text-xs text-muted-foreground">(days)</span> <span
                                class="text-red-600">*</span></label>
                        <SelectMenu :disabled="isLoading" v-model="tourForm.form.overviewItems.duration" name="duration"
                            placeholder="Select duration" :options="daysDurations" class="font-roboto text-sm" @change="()=> tourForm.resetItinerary()"/>
                        <InputError :message="tourForm.errors['overview.duration']" />  
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="space-y-2 w-full">
                        <label for="itinerary_type" class="block text-sm font-medium leading-6 text-gray-900">Itinerary
                            Type
                            <span class="text-red-600">*</span></label>
                        <SelectMenu :disabled="isLoading" v-model="tourForm.form.overviewItems.itinerary_type" name="itinerary_type"
                            placeholder="Select type" :options="itineraryTypes" class="font-roboto text-sm" @change="()=> tourForm.resetRoute()" />
                        <InputError :message="tourForm.errors['overview.itinerary_type']" />
                    </div>
                    <div class="space-y-2 w-full">
                        <label for="badge" class="block text-sm font-medium leading-6 text-gray-900">Badge <span
                                class="text-xs text-muted-foreground">(optional)</span></label>
                        <Input :disabled="isLoading" v-model="tourForm.form.overviewItems.badge" name="badge"
                            placeholder="e.g. Best Seller, Trending, etc." class="font-roboto text-sm" />
                        <InputError :message="tourForm.errors['overview.badge']" /> 
                    </div>
                </div>

                <div class="space-y-2">
                    <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description <span
                            class="text-red-600">*</span></label>
                    <Textarea :disabled="isLoading" v-model="tourForm.form.overviewItems.description" placeholder="Tell us about this tour..."
                        name="description" />
                    <InputError  :message="tourForm.errors['overview.description']"/>
                </div>

                <div class="space-y-2">
                    <label for="highlights" class="block text-sm font-medium leading-6 text-gray-900">Highlights <span
                            class="text-red-600">*</span></label>
                    <TiptapTextArea :disabled="isLoading" v-model="tourForm.form.overviewItems.highlights"
                        placeholder="What are the featured destinations in this tour?" name="highlights" />
                   <InputError  :message="tourForm.errors['overview.highlights']"/>
                </div>
            </div>
        </div>

        <!-- POLICIES -->
        <div>
            <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
                <span>INCLUSIONS & POLICIES</span>
            </div>
            <div class="flex flex-col gap-4 p-4">
                <div class="flex items-start gap-4">
                    <div class="space-y-2 w-full">
                        <label for="inclusions" class="block text-sm font-medium leading-6 text-gray-900">Inclusions
                            <span class="text-red-600">*</span></label>
                        <TiptapTextArea :disabled="isLoading" v-model="tourForm.form.overviewItems.inclusions"
                            placeholder="What's included to this tour?" name="inclusions" class="font-roboto text-sm" />
                        <InputError  :message="tourForm.errors['overview.inclusions']"/>
                    </div>
                    <div class="space-y-2 w-full">
                        <label for="exclusions" class="block text-sm font-medium leading-6 text-gray-900">Exclusions
                            <span class="text-xs text-muted-foreground">(optional)</span></label>
                        <TiptapTextArea :disabled="isLoading" v-model="tourForm.form.overviewItems.exclusions"
                            placeholder="What's not included to this tour?" name="exclusions"
                            class="font-roboto text-sm" />
                        <InputError  :message="tourForm.errors['overview.exclusions']"/>
                    </div>
                </div>

                <div class="space-y-2 w-full">
                    <label for="terms" class="block text-sm font-medium leading-6 text-gray-900">Terms of Services
                        <span class="text-red-600">*</span></label>
                    <TiptapTextArea :disabled="isLoading" v-model="tourForm.form.overviewItems.terms_and_conditions"
                        placeholder="What's not included to this tour?" name="terms" class="font-roboto text-sm" />
                    <InputError  :message="tourForm.errors['overview.terms_and_conditions']"/>
                </div>
            </div>
        </div>
    </div>
</template>