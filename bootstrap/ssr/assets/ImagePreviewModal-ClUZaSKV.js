import { ref, onMounted, defineComponent, mergeProps, unref, useSSRContext, withCtx, renderSlot, createVNode, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { c as cn, _ as _sfc_main$6, h as _sfc_main$7, i as _sfc_main$8 } from "../ssr.js";
import { createInjectionState } from "@vueuse/core";
import emblaCarouselVue from "embla-carousel-vue";
import { ArrowRight, ArrowLeft } from "lucide-vue-next";
const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({
    opts,
    orientation,
    plugins
  }, emits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    }, plugins);
    function scrollPrev() {
      var _a;
      (_a = emblaApi.value) == null ? void 0 : _a.scrollPrev();
    }
    function scrollNext() {
      var _a;
      (_a = emblaApi.value) == null ? void 0 : _a.scrollNext();
    }
    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);
    function onSelect(api) {
      canScrollNext.value = (api == null ? void 0 : api.canScrollNext()) || false;
      canScrollPrev.value = (api == null ? void 0 : api.canScrollPrev()) || false;
    }
    onMounted(() => {
      var _a, _b, _c;
      if (!emblaApi.value)
        return;
      (_a = emblaApi.value) == null ? void 0 : _a.on("init", onSelect);
      (_b = emblaApi.value) == null ? void 0 : _b.on("reInit", onSelect);
      (_c = emblaApi.value) == null ? void 0 : _c.on("select", onSelect);
      emits("init-api", emblaApi.value);
    });
    return { carouselRef: emblaNode, carouselApi: emblaApi, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation };
  }
);
function useCarousel() {
  const carouselState = useInjectCarousel();
  if (!carouselState)
    throw new Error("useCarousel must be used within a <Carousel />");
  return carouselState;
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    opts: {},
    plugins: {},
    orientation: { default: "horizontal" },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["init-api"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { canScrollNext, canScrollPrev, carouselApi, carouselRef, orientation, scrollNext, scrollPrev } = useProvideCarousel(props, emits);
    __expose({
      canScrollNext,
      canScrollPrev,
      carouselApi,
      carouselRef,
      orientation,
      scrollNext,
      scrollPrev
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("relative", props.class),
        role: "region",
        "aria-roledescription": "carousel",
        tabindex: "0"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {
        canScrollNext: unref(canScrollNext),
        canScrollPrev: unref(canScrollPrev),
        carouselApi: unref(carouselApi),
        carouselRef: unref(carouselRef),
        orientation: unref(orientation),
        scrollNext: unref(scrollNext),
        scrollPrev: unref(scrollPrev)
      }, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/Carousel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CarouselContent",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { carouselRef, orientation } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "carouselRef",
        ref: carouselRef,
        class: "overflow-hidden"
      }, _attrs))}><div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex",
          unref(orientation) === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          props.class
        )
      }, _ctx.$attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselContent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CarouselItem",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { orientation } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "group",
        "aria-roledescription": "slide",
        class: unref(cn)(
          "min-w-0 shrink-0 grow-0 basis-full",
          unref(orientation) === "horizontal" ? "pl-4" : "pt-4",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CarouselNext",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollNext, scrollNext } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$6), mergeProps({
        disabled: !unref(canScrollNext),
        class: unref(cn)(
          "touch-manipulation absolute h-8 w-8 rounded-full p-0",
          unref(orientation) === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          props.class
        ),
        variant: "outline",
        onClick: unref(scrollNext)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 text-current" }, null, _parent2, _scopeId));
              _push2(`<span class="sr-only"${_scopeId}>Next Slide</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ArrowRight), { class: "h-4 w-4 text-current" }),
                createVNode("span", { class: "sr-only" }, "Next Slide")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselNext.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CarouselPrevious",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollPrev, scrollPrev } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$6), mergeProps({
        disabled: !unref(canScrollPrev),
        class: unref(cn)(
          "touch-manipulation absolute h-8 w-8 rounded-full p-0",
          unref(orientation) === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          props.class
        ),
        variant: "outline",
        onClick: unref(scrollPrev)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 text-current" }, null, _parent2, _scopeId));
              _push2(`<span class="sr-only"${_scopeId}>Previous Slide</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ArrowLeft), { class: "h-4 w-4 text-current" }),
                createVNode("span", { class: "sr-only" }, "Previous Slide")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselPrevious.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImagePreviewModal",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const openState = ref(false);
    const images = ref([]);
    const startIndex = ref(0);
    function open(imgs, index = 0) {
      images.value = imgs;
      startIndex.value = index;
      openState.value = true;
    }
    function close() {
      openState.value = false;
    }
    __expose({
      open,
      close
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$7), mergeProps({
        open: openState.value,
        "onUpdate:open": ($event) => openState.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$8), { class: "max-w-5xl p-0 bg-black/90 border-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    class: "w-full",
                    opts: {
                      startIndex: startIndex.value,
                      loop: true
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(images.value, (img, i) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                  key: i,
                                  class: "flex items-center justify-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<img${ssrRenderAttr("src", img.url)}${ssrRenderAttr("alt", img.alt_text)} class="max-h-[85vh] object-contain select-none"${_scopeId5}>`);
                                    } else {
                                      return [
                                        createVNode("img", {
                                          src: img.url,
                                          alt: img.alt_text,
                                          class: "max-h-[85vh] object-contain select-none"
                                        }, null, 8, ["src", "alt"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(images.value, (img, i) => {
                                  return openBlock(), createBlock(unref(_sfc_main$3), {
                                    key: i,
                                    class: "flex items-center justify-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("img", {
                                        src: img.url,
                                        alt: img.alt_text,
                                        class: "max-h-[85vh] object-contain select-none"
                                      }, null, 8, ["src", "alt"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$1), { class: "left-2" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), { class: "right-2" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(images.value, (img, i) => {
                                return openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: i,
                                  class: "flex items-center justify-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("img", {
                                      src: img.url,
                                      alt: img.alt_text,
                                      class: "max-h-[85vh] object-contain select-none"
                                    }, null, 8, ["src", "alt"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$1), { class: "left-2" }),
                          createVNode(unref(_sfc_main$2), { class: "right-2" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), {
                      class: "w-full",
                      opts: {
                        startIndex: startIndex.value,
                        loop: true
                      }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(images.value, (img, i) => {
                              return openBlock(), createBlock(unref(_sfc_main$3), {
                                key: i,
                                class: "flex items-center justify-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    src: img.url,
                                    alt: img.alt_text,
                                    class: "max-h-[85vh] object-contain select-none"
                                  }, null, 8, ["src", "alt"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$1), { class: "left-2" }),
                        createVNode(unref(_sfc_main$2), { class: "right-2" })
                      ]),
                      _: 1
                    }, 8, ["opts"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$8), { class: "max-w-5xl p-0 bg-black/90 border-none" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), {
                    class: "w-full",
                    opts: {
                      startIndex: startIndex.value,
                      loop: true
                    }
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(images.value, (img, i) => {
                            return openBlock(), createBlock(unref(_sfc_main$3), {
                              key: i,
                              class: "flex items-center justify-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: img.url,
                                  alt: img.alt_text,
                                  class: "max-h-[85vh] object-contain select-none"
                                }, null, 8, ["src", "alt"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1), { class: "left-2" }),
                      createVNode(unref(_sfc_main$2), { class: "right-2" })
                    ]),
                    _: 1
                  }, 8, ["opts"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/ImagePreviewModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
