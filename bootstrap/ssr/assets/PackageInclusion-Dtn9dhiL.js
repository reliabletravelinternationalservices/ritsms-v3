import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageInclusion",
  __ssrInlineRender: true,
  props: {
    package: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto relative overflow-hidden p-2 sm:p-4" }, _attrs))}><div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-2 sm:p-4"><h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Inclusions</h2><ul class="w-full flex flex-col gap-2 px-1 sm:px-4"><!--[-->`);
      ssrRenderList(__props.package.inclusions_array, (data, index) => {
        _push(`<li class="flex items-start gap-2 text-xs sm:text-sm md:text-base text-neutral-800 min-w-0">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "material-symbols:check",
          class: "text-xl md:text-2xl text-[var(--correct-custom)] shrink-0 mt-0.5",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<p class="whitespace-pre-line break-words leading-relaxed w-full">${ssrInterpolate(data)}</p></li>`);
      });
      _push(`<!--]--></ul></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageInclusion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
