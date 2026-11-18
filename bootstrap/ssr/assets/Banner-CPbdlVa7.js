import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { c as cn } from "../ssr.js";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Banner",
  __ssrInlineRender: true,
  props: {
    class: {},
    icon: {},
    title: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex text-xs font-medium items-center gap-2 px-3 py-1 bg-[var(--secondary-custom)] text-[var(--primary-custom)] shadow-sm w-fit uppercase", props.class)
      }, _attrs))}>`);
      if (props.icon) {
        _push(ssrRenderComponent(unref(Icon), mergeProps(props.icon, { class: "w-6 h-6" }), null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span>${ssrInterpolate(props.title)}</span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Banner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
