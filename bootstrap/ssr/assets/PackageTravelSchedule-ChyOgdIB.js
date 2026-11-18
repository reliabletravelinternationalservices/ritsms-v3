import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Banner-CPbdlVa7.js";
import { c as cn, b as formatCurrency, l as _export_sfc } from "../ssr.js";
import { u as useCurrency } from "./useCurrency-Ta8J8A5v.js";
import "@iconify/vue";
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
  __name: "PackageTravelSchedule",
  __ssrInlineRender: true,
  props: {
    package: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const { convertToUsd } = useCurrency();
    const props = __props;
    const showAll = ref(false);
    const allSchedules = computed(() => props.package.schedules || []);
    const hasMoreSchedules = computed(() => allSchedules.value.length > 3);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.package.schedules && __props.package.schedules.length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto relative overflow-hidden p-2 sm:p-4" }, _attrs))} data-v-c166df4e><div class="${ssrRenderClass([unref(cn)(__props.isInbound ? "bg-[var(--inbound-opacity-custom-10)]" : "bg-[var(--outbound-opacity-custom-10)]"), "max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-3 sm:p-4 rounded-lg"])}" data-v-c166df4e><h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide" data-v-c166df4e>Travel Schedule</h2><div class="w-full flex flex-col gap-2" data-v-c166df4e><ul class="space-y-3 md:space-y-2" data-v-c166df4e><!--[-->`);
        ssrRenderList(allSchedules.value, (schedule, index) => {
          _push(`<li class="${ssrRenderClass([!showAll.value && index >= 3 ? "schedule-collapsed" : "schedule-expanded", "schedule-item grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4 px-2 py-2 sm:py-0 border-b border-black/5 sm:border-none last:border-none"])}" data-v-c166df4e><p class="col-span-1 font-roboto font-bold text-sm sm:text-base flex flex-wrap items-center gap-1" data-v-c166df4e>${ssrInterpolate(new Date(schedule.departure_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))} `);
          if (schedule.is_limited) {
            _push(`<span class="text-xs sm:text-sm italic text-[var(--warning-custom)] font-roboto block sm:inline" data-v-c166df4e> /Limited Slot Only! </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><div class="col-span-1 flex justify-start sm:justify-center w-full" data-v-c166df4e>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            title: schedule.is_available ? "Available" : "Sold Out",
            class: [schedule.is_available ? "bg-[var(--correct-custom)]" : "bg-red-500", "w-auto"]
          }, null, _parent));
          _push(`</div><span class="col-span-1 font-roboto font-bold text-[var(--warning-custom)] text-left sm:text-end text-sm sm:text-base" data-v-c166df4e>${ssrInterpolate(unref(formatCurrency)(__props.isInbound ? unref(convertToUsd)(schedule.price) : schedule.price, props.isInbound ? "USD" : "PHP"))}/pax </span></li>`);
        });
        _push(`<!--]--></ul>`);
        if (hasMoreSchedules.value) {
          _push(`<span class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer self-start mt-1" role="button"${ssrRenderAttr("aria-expanded", showAll.value)} data-v-c166df4e>${ssrInterpolate(showAll.value ? "Hide all" : "Show more...")}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageTravelSchedule.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PackageTravelSchedule = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c166df4e"]]);
export {
  PackageTravelSchedule as default
};
