import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TitleHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    image: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[360px] relative overflow-hidden select-none" }, _attrs))}><div class="absolute inset-0 w-full h-full z-0">`);
      if (__props.image) {
        _push(`<img${ssrRenderAttr("src", __props.image)} alt="Service country banner" class="w-full h-full object-cover object-center" loading="eager">`);
      } else {
        _push(`<div class="w-full h-full bg-slate-200 flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "lucide:image-off",
          class: "w-12 h-12 text-slate-400"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/30 flex items-center justify-center px-4 sm:px-6 md:px-8"><div class="max-w-3xl w-full mx-auto flex flex-col items-center justify-center gap-3 text-center text-[var(--primary-custom,white)]"><h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold uppercase tracking-wider leading-tight drop-shadow-md">${ssrInterpolate(__props.title)}</h1>`);
      if (__props.description) {
        _push(`<p class="text-xs sm:text-sm md:text-base font-roboto max-w-2xl leading-relaxed opacity-90 drop-shadow-sm line-clamp-3 sm:line-clamp-none">${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/country/section/TitleHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
