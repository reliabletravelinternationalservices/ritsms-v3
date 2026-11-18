import { defineComponent, useModel, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$2 } from "../ssr.js";
import { EyeOff, Eye } from "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PasswordInput",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    const showPassword = ref(false);
    const toggleVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full flex items-center" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), mergeProps({
        type: showPassword.value ? "text" : "password",
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event
      }, _ctx.$attrs, { class: "pr-10" }), null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        type: "button",
        variant: "ghost",
        size: "sm",
        class: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground",
        onClick: toggleVisibility
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (showPassword.value) {
              _push2(ssrRenderComponent(unref(EyeOff), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Eye), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
            _push2(`<span class="sr-only"${_scopeId}>${ssrInterpolate(showPassword.value ? "Hide password" : "Show password")}</span>`);
          } else {
            return [
              showPassword.value ? (openBlock(), createBlock(unref(EyeOff), {
                key: 0,
                class: "h-4 w-4",
                "aria-hidden": "true"
              })) : (openBlock(), createBlock(unref(Eye), {
                key: 1,
                class: "h-4 w-4",
                "aria-hidden": "true"
              })),
              createVNode("span", { class: "sr-only" }, toDisplayString(showPassword.value ? "Hide password" : "Show password"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/PasswordInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
