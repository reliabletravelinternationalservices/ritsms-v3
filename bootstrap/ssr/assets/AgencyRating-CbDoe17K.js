import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { A as AGENCY_RATINGS } from "./constants-D5Z3FOm2.js";
import "../ssr.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AgencyRating",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full py-12" }, _attrs))}><div class="max-w-5xl m-auto grid grid-cols-2 lg:grid-cols-4 w-full gap-y-8 lg:gap-y-0"><div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).experience.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).experience.value)}+</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).experience.label)}</p></span></div><div class="flex items-center justify-center lg:border-r-2 border-[var(--shadow-custom)] gap-2 px-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).tour.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).tour.value.toLocaleString())}+</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).tour.label)}</p></span></div><div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2 mt-4 lg:mt-0">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).client.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).client.value.toLocaleString())}+</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).client.label)}</p></span></div><div class="flex items-center justify-center gap-2 px-2 mt-4 lg:mt-0">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).review.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).review.value)}/5</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).review.label)}</p></span></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/about/section/AgencyRating.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
