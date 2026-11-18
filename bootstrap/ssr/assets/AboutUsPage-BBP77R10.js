import { defineComponent, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import { _ as _sfc_main$2, S as SECTION_DELAYS } from "./TitleHeader-CZ_f-Lyk.js";
import _sfc_main$4 from "./AgencyRating-CbDoe17K.js";
import AgencyVideo from "./AgencyVideo-Di-n7uOh.js";
import _sfc_main$5 from "./AboutAgency-vy4nG9wJ.js";
import _sfc_main$6 from "./PartnerAgency-Cx_8K46v.js";
import _sfc_main$7 from "./AgencyOffer-D6FWzpwk.js";
import _sfc_main$8 from "./InquiryForm-BQF3iMFZ.js";
import _sfc_main$9 from "./SocialMedia-DJRbQxHO.js";
import _sfc_main$a from "./AgencyFaq-Dyja7nLn.js";
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
import "./constants-D5Z3FOm2.js";
import "./ImagePreviewModal-ClUZaSKV.js";
import "embla-carousel-vue";
/* empty css                  */
import "./constants-CG928fGe.js";
import "./Label-6hRdN-Dm.js";
import "./Input-B-ZniF4D.js";
import "./Textarea-BvWBAMsq.js";
import "./InputError-BhTWS2NZ.js";
import "./AccordionTrigger-BwG7gcww.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AboutUsPage",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).rating
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
              delay: unref(SECTION_DELAYS).about
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
              delay: unref(SECTION_DELAYS).video
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(AgencyVideo, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(AgencyVideo)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).partner
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
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).offer
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
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).inquiry
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
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).social
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
            _push2(ssrRenderComponent(_sfc_main$3, {
              delay: unref(SECTION_DELAYS).faq
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
              createVNode(_sfc_main$2),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).rating
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).about
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$5)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).video
              }, {
                default: withCtx(() => [
                  createVNode(AgencyVideo)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).partner
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).offer
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$7)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).inquiry
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$8)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).social
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$9)
                ]),
                _: 1
              }, 8, ["delay"]),
              createVNode(_sfc_main$3, {
                delay: unref(SECTION_DELAYS).faq
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/about/AboutUsPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
