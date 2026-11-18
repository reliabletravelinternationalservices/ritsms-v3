import { defineComponent, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./CountryCarouselSkeleton-D3n6tthg.js";
import { _ as _sfc_main$4 } from "./LoadMoreButton-ByEyHIZ2.js";
import { _ as _sfc_main$2 } from "./api-uth6pyvr.js";
import { u as useCountry } from "./useCountries-D7vd-3mA.js";
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
import "@iconify/vue";
import "axios";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DestinationList",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      countries,
      isLastPage,
      lastFilters,
      loading,
      loadingMore,
      error,
      fetchCountries,
      refresh,
      loadMore
    } = useCountry();
    onMounted(() => {
      fetchCountries({
        page: 1,
        perPage: 6
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full px-4 py-12 sm:px-6 lg:px-8" }, _attrs))}>`);
      if (unref(loading) && !unref(countries).length) {
        _push(`<div><!--[-->`);
        ssrRenderList(2, (n) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: n,
            class: "mx-auto flex w-full max-w-5xl items-center justify-center p-6"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "w-full p-6",
          description: unref(error),
          retry: () => unref(refresh)({ ...unref(lastFilters) })
        }, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(countries).length) {
          _push(`<div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
          ssrRenderList(unref(countries), (country) => {
            _push(ssrRenderComponent(_sfc_main$3, {
              key: country.id,
              country,
              href: _ctx.route("client.destination.country", { slug: country.slug })
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(loadingMore)) {
          _push(ssrRenderComponent(_sfc_main$1, { class: "mx-auto flex w-full max-w-5xl items-center justify-center p-6" }, null, _parent));
        } else if (unref(countries).length && !unref(isLastPage)) {
          _push(ssrRenderComponent(_sfc_main$4, {
            loading: unref(loadingMore),
            onClick: unref(loadMore)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/country/section/DestinationList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
