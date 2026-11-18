import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { P as PARTNER_AGENCIES } from "./constants-D5Z3FOm2.js";
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
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PartnerAgency",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-12 md:py-20 w-full border-y border-[var(--shadow-custom)] px-4" }, _attrs))}><div class="max-w-5xl w-full"><div class="w-full flex flex-col items-center gap-8 md:gap-12"><div class="flex flex-col items-center text-center space-y-4 max-w-3xl"><h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase"> Accredited Travel Agency &amp; Trusted Partnerships </h2><p class="text-sm md:text-base font-roboto text-[var(--muted-custom)]"> Reliable International Travel Services is officially accredited by the Philippines&#39; leading travel and tourism organizations. These partnerships reflect our commitment to safe, reliable, and quality travel planning for every destination we offer. </p></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 w-full"><!--[-->`);
      ssrRenderList(unref(PARTNER_AGENCIES), (agency, index) => {
        _push(`<div class="aspect-square p-4 flex items-center justify-center border border-[var(--shadow-custom)] rounded-lg hover:shadow-lg hover:border-[var(--tertiary-custom)] transition-all duration-300 group"><img${ssrRenderAttr("src", agency.logo)}${ssrRenderAttr("alt", agency.alt)} loading="lazy" class="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/PartnerAgency.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
