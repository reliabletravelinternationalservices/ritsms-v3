import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
/* empty css                  */
import { Icon } from "@iconify/vue";
import { A as AGENCY_BOOKING_PROCESS, a as AGENCY_OFFER_IMAGE } from "./constants-CG928fGe.js";
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
  __name: "AgencyOffer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 items-center justify-center min-h-screen py-18 px-4 w-full" }, _attrs))}><div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start"><div class="w-full space-y-4"><div class="flex items-center gap-1 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:offer",
        width: "24",
        height: "24",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-lg md:text-xl">HOW IT WORKS</p></div><div class="space-y-4"><div class="space-y-3"><h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold"> How Our Travel Booking Process Works </h1><p class="font-roboto text-xs md:text-sm text-justify"> Booking your next trip with us is simple and stress-free. From your first inquiry to sealing the deal, our travel consultants guide you through every step of the process. </p></div><div class="space-y-4 text-justify"><!--[-->`);
      ssrRenderList(unref(AGENCY_BOOKING_PROCESS), (process) => {
        _push(`<div class="flex flex-col gap-1"><span class="flex items-center gap-1">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "material-symbols:check",
          width: "24",
          height: "24",
          class: "md:w-7 md:h-7 text-[var(--correct-custom)]",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<h3 class="font-roboto font-bold text-sm md:text-base text-[var(--secondary-custom)]">${ssrInterpolate(process.title)}</h3></span><p class="font-roboto text-xs md:text-sm whitespace-pre-line">${ssrInterpolate(process.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div><div class="w-full h-full"><img${ssrRenderAttr("src", unref(AGENCY_OFFER_IMAGE))} alt="Step-by-step travel booking process with Reliable International Travel Services" class="object-cover h-48 md:h-full w-full"></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/contact/section/AgencyOffer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
