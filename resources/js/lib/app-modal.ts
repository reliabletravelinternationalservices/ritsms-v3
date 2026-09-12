import { createVNode, render, App } from "vue"
import AppModalHost from "@/components/ui/AppModalHost.vue"

export type AppModalPayload = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}

let vm: any = null
let mountEl: HTMLElement | null = null

export const appModal = {
  install(app: App) {
    mountEl = document.createElement("div")
    document.body.appendChild(mountEl)

    const vnode = createVNode(AppModalHost)
    vnode.appContext = app._context

    render(vnode, mountEl)

    vm = vnode.component?.exposed
  },

  open(payload: AppModalPayload) {
    vm?.open(payload)
  },

  close() {
    vm?.close()
  },
}