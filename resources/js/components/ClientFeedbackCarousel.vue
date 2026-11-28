
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { Icon } from '@iconify/vue'

// TYPES
import type { ImageProps } from '@/pages/client/home/types'

interface Props {
    feedbacks: ImageProps[]
}

const props = defineProps<Props>()

// ==========================================
// IMAGE VIEWER
// ==========================================

const isViewerOpen = ref(false)
const activeIndex = ref(0)
const zoom = ref(1)

const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)

const activeFeedback = computed(
    () => props.feedbacks[activeIndex.value]
)

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.5

const resetZoom = () => {
    zoom.value = 1
    translateX.value = 0
    translateY.value = 0
    isDragging.value = false
}

const openViewer = (index: number) => {
    activeIndex.value = index
    resetZoom()
    isViewerOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeViewer = () => {
    isViewerOpen.value = false
    document.body.style.overflow = ''
    resetZoom()
}

const zoomIn = () => {
    zoom.value = Math.min(zoom.value + ZOOM_STEP, MAX_ZOOM)
}

const zoomOut = () => {
    zoom.value = Math.max(zoom.value - ZOOM_STEP, MIN_ZOOM)

    if (zoom.value === MIN_ZOOM) {
        translateX.value = 0
        translateY.value = 0
    }
}

const toggleZoom = () => {
    if (zoom.value > MIN_ZOOM) {
        resetZoom()
    } else {
        zoom.value = 2
    }
}

const nextImage = () => {
    if (activeIndex.value < props.feedbacks.length - 1) {
        activeIndex.value++
        resetZoom()
    }
}

const prevImage = () => {
    if (activeIndex.value > 0) {
        activeIndex.value--
        resetZoom()
    }
}

// ==========================================
// POINTER EVENTS: DRAG + PINCH ZOOM
// ==========================================

interface PointerPosition {
    x: number
    y: number
}

const pointers = new Map<number, PointerPosition>()

let dragStartX = 0
let dragStartY = 0

let initialTranslateX = 0
let initialTranslateY = 0

let initialPinchDistance = 0
let initialPinchZoom = 1

const getPointerDistance = () => {
    const positions = [...pointers.values()]

    if (positions.length < 2) return 0

    const dx = positions[0].x - positions[1].x
    const dy = positions[0].y - positions[1].y

    return Math.sqrt(dx * dx + dy * dy)
}

const handlePointerDown = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const element = event.currentTarget as HTMLElement

    element.setPointerCapture(event.pointerId)

    pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
    })

    if (pointers.size === 1) {
        if (zoom.value <= MIN_ZOOM) return

        isDragging.value = true

        dragStartX = event.clientX
        dragStartY = event.clientY

        initialTranslateX = translateX.value
        initialTranslateY = translateY.value
    }

    if (pointers.size === 2) {
        isDragging.value = false

        initialPinchDistance = getPointerDistance()
        initialPinchZoom = zoom.value
    }
}

const handlePointerMove = (event: PointerEvent) => {
    if (!pointers.has(event.pointerId)) return

    pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
    })

    // PINCH TO ZOOM
    if (pointers.size === 2) {
        const distance = getPointerDistance()

        if (initialPinchDistance > 0) {
            zoom.value = Math.min(
                MAX_ZOOM,
                Math.max(
                    MIN_ZOOM,
                    initialPinchZoom * (distance / initialPinchDistance)
                )
            )

            if (zoom.value === MIN_ZOOM) {
                translateX.value = 0
                translateY.value = 0
            }
        }

        return
    }

    // DRAG IMAGE
    if (pointers.size === 1 && isDragging.value) {
        translateX.value =
            initialTranslateX + (event.clientX - dragStartX)

        translateY.value =
            initialTranslateY + (event.clientY - dragStartY)
    }
}

const handlePointerUp = (event: PointerEvent) => {
    pointers.delete(event.pointerId)

    if (pointers.size === 0) {
        isDragging.value = false
        initialPinchDistance = 0
    }

    // Continue dragging with the remaining finger
    if (pointers.size === 1 && zoom.value > MIN_ZOOM) {
        const remaining = [...pointers.values()][0]

        dragStartX = remaining.x
        dragStartY = remaining.y

        initialTranslateX = translateX.value
        initialTranslateY = translateY.value

        isDragging.value = true
    }
}

