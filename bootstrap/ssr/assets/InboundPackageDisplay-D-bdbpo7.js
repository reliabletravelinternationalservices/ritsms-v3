import { defineComponent, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./GroupPackageSkeleton-C6o4uerL.js";
import { _ as _sfc_main$4 } from "./LoadMoreButton-ByEyHIZ2.js";
import { _ as _sfc_main$2 } from "./api-uth6pyvr.js";
import { a as useGroupPackages } from "./usePackages-I3arwpQ3.js";
import "./ExploreButton-BdXraV1Y.js";
import "@iconify/vue";
import "./PackageCarousel-DXZNkjsm.js";
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
import "./ValidToForeignBanner-NZgPK-8j.js";
import "axios";
import "./useCurrency-Ta8J8A5v.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InboundPackageDisplay",
  __ssrInlineRender: true,
  setup(__props) {
    const { groupedPackages, fetchGroupPackages, loading, loadingMore, loadMore, isLastPage, error } = useGroupPackages();
    onMounted(() => {
      fetchGroupPackages({
        isInbound: true,
        perPage: 3,
        page: 1
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "inbound-package-display",
        class: "w-full px-4 sm:px-6 lg:px-8"
      }, _attrs))}><div class="mx-auto max-w-5xl py-6 md:py-10">`);
      if (unref(loading)) {
        _push(`<div class="flex flex-col gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(2, (n) => {
          _push(ssrRenderComponent(_sfc_main$1, { key: n }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(ssrRenderComponent(_sfc_main$2, {
          description: unref(error),
          retry: unref(fetchGroupPackages)
        }, null, _parent));
      } else {
        _push(`<div class="flex flex-col gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(unref(groupedPackages), (group) => {
          _push(ssrRenderComponent(_sfc_main$3, {
            key: group.id,
            group,
            isInbound: true,
            href: _ctx.route("client.inbound.group", { slug: group.slug })
          }, null, _parent));
        });
        _push(`<!--]-->`);
        if (unref(loadingMore)) {
          _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
        } else if (unref(groupedPackages).length && !unref(isLastPage)) {
          _push(ssrRenderComponent(_sfc_main$4, {
            loading: unref(loadingMore),
            onClick: unref(loadMore)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/inbound/section/InboundPackageDisplay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
