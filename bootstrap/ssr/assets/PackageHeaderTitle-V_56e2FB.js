import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { d as getSeasonColor, b as formatCurrency } from "../ssr.js";
import { Star, MapPin } from "lucide-vue-next";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageHeaderTitle",
  __ssrInlineRender: true,
  props: {
    package: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 dark:border-zinc-800" }, _attrs))}><div><div class="flex flex-wrap items-center gap-2 mb-2">`);
      if (__props.package.is_featured) {
        _push(`<span class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400">`);
        _push(ssrRenderComponent(unref(Star), { class: "w-3 h-3 fill-current" }, null, _parent));
        _push(` Featured </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.package.is_foreign_only) {
        _push(`<span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"> Foreigners Only </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass(["text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize", unref(getSeasonColor)(__props.package.season)])}">${ssrInterpolate(__props.package.season)}</span>`);
      if (__props.package.tag) {
        _push(`<span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">${ssrInterpolate(__props.package.tag)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">${ssrInterpolate(__props.package.name)}</h1><p class="flex items-center gap-1.5 text-sm text-zinc-500 mt-2 dark:text-zinc-400">`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-4 h-4" }, null, _parent));
      _push(` ${ssrInterpolate(__props.package.destination)}</p></div><div class="bg-zinc-50 p-4 rounded-xl border flex items-center gap-6 dark:bg-zinc-900 dark:border-zinc-800"><div><p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Base Price</p><p class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">${ssrInterpolate(unref(formatCurrency)(Number(__props.package.base_price), "PHP", 2))}</p></div><div class="border-l pl-6 dark:border-zinc-800"><p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Down Payment</p>`);
      if (__props.package.down_payment && __props.package.down_payment > 0) {
        _push(`<p class="text-lg font-semibold text-zinc-700 dark:text-zinc-300">${ssrInterpolate(unref(formatCurrency)(Number(__props.package.down_payment), "PHP", 2))}</p>`);
      } else {
        _push(`<p class="text-lg font-semibold text-zinc-700 dark:text-zinc-300">N/A</p>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/section/PackageHeaderTitle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
