<script setup lang="ts">
import { ref } from "vue"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

type Payload = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}

const openState = ref(false)
const payload = ref<Payload | null>(null)

function open(data: Payload) {
  payload.value = data
  openState.value = true
}

function close() {
  openState.value = false
}

function confirm() {
  payload.value?.onConfirm?.()
  close()
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Dialog v-model:open="openState">
    <DialogContent class="sm:max-w-md">

      <DialogHeader>
        <DialogTitle>
          {{ payload?.title }}
        </DialogTitle>

        <DialogDescription v-if="payload?.description">
          {{ payload?.description }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="flex gap-2">
        <Button v-if="payload?.cancelText" variant="secondary" @click="close">
          {{ payload?.cancelText ?? "Close" }}
        </Button>

        <Button @click="confirm">
          {{ payload?.confirmText ?? "OK" }}
        </Button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>