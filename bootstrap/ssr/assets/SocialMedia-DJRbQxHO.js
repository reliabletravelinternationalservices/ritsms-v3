import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { b as AGENCY_SOCIAL_MEDIA } from "./constants-CG928fGe.js";
import "../ssr.js";
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
  __name: "SocialMedia",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-12 md:py-24 w-full bg-black/5 px-4 md:px-6" }, _attrs))}><div class="max-w-5xl w-full"><div class="w-full flex flex-col items-center gap-10 md:gap-14"><div class="flex flex-col items-center text-center space-y-4 max-w-3xl"><div class="space-y-3"><h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase leading-tight"> Connect with Us on Social Media </h2><p class="text-sm md:text-base font-roboto text-[var(--muted-custom)] max-w-xl mx-auto px-2"> Follow us on our social media channels to stay updated with the latest news, offers, and travel inspiration. </p></div></div><div class="grid grid-cols-1 sm:grid-cols-4 gap-6 md:gap-8 w-full max-w-md sm:max-w-none"><a${ssrRenderAttr("href", unref(AGENCY_SOCIAL_MEDIA).facebook.link)} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_SOCIAL_MEDIA).facebook.icon,
        class: "text-5xl text-[var(--secondary-custom)] group-hover:text-[#1877F2] transition-colors",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">${ssrInterpolate(unref(AGENCY_SOCIAL_MEDIA).facebook.label)}</p></a><a${ssrRenderAttr("href", unref(AGENCY_SOCIAL_MEDIA).instagram.link)} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_SOCIAL_MEDIA).instagram.icon,
        class: "text-5xl text-[var(--secondary-custom)] group-hover:text-[#E4405F] transition-colors",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">${ssrInterpolate(unref(AGENCY_SOCIAL_MEDIA).instagram.label)}</p></a><a${ssrRenderAttr("href", unref(AGENCY_SOCIAL_MEDIA).tiktok.link)} target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok page" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_SOCIAL_MEDIA).tiktok.icon,
        class: "text-5xl text-[var(--secondary-custom)] group-hover:text-black transition-colors",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">${ssrInterpolate(unref(AGENCY_SOCIAL_MEDIA).tiktok.label)}</p></a><a${ssrRenderAttr("href", unref(AGENCY_SOCIAL_MEDIA).youtube.link)} target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_SOCIAL_MEDIA).youtube.icon,
        class: "text-5xl text-[var(--secondary-custom)] group-hover:text-red-600 transition-colors",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">${ssrInterpolate(unref(AGENCY_SOCIAL_MEDIA).youtube.label)}</p></a></div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/contact/section/SocialMedia.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
