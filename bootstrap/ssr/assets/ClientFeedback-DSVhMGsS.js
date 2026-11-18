import { defineComponent, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderAttrs } from "vue/server-renderer";
/* empty css                  */
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { Icon } from "@iconify/vue";
import { l as _export_sfc } from "../ssr.js";
import { c as CLIENT_FEEDBACK } from "./constants-D5Z3FOm2.js";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ClientFeedbackCarousel",
  __ssrInlineRender: true,
  props: {
    feedbacks: {}
  },
  setup(__props) {
    const carouselConfig = {
      itemsToShow: 1,
      itemsToScroll: 1,
      gap: 10,
      clamp: true,
      mouseDrag: true,
      breakpoints: {
        // Tablet
        768: {
          itemsToShow: 2,
          itemsToScroll: 1,
          gap: 10
        },
        // Desktop
        1024: {
          itemsToShow: 3.1,
          itemsToScroll: 2,
          gap: 15,
          mouseDrag: false
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Carousel), mergeProps(carouselConfig, { class: "w-full" }, _attrs), {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), { class: "hidden md:block" }, {
              prev: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100" data-v-97587d2a${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-left",
                    width: "24",
                    height: "24",
                    class: "text-white"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-left",
                        width: "24",
                        height: "24",
                        class: "text-white"
                      })
                    ])
                  ];
                }
              }),
              next: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100" data-v-97587d2a${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-right",
                    width: "24",
                    height: "24",
                    class: "text-white"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-right",
                        width: "24",
                        height: "24",
                        class: "text-white"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Navigation), { class: "hidden md:block" }, {
                prev: withCtx(() => [
                  createVNode("div", { class: "h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-left",
                      width: "24",
                      height: "24",
                      class: "text-white"
                    })
                  ])
                ]),
                next: withCtx(() => [
                  createVNode("div", { class: "h-[400px] w-full bg-black/10 hover:bg-black/30 flex items-center justify-center duration-100" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-right",
                      width: "24",
                      height: "24",
                      class: "text-white"
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.feedbacks, (feedback) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: feedback.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="carousel__item h-[400px] w-full relative" data-v-97587d2a${_scopeId2}><img${ssrRenderAttr("src", feedback.src)}${ssrRenderAttr("alt", feedback.alt)} class="w-full h-full object-cover" data-v-97587d2a${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "carousel__item h-[400px] w-full relative" }, [
                        createVNode("img", {
                          src: feedback.src,
                          alt: feedback.alt,
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.feedbacks, (feedback) => {
                return openBlock(), createBlock(unref(Slide), {
                  key: feedback.id
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "carousel__item h-[400px] w-full relative" }, [
                      createVNode("img", {
                        src: feedback.src,
                        alt: feedback.alt,
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src", "alt"])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ClientFeedbackCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ClientFeedbackCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-97587d2a"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ClientFeedback",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center h-auto min-h-screen md:min-h-[700px] lg:min-h-[800px] w-full p-8 md:p-0" }, _attrs))}><div class="max-w-5xl h-min"><div class="w-full flex flex-col items-center gap-12 md:gap-16"><div class="flex flex-col items-center text-center space-y-4 max-w-3xl"><div class="flex items-end gap-2 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "basil:chat-solid",
        width: "28",
        height: "28",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-lg md:text-xl uppercase">Testimonials</p></div><div class="space-y-3"><h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase"> Client Feedback &amp; Travel Reviews </h2><p class="text-base md:text-lg tracking-wide font-roboto text-[var(--muted-custom)] italic"> Every review reflects our commitment to exceptional service, trusted guidance, and unforgettable travel experiences. </p></div></div><div class="w-full">`);
      _push(ssrRenderComponent(ClientFeedbackCarousel, { feedbacks: unref(CLIENT_FEEDBACK) }, null, _parent));
      _push(`</div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/ClientFeedback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
