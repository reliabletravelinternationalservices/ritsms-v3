<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import { Package, PackageSchedule } from '@/types/package';
import HeadingSmall from '@/components/HeadingSmall.vue';
import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import InputError from '@/components/InputError.vue';
import SwitchWithLabel from '@/components/SwitchWithLabel.vue';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { truncateText } from '@/lib/utils';
const props = defineProps<{ package: Package; schedule: PackageSchedule }>();

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: route('admin.dashboard') },
  { title: 'Packages', href: route('admin.packages') },
  { title: truncateText(props.package.name, 20) ?? 'Package', href: route('admin.packages.details', { id: props.package.id }) },
  { title: 'Edit Batch', href: route('admin.packages.batches.edit', { id: props.package.id, scheduleId: props.schedule.id }) },
];

const form = useForm({
  departure_date: props.schedule.departure_date ?? '',
  return_date: props.schedule.return_date ?? '',
  price: props.schedule.price ?? '',
  is_available: props.schedule.is_available ?? true,
  is_limited: props.schedule.is_limited ?? false,
});

const submit = () => {
  form.put(route('admin.packages.batches.update', { id: props.package.id, scheduleId: props.schedule.id }), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success('Travel batch updated successfully');
    },
    onError: () => {
      toast.error('Failed to update travel batch');
    },
  });
};
</script>

<template>
  <Head title="Edit Batch Travel" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
        <div class="flex flex-col space-y-6 max-w-4xl">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <HeadingSmall title="Edit travel batch" description="Update the departure schedule details." />
              <p class="text-sm text-zinc-500 dark:text-zinc-400">Package: {{ props.package.name }}</p>
            </div>
            <Link :href="route('admin.packages.details', { id: props.package.id })" class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50">
              <ArrowLeft class="w-4 h-4" /> Back to package
            </Link>
          </div>

          <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="grid gap-6 md:grid-cols-2">
              <div class="grid gap-2">
                <Label for="departure_date">Departure Date</Label>
                <Input id="departure_date" type="date" class="mt-1 block w-full" v-model="form.departure_date" />
                <div class="min-h-[1.5rem]">
                  <InputError :message="form.errors.departure_date" />
                </div>
              </div>

              <div class="grid gap-2">
                <Label for="return_date">Return Date <span class="text-zinc-400">(Optional)</span></Label>
                <Input id="return_date" type="date" class="mt-1 block w-full" v-model="form.return_date" />
                <div class="min-h-[1.5rem]">
                  <InputError :message="form.errors.return_date" />
                </div>
              </div>
            </div>

            <div class="grid gap-2">
              <Label for="price">Price per person</Label>
              <Input id="price" type="number" min="0" step="0.01" class="mt-1 block w-full" v-model="form.price" placeholder="0.00" />
              <div class="min-h-[1.5rem]">
                <InputError :message="form.errors.price" />
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <SwitchWithLabel :is-checked="form.is_available" @change="value => form.is_available = value" label="Available" />
              </div>
              <div>
                <SwitchWithLabel :is-checked="form.is_limited" @change="value => form.is_limited = value" label="Limited slots" />
              </div>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button type="submit" class="shadow-sm">Save changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
