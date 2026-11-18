import { defineComponent, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import { _ as _sfc_main$2 } from "./MotionWrapper-DwlQ79CS.js";
import CarouselSection from "./ImageCarousel-WGRTy9ZH.js";
import _sfc_main$3 from "./DestinationCarousel-BRaiFNnL.js";
import _sfc_main$4 from "./InboundPackageCarousel-DpOjBE9B.js";
import _sfc_main$5 from "./OutboundPackageCarousel-CIU6sGf6.js";
import _sfc_main$6 from "./AgencyServices-CYrsPMuo.js";
import _sfc_main$7 from "./AboutAgency-rUqOgpWB.js";
import _sfc_main$8 from "./PartnerAgency-Cx_8K46v.js";
import _sfc_main$9 from "./InquiryForm-BQF3iMFZ.js";
import _sfc_main$a from "./ClientFeedback-DSVhMGsS.js";
import { L as LANDING_DELAYS } from "./constants-D5Z3FOm2.js";
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
import "vue3-carousel";
import "./CountryCarousel-BlLN6blv.js";
import "./CountryCarouselSkeleton-D3n6tthg.js";
import "./ExploreButton-BdXraV1Y.js";
import "./useCountries-D7vd-3mA.js";
import "./api-uth6pyvr.js";
import "axios";
import "./PackageCarousel-DXZNkjsm.js";
import "./usePackages-I3arwpQ3.js";
import "./useCurrency-Ta8J8A5v.js";
import "./ValidToForeignBanner-NZgPK-8j.js";
import "./PackageCarouselSkeleton-BTo3IMyQ.js";
import "./Label-6hRdN-Dm.js";
import "./Input-B-ZniF4D.js";
import "./Textarea-BvWBAMsq.js";
import "./InputError-BhTWS2NZ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LandingPage",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CarouselSection, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).destinationSection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).inboundSection
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).outboundSection
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).servicesSection
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).aboutSection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$7)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).partnerSection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$8, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$8)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).inquirySection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$9, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$9)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              delay: unref(LANDING_DELAYS).feedbackSection
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$a, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$a)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CarouselSection),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).destinationSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).inboundSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).outboundSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$5)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).servicesSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).aboutSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$7)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).partnerSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$8)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).inquirySection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$9)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$2, {
                delay: unref(LANDING_DELAYS).feedbackSection
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$a)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/LandingPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
