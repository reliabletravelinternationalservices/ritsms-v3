import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { p as packageSellingStatus, a as formatDateString } from "../ssr.js";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "lucide-vue-next";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageSellingPeriod",
  __ssrInlineRender: true,
  props: {
    selling_start_date: {},
    selling_end_date: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-xl p-5 space-y-4" }, _attrs))}><span class="flex items-center justify-between border-b pb-2 dark:border-zinc-800"><h3 class="font-semibold text-zinc-900 dark:text-zinc-50">Selling Period</h3><span class="text-xs text-zinc-500 dark:text-zinc-400">${ssrInterpolate(unref(packageSellingStatus)(__props.selling_end_date))}</span></span><div class="space-y-3"><div><p class="text-xs text-zinc-500 dark:text-zinc-400">Starts Selling On</p><p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">${ssrInterpolate(unref(formatDateString)(__props.selling_start_date))}</p></div><div><p class="text-xs text-zinc-500 dark:text-zinc-400">Closes/Ends On</p><p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">${ssrInterpolate(unref(formatDateString)(__props.selling_end_date))}</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/section/PackageSellingPeriod.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
