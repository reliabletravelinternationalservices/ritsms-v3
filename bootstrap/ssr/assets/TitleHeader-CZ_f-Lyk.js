import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { m as getImageUrl } from "../ssr.js";
const SECTION_DELAYS = Object.freeze({
  rating: 0.05,
  about: 0.1,
  video: 0.15,
  partner: 0.2,
  offer: 0.25,
  inquiry: 0.3,
  social: 0.35,
  faq: 0.4
});
const AGENCY_RATING_IMAGE = getImageUrl("upload/agency/about_agency.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TitleHeader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full relative overflow-hidden px-4 py-8 md:py-12" }, _attrs))}><div class="max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-8"><div class="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-4 text-[var(--secondary-custom)] z-10"><p class="text-sm md:text-md lg:text-lg font-roboto font-medium tracking-wider"> ABOUT OUR AGENCY </p><h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold tracking-wide leading-snug md:leading-tight"> Guaranteed Professional, <span class="font-thin">Curated Itineraries from a</span> Reliable Travel Agency </h1></div><div class="w-full max-w-[660px] mx-auto z-10"><img class="w-full h-auto object-contain"${ssrRenderAttr("src", unref(AGENCY_RATING_IMAGE))} alt="Reliable International Travel Services team and agency overview"></div></div><span class="absolute top-5 left-4 md:left-8 z-0 pointer-events-none opacity-5 sm:opacity-10" aria-hidden="true">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:travel-rounded",
        class: "w-20 h-20 sm:w-32 md:w-44 md:h-44 text-[var(--secondary-custom)]"
      }, null, _parent));
      _push(`</span><span class="absolute bottom-5 right-4 md:right-8 z-0 pointer-events-none opacity-5 sm:opacity-10" aria-hidden="true">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-travel-explore",
        class: "w-20 h-20 sm:w-32 md:w-44 md:h-44 text-[var(--secondary-custom)]"
      }, null, _parent));
      _push(`</span></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/about/section/TitleHeader.vue");
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
