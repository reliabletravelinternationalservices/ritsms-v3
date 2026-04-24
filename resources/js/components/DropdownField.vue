<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Icon } from '@iconify/vue';

interface Option {
  label: string;
  value: string | number | null;
}

interface Props {
  modelValue: string | number | null;
  options: Option[];
  placeholder?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  class: ''
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// ✅ add empty option on top
const computedOptions = computed<Option[]>(() => [
  { label: props.placeholder, value: null },
  ...props.options
]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
};

const closeDropdown = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => window.addEventListener('click', closeDropdown));
onUnmounted(() => window.removeEventListener('click', closeDropdown));
</script>

<template>
  <div class="relative w-full" :class="props.class" ref="dropdownRef">
    <!-- Trigger -->
    <button
      @click="toggleDropdown"
      type="button"
      class="w-full flex items-center justify-between gap-2 px-4 py-3 bg-[var(--primary-custom)] border border-[var(--shadow-custom)] transition-all duration-200 focus:outline-none"
    >
      <span
        class="text-sm font-roboto"
        :class="modelValue ? 'text-black' : 'text-gray-400'"
      >
        {{
          computedOptions.find(o => o.value === modelValue)?.label || placeholder
        }}
      </span>

      <Icon
        icon="ri:arrow-down-s-line"
        class="text-xl transition-transform duration-200 text-[var(--shadow-custom)]"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 z-50 mt-1 w-full max-h-60 overflow-y-auto bg-white shadow-xl border border-gray-100"
      >
        <div class="py-1">
          <button
            v-for="option in computedOptions"
            :key="option.value ?? 'empty'"
            @click="selectOption(option)"
            type="button"
            :class="[
              'w-full text-left px-4 py-3 text-sm font-roboto transition-colors',
              modelValue === option.value
                ? 'bg-[var(--tertiary-custom)] text-white'
                : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>