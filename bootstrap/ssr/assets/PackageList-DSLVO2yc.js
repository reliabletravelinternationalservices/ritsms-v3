import { defineComponent, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./LoadMoreButton-ByEyHIZ2.js";
import { u as usePackages, _ as _sfc_main$3 } from "./usePackages-I3arwpQ3.js";
import { _ as _sfc_main$2 } from "./api-uth6pyvr.js";
import { _ as _sfc_main$1 } from "./PackageCarouselSkeleton-BTo3IMyQ.js";
import "@iconify/vue";
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
import "./useCurrency-Ta8J8A5v.js";
import "axios";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageList",
  __ssrInlineRender: true,
  props: {
    groupID: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { packages, fetchPackages, loading, loadingMore, loadMore, isLastPage, error } = usePackages();
    onMounted(() => {
      fetchPackages({
        page: 1,
        perPage: 6,
        groupID: props.groupID
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex w-full flex-col justify-center py-6" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="mx-auto flex flex-col w-full max-w-5xl justify-center py-8 gap-6"><!--[-->`);
        ssrRenderList(2, (i) => {
          _push(ssrRenderComponent(_sfc_main$1, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(ssrRenderComponent(_sfc_main$2, {
          description: unref(error),
          retry: unref(fetchPackages)
        }, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(packages).length) {
          _push(`<div class="mx-auto grid max-w-5xl grid-cols-1 gap-12 py-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3"><!--[-->`);
          ssrRenderList(unref(packages), (pkg) => {
            _push(ssrRenderComponent(_sfc_main$3, {
              key: pkg.id,
              package: pkg,
              isInbound: __props.isInbound
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="py-20 text-center text-slate-500">No packages found.</div>`);
        }
        if (unref(loadingMore)) {
          _push(`<div class="flex w-full justify-center py-8">`);
          _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
          _push(`</div>`);
        } else if (unref(packages).length && !unref(isLastPage)) {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/group/section/PackageList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
