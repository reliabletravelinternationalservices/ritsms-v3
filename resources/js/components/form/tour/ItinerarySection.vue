<script setup lang="ts">
import InputError from '@/components/InputError.vue'
import TextArea from '@/components/tiptap/TextArea.vue'
import Input from '@/components/ui/input/Input.vue'
import { Icon } from '@iconify/vue'
import { useTourFormStore } from '@/stores/tourForm'

const tourForm = useTourFormStore()
</script>

<template>
    <div class="space-y-6">
        <div class="space-y-4">

            <!-- SECTION HEADER -->
            <div
                class="flex items-center justify-between w-full border-b-2 border-foreground py-2 text-md font-bold uppercase"
            >
                <span>ITINERARIES</span>

                <span class="text-muted-foreground">
                    *
                    {{
                        tourForm.containsItinerary()
                            ? tourForm.form.overviewItems.duration
                            : 0
                    }}
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
                    Tour itineraries will appear here once you select the duration.
                </p>
            </div>

            <!-- ITINERARIES -->
            <div
                v-else
                class="flex flex-col gap-4 p-4"
            >
                <div
                    v-for="(day, index) in tourForm.form.itineraries"
                    :key="index"
                    class="space-y-5 rounded-md border border-border p-8"
                >
                    <!-- DAY HEADER -->
                    <div class="flex items-center justify-between">
                        <span
                            class="text-sm font-bold text-muted-foreground uppercase"
                        >
                            DAY {{ day.day_no }}
                        </span>
                    </div>

                    <!-- TITLE -->
                    <div class="space-y-2">
                        <label
                            :for="`day-${day.day_no}-title`"
                            class="block text-sm font-medium"
                        >
                            Title
                            <span class="text-red-600">*</span>
                        </label>

                        <Input
                            :id="`day-${day.day_no}-title`"
                            v-model="day.title"
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
                            :for="`day-${day.day_no}-activities`"
                            class="block text-sm font-medium"
                        >
                            Activities
                            <span class="text-red-600">*</span>
                        </label>

                        <TextArea
                            :id="`day-${day.day_no}-activities`"
                            v-model="day.activities"
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
            </div>
        </div>
    </div>
</template>