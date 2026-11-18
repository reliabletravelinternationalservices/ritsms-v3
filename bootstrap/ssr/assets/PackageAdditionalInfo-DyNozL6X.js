import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { g as getPackageDurationLabel, b as formatCurrency } from "../ssr.js";
import { Clock, CloudSun, DollarSign } from "lucide-vue-next";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageAdditionalInfo",
  __ssrInlineRender: true,
  props: {
    duration: {},
    season: {},
    base_price: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-xl p-5 space-y-4" }, _attrs))}><h3 class="font-semibold text-zinc-900 dark:text-zinc-50 border-b pb-2 dark:border-zinc-800">Package Details</h3><div class="space-y-3"><div class="flex items-center justify-between text-sm"><span class="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">`);
      _push(ssrRenderComponent(unref(Clock), { class: "w-4 h-4" }, null, _parent));
      _push(` Duration</span><span class="font-medium text-zinc-900 dark:text-zinc-100">${ssrInterpolate(unref(getPackageDurationLabel)(__props.duration))}</span></div><div class="flex items-center justify-between text-sm"><span class="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">`);
      _push(ssrRenderComponent(unref(CloudSun), { class: "w-4 h-4" }, null, _parent));
      _push(` Season</span><span class="font-medium capitalize text-zinc-900 dark:text-zinc-100">${ssrInterpolate(__props.season)}</span></div><div class="flex items-center justify-between text-sm"><span class="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">`);
      _push(ssrRenderComponent(unref(DollarSign), { class: "w-4 h-4" }, null, _parent));
      _push(` Booking Fee</span><span class="font-medium text-zinc-900 dark:text-zinc-100">${ssrInterpolate(unref(formatCurrency)(__props.base_price))}</span></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/section/PackageAdditionalInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
