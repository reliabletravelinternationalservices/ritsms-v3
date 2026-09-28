<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Input } from '@/components/ui/input'

interface Contact {
    id: number
    name: string
    email: string
    initials: string
}

const props = defineProps<{
    open: boolean
    contacts: Contact[]
}>()

const emit = defineEmits<{
    'update:open': [value: boolean]
    create: [
        payload: {
            type: 'chat' | 'group'
            contacts: Contact[]
            name?: string
        },
    ]
}>()

const mode = ref<'chat' | 'group'>('chat')
const search = ref('')
const selected = ref<Contact[]>([])
const groupName = ref('')

function close() {
    emit('update:open', false)
}

function toggleContact(contact: Contact) {
    const exists = selected.value.some(
        item => item.id === contact.id,
    )

    if (exists) {
        selected.value = selected.value.filter(
            item => item.id !== contact.id,
        )
    } else {
        selected.value.push(contact)
    }
}

function create() {
    if (!selected.value.length) {
        return
    }

    if (mode.value === 'group' && !groupName.value.trim()) {
        return
    }

    emit('create', {
        type: mode.value,
        contacts: [...selected.value],
        name: groupName.value.trim() || undefined,
    })

    selected.value = []
    groupName.value = ''
    search.value = ''
    close()
}
</script>

<template>
    <div
        v-if="props.open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="close"
    >
        <div class="w-full max-w-md rounded-xl border border-border bg-background shadow-xl">

            <!-- Header -->
            <div class="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                    <h2 class="font-semibold">
                        New conversation
                    </h2>

                    <p class="text-xs text-muted-foreground">
                        Start a chat or create a group.
                    </p>
                </div>

                <button
                    type="button"
                    class="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    @click="close"
                >
                    <Icon icon="lucide:x" />
                </button>
            </div>

            <!-- Type -->
            <div class="p-5">

                <div class="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        class="rounded-lg border px-3 py-2 text-sm font-medium"
                        :class="mode === 'chat'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]'
                            : 'border-border'"
                        @click="mode = 'chat'"
                    >
                        <Icon icon="lucide:message-circle" class="mr-1 inline" />
                        New Chat
                    </button>

                    <button
                        type="button"
                        class="rounded-lg border px-3 py-2 text-sm font-medium"
                        :class="mode === 'group'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]'
                            : 'border-border'"
                        @click="mode = 'group'"
                    >
                        <Icon icon="lucide:users" class="mr-1 inline" />
                        Create Group
                    </button>
                </div>

                <!-- Group name -->
                <div
                    v-if="mode === 'group'"
                    class="mt-4"
                >
                    <label class="mb-2 block text-xs font-medium">
                        Group name
                    </label>

                    <Input
                        v-model="groupName"
                        placeholder="Travel Inquiry Team"
                    />
                </div>

                <!-- Search -->
                <div class="relative mt-4">
                    <Icon
                        icon="lucide:search"
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        v-model="search"
                        placeholder="Search contacts..."
                        class="pl-9"
                    />
                </div>

                <!-- Contacts -->
                <div class="mt-3 max-h-64 overflow-y-auto rounded-lg border border-border">

                    <button
                        v-for="contact in contacts.filter(
                            item =>
                                item.name.toLowerCase().includes(search.toLowerCase()) ||
                                item.email.toLowerCase().includes(search.toLowerCase()),
                        )"
                        :key="contact.id"
                        type="button"
                        class="flex w-full items-center gap-3 px-3 py-3 text-left hover:bg-muted"
                        @click="toggleContact(contact)"
                    >
                        <div class="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                            {{ contact.initials }}
                        </div>

                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-medium">
                                {{ contact.name }}
                            </p>

                            <p class="truncate text-xs text-muted-foreground">
                                {{ contact.email }}
                            </p>
                        </div>

                        <Icon
                            v-if="selected.some(item => item.id === contact.id)"
                            icon="lucide:check"
                            class="text-[rgb(var(--color-primary))]"
                        />
                    </button>

                </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-2 border-t border-border px-5 py-4">

                <button
                    type="button"
                    class="rounded-lg border border-border px-4 py-2 text-sm"
                    @click="close"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="rounded-lg bg-[rgb(var(--color-primary))] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                    :disabled="
                        !selected.length ||
                        (mode === 'group' && !groupName.trim())
                    "
                    @click="create"
                >
                    Create
                </button>

            </div>

        </div>
    </div>
</template>