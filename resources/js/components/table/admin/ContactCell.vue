<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { SharedData, User } from '@/types';
import { Icon } from '@iconify/vue';
import { usePage } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  email: string;
  phone?: string | null;
}

const props = defineProps<Props>();

const page = usePage<SharedData>();
const currentUser = page.props.auth.user as User;

// Set up clipboard functionality
const { copy, copied } = useClipboard();

const handleCopy = (text: string) => {
  copy(text);
};
</script>

<template>
  <div class="flex items-center gap-3 group">
    <div class="flex flex-col">
      <span class="line-clamp-2">
        {{ email }}
      </span>
      <span v-if="phone" class="text-xs font-light text-muted-foreground">
        {{ phone }}
      </span>
    </div>

    <TooltipProvider :delay-duration="100">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            @click="handleCopy(email)"
            aria-label="Copy email"
          >
            <Icon
              :icon="copied ? 'lucide:check' : 'lucide:copy'"
              class="h-4 w-4 text-muted-foreground transition-all"
              :class="{ 'text-emerald-500': copied }"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{{ copied ? 'Copied!' : 'Copy email' }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>