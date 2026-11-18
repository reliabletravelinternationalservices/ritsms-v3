import { defineComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import _sfc_main$2 from "./InboundTitleHeader-UNK5-e8M.js";
import _sfc_main$3 from "./InboundPackageDisplay-D-bdbpo7.js";
import "@iconify/vue";
import "@headlessui/vue";
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
import "ziggy-js";
import "./AppLogoIcon-B2fdtLWF.js";
import "./DestinationDropdownBreadcrumb-Ba7auldd.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./GroupPackageSkeleton-C6o4uerL.js";
import "./ExploreButton-BdXraV1Y.js";
import "./PackageCarousel-DXZNkjsm.js";
/* empty css                  */
import "vue3-carousel";
import "./usePackages-I3arwpQ3.js";
import "./useCurrency-Ta8J8A5v.js";
import "./api-uth6pyvr.js";
import "axios";
import "./ValidToForeignBanner-NZgPK-8j.js";
import "./LoadMoreButton-ByEyHIZ2.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InboundPage",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2),
              createVNode(_sfc_main$3)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/inbound/InboundPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
