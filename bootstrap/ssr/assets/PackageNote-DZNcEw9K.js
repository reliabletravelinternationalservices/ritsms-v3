import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageNote",
  __ssrInlineRender: true,
  props: {
    package: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto relative overflow-hidden p-2 sm:p-4" }, _attrs))}><div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-4 bg-[var(--shadow-custom)] rounded-lg"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:warning",
        class: "text-xl md:text-2xl text-[var(--secondary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Notes</h2></div><ul class="w-full flex flex-col gap-2"><!--[-->`);
      ssrRenderList(props.package.notes_array, (data, index) => {
        _push(`<li class="flex items-start gap-2 text-xs sm:text-sm md:text-base text-neutral-700 min-w-0"><div class="mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full bg-[var(--secondary-custom)] shrink-0" aria-hidden="true"></div><p class="whitespace-pre-line break-words leading-relaxed w-full">${ssrInterpolate(data)}</p></li>`);
      });
      _push(`<!--]--></ul></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageNote.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