const handlePointerCancel = (event: PointerEvent) => {
    pointers.delete(event.pointerId)

    if (pointers.size === 0) {
        isDragging.value = false
    }
}

// ==========================================
// DOUBLE CLICK / DOUBLE TAP
// ==========================================

let lastTapTime = 0

const handleDoubleClick = () => {
    toggleZoom()
}

const handleTouchTap = () => {
    const now = Date.now()

    if (now - lastTapTime < 300) {
        toggleZoom()
        lastTapTime = 0
    } else {
        lastTapTime = now
    }
}

// ==========================================
// MOUSE WHEEL ZOOM
// ==========================================

const handleWheel = (event: WheelEvent) => {
    if (event.deltaY < 0) {
        zoomIn()
    } else {
        zoomOut()
    }
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

const handleKeydown = (event: KeyboardEvent) => {
    if (!isViewerOpen.value) return

    switch (event.key) {
        case 'Escape':
            closeViewer()
            break

        case 'ArrowRight':
            nextImage()
            break

        case 'ArrowLeft':
            prevImage()
            break

        case '+':
        case '=':
            zoomIn()
            break

        case '-':
            zoomOut()
            break

        case '0':
            resetZoom()
            break
    }
}

// ==========================================
// LIFECYCLE
// ==========================================

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})

// ==========================================
// CAROUSEL CONFIG
// ==========================================

const carouselConfig = {
    itemsToShow: 1,
    itemsToScroll: 1,
    gap: 10,
    clamp: true,
    mouseDrag: true,

    breakpoints: {
        768: {
            itemsToShow: 2,
            itemsToScroll: 1,
            gap: 10,
        },
        1024: {
            itemsToShow: 3.1,
            itemsToScroll: 2,
            gap: 15,
            mouseDrag: false,
        },
    },
}
</script>

