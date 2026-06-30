<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-vue-next';

// Forwarding models and attributes
const modelValue = defineModel<string>();

const showPassword = ref(false);

const toggleVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="relative w-full flex items-center">
    <Input
      :type="showPassword ? 'text' : 'password'"
      v-model="modelValue"
      v-bind="$attrs"
      class="pr-10"
    />
    <Button
      type="button"
      variant="ghost"
      size="sm"
      class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
      @click="toggleVisibility"
    >
      <EyeOff v-if="showPassword" class="h-4 w-4" aria-hidden="true" />
      <Eye v-else class="h-4 w-4" aria-hidden="true" />
      <span class="sr-only">
        {{ showPassword ? 'Hide password' : 'Show password' }}
      </span>
    </Button>
  </div>
</template>