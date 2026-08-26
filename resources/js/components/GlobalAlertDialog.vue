<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useAlertDialog } from '@/composables/useAlertDialog'
import { computed } from 'vue'

const {
  isOpen,
  options,
  confirm,
  cancel,
} = useAlertDialog()

const titleClass = computed(() => {
  switch (options.value.variant) {
    case 'delete':
    case 'danger':
      return 'text-destructive'

    case 'warning':
      return 'text-yellow-600 dark:text-yellow-400'

    case 'success':
      return 'text-green-600 dark:text-green-400'

    case 'info':
    default:
      return 'text-blue-600 dark:text-blue-400'
  }
})

const actionClass = computed(() => {
  switch (options.value.variant) {
    case 'delete':
    case 'danger':
      return 'bg-destructive text-destructive-foreground hover:bg-destructive/90'

    case 'warning':
      return 'bg-yellow-500 text-white hover:bg-yellow-600'

    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700'

    case 'info':
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle :class="titleClass">
          {{ options.title }}
        </AlertDialogTitle>

        <AlertDialogDescription>
          {{ options.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel @click="cancel">
          {{ options.cancelText }}
        </AlertDialogCancel>

        <AlertDialogAction
          :class="actionClass"
          @click="confirm"
        >
          {{ options.confirmText }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>