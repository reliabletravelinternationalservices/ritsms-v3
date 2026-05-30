import { createVNode, render, App } from "vue"
import ImageViewerHost from "@/components/ui/ImagePreviewModal.vue"

export type ImageItem = {
  url: string
  alt_text: string
}

type ImageViewerInstance = {
  open: (images: ImageItem[], index?: number) => void
  close: () => void
}

let mountEl: HTMLElement | null = null
let vm: ImageViewerInstance | null = null

export const imageViewer = {
  install(app: App) {
    mountEl = document.createElement("div")
    document.body.appendChild(mountEl)

    const vnode = createVNode(ImageViewerHost)
    vnode.appContext = app._context

    render(vnode, mountEl)

    vm = vnode.component?.exposed as ImageViewerInstance
  },

  open(images: ImageItem[], index = 0) {
    if (!vm) return
    vm.open(images, index)
  },

  close() {
    vm?.close()
  },
}