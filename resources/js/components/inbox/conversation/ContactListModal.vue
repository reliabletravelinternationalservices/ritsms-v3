<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Input } from '@/components/ui/input'
import { Contact } from '@/types/contact'
import { router } from '@inertiajs/vue3'
import { Loader2 } from '@lucide/vue'
const props = withDefaults(
    defineProps<{
        open: boolean
        contacts: Contact[]
    }>(),
    {
        open: false,
        contacts: () => [],
    },
)

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const search = ref('')
const selected = ref<Contact[]>([])
const loading = ref(false)

function close() {
    emit('update:open', false)
}

function toggleContact(contact: Contact) {
    const exists = selected.value.some(
        item => item.index === contact.index,
    )

    if (exists) {
        selected.value = selected.value.filter(
            item => item.index !== contact.index,
        )
    } else {
        selected.value.push(contact)
    }
}

const create = () => {
    router.post(route('admin.inbox.convo.store'), {
        contacts: selected.value.map(contact => ({
            id: contact.id,
            name: contact.name,
            type: contact.type,
        })),
    }, {
        onStart: () => {
            loading.value = true
        },
        onSuccess: () => {
            selected.value = []
            search.value = ''
            close()
        },
        onFinish: () => {
            loading.value = false
        },
    })
}

const filteredContacts = computed(() => {
    const query = search.value.trim().toLowerCase()

    if (!query) {
        return props.contacts
    }

    return props.contacts.filter(contact => {
        const name = contact.name?.toLowerCase() ?? ''
        const email = contact.email?.toLowerCase() ?? ''
        const type = contact.type?.toLowerCase() ?? ''

        return (
            name.includes(query) ||
            email.includes(query) ||
            type.includes(query)
        )
    })
})

const hasSelectedContact = computed(() =>
    selected.value.length > 0
)

const isSelected = (contact: Contact) =>
    selected.value.some(
        item => item.index === contact.index,
    )


</script>

<template>
    <div
        v-if="props.open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-foreground"
        @click.self="close"
    >
        <div
            class="flex w-full max-w-md min-h-[500px] max-h-[90vh] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl"
        >
            <!-- Header -->
            <div
                class="flex shrink-0 items-center justify-between border-b border-border px-5 py-4"
            >
                <div>
                    <h2 class="font-semibold">
                        New Conversation
                    </h2>

                    <p class="text-xs text-muted-foreground">
                        Select a client and add agents if needed.
                    </p>
                </div>

                <button
                    type="button"
                    class="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    @click="close"
                >
                    <Icon
                        icon="lucide:x"
                        class="size-4"
                    />
                </button>
            </div>

            <!-- Content -->
            <div class="min-h-0 flex-1 overflow-y-auto p-5">
                <!-- Info -->
                <div
                    class="mb-4 flex gap-3 rounded-lg border border-border bg-muted/40 p-3"
                >
                    <Icon
                        icon="lucide:info"
                        class="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />

                    <div class="text-xs text-muted-foreground">
                        <p>
                            Select at least one contact.
                        </p>

                        <p class="mt-1">
                            You can add agents or admins to the same
                            conversation.
                        </p>
                    </div>
                </div>

                <!-- Search -->
                <div class="relative">
                    <Icon
                        icon="lucide:search"
                        class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        v-model="search"
                        placeholder="Search contacts..."
                        class="pl-9"
                    />
                </div>

                <!-- Selected Contacts -->
                <div
                    v-if="selected.length"
                    class="mt-3 flex max-h-24 flex-wrap gap-2 overflow-y-auto"
                >
                    <div
                        v-for="contact in selected"
                        :key="`${contact.type}-${contact.id}`"
                        class="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs"
                    >
                        <span class="max-w-32 truncate">
                            {{ contact.name }}
                        </span>

                        <button
                            type="button"
                            class="text-muted-foreground hover:text-foreground"
                            @click="toggleContact(contact)"
                        >
                            <Icon
                                icon="lucide:x"
                                class="size-3"
                            />
                        </button>
                    </div>
                </div>

                <!-- Contacts -->
                <div
                    class="mt-3 min-h-64 max-h-[300px] overflow-y-auto rounded-lg border border-border"
                >
                    <button
                        v-for="contact in filteredContacts"
                        :key="`${contact.type}-${contact.id}`"
                        type="button"
                        class="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted"
                        @click="toggleContact(contact)"
                    >
                        <!-- Avatar -->
                        <div
                            class="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold"
                        >
                            {{
                                contact.initials ||
                                contact.name?.charAt(0).toUpperCase()
                            }}
                        </div>

                        <!-- Details -->
                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-medium">
                                {{ contact.name }}

                                <span
                                    class="text-xs font-normal capitalize text-zinc-400"
                                >
                                    ({{ contact.type }})
                                </span>
                            </p>

                            <p
                                class="truncate text-xs text-muted-foreground"
                            >
                                {{ contact.email || 'No email' }}
                            </p>
                        </div>

                        <!-- Selected -->
                        <Icon
                            v-if="isSelected(contact)"
                            icon="lucide:check"
                            class="size-4 shrink-0 text-[rgb(var(--color-primary))]"
                        />
                    </button>

                    <!-- Empty -->
                    <div
                        v-if="!filteredContacts.length"
                        class="flex min-h-64 items-center justify-center px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                        No contacts found.
                    </div>
                </div>

                <!-- Selected Count -->
                <div
                    v-if="selected.length"
                    class="mt-3 text-xs text-muted-foreground"
                >
                    {{ selected.length }}
                    {{ selected.length === 1 ? 'contact' : 'contacts' }}
                    selected
                </div>
            </div>

            <!-- Footer -->
            <div
                class="flex shrink-0 items-center justify-between border-t border-border px-5 py-4"
            >
                <div class="flex items-center text-xs text-muted-foreground">
                    <template v-if="!hasSelectedContact">
                        Select a contact to continue.
                    </template>

                    <template v-else-if="selected.length === 1">
                        1 client conversation
                    </template>

                    <template v-else>
                        {{ selected.length }} participants
                    </template>
                </div>

                <div class="flex gap-2">
                    <button
                        type="button"
                        class="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
                        @click="close"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        class="rounded-lg bg-[rgb(var(--color-primary))] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 flex item-center gap-2"
                        :disabled="!hasSelectedContact || loading"
                        @click="create"
                    >
                        <Loader2 v-if="loading" class="animate-spin" />
                        <span>Create</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>