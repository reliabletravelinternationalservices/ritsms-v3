<script setup lang="ts">
import InputError from '@/components/InputError.vue'
import TextArea from '@/components/tiptap/TextArea.vue'
import Input from '@/components/ui/input/Input.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import { Icon } from '@iconify/vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useTourFormStore } from '@/stores/tourForm'

interface Props {
    isLoading?: boolean
}

defineProps<Props>()

const tourForm = useTourFormStore()

function syncDayNumbers() {
    tourForm.form.itineraries.forEach((itinerary, index) => {
        itinerary.day_no = index + 1
    })
}

function handleDragEnd() {
    syncDayNumbers()
}

</script>

<template>
    <div class="space-y-6">
        <div class="space-y-2">

            <!-- SECTION HEADER -->
            <div
                class="flex items-center justify-between w-full border-b-2 border-foreground py-2 text-md font-bold uppercase"
            >
                <span>ITINERARIES</span>

                <span class="text-muted-foreground">
                    *
                    {{tourForm.getTourDuration()}}
                    days
                </span>
            </div>

            <!-- EMPTY STATE -->
            <div
                v-if="!tourForm.containsItinerary()"
                class="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-border text-center p-4"
            >
                <div class="mb-2 rounded-full bg-muted p-3">
                    <Icon
                        icon="lucide:calendar-days"
                        class="size-5 text-muted-foreground"
                    />
                </div>

                <p class="text-sm font-medium text-foreground">
                    Select a tour duration
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Tour itineraries will appear here once you select the
                    duration.
                </p>
            </div>

            <!-- ITINERARIES -->
            <VueDraggable
                v-else
                v-model="tourForm.form.itineraries"
                item-key="_id"
                :animation="200"
                handle=".drag-handle"
                class="flex flex-col gap-4 p-4"
                @end="handleDragEnd"
                :disabled="isLoading"
            >
                <div
                    v-for="(itinerary, index) in tourForm.form.itineraries"
                    :key="itinerary._id"
                    class="space-y-3 rounded-md border border-border p-4"
                >
                    <!-- DAY HEADER -->
                    <div class="flex items-start justify-between">
                        <div class="flex items-center gap-2">

                            <!-- DRAG HANDLE -->
                            <button
                                :disabled="isLoading"
                                type="button"
                                class="drag-handle cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
                                title="Drag to reorder"
                            >
                                <Icon
                                    icon="lucide:grip-vertical"
                                    class="size-5"
                                />
                            </button>

                            <!-- DAY NUMBER -->
                            <span
                                class="text-sm font-bold text-muted-foreground uppercase"
                            >
                                DAY {{ itinerary.day_no }}
                            </span>
                        </div>

                        <!-- DELETE -->
                        <ButtonIcon
                            type="button"
                            :disabled="isLoading"
                            @click="
                                tourForm.removeItineraryDay(
                                    itinerary.day_no
                                )
                            "
                            icon="lucide:trash-2"
                            class="text-red-600 bg-transparent hover:bg-red-50"
                        />
                    </div>

                    <!-- TITLE -->
                    <div class="space-y-2">
                        <label
                            :for="`day-${itinerary._id}-title`"
                            class="block text-sm font-medium"
                        >
                            Title
                            <span class="text-red-600">*</span>
                        </label>

                        <Input
                            :disabled="isLoading"
                            :id="`day-${itinerary._id}-title`"
                            v-model="itinerary.title"
                            placeholder="Enter day title"
                            class="font-roboto text-sm"
                            :aria-invalid="
                                !!tourForm.errors[
                                    `itineraries.${index}.title`
                                ]
                            "
                        />

                        <InputError
                            :message="
                                tourForm.errors[
                                    `itineraries.${index}.title`
                                ]
                            "
                        />
                    </div>

                    <!-- ACTIVITIES -->
                    <div class="space-y-2">
                        <label
                            :for="`day-${itinerary._id}-activities`"
                            class="block text-sm font-medium"
                        >
                            Activities
                            <span class="text-red-600">*</span>
                        </label>

                        <TextArea
                            :disabled="isLoading"
                            v-model="itinerary.activities"
                            placeholder="Enter activities"
                            class="font-roboto text-sm"
                            :aria-invalid="
                                !!tourForm.errors[
                                    `itineraries.${index}.activities`
                                ]
                            "
                        />

                        <InputError
                            :message="
                                tourForm.errors[
                                    `itineraries.${index}.activities`
                                ]
                            "
                        />
                    </div>
                </div>
            </VueDraggable>

            <!-- ADD DAY -->
            <div class="w-full" v-if="!tourForm.isExeedItineraryDurationConstaint('max')">
                <button
                    :disabled="isLoading"
                    type="button"
                    @click="tourForm.addItineraryDay()"
                    class="w-full rounded-md border-2 border-dashed border-border bg-[rgb(var(--color-primary)/0.04)] px-4 py-2.5 text-sm font-medium text-[rgb(var(--color-primary))] transition-all duration-150 hover:bg-[rgb(var(--color-primary)/0.08)]"
                >
                    + Add Day
                </button>
            </div>
        </div>
    </div>
</template>