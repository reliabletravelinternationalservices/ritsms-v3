<script setup lang="ts">
import ClientForm from '@/components/form/client/ClientForm.vue'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import Button from '@/components/ui/button/Button.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { truncateText } from '@/lib/utils'
import { useClientFormStore } from '@/stores/clientForm'
import { BreadcrumbItem } from '@/types'
import { Client } from '@/types/client'
import { Icon } from '@iconify/vue'
import { Head, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

interface Props {
    client: Client;
}

const props = defineProps<Props>()


const clientForm = useClientFormStore()
const isSaving = ref(false)

clientForm.fillForm(props.client)

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Client Management',
        href: route('admin.clients'),
    },
    {
        title: truncateText(props.client.name, 20),
        href: '',
    },
    {
        title: 'Edit',
        href: route('admin.clients.edit', { slug: props.client.slug}),
    },
]

function saveClientInformnation() {
    isSaving.value = true

    router.put(
        route('admin.clients.update', { client: props.client.id}),
        {
           ...clientForm.form.basicInformation,
           ...clientForm.form.classification,
           ...clientForm.form.followup,
           ...clientForm.form.profile,
        },
        {
            onFinish: () => {
                isSaving.value = false
            },
            onError: (e) => {
                clientForm.setErrors(e)
                toast.error('Failed to save the client. Please check for required forms.')
            },
            onSuccess: () => {
                clientForm.clearErrors()
                toast.success('Client save successfully.')
            },
        },
    )
}

</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Edit Client" />

        <div class="text-foreground">

            <div
                class="flex justify-end gap-4 border-y border-border px-6 py-2"
            >
                <Button
                    type="button"
                    variant="default"
                    :disabled="isSaving"
                    class="flex items-center gap-2 bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary)/0.8)]"
                    @click="saveClientInformnation"
                >
                    <Icon
                        v-if="isSaving"
                        icon="lucide:loader-2"
                        class="size-5 animate-spin"
                    />

                    <Icon
                        v-else
                        icon="lucide:save-check"
                        class="size-5"
                    />

                    <span>
                        {{ isSaving ? 'Saving...' : 'Save' }}
                    </span>
                </Button>
            </div>

            <div class="p-6">
                <ClientForm :is-loading="isSaving" />
            </div>
            <ScrollToTopButton />

        </div>
    </AppLayout>
</template>