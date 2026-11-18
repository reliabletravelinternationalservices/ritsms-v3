import { defineComponent, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import _sfc_main$2 from "./TitleHeader-DcGdV3d3.js";
import _sfc_main$3 from "./DestinationList-bsiaO63F.js";
import { m as getImageUrl } from "../ssr.js";
import "@iconify/vue";
import "@headlessui/vue";
import "ziggy-js";
import "./AppLogoIcon-B2fdtLWF.js";
import "@inertiajs/vue3";
import "./CountryCarouselSkeleton-D3n6tthg.js";
import "./LoadMoreButton-ByEyHIZ2.js";
import "./api-uth6pyvr.js";
import "axios";
import "./useCountries-D7vd-3mA.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "lucide-vue-next";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServiceCountryPage",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Countries And Destinations",
              description: "We included all the countries that included in our services and currently expanding for more tourist destinations",
              image: unref(getImageUrl)("upload/agency/outbound_image.png")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: "Countries And Destinations",
                description: "We included all the countries that included in our services and currently expanding for more tourist destinations",
                image: unref(getImageUrl)("upload/agency/outbound_image.png")
              }, null, 8, ["image"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/country/ServiceCountryPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
