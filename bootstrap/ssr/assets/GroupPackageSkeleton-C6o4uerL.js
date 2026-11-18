import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./ExploreButton-BdXraV1Y.js";
import { P as PackageCarousel } from "./PackageCarousel-DXZNkjsm.js";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$2 } from "./ValidToForeignBanner-NZgPK-8j.js";
import { P as PackageCardSkeleton } from "./usePackages-I3arwpQ3.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GroupPackage",
  __ssrInlineRender: true,
  props: {
    group: {},
    href: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const {
      title,
      description,
      packages,
      is_featured,
      tag
    } = props.group;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-col items-start gap-4 py-12", unref(is_featured) ? "border-b border-[var(--shadow-custom)]" : ""]
      }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full"><div class="flex flex-col items-start gap-1 w-full sm:max-w-[70%] min-w-0">`);
      if (unref(is_featured)) {
        _push(`<p class="flex items-center gap-1 text-[var(--tertiary-custom)]">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "solar:pin-bold",
          width: "24",
          height: "24",
          class: "shrink-0",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<span class="font-bold font-roboto text-md md:text-lg uppercase">FEATURED TOURS</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="font-bold font-montserrat text-lg sm:text-xl md:text-2xl uppercase leading-snug line-clamp-2 break-words w-full">${ssrInterpolate(unref(title))}</h2>`);
      if (unref(description)) {
        _push(`<p class="font-roboto text-sm md:text-base line-clamp-2 break-words w-full">${ssrInterpolate(unref(description))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(tag)) {
        _push(ssrRenderComponent(_sfc_main$2, { tag: unref(tag) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.href) {
        _push(`<span class="shrink-0 w-[110px] sm:w-auto">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          title: "Explore More",
          href: __props.href,
          class: "w-[110px] sm:w-auto"
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full">`);
      if (unref(packages)) {
        _push(ssrRenderComponent(PackageCarousel, {
          packages: unref(packages) ?? [],
          "is-inbound": __props.isInbound
        }, null, _parent));
      } else {
        _push(`<span class="flex flex-col items-center justify-center gap-2 w-full h-24 bg-[var(--outbound-opacity-custom-10)] rounded-lg"><span class="flex items-center justify-center rounded-full bg-[var(--primary-custom)] text-white w-12 h-12">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "material-symbols:search-rounded",
          width: "24",
          height: "24",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</span><p class="font-bold text-sm uppercase tracking-[0.08em] text-[var(--primary-custom)]">No packages found </p><p class="font-roboto text-sm text-[var(--muted-custom)] text-center">This package group has no packages matching the selected filter.</p></span>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/GroupPackage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GroupPackageSkeleton",
  __ssrInlineRender: true,
  props: {
    cards: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full animate-pulse" }, _attrs))}><div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div class="space-y-3"><div class="h-9 w-80 rounded bg-gray-300"></div><div class="h-5 w-96 max-w-full rounded bg-gray-200"></div><div class="h-8 w-32 rounded bg-gray-300"></div></div><div class="mt-2 lg:mt-4"><div class="h-5 w-36 rounded bg-gray-300"></div></div></div><div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
      ssrRenderList(__props.cards ?? 3, (n) => {
        _push(ssrRenderComponent(PackageCardSkeleton, { key: n }, null, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/skeleton/GroupPackageSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
