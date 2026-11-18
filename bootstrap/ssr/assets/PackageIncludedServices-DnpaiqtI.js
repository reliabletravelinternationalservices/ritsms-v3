import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageIncludedServices",
  __ssrInlineRender: true,
  props: {
    package: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full relative overflow-hidden px-4 py-2" }, _attrs))}><div class="max-w-5xl mx-auto w-full flex items-center justify-between gap-4"><div class="flex items-center flex-wrap gap-2 sm:gap-3 w-full"><div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-3 py-1.5 shrink-0"><span class="flex items-center text-xs md:text-sm font-roboto gap-1 select-none">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:twotone-flight",
        class: "text-xl shrink-0"
      }, null, _parent));
      _push(`<span>Flights</span></span></div><div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-4 py-1.5 shrink-0"><span class="flex items-center text-xs md:text-sm font-roboto gap-1 select-none">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mingcute:hotel-fill",
        class: "text-xl shrink-0"
      }, null, _parent));
      _push(`<span>Hotels</span></span></div><div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-4 py-1.5 shrink-0"><span class="flex items-center text-xs md:text-sm font-roboto gap-1 select-none">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "lsicon:leaf-filled",
        class: "text-xl shrink-0"
      }, null, _parent));
      _push(`<span>Seasons</span></span></div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageIncludedServices.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
