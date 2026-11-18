import { defineComponent, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
/* empty css                  */
import { Icon } from "@iconify/vue";
import { P as PackageCarousel } from "./PackageCarousel-DXZNkjsm.js";
import { _ as _sfc_main$1 } from "./ValidToForeignBanner-NZgPK-8j.js";
import { _ as _sfc_main$2 } from "./ExploreButton-BdXraV1Y.js";
import { V as VALID_FOR_FOREIGN_ONLY_TAG } from "./constants-D5Z3FOm2.js";
import { _ as _sfc_main$4 } from "./api-uth6pyvr.js";
import { _ as _sfc_main$3 } from "./PackageCarouselSkeleton-BTo3IMyQ.js";
import { u as usePackages } from "./usePackages-I3arwpQ3.js";
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
import "./useCurrency-Ta8J8A5v.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InboundPackageCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      packages,
      loading,
      error,
      fetchPackages,
      refresh
    } = usePackages();
    onMounted(() => {
      fetchPackages({
        isForeignOnly: true,
        perPage: 10
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[900px] py-12 px-4 md:px-6" }, _attrs))}><div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6"><div class="w-full md:w-2/3 space-y-2"><div class="flex items-end gap-1 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "icon-park-solid:local",
        width: "28",
        height: "28",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-lg md:text-xl">INBOUND TOURS</p></div><div class="space-y-3"><h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold"> Explore the Philippines&#39; Paradise Islands </h2><p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]"> Discover top inbound travel packages and domestic tours across the Philippines. See why our pristine beaches, islands, and warm hospitality make the country a top global favorite, just a flight away. </p>`);
      _push(ssrRenderComponent(_sfc_main$1, { tag: unref(VALID_FOR_FOREIGN_ONLY_TAG) }, null, _parent));
      _push(`</div></div><div class="flex justify-start md:justify-end">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        title: "Explore Inbound Tours",
        href: _ctx.route("client.inbound")
      }, null, _parent));
      _push(`</div></div><div class="w-full">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_sfc_main$4, {
          retry: unref(refresh),
          description: unref(error)
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(PackageCarousel, {
          "is-inbound": true,
          packages: unref(packages)
        }, null, _parent));
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/InboundPackageCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
