import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExploreButton",
  __ssrInlineRender: true,
  props: {
    title: {},
    href: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["border-b border-[var(--outbound-custom)] hover:border-[var(--tertiary-custom)] text-[var(--outbound-custom)] hover:text-[var(--tertiary-custom)] duration-75", props.class]
      }, _attrs))}><a${ssrRenderAttr("href", __props.href)}><button type="button" class="flex items-center gap-2 font-roboto italic text-sm">${ssrInterpolate(__props.title)} `);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-arrow-right-alt",
        class: "text-md md:text-2xl"
      }, null, _parent));
      _push(`</button></a></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ExploreButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
