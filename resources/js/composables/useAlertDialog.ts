import { ref } from 'vue'

export type AlertDialogVariant =
  | 'delete'
  | 'info'
  | 'warning'
  | 'success'
  | 'danger'

export interface AlertDialogOptions {
  variant?: AlertDialogVariant
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

const isOpen = ref(false)
const options = ref<AlertDialogOptions>({})

export function useAlertDialog() {
  const alertDialog = (newOptions: AlertDialogOptions) => {
    options.value = {
      variant: 'info',
      title: 'Are you sure?',
      description: 'This action cannot be undone.',
      confirmText: 'Continue',
      cancelText: 'Cancel',
      ...newOptions,
    }

    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const confirm = async () => {
    await options.value.onConfirm?.()
    close()
  }

  const cancel = () => {
    options.value.onCancel?.()
    close()
  }

  return {
    isOpen,
    options,
    alertDialog,
    confirm,
    cancel,
    close,
  }
}