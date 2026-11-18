import { defineComponent, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ExploreButton-BdXraV1Y.js";
import { C as CountryLocationImageSkeleton, _ as _sfc_main$4 } from "./CountryLocationImageSkeleton-BXGhhXJo.js";
import { _ as _sfc_main$1 } from "./ValidToForeignBanner-NZgPK-8j.js";
import { Icon } from "@iconify/vue";
import { u as useCountry } from "./useCountries-D7vd-3mA.js";
import { _ as _sfc_main$3 } from "./api-uth6pyvr.js";
/* empty css                  */
import "vue3-carousel";
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
import "axios";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FeaturedInboundPackage",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      countries,
      loading,
      loaded,
      error,
      fetchCountries,
      refresh
    } = useCountry();
    onMounted(() => {
      fetchCountries({
        countryName: "Philippines",
        with: { locations: true },
        perPage: 10
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative flex overflow-hidden flex-col gap-4 items-center justify-center min-h-[100vh] md:min-h-[700px] lg:min-h-[900px] py-10 md:py-12 px-4 md:px-6 bg-[var(--inbound-custom)] w-full" }, _attrs))}><div class="w-full max-w-5xl mx-auto relative z-10 flex flex-col gap-6 md:gap-4 items-center justify-center py-10 md:py-16"><div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-6"><div class="w-full md:w-2/3 space-y-3 md:space-y-2"><div class="flex items-end gap-1 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "boxicons:plane-land-filled",
        width: "26",
        height: "26",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-base sm:text-lg md:text-xl leading-tight"> INBOUND DESTINATIONS </p></div><div class="space-y-3 md:space-y-3"><h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-custom)] uppercase font-montserrat font-bold leading-snug md:leading-tight"> Explore Local Destinations in the Philippines </h2><p class="font-roboto text-sm md:text-base text-[var(--primary-custom)] leading-relaxed"> Crystal clear waters, majestic cliffs, and endless sunshine. Your ultimate Philippine adventure starts right here. </p>`);
      _push(ssrRenderComponent(_sfc_main$1, { tag: "VALID FOR FOREIGN TOURISTS ONLY" }, null, _parent));
      _push(`</div></div><div class="flex justify-start md:justify-end w-full md:w-auto">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        title: "Explore Inbound Destinations",
        href: unref(countries)[0] ? _ctx.route("client.destination.country", { slug: unref(countries)[0].slug }) : "#",
        class: "font-bold text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] border-[var(--primary-custom)] hover:border-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`</div></div><div class="w-full">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(CountryLocationImageSkeleton, null, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_sfc_main$3, {
          retry: unref(refresh),
          description: unref(error)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(loaded)) {
        _push(ssrRenderComponent(_sfc_main$4, { countries: unref(countries) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><span class="absolute top-5 left-2 -rotate-45 z-0 pointer-events-none opacity-10" aria-hidden="true">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:location",
        class: "w-24 h-24 sm:w-40 sm:h-40 md:w-96 md:h-96 text-[var(--shadow-custom)]"
      }, null, _parent));
      _push(`</span><span class="absolute -bottom-20 -right-20 -rotate-45 z-0 pointer-events-none opacity-10" aria-hidden="true">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols-light:globe",
        class: "w-24 h-24 sm:w-40 sm:h-40 md:w-96 md:h-96 text-[var(--shadow-custom)]"
      }, null, _parent));
      _push(`</span></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/destination/section/FeaturedInboundPackage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
