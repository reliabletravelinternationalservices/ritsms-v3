import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$1 } from "./Switch-C_HW8oQD.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SwitchWithLabel",
  __ssrInlineRender: true,
  props: {
    label: {},
    isChecked: { type: Boolean }
  },
  emits: ["update:isChecked", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function handleChange(value) {
      emit("update:isChecked", value);
      emit("change", value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center space-x-2" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "airplane-mode",
        modelValue: props.isChecked,
        "onUpdate:modelValue": handleChange
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { for: "airplane-mode" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SwitchWithLabel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
