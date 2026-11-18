import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageDescriptionAndHighlight",
  __ssrInlineRender: true,
  props: {
    description: {},
    highlights_array: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Overview</h2><p class="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">${ssrInterpolate(__props.description)}</p>`);
      if ((_a = __props.highlights_array) == null ? void 0 : _a.length) {
        _push(`<div class="mt-4 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30"><h3 class="text-sm font-semibold text-indigo-900 dark:text-indigo-400 mb-2">Highlights</h3><ul class="grid grid-cols-1 md:grid-cols-2 gap-2"><!--[-->`);
        ssrRenderList(__props.highlights_array, (highlight, idx) => {
          _push(`<li class="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2"><span class="text-indigo-500 font-bold">•</span> ${ssrInterpolate(highlight)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/section/PackageDescriptionAndHighlight.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
