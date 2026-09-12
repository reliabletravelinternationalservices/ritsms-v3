<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import NewDateTimePicker from '@/components/NewDateTimePicker.vue';
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useClientFormStore } from '@/stores/clientForm';

withDefaults(defineProps<{
    isLoading: boolean;
}>(), {
  isLoading: false
})


const clientForm = useClientFormStore()



const types: SelectOption[]  = [
    {
        label: 'Personal',
        value:  'personal'
    },
    {
        label: 'Business',
        value: 'business'
    },
    {
        label:  'Partner',
        value: 'partner'
    },
    {
        label: 'Other',
        value: 'other'
    }
]


const source: SelectOption[] = [
    {
        label: 'Website',
        value: 'website',
    },
    {
        label: 'Manual',
        value: 'manual',
    },
    {
        label: 'Gmail',
        value: 'gmail',
    },
    {
        label: 'Walk In',
        value: 'walk_in',
    },
    {
        label: 'Google Ads',
        value: 'google_ads',
    },
    {
        label: 'Facebook',
        value: 'facebook',
    },
    {
        label: 'Instagram',
        value: 'instagram',
    },
    {
        label: 'TikTok',
        value: 'tiktok',
    },
    {
        label: 'YouTube',
        value: 'youtube',
    },
    {
        label: 'Other',
        value: 'other',
    },
]

const genders: SelectOption[] = [
    {
        label: 'Male',
        value: 'male',
    },
    {
        label: 'Female',
        value: 'female',
    },
    {
        label: 'Transgender',
        value: 'transgender',
    },
    {
        label: 'Lesbian',
        value: 'Lesbian',
    },
    {
        label: 'Other',
        value: 'other',
    },
]

const statuses: SelectOption[] = [
    {
        label: 'New',
        value: 'new',
    },
    {
        label: 'Contacted',
        value: 'contacted',
    },
    {
        label: 'Qualified',
        value: 'qualified',
    },
    {
        label: 'Quotation Sent',
        value: 'quotation_sent',
    },
    {
        label: 'Booked',
        value: 'booked',
    },
    {
        label: 'Completed',
        value: 'completed',
    },
    {
        label: 'Unresponsive',
        value: 'unresponsive',
    },
    {
        label: 'Cancelled',
        value: 'cancelled',
    },
    {
        label: 'Disqualified',
        value: 'disqualified',
    },
]


</script>

<template>
    <div class="mt-4 p-4 text-foreground">

        <!-- BASIC INFORMATIONS -->
        <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
            <span>Basic Information</span>
        </div>
        <div class="flex gap-4 p-4">
            <div class="space-y-2 w-full">
                <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Type <span
                        class="text-red-600">*</span></label>
                <SelectMenu v-model="clientForm.form.basicInformation.type" name="category"
                    placeholder="Select client type" :options="types" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['type']" />
            </div>
            <div class="space-y-2 w-full">
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name <span
                        class="text-red-600">*</span></label>
                <Input v-model="clientForm.form.basicInformation.name" name="name"
                    placeholder="Enter client name" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['name']" />
            </div>                        
            <div class="space-y-2 w-full">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email <span
                        class="text-red-600">*</span></label>
                <Input v-model="clientForm.form.basicInformation.email" name="email"
                    placeholder="Enter email address" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['email']" />
            </div>                                            
        </div>

        <div class="flex gap-4 p-4">
            <div class="space-y-2 w-full">
                <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone <span
                        class="text-xs text-muted-foreground italic">(optional)</span></label>
                <Input v-model="clientForm.form.basicInformation.phone" name="phone"
                    placeholder="Enter phone number" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['phone']" />
            </div>     

            <div class="space-y-2 w-full">
                <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">Gender <span
                        class="text-xs text-muted-foreground italic">(optional)</span></label>
                <SelectMenu v-model="clientForm.form.basicInformation.gender" name="gender"
                    placeholder="Select gender" :options="genders" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['gender']" />
            </div>

            <div class="space-y-2 w-full">
                <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address <span
                        class="text-xs text-muted-foreground italic">(optional)</span></label>
                <Textarea v-model="clientForm.form.basicInformation.address" name="address" :min-height="20"
                    placeholder="Enter full address" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['address']" />
            </div>  
                                                    
        </div>

        <!-- CLASSIFICATION -->
        <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
            <span>Classification</span>
        </div>
        <div class="flex gap-4 p-4">
            <div class="space-y-2 w-full">
                <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Status <span
                        class="text-red-600">*</span></label>
                <SelectMenu v-model="clientForm.form.classification.status" name="status"
                    placeholder="Select status" :options="statuses" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['status']" />
            </div>

            <div class="space-y-2 w-full">
                <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Source <span
                        class="text-red-600">*</span></label>
                <SelectMenu v-model="clientForm.form.classification.source" name="category"
                    placeholder="Select category" :options="source" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['source']" />
            </div>
                                                    
        </div>

        <!-- SOCIAL & FOLLOWUP -->
        <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
            <span>Social & Follow Up</span>
        </div>
        <div class="flex gap-4 p-4">
            <div class="space-y-2 w-full">
                <label for="facebook" class="block text-sm font-medium leading-6 text-gray-900">Facebook Link <span
                        class="text-xs text-muted-foreground italic">(optional)</span></label>
                <Input v-model="clientForm.form.profile.facebook_link" name="facebook"
                    placeholder="Enter facebook profile link" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['facebook_link']" />
            </div>  

            <div class="space-y-2 w-full">
                <label for="website" class="block text-sm font-medium leading-6 text-gray-900">Website Link <span
                        class="text-xs text-muted-foreground italic">(optional)</span></label>
                <Input v-model="clientForm.form.profile.website_link" name="website"
                    placeholder="Enter website link" class="font-roboto text-sm" />
                <InputError :message="clientForm.errors['website_link']" />
            </div>  
            
                <div class="space-y-2 w-full">
                <label for="last_contact" class="text-sm font-semibold text-zinc-600">Last Contact <span
                        class="text-xs text-muted-foreground italic">(optional)</span></label>
                <NewDateTimePicker v-model="clientForm.form.followup.last_contacted"
                    placeholder="Select date" class="h-10 w-full" name="last_contact" />
                <InputError :message="clientForm.errors['last_contacted']" />
            </div>
        </div>
        <div class="flex flex-col gap-4 p-4">

            <div class="space-y-2 w-full">
                <label for="notes" class="text-sm font-semibold text-zinc-600">Notes <span
                        class="text-xs text-muted-foreground italic">(optional)</span></label>
                <Textarea v-model="clientForm.form.followup.notes"
                    placeholder="Say something..." class="h-10 w-full" name="notes" />
                <InputError :message="clientForm.errors['notes']" />
            </div>
            <div class="flex gap-2 w-full">
                <Checkbox 
                    :checked="clientForm.form.followup.accept_marketing"
                    @update:checked="(value) => clientForm.form.followup.accept_marketing = value"
                    placeholder="accept marketing" id="accept_marketing" />
                <label for="accept_marketing" class="text-sm font-semibold text-zinc-600">Accept Marketing</label>
            </div>
        </div>
    </div>
</template>