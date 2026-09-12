import { reactive } from 'vue';

type DeleteDialogOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
};

const state = reactive({
  show: false,
  title: 'Confirm delete',
  message: 'Are you sure you want to delete this item?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  onConfirm: undefined as (undefined | (() => void | Promise<void>)),
  loading: false,
});

export function openDeleteDialog(options: DeleteDialogOptions = {}) {
  state.title = options.title ?? 'Confirm delete';
  state.message = options.message ?? 'Are you sure you want to delete this item?';
  state.confirmText = options.confirmText ?? 'Delete';
  state.cancelText = options.cancelText ?? 'Cancel';
  state.onConfirm = options.onConfirm;
  state.loading = false;
  state.show = true;
}

export function closeDeleteDialog() {
  state.show = false;
  state.onConfirm = undefined;
  state.loading = false;
}

export async function confirmDelete() {
  if (!state.onConfirm) {
    closeDeleteDialog();
    return;
  }

  try {
    state.loading = true;
    await state.onConfirm();
  } finally {
    state.loading = false;
    closeDeleteDialog();
  }
}

export default state;
