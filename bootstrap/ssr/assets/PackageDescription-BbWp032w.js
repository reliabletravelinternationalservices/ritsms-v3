import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageDescription",
  __ssrInlineRender: true,
  props: {
    package: {}
  },
  setup(__props) {
    const props = __props;
    const showAll = ref(false);
    const description = props.package.description || "";
    const isLong = description.length > 400;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto relative overflow-hidden p-2 sm:p-4" }, _attrs))}><div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-1 p-2 sm:p-4"><h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">About This Package</h2><div class="w-full flex flex-col gap-2"><div class="${ssrRenderClass([isLong && !showAll.value ? "max-h-[9.3em]" : "max-h-[2000px]", "overflow-hidden transition-[max-height] duration-700 ease-in-out"])}"><p class="whitespace-pre-line break-words w-full text-xs sm:text-sm md:text-base text-justify leading-relaxed">${ssrInterpolate(unref(description))}</p></div><div class="pt-1">`);
      if (isLong) {
        _push(`<span class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer select-none inline-block" role="button"${ssrRenderAttr("aria-expanded", showAll.value)}>${ssrInterpolate(showAll.value ? "Show less" : "Show more...")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageDescription.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
