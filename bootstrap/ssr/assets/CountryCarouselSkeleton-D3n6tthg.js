import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { m as getImageUrl, l as _export_sfc } from "../ssr.js";
import { Icon } from "@iconify/vue";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CountryCard",
  __ssrInlineRender: true,
  props: {
    country: {},
    href: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.href,
        class: "group block w-full overflow-hidden",
        "aria-label": `Explore travel destinations in ${__props.country.country}`
      }, _attrs))}><div class="relative h-[400px] w-full overflow-hidden md:h-[500px]">`);
      if (__props.country.image) {
        _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(__props.country.image.file_path))}${ssrRenderAttr("alt", __props.country.image.alt_text || `${__props.country.country} travel destination`)} loading="lazy" class="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-75">`);
      } else {
        _push(`<div class="flex h-full w-full items-center justify-center bg-gray-200">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:image-off",
          width: "48",
          height: "48",
          class: "text-gray-400"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="absolute inset-0 flex items-end bg-black/40 p-6 transition-all duration-300 group-hover:bg-black/55 md:p-8">`);
      if (__props.country.tag) {
        _push(`<span class="absolute right-4 top-4 bg-black/40 px-3 py-1 text-xs text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--tertiary-custom)] group-hover:text-black md:text-sm">${ssrInterpolate(__props.country.tag)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="border-l-4 border-[var(--tertiary-custom)] pl-2 transition-all duration-300 group-hover:translate-x-1"><div class="flex justify-start items-center gap-1"><span><h3 class="font-montserrat text-lg font-bold text-[var(--tertiary-custom)] transition-colors duration-300 group-hover:text-white">${ssrInterpolate(__props.country.country)}</h3>`);
      if (__props.country.locations_count > 0) {
        _push(`<p class="font-roboto text-sm text-[var(--primary-custom)] transition-colors duration-300 group-hover:text-white">${ssrInterpolate(__props.country.locations_count)} Destinations </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></div></div></div></div></a>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/carousel/country/CountryCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-[420px] overflow-hidden rounded-xl bg-gray-200 animate-pulse" }, _attrs))}><div class="absolute inset-0 bg-gray-300"></div><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div><div class="absolute bottom-5 left-5 right-5"><div class="flex items-center gap-2 mb-2"><div class="w-5 h-5 rounded-full bg-gray-400"></div><div class="h-5 w-28 rounded bg-gray-400"></div></div><div class="flex items-center gap-3"><div class="w-[2px] h-8 bg-gray-400"></div><div class="h-4 w-24 rounded bg-gray-400"></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/skeleton/DestinationCardSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DestinationCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CountryCarouselSkeleton",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(3, (n) => {
        _push(ssrRenderComponent(DestinationCardSkeleton, {
          key: n,
          class: {
            "hidden md:block": n > 1
          }
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/skeleton/CountryCarouselSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$2 as a
};
