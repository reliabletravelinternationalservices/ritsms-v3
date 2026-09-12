<template>
  <Dialog :open="state.show" @update:open="(val) => (state.show = val)">
    <DialogContent>
      <DialogHeader class="space-y-2">
        <DialogTitle>{{ state.title }}</DialogTitle>
        <DialogDescription v-html="state.message" />
      </DialogHeader>

      <DialogFooter class="border-t pt-4 flex justify-end gap-2">
        <DialogClose as-child>
          <Button variant="secondary" :disabled="state.loading">{{ state.cancelText }}</Button>
        </DialogClose>

        <Button variant="destructive" :disabled="state.loading" @click="confirm">
          <span v-if="state.loading" class="mr-2 animate-spin inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"></span>
          {{ state.confirmText }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import state, { closeDeleteDialog, confirmDelete } from '@/stores/deleteDialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const close = () => closeDeleteDialog();
const confirm = () => confirmDelete();
</script>

<style scoped>
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
