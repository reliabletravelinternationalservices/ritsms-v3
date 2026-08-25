<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue'
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue'
import Input from '@/components/ui/input/Input.vue'
import { useTourFormStore } from '@/stores/tourForm'
import { Icon } from '@iconify/vue'

const tourForm = useTourFormStore()

const ratings: SelectOption[] = [
    {
        label: '5 stars',
        value: '5',
    },
    {
        label: '4 stars',
        value: '4',
    },
    {
        label: '3 stars',
        value: '3',
    },
    {
        label: '2 stars',
        value: '2',
    },
    {
        label: '1 star',
        value: '1',
    },
]
</script>

<template>
    <div class="space-y-12">

        <!-- HOTELS -->
        <div class="space-y-4">
            <div class="flex items-center w-full border-b-2 border-foreground py-2 text-md font-bold uppercase">
                <span>HOTELS</span>
            </div>

            <!-- No duration selected -->
            <div v-if="!tourForm.containsHotel()"
                class="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-border text-center p-4">
                <div class="mb-2 rounded-full bg-muted p-3">
                    <Icon icon="lucide:home" class="size-5 text-muted-foreground" />
                </div>

                <p class="text-sm font-medium text-foreground">
                    Add Hotel
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Tour Hotels will appear here once you add a hotel.
                </p>
            </div>

            <!-- hotels -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div v-for="(hotel, index) in tourForm.form.hotels" :key="index"
                    class="space-y-6 rounded-md border border-border p-8">
                    <span class="text-sm font-bold text-muted-foreground uppercase">
                        <span class="flex items-center justify-end gap-2">
                            <ButtonIcon @click="tourForm.removeHotel(index)" icon="lucide:trash-2"
                                class="text-red-600 bg-transparent hover:bg-red-50" />
                        </span>
                    </span>

                    <div class="flex items-center gap-8 w-full">
                        <div class="w-full space-y-2">
                            <div class="space-y-2">
                                <label :for="`hotel-${index + 1}-name`" class="block text-sm font-medium">
                                    Name
                                    <span class="text-red-600">*</span>
                                </label>
                                <Input :id="`hotel-${index + 1}-name`" v-model="hotel.name" placeholder="Hotel name"
                                    class="font-roboto text-sm" />
                            </div>

                            <div class="space-y-2">
                                <label :for="`hotel-${index + 1}-rate`" class="block text-sm font-medium">
                                    Rate
                                    <span class="text-red-600">*</span>
                                </label>

                                <SelectMenu :id="`hotel-${index + 1}-rate`" v-model="hotel.rate"
                                    placeholder="Select rate" :options="ratings" class="font-roboto text-sm" />
                            </div>

                            <div class="space-y-2">
                                <label :for="`hotel-${index + 1}-link`" class="block text-sm font-medium">
                                    Link
                                    <span class="text-muted-foreground text-sm italic">(Optional)</span>
                                </label>
                                <Input :id="`hotel-${index + 1}-link`" v-model="hotel.link" placeholder="Hotel link"
                                    class="font-roboto text-sm" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full">
                <button type="button" @click="tourForm.addHotel()"
                    class="w-full text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.04)] border-2 border-dashed border-border px-4 py-2.5 text-sm font-medium transition-all duration-150 rounded-md hover:bg-[rgb(var(--color-primary)/0.08)]">+
                    Add Hotel</button>
            </div>
        </div>
    </div>
</template>