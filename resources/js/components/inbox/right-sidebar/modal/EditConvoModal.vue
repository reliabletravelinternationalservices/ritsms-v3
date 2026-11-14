
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import { Camera, UserRound, X } from '@lucide/vue';
import CustomizedModal from '@/components/CustomizedModal.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    open: boolean;
    currentPhoto?: string | null;
    currentName?: string;
}

const props = withDefaults(defineProps<Props>(), {
    currentPhoto: null,
    currentName: '',
});

const emit = defineEmits<{
    'update:open': [value: boolean];
    save: [payload: {
        name: string;
        avatar: File | null;
        removeAvatar: boolean;
    }];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const name = ref(props.currentName);
const photoFile = ref<File | null>(null);
const photoRemoved = ref(false);
const photoPreview = ref<string | null>(props.currentPhoto);
const errorMessage = ref('');

const openFilePicker = () => fileInput.value?.click();

const clearPreview = () => {
    if (photoPreview.value && photoPreview.value !== props.currentPhoto) {
        URL.revokeObjectURL(photoPreview.value);
    }
};

const reset = () => {
    clearPreview();

    name.value = props.currentName;
    photoFile.value = null;
    photoRemoved.value = false;
    photoPreview.value = props.currentPhoto;
    errorMessage.value = '';

    if (fileInput.value) fileInput.value.value = '';
};

watch(() => props.open, (open) => {
    if (open) reset();
});

watch(() => props.currentPhoto, (photo) => {
    if (!photoFile.value) photoPreview.value = photo;
});

watch(() => props.currentName, (value) => {
    if (!props.open) name.value = value;
});

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    errorMessage.value = '';

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        errorMessage.value = 'Please select a JPG, PNG, or WEBP image.';
        target.value = '';
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        errorMessage.value = 'Image must not exceed 5MB.';
        target.value = '';
        return;
    }

    clearPreview();

    photoFile.value = file;
    photoRemoved.value = false;
    photoPreview.value = URL.createObjectURL(file);
};

const removePhoto = () => {
    clearPreview();

    photoFile.value = null;
    photoRemoved.value = true;
    photoPreview.value = null;
    errorMessage.value = '';

    if (fileInput.value) fileInput.value.value = '';
};

const close = () => {
    emit('update:open', false);
};

const saveProfile = () => {
    emit('save', {
        name: name.value.trim(),
        avatar: photoFile.value,
        removeAvatar: photoRemoved.value,
    });
};

onBeforeUnmount(clearPreview);
</script>

<template>
    <CustomizedModal
        :open="open"
        @update:open="emit('update:open', $event)"
    >
        <div class="flex flex-col gap-5">
            <div>
                <h3 class="text-lg font-semibold">Edit Profile</h3>
                <p class="text-sm text-muted-foreground">
                    Update your profile information.
                </p>
            </div>

            <!-- Profile Photo -->
            <div class="flex flex-col items-center gap-3">
                <div class="relative">
                    <button
                        type="button"
                        @click="openFilePicker"
                        class="group relative flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted transition hover:border-primary"
                    >
                        <img
                            v-if="photoPreview"
                            :src="photoPreview"
                            alt="Profile preview"
                            class="size-full object-cover"
                        />

                        <UserRound
                            v-else
                            class="size-12 text-muted-foreground"
                        />

                        <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                            <Camera class="size-7 text-white" />
                        </div>
                    </button>

                    <button
                        v-if="photoPreview"
                        type="button"
                        @click="removePhoto"
                        class="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-destructive hover:text-white"
                    >
                        <X class="size-4" />
                    </button>

                    <button
                        type="button"
                        @click="openFilePicker"
                        class="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
                    >
                        <Camera class="size-4" />
                    </button>
                </div>

                <div class="text-center">
                    <p class="text-sm font-medium">
                        {{ photoPreview ? 'Change profile photo' : 'Upload profile photo' }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                        JPG, PNG or WEBP · Max 5MB
                    </p>
                </div>

                <input
                    ref="fileInput"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    class="hidden"
                    @change="handleFileChange"
                />

                <p v-if="errorMessage" class="text-xs text-destructive">
                    {{ errorMessage }}
                </p>
            </div>

            <!-- Profile Name -->
            <div class="flex flex-col gap-2">
                <Label for="profile-name">Display Name</Label>
                <Input
                    id="profile-name"
                    v-model="name"
                    placeholder="Enter your name..."
                    maxlength="255"
                />
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-2">
                <Button variant="secondary" @click="close">
                    Cancel
                </Button>

                <Button
                    :disabled="!name.trim()"
                    @click="saveProfile"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    </CustomizedModal>
</template>
