import { defineComponent, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import _sfc_main$4 from "./DestinationCarousel-C5M3j_-H.js";
import { _ as _sfc_main$2, S as SECTION_DELAYS } from "./TitleHeader-CvDpBPVq.js";
import _sfc_main$5 from "./FeaturedInboundPackage-C42nACFj.js";
import _sfc_main$6 from "./FeaturedOutboundPackage-TYARnQUq.js";
import { _ as _sfc_main$3 } from "./MotionWrapper-DwlQ79CS.js";
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
/* empty css                  */
import "./CountryCarousel-BlLN6blv.js";
import "vue3-carousel";
import "./CountryCarouselSkeleton-D3n6tthg.js";
import "./ExploreButton-BdXraV1Y.js";
import "./useCountries-D7vd-3mA.js";
import "./api-uth6pyvr.js";
import "axios";
import "./CountryLocationImageSkeleton-BXGhhXJo.js";
import "./ValidToForeignBanner-NZgPK-8j.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DestinationPage",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).destinationSection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).inboundSection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$5)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).outboundSection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$6, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$6)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).destinationSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).inboundSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$5)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).outboundSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              }, 8, ["delay"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/destination/DestinationPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
