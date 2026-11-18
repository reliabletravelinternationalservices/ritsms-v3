import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DropdownField-Dk5sot-r.js";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OutboundFilter",
  __ssrInlineRender: true,
  props: {
    countryOptions: {},
    seasonOptions: {},
    durationOptions: {},
    initialFilters: {}
  },
  emits: ["search"],
  setup(__props, { emit: __emit }) {
    var _a, _b, _c;
    const props = __props;
    const defaultFilters = {
      country: "",
      season: "",
      duration: null
    };
    const form = ref({
      country: ((_a = props.initialFilters) == null ? void 0 : _a.country) ?? defaultFilters.country,
      season: ((_b = props.initialFilters) == null ? void 0 : _b.season) ?? defaultFilters.season,
      duration: ((_c = props.initialFilters) == null ? void 0 : _c.duration) ?? defaultFilters.duration
    });
    watch(
      () => props.initialFilters,
      (next) => {
        form.value = {
          country: (next == null ? void 0 : next.country) ?? defaultFilters.country,
          season: (next == null ? void 0 : next.season) ?? defaultFilters.season,
          duration: (next == null ? void 0 : next.duration) ?? defaultFilters.duration
        };
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full relative flex" }, _attrs))}><div class="max-w-5xl m-auto w-full flex flex-col md:flex-row items-stretch md:items-end justify-start gap-6"><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"><div class="space-y-2"><span class="flex items-end text-[var(--secondary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "lucide:map-pinned",
        width: "20",
        height: "20"
      }, null, _parent));
      _push(`<label class="ml-2 text-sm font-bold uppercase tracking-wider">Country</label></span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: form.value.country,
        "onUpdate:modelValue": ($event) => form.value.country = $event,
        placeholder: "All Country",
        options: props.countryOptions
      }, null, _parent));
      _push(`</div><div class="space-y-2"><span class="flex items-end text-[var(--secondary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "lucide:calendar",
        width: "20",
        height: "20"
      }, null, _parent));
      _push(`<label class="ml-2 text-sm font-bold uppercase tracking-wider">Season</label></span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: form.value.season,
        "onUpdate:modelValue": ($event) => form.value.season = $event,
        placeholder: "All Season",
        options: props.seasonOptions
      }, null, _parent));
      _push(`</div><div class="space-y-2 sm:col-span-2 md:col-span-1"><span class="flex items-end text-[var(--secondary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "lucide:clock-4",
        width: "20",
        height: "20"
      }, null, _parent));
      _push(`<label class="ml-2 text-sm font-bold uppercase tracking-wider">Duration</label></span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: form.value.duration,
        "onUpdate:modelValue": ($event) => form.value.duration = $event,
        placeholder: "All Duration",
        options: props.durationOptions
      }, null, _parent));
      _push(`</div></div><div class="w-full md:w-auto flex flex-col sm:flex-row gap-3"><button class="w-full md:w-auto bg-[var(--outbound-custom)] text-[var(--primary-custom)] h-[50px] md:h-[44px] px-8 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--outbound-opacity-custom)] transition-all duration-200"><span class="whitespace-nowrap uppercase">Search</span>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:search",
        width: "24",
        height: "24"
      }, null, _parent));
      _push(`</button><button class="w-full md:w-auto border border-[var(--shadow-custom)] text-[var(--secondary-custom)] h-[50px] md:h-[44px] px-8 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--soft-custom)] transition-all duration-200"><span class="whitespace-nowrap uppercase">Reset</span></button></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/outbound/section/OutboundFilter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
