import { defineComponent, ref, onMounted, onUnmounted, computed, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
/* empty css                  */
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1 } from "./usePackages-I3arwpQ3.js";
import { l as _export_sfc } from "../ssr.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageCarousel",
  __ssrInlineRender: true,
  props: {
    isInbound: { type: Boolean, default: false },
    packages: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const screenWidth = ref(0);
    onMounted(() => {
      screenWidth.value = window.innerWidth;
      const updateWidth = () => {
        screenWidth.value = window.innerWidth;
      };
      window.addEventListener("resize", updateWidth);
      onUnmounted(() => {
        window.removeEventListener("resize", updateWidth);
      });
    });
    const showNavigation = computed(() => {
      const len = props.packages.length;
      if (screenWidth.value < 768) return len > 1;
      if (screenWidth.value < 1024) return len > 2;
      return len > 3;
    });
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
          clamp: false,
          mouseDrag: false
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Carousel), mergeProps(carouselConfig, {
        class: "w-full",
        "aria-label": "Travel package carousel"
      }, _attrs), {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (showNavigation.value) {
              _push2(ssrRenderComponent(unref(Navigation), { class: "hidden md:block" }, {
                prev: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div role="button" aria-label="Previous package" class="md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100" data-v-c720c4c9${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-left",
                      width: "24",
                      height: "24",
                      class: "text-white",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        role: "button",
                        "aria-label": "Previous package",
                        class: "md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100"
                      }, [
                        createVNode(unref(Icon), {
                          icon: "material-symbols:keyboard-arrow-left",
                          width: "24",
                          height: "24",
                          class: "text-white",
                          "aria-hidden": "true"
                        })
                      ])
                    ];
                  }
                }),
                next: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div role="button" aria-label="Next package" class="md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100" data-v-c720c4c9${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-right",
                      width: "24",
                      height: "24",
                      class: "text-white",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        role: "button",
                        "aria-label": "Next package",
                        class: "md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100"
                      }, [
                        createVNode(unref(Icon), {
                          icon: "material-symbols:keyboard-arrow-right",
                          width: "24",
                          height: "24",
                          class: "text-white",
                          "aria-hidden": "true"
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              showNavigation.value ? (openBlock(), createBlock(unref(Navigation), {
                key: 0,
                class: "hidden md:block"
              }, {
                prev: withCtx(() => [
                  createVNode("div", {
                    role: "button",
                    "aria-label": "Previous package",
                    class: "md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100"
                  }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-left",
                      width: "24",
                      height: "24",
                      class: "text-white",
                      "aria-hidden": "true"
                    })
                  ])
                ]),
                next: withCtx(() => [
                  createVNode("div", {
                    role: "button",
                    "aria-label": "Next package",
                    class: "md:h-[400px] h-[330px] w-full bg-black/5 hover:bg-black/30 flex items-center justify-center duration-100"
                  }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-right",
                      width: "24",
                      height: "24",
                      class: "text-white",
                      "aria-hidden": "true"
                    })
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.packages, (data) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: data.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      package: data,
                      isInbound: __props.isInbound
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$1, {
                        package: data,
                        isInbound: __props.isInbound
                      }, null, 8, ["package", "isInbound"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (data) => {
                return openBlock(), createBlock(unref(Slide), {
                  key: data.id
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$1, {
                      package: data,
                      isInbound: __props.isInbound
                    }, null, 8, ["package", "isInbound"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/PackageCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PackageCarousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c720c4c9"]]);
export {
  PackageCarousel as P
};
