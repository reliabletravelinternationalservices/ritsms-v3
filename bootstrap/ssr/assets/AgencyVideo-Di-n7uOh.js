import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { l as _export_sfc } from "../ssr.js";
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
import "@iconify/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="text-center max-w-3xl mx-auto px-4"><h2 class="text-2xl md:text-3xl font-bold text-[var(--tertiary-custom)]">Behind Our Stories</h2><p class="mt-3 text-sm md:text-base text-[var(--muted-custom)]"> Learn more about Reliable International Travel Services through our featured videos. Discover our journey, meet our team, and see how we help travelers create unforgettable experiences around the world. </p></div><div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-8"><div class="flex flex-col gap-2 w-full max-w-[315px] mx-auto"><div class="w-full aspect-[9/16]"><iframe class="w-full h-full rounded-lg" src="https://www.youtube.com/embed/G6Sag2iQt8k" title="TOP REVENUE PARTNER: A Milestone for Reliable International Travel Services! 🏆✨" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></div><div class="flex flex-col gap-2 w-full max-w-[315px] mx-auto"><div class="w-full aspect-[9/16]"><iframe class="w-full h-full rounded-lg" src="https://www.youtube.com/embed/lbOasvp3PEU" title="Reliable International Travel Services: 17 Years of Excellence &amp; Reliability #reliableservice" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></div><div class="flex flex-col gap-2 w-full max-w-[315px] mx-auto sm:col-span-2 lg:col-span-1"><div class="w-full aspect-[9/16]"><iframe class="w-full h-full rounded-lg" src="https://www.youtube.com/embed/d5Pj-aGjvHQ" title="🙏 Thank You to All Our Clients ✈️ For the Amazing Journeys &amp; Unforgettable Travel Experiences 🌍" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></div></div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/about/section/AgencyVideo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AgencyVideo = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AgencyVideo as default
};
