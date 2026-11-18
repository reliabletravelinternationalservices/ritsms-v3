import { defineComponent, ref, watchEffect, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { useIntersectionObserver } from "@vueuse/core";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MotionWrapper",
  __ssrInlineRender: true,
  props: {
    threshold: { type: Number, default: 0.15 },
    delay: { type: Number, default: 0 }
  },
  setup(__props) {
    const props = __props;
    const el = ref(null);
    const visible = ref(false);
    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) visible.value = true;
      },
      { threshold: props.threshold }
    );
    watchEffect(() => {
      if (el.value) {
        const node = el.value;
        node.style.transition = `opacity 0.65s ${props.delay}s cubic-bezier(0.22,1,0.36,1), transform 0.65s ${props.delay}s cubic-bezier(0.22,1,0.36,1)`;
        node.style.opacity = visible.value ? "1" : "0";
        node.style.transform = visible.value ? "translateY(0px)" : "translateY(20px)";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        style: { "opacity": "0", "transform": "translateY(20px)", "will-change": "transform, opacity" }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/MotionWrapper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
