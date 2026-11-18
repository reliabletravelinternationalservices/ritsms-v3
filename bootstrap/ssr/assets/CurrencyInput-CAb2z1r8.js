import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1 } from "./Input-B-ZniF4D.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CurrencyInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    placeholder: { default: "e.g. 4,400.00" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formatNumber = (value) => {
      return value.toLocaleString("en-PH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    };
    const displayValue = computed({
      get() {
        if (props.modelValue === null || props.modelValue === void 0 || props.modelValue === "") {
          return "";
        }
        const num = Number(props.modelValue);
        return isNaN(num) ? "" : formatNumber(num);
      },
      set(value) {
        let cleaned = value.replace(/[^0-9.]/g, "");
        const parts = cleaned.split(".");
        if (parts.length > 2) {
          cleaned = parts[0] + "." + parts.slice(1).join("");
        }
        if (cleaned.startsWith(".")) {
          cleaned = "0" + cleaned;
        }
        const numeric = Number(cleaned);
        emit(
          "update:modelValue",
          isNaN(numeric) ? 0 : numeric
        );
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:currency-php",
        class: "text-xl"
      }, null, _parent));
      _push(`</span>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), mergeProps(_ctx.$attrs, {
        type: "text",
        inputmode: "decimal",
        class: "pl-10",
        modelValue: displayValue.value,
        "onUpdate:modelValue": ($event) => displayValue.value = $event,
        placeholder: __props.placeholder
      }), null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/CurrencyInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
