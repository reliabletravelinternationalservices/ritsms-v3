import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { c as cn, l as _export_sfc } from "../ssr.js";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "lucide-vue-next";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageHighlight",
  __ssrInlineRender: true,
  props: {
    package: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const showAll = ref(false);
    const allHighlights = computed(() => props.package.highlights_array || []);
    const hasMoreHighlights = computed(() => allHighlights.value.length > 5);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto relative overflow-hidden p-2 sm:p-4" }, _attrs))} data-v-04f9a07e><div class="${ssrRenderClass([unref(cn)(__props.isInbound ? "border-[var(--inbound-custom)]" : "border-[var(--outbound-custom)]"), "max-w-5xl mx-auto w-full flex flex-col justify-start gap-2 p-4 border rounded-sm"])}" data-v-04f9a07e><h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide" data-v-04f9a07e>Highlights</h2><div class="w-full flex flex-col gap-1" data-v-04f9a07e><ul class="flex flex-col" data-v-04f9a07e><!--[-->`);
      ssrRenderList(allHighlights.value, (data, index) => {
        _push(`<li class="${ssrRenderClass([!showAll.value && index >= 5 ? "highlight-collapsed" : "highlight-expanded", "highlight-item flex items-start gap-2 text-xs sm:text-sm md:text-base min-w-0"])}" data-v-04f9a07e>`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "material-symbols:check",
          class: ["text-xl md:text-2xl shrink-0 mt-0.5", unref(cn)(__props.isInbound ? "text-[var(--inbound-custom)]" : "text-[var(--outbound-custom)]")],
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<p class="whitespace-pre-line break-words leading-relaxed w-full text-neutral-800" data-v-04f9a07e>${ssrInterpolate(data)}</p></li>`);
      });
      _push(`<!--]--></ul>`);
      if (hasMoreHighlights.value) {
        _push(`<div class="mt-2 pt-1" data-v-04f9a07e><span class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer hover:text-[var(--outbound-custom)] transition-colors select-none" role="button"${ssrRenderAttr("aria-expanded", showAll.value)} data-v-04f9a07e>${ssrInterpolate(showAll.value ? "Show less" : "Show more...")}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageHighlight.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PackageHighlight = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-04f9a07e"]]);
export {
  PackageHighlight as default
};
