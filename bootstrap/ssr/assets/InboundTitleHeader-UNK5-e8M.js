import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DestinationDropdownBreadcrumb-Ba7auldd.js";
import { Icon } from "@iconify/vue";
import { m as getImageUrl } from "../ssr.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "lucide-vue-next";
import "radix-vue";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "vue-sonner";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const INBOUND_HERO_IMAGE = getImageUrl("upload/agency/inbound_image.png");
Array.from({ length: 30 }, (_, index) => {
  const duration = index + 1;
  return {
    label: `${duration} Day${duration === 1 ? "" : "s"}`,
    value: duration
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InboundTitleHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbItems = [
      { title: "Home", href: route("client.landing") },
      {
        title: "Inbound",
        href: route("client.inbound"),
        dropdown: [
          {
            label: "Outbound",
            action: () => {
              window.location.href = route("client.outbound");
            }
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto min-h-[400px] md:h-[400px] lg:h-[500px] relative overflow-hidden flex" }, _attrs))}><div class="w-full h-full absolute top-0 left-0"><img class="w-full h-full object-cover"${ssrRenderAttr("src", unref(INBOUND_HERO_IMAGE))} alt="Local travel destinations for inbound tour packages in the Philippines"><span class="absolute inset-0 bg-gradient-to-t bg-black/60 flex items-end justify-start"><div class="max-w-3xl flex flex-col items-start gap-6 md:gap-8 p-6 md:p-12 text-[var(--primary-custom)]"><span class="flex flex-col items-start justify-start gap-3"><div class="w-full">`);
      _push(ssrRenderComponent(_sfc_main$1, { items: breadcrumbItems }, null, _parent));
      _push(`</div><h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-extralight uppercase"> EXPLORE <span class="font-extrabold">LOCAL DESTINATIONS IN THE</span> PHILIPPINES </h1><p class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed"> Crystal clear waters, majestic cliffs, and endless sunshine. Your ultimate Philippine adventure starts right here. </p></span><div class="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto"><button class="w-full sm:w-auto bg-[var(--primary-opacity-custom)] border-2 border-[var(--primary-custom)] text-[var(--primary-custom)] px-6 py-3 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--primary-custom)] hover:text-[var(--muted-custom)] hover:border-[var(--primary-custom)] transition-all duration-200"><span class="whitespace-nowrap uppercase">Discover Now</span>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "formkit:arrowright",
        width: "26",
        height: "26",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button></div></div></span></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/inbound/section/InboundTitleHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
