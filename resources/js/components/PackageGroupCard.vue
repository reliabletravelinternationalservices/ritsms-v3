<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { type PackageGroup } from '@/types/group-package';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Compass,
  Sparkles,
  Star,
  PlaneLanding,
  PlaneTakeoff,
  Layers,
  Calendar,
  ArrowRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-vue-next';

const props = defineProps<{
  group: PackageGroup;
  highlighted?: boolean;
}>();

const cardClasses = computed(() => {
  return [
    'overflow-hidden group flex flex-col justify-between shadow-sm',
    props.highlighted
      ? 'border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-b from-indigo-50/10 to-transparent dark:from-indigo-950/5'
      : 'border dark:border-zinc-800',
  ].join(' ');
});

const imageAlt = computed(() => props.group.image?.alt_text || props.group.title);

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
</script>

<template>
  <Card :class="cardClasses">
    <div>
      <div class="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-b dark:border-zinc-800">
        <img
          v-if="props.group.image?.url"
          :src="props.group.image.url"
          :alt="imageAlt"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-zinc-400">
          <Compass class="w-10 h-10 stroke-[1.5]" />
        </div>

        <div v-if="props.highlighted || props.group.is_featured" class="absolute top-3 left-3 flex flex-col gap-1.5 items-start max-w-[85%]">
          <span
            v-if="props.group.tag && props.group.tag !== null"
            class="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-red-600 text-white shadow-sm"
          >
            <Sparkles class="w-2.5 h-2.5 fill-current" /> {{ props.group.tag }}
          </span>
          <span
            v-if="props.group.is_featured"
            class="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-white shadow-sm"
          >
            <Star class="w-2.5 h-2.5 fill-current" /> Featured
          </span>
        </div>

        <div class="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="h-7 w-7 rounded-md opacity-90 backdrop-blur hover:opacity-100 shadow-sm">
                <MoreHorizontal class="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-40 dark:bg-zinc-950 dark:border-zinc-800">
              <DropdownMenuItem as-child>
                <Link :href="route('admin.packages.groups.edit', { id: props.group.id })" class="flex items-center gap-2">
                  <Pencil class="w-4 h-4 text-zinc-400" /> Edit Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem class="gap-2 text-red-600 focus:text-red-600 dark:focus:bg-red-950/20 cursor-pointer">
                <Trash2 class="w-4 h-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader class="p-4 space-y-2">
        <CardTitle class="text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {{ props.group.title }}
        </CardTitle>
        <CardDescription class="text-xs line-clamp-2 min-h-[32px] leading-relaxed">
          {{ props.group.description || 'No description summary added.' }}
        </CardDescription>
      </CardHeader>
    </div>

    <div>
      <CardContent class="px-4 pb-3 pt-0 space-y-3">
        <div class="flex flex-wrap gap-1">
          <Badge v-if="props.group.include_as_outbound" variant="secondary" class="text-[10px] font-normal px-2 py-0">
            <PlaneTakeoff class="w-2.5 h-2.5 mr-1 text-sky-500" /> Outbound
          </Badge>
          <Badge v-if="props.group.include_as_inbound" variant="secondary" class="text-[10px] font-normal px-2 py-0">
            <PlaneLanding class="w-2.5 h-2.5 mr-1 text-emerald-500" /> Inbound
          </Badge>
        </div>
        <Separator class="dark:bg-zinc-800" />
        <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span class="flex items-center gap-1.5"><Layers class="w-3.5 h-3.5" /> Inside Collection:</span>
          <span class="font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
            {{ props.group.packages?.length || 0 }} items
          </span>
        </div>
      </CardContent>

      <CardFooter class="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-t dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
        <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> Modified {{ formatDate(props.group.updated_at) }}</span>
        <Link :href="route('admin.packages.groups.edit', { id: props.group.id })" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
          Manage <ArrowRight class="w-3 h-3" />
        </Link>
      </CardFooter>
    </div>
  </Card>
</template>
