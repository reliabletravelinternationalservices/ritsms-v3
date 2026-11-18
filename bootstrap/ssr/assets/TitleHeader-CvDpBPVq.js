import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { m as getImageUrl } from "../ssr.js";
const SECTION_DELAYS = Object.freeze({
  destinationSection: 0.05,
  inboundSection: 0.1,
  outboundSection: 0.15
});
const DESTINATION_HERO_IMAGE = getImageUrl("upload/agency/destination_image.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TitleHeader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-[400px] md:h-[400px] lg:h-[500px] relative overflow-hidden" }, _attrs))}><div class="w-full h-full absolute top-0 left-0"><img class="w-full h-full object-cover"${ssrRenderAttr("src", unref(DESTINATION_HERO_IMAGE))} alt="Travel destinations covered by Reliable International Travel Services"><span class="absolute inset-0 bg-gradient-to-t bg-black/80 flex items-center justify-center"><div class="max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 p-6 md:p-8 text-[var(--primary-custom)]"><span class="flex flex-col items-center justify-center gap-3 text-center"><h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold tracking-wide"> Explore Our Travel Destinations </h1><p class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed"> From local gems to international wonders, we ensure top-tier service standards at every stop. High-quality travel is our standard, not an extra </p></span><span class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"><a${ssrRenderAttr("href", _ctx.route("client.outbound"))}><button class="w-full sm:w-auto bg-[var(--outbound-custom)] text-[var(--primary-custom)] px-6 py-3 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-custom)] border-2 border-[var(--outbound-custom)] hover:border-[var(--tertiary-custom)] transition-all duration-200"><span class="whitespace-nowrap">Outbound Packages</span>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "tabler:arrow-right",
        width: "20",
        height: "20",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button></a><a${ssrRenderAttr("href", _ctx.route("client.inbound"))}><button class="w-full sm:w-auto bg-[var(--inbound-opacity-custom)] border-2 border-[var(--inbound-custom)] text-[var(--inbound-custom)] px-6 py-3 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--inbound-custom)] hover:text-[var(--primary-custom)] hover:border-[var(--inbound-custom)] transition-all duration-200"><span class="whitespace-nowrap">Inbound Packages</span>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "tabler:arrow-right",
        width: "20",
        height: "20",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button></a></span></div></span></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/destination/section/TitleHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TitleHeader = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  SECTION_DELAYS as S,
  TitleHeader as T,
  _sfc_main as _
};
