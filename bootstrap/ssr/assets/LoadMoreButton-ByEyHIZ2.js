import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoadMoreButton",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 flex justify-center" }, _attrs))}><button${ssrIncludeBooleanAttr(__props.disabled || __props.loading) ? " disabled" : ""} class="group inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">`);
      if (__props.loading) {
        _push(ssrRenderComponent(unref(Icon), {
          icon: "svg-spinners:180-ring",
          class: "h-5 w-5"
        }, null, _parent));
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`<span class="text-sm font-semibold">Show More</span>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "codicon:fold-down",
            class: "h-4 w-4 transition-transform group-hover:animate-pulse"
          }, null, _parent));
        }, _push, _parent);
      }
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/LoadMoreButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
