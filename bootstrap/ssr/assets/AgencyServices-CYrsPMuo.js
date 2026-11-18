import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { b as AGENCY_SERVICES } from "./constants-D5Z3FOm2.js";
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
  __name: "AgencyServices",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center h-auto min-h-screen md:min-h-[700px] lg:min-h-[800px] w-full bg-black/5 p-8 md:p-0" }, _attrs))}><div class="max-w-5xl h-min"><div class="w-full flex flex-col items-center gap-12 md:gap-16"><div class="flex flex-col items-center text-center space-y-4 max-w-3xl"><div class="flex items-end gap-2 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:room-service",
        width: "28",
        height: "28",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-lg md:text-xl uppercase">OUR SERVICES</p></div><div class="space-y-3"><h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase"> Your Journey, Our Priority </h2><p class="text-base md:text-lg tracking-wide font-roboto text-[var(--muted-custom)] italic"> &quot;Connecting the Philippines to the World, and the World to the Philippines.&quot; </p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12"><!--[-->`);
      ssrRenderList(unref(AGENCY_SERVICES), (service) => {
        _push(`<div class="flex flex-col items-center text-center group"><div class="mb-4 text-[var(--secondary-custom)] group-hover:scale-110 transition-transform duration-300">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: service.icon,
          class: "w-10 h-10 md:w-12 md:h-12",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</div><div class="space-y-2"><h3 class="font-bold font-roboto text-lg md:text-xl">${ssrInterpolate(service.name)}</h3><p class="text-sm md:text-base leading-relaxed font-roboto text-[var(--muted-custom)]">${ssrInterpolate(service.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/AgencyServices.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
