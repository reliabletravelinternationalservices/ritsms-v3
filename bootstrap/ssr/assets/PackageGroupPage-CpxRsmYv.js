import { defineComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import _sfc_main$2 from "./TitleHeader-BRiqXDNV.js";
import _sfc_main$3 from "./PackageList-DSLVO2yc.js";
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
import "./LoadMoreButton-ByEyHIZ2.js";
import "./usePackages-I3arwpQ3.js";
import "./useCurrency-Ta8J8A5v.js";
import "./api-uth6pyvr.js";
import "axios";
import "./PackageCarouselSkeleton-BTo3IMyQ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageGroupPage",
  __ssrInlineRender: true,
  props: {
    params: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              group: __props.params.group,
              isInbound: __props.params.isInbound
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              groupID: __props.params.group.id,
              isInbound: __props.params.isInbound
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                group: __props.params.group,
                isInbound: __props.params.isInbound
              }, null, 8, ["group", "isInbound"]),
              createVNode(_sfc_main$3, {
                groupID: __props.params.group.id,
                isInbound: __props.params.isInbound
              }, null, 8, ["groupID", "isInbound"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/group/PackageGroupPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
