import { defineComponent, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
/* empty css                  */
import { Icon } from "@iconify/vue";
import { C as CountryCarousel } from "./CountryCarousel-BlLN6blv.js";
import { _ as _sfc_main$1 } from "./ExploreButton-BdXraV1Y.js";
import { u as useCountry } from "./useCountries-D7vd-3mA.js";
import { _ as _sfc_main$2 } from "./CountryCarouselSkeleton-D3n6tthg.js";
import { _ as _sfc_main$3 } from "./api-uth6pyvr.js";
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
  __name: "DestinationCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      countries,
      loading,
      error,
      fetchCountries,
      refresh
    } = useCountry();
    onMounted(() => {
      fetchCountries({
        perPage: 10
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "destinations",
        class: "relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[1100px] py-12 px-4 md:px-6"
      }, _attrs))}><div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6"><div class="w-full md:w-2/3 space-y-2"><div class="flex items-end gap-1 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:compass",
        width: "28",
        height: "28",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-lg md:text-xl">FEATURED DESTINATIONS</p></div><div class="space-y-3"><h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold"> Explore Top Travel Destinations Worldwide </h2><p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]"> Adventure awaits in every corner of the world. Discover breathtaking views, vibrant cultures, and top-rated travel destinations curated by our travel agency. </p></div></div><div class="flex justify-start md:justify-end">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Explore Destinations",
        href: _ctx.route("client.destination")
      }, null, _parent));
      _push(`</div></div><div class="w-full">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_sfc_main$3, {
          retry: () => unref(refresh)({ perPage: 10 }),
          description: unref(error)
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(CountryCarousel, { countries: unref(countries) }, null, _parent));
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/DestinationCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
