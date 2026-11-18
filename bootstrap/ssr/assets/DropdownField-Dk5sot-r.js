import { defineComponent, ref, computed, onMounted, onUnmounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DropdownField",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "Select an option" },
    class: { default: "" }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOpen = ref(false);
    const dropdownRef = ref(null);
    const computedOptions = computed(() => [
      { label: props.placeholder, value: null },
      ...props.options
    ]);
    const closeDropdown = (e) => {
      if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        isOpen.value = false;
      }
    };
    onMounted(() => window.addEventListener("click", closeDropdown));
    onUnmounted(() => window.removeEventListener("click", closeDropdown));
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative w-full", props.class],
        ref_key: "dropdownRef",
        ref: dropdownRef
      }, _attrs))}><button type="button" class="w-full flex items-center justify-between gap-2 px-4 py-3 bg-[var(--primary-custom)] border border-[var(--shadow-custom)] transition-all duration-200 focus:outline-none"><span class="${ssrRenderClass([__props.modelValue ? "text-black" : "text-gray-400", "text-sm font-roboto"])}">${ssrInterpolate(((_a = computedOptions.value.find((o) => o.value === __props.modelValue)) == null ? void 0 : _a.label) || __props.placeholder)}</span>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ri:arrow-down-s-line",
        class: ["text-xl transition-transform duration-200 text-[var(--shadow-custom)]", { "rotate-180": isOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isOpen.value) {
        _push(`<div class="absolute left-0 z-50 mt-1 w-full max-h-60 overflow-y-auto bg-white shadow-xl border border-gray-100"><div class="py-1"><!--[-->`);
        ssrRenderList(computedOptions.value, (option) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "w-full text-left px-4 py-3 text-sm font-roboto transition-colors",
            __props.modelValue === option.value ? "bg-[var(--tertiary-custom)] text-white" : "text-gray-700 hover:bg-gray-50"
          ])}">${ssrInterpolate(option.label)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/DropdownField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