<template>
    <!-- ==================================
         CLIENT FEEDBACK CAROUSEL
    =================================== -->

    <Carousel v-bind="carouselConfig" class="w-full">
        <Slide
            v-for="(feedback, index) in feedbacks"
            :key="feedback.id"
        >
            <div
                class="carousel__item relative flex h-[280px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[400px]"
                @click="openViewer(index)"
            >
                <img
                    :src="feedback.src"
                    :alt="feedback.alt"
                    loading="lazy"
                    class="h-full w-full object-contain"
                />

                <div class="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 text-white">
                    <Icon
                        icon="material-symbols:zoom-in"
                        width="22"
                        height="22"
                    />
                </div>
            </div>
        </Slide>

        <template #addons>
            <Navigation class="hidden md:block">
                <template #prev>
                    <div class="flex h-[400px] w-full items-center justify-center bg-black/10 transition hover:bg-black/30">
                        <Icon
                            icon="material-symbols:keyboard-arrow-left"
                            width="24"
                            height="24"
                            class="text-white"
                        />
                    </div>
                </template>

                <template #next>
                    <div class="flex h-[400px] w-full items-center justify-center bg-black/10 transition hover:bg-black/30">
                        <Icon
                            icon="material-symbols:keyboard-arrow-right"
                            width="24"
                            height="24"
                            class="text-white"
                        />
                    </div>
                </template>
            </Navigation>
        </template>
    </Carousel>

    <!-- ==================================
         FULLSCREEN IMAGE VIEWER
    =================================== -->

    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-200"
            leave-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isViewerOpen && activeFeedback"
                class="fixed inset-0 z-[9999] flex flex-col bg-black/95"
            >
                <!-- TOP TOOLBAR -->
                <div class="relative z-30 flex shrink-0 items-center justify-between px-4 py-3 text-white md:px-6">
                    <div class="text-sm font-medium tabular-nums">
                        {{ activeIndex + 1 }} / {{ feedbacks.length }}
                    </div>

                    <div class="flex items-center gap-2">
                        <!-- ZOOM OUT -->
                        <button
                            type="button"
                            aria-label="Zoom out"
                            :disabled="zoom <= MIN_ZOOM"
                            class="rounded-full bg-white/10 p-2 transition hover:bg-white/20 disabled:opacity-30"
                            @click="zoomOut"
                        >
                            <Icon
                                icon="material-symbols:remove"
                                width="22"
                                height="22"
                            />
                        </button>

                        <!-- ZOOM LEVEL -->
                        <button
                            type="button"
                            class="min-w-12 text-center text-sm tabular-nums"
                            @click="resetZoom"
                        >
                            {{ Math.round(zoom * 100) }}%
                        </button>

                        <!-- ZOOM IN -->
                        <button
                            type="button"
                            aria-label="Zoom in"
                            :disabled="zoom >= MAX_ZOOM"
                            class="rounded-full bg-white/10 p-2 transition hover:bg-white/20 disabled:opacity-30"
                            @click="zoomIn"
                        >
                            <Icon
                                icon="material-symbols:add"
                                width="22"
                                height="22"
                            />
                        </button>

                        <!-- CLOSE -->
                        <button
                            type="button"
                            aria-label="Close viewer"
                            class="ml-2 rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                            @click="closeViewer"
                        >
                            <Icon
                                icon="material-symbols:close"
                                width="24"
                                height="24"
                            />
                        </button>
                    </div>
                </div>

                <!-- IMAGE VIEW AREA -->
                <div
                    class="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 pb-4 md:px-16"
                >
                    <!-- PREVIOUS IMAGE -->
                    <button
                        v-if="feedbacks.length > 1"
                        type="button"
                        aria-label="Previous image"
                        :disabled="activeIndex === 0"
                        class="absolute left-2 z-20 hidden rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30 md:block"
                        @click="prevImage"
                    >
                        <Icon
                            icon="material-symbols:chevron-left"
                            width="32"
                            height="32"
                        />
                    </button>

                    <!-- IMAGE -->
                    <img
                        :key="activeFeedback.id"
                        :src="activeFeedback.src"
                        :alt="activeFeedback.alt"
                        draggable="false"
                        class="max-h-full max-w-full select-none object-contain touch-none"
                        :class="zoom > 1
                            ? isDragging
                                ? 'cursor-grabbing'
                                : 'cursor-grab'
                            : 'cursor-zoom-in'"
                        :style="{
                            transform: `translate(${translateX}px, ${translateY}px) scale(${zoom})`,
                            transition: isDragging ? 'none' : 'transform 0.2s ease',
                        }"
                        @pointerdown="handlePointerDown"
                        @pointermove="handlePointerMove"
                        @pointerup="handlePointerUp"
                        @pointercancel="handlePointerCancel"
                        @lostpointercapture="handlePointerCancel"
                        @dblclick.prevent="handleDoubleClick"
                        @click="handleTouchTap"
                        @wheel.prevent="handleWheel"
                    />

                    <!-- NEXT IMAGE -->
                    <button
                        v-if="feedbacks.length > 1"
                        type="button"
                        aria-label="Next image"
                        :disabled="activeIndex === feedbacks.length - 1"
                        class="absolute right-2 z-20 hidden rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30 md:block"
                        @click="nextImage"
                    >
                        <Icon
                            icon="material-symbols:chevron-right"
                            width="32"
                            height="32"
                        />
                    </button>
                </div>

                <!-- BOTTOM INSTRUCTIONS -->
                <div class="shrink-0 px-4 pb-5 text-center text-xs text-white/60">
                    <span class="md:hidden">
                        Pinch to zoom · Double tap to zoom · Drag to move
                    </span>

                    <span class="hidden md:inline">
                        Scroll to zoom · Double click to zoom · Drag to move · Arrow keys to navigate · 0 to reset
                    </span>
                </div>

                <!-- MOBILE NAVIGATION -->
                <div
                    v-if="feedbacks.length > 1"
                    class="absolute bottom-16 left-0 right-0 z-30 flex justify-center gap-5 md:hidden"
                >
                    <button
                        type="button"
                        aria-label="Previous image"
                        :disabled="activeIndex === 0"
                        class="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30"
                        @click="prevImage"
                    >
                        <Icon
                            icon="material-symbols:chevron-left"
                            width="28"
                            height="28"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Next image"
                        :disabled="activeIndex === feedbacks.length - 1"
                        class="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30"
                        @click="nextImage"
                    >
                        <Icon
                            icon="material-symbols:chevron-right"
                            width="28"
                            height="28"
                        />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
:deep(.carousel__viewport) {
    height: 100%;
}

:deep(.carousel__slide) {
    padding: 5px;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
    margin: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
}

:deep(.carousel__prev:disabled),
:deep(.carousel__next:disabled) {
    opacity: 0.3;
    cursor: not-allowed;
}
</style>
