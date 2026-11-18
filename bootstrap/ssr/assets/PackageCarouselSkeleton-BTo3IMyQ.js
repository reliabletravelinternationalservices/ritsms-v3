import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { P as PackageCardSkeleton } from "./usePackages-I3arwpQ3.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageCarouselSkeleton",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(3, (n) => {
        _push(ssrRenderComponent(PackageCardSkeleton, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/skeleton/PackageCarouselSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
