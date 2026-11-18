import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
/* empty css                  */
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { Icon } from "@iconify/vue";
import { m as getImageUrl, l as _export_sfc } from "../ssr.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageDestinationCarousel",
  __ssrInlineRender: true,
  props: {
    countries: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const selectedImage = ref(0);
    const carouselRef = ref(null);
    const carouselRef2 = ref(null);
    const selectDestination = (index) => {
      var _a, _b;
      selectedImage.value = index;
      (_a = carouselRef2.value) == null ? void 0 : _a.slideTo(0);
      (_b = carouselRef.value) == null ? void 0 : _b.slideTo(index);
    };
    watch(() => props.countries, (newList) => {
      if (selectedImage.value >= newList.length) {
        selectedImage.value = 0;
      }
    });
    const carouselConfig = {
      itemsToShow: 2,
      itemsToScroll: 1,
      gap: 10,
      clamp: true,
      mouseDrag: true,
      breakpoints: {
        768: {
          itemsToShow: 3.1,
          itemsToScroll: 1,
          gap: 10
        },
        1024: {
          itemsToShow: 4.1,
          itemsToScroll: 2,
          gap: 15
        }
      }
    };
    const carouselConfig2 = {
      itemsToShow: 1,
      itemsToScroll: 1,
      gap: 10,
      clamp: true,
      mouseDrag: false
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Carousel), mergeProps({
        ref_key: "carouselRef2",
        ref: carouselRef2
      }, carouselConfig2, { class: "w-full" }), {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), { class: "hidden md:block" }, {
              prev: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-left",
                    class: "text-white",
                    width: "30"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-left",
                        class: "text-white",
                        width: "30"
                      })
                    ])
                  ];
                }
              }),
              next: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-right",
                    class: "text-white",
                    width: "30"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-right",
                        class: "text-white",
                        width: "30"
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
                  createVNode("div", { class: "h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-left",
                      class: "text-white",
                      width: "30"
                    })
                  ])
                ]),
                next: withCtx(() => [
                  createVNode("div", { class: "h-[300px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-right",
                      class: "text-white",
                      width: "30"
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(((_a = __props.countries[selectedImage.value]) == null ? void 0 : _a.locations) || [], (loc, index) => {
              _push2(ssrRenderComponent(unref(Slide), { key: index }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="group relative h-[300px] w-full overflow-hidden md:h-[500px] rounded-lg"${_scopeId2}>`);
                    if (loc.image) {
                      _push3(`<img${ssrRenderAttr("src", unref(getImageUrl)(loc.image.file_path))}${ssrRenderAttr("alt", loc.image.alt_text || loc.name)} class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"${_scopeId2}>`);
                    } else {
                      _push3(`<div class="flex h-full w-full items-center justify-center bg-gray-200"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Icon), {
                        icon: "mdi:image-off",
                        width: "48",
                        height: "48",
                        class: "text-gray-400"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                    _push3(`<div class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/50"${_scopeId2}></div><div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"${_scopeId2}><h3 class="translate-y-4 transform px-6 text-center text-2xl font-bold text-white transition-all duration-300 group-hover:translate-y-0 uppercase font-montserrat tracking-wider"${_scopeId2}>${ssrInterpolate(loc.name)}</h3><p class="translate-y-4 transform px-6 text-center text-white transition-all duration-300 group-hover:translate-y-0 text-sme max-w-[70%]"${_scopeId2}>${ssrInterpolate(loc.description)}</p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "group relative h-[300px] w-full overflow-hidden md:h-[500px] rounded-lg" }, [
                        loc.image ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: unref(getImageUrl)(loc.image.file_path),
                          alt: loc.image.alt_text || loc.name,
                          class: "h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex h-full w-full items-center justify-center bg-gray-200"
                        }, [
                          createVNode(unref(Icon), {
                            icon: "mdi:image-off",
                            width: "48",
                            height: "48",
                            class: "text-gray-400"
                          })
                        ])),
                        createVNode("div", { class: "absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/50" }),
                        createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100" }, [
                          createVNode("h3", { class: "translate-y-4 transform px-6 text-center text-2xl font-bold text-white transition-all duration-300 group-hover:translate-y-0 uppercase font-montserrat tracking-wider" }, toDisplayString(loc.name), 1),
                          createVNode("p", { class: "translate-y-4 transform px-6 text-center text-white transition-all duration-300 group-hover:translate-y-0 text-sme max-w-[70%]" }, toDisplayString(loc.description), 1)
                        ])
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
              (openBlock(true), createBlock(Fragment, null, renderList(((_b = __props.countries[selectedImage.value]) == null ? void 0 : _b.locations) || [], (loc, index) => {
                return openBlock(), createBlock(unref(Slide), { key: index }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "group relative h-[300px] w-full overflow-hidden md:h-[500px] rounded-lg" }, [
                      loc.image ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: unref(getImageUrl)(loc.image.file_path),
                        alt: loc.image.alt_text || loc.name,
                        class: "h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex h-full w-full items-center justify-center bg-gray-200"
                      }, [
                        createVNode(unref(Icon), {
                          icon: "mdi:image-off",
                          width: "48",
                          height: "48",
                          class: "text-gray-400"
                        })
                      ])),
                      createVNode("div", { class: "absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/50" }),
                      createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100" }, [
                        createVNode("h3", { class: "translate-y-4 transform px-6 text-center text-2xl font-bold text-white transition-all duration-300 group-hover:translate-y-0 uppercase font-montserrat tracking-wider" }, toDisplayString(loc.name), 1),
                        createVNode("p", { class: "translate-y-4 transform px-6 text-center text-white transition-all duration-300 group-hover:translate-y-0 text-sme max-w-[70%]" }, toDisplayString(loc.description), 1)
                      ])
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
      _push(ssrRenderComponent(unref(Carousel), mergeProps({
        ref_key: "carouselRef",
        ref: carouselRef
      }, carouselConfig, { class: "w-full mt-3" }), {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), { class: "hidden md:block" }, {
              prev: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-left",
                    class: "text-white",
                    width: "24"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-left",
                        class: "text-white",
                        width: "24"
                      })
                    ])
                  ];
                }
              }),
              next: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-right",
                    class: "text-white",
                    width: "24"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-right",
                        class: "text-white",
                        width: "24"
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
                  createVNode("div", { class: "h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-left",
                      class: "text-white",
                      width: "24"
                    })
                  ])
                ]),
                next: withCtx(() => [
                  createVNode("div", { class: "h-[60px] md:h-[100px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-right",
                      class: "text-white",
                      width: "24"
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
            ssrRenderList(__props.countries, (destination, index) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: destination.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass([index === selectedImage.value ? "border-[var(--tertiary-custom)]" : "border-transparent", "h-[60px] md:h-[100px] w-full relative cursor-pointer overflow-hidden border-2 transition-all duration-200"])}"${_scopeId2}><div class="absolute inset-0 bg-black/40 flex items-center justify-center"${_scopeId2}><span class="text-white text-xs md:text-sm font-bold uppercase border px-2 border-[var(--tertiary-custom)]"${_scopeId2}>${ssrInterpolate(destination.country)}</span></div>`);
                    if (destination.image) {
                      _push3(`<img${ssrRenderAttr("src", unref(getImageUrl)(destination.image.file_path))}${ssrRenderAttr("alt", ((_a = destination.image) == null ? void 0 : _a.alt_text) || destination.country + " travel destination")} class="w-full h-full object-cover"${_scopeId2}>`);
                    } else {
                      _push3(`<div class="w-full h-full bg-gray-200 flex items-center justify-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Icon), {
                        icon: "mdi:image-off",
                        width: "48",
                        height: "48",
                        class: "text-gray-400"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        onClick: ($event) => selectDestination(index),
                        class: ["h-[60px] md:h-[100px] w-full relative cursor-pointer overflow-hidden border-2 transition-all duration-200", index === selectedImage.value ? "border-[var(--tertiary-custom)]" : "border-transparent"]
                      }, [
                        createVNode("div", { class: "absolute inset-0 bg-black/40 flex items-center justify-center" }, [
                          createVNode("span", { class: "text-white text-xs md:text-sm font-bold uppercase border px-2 border-[var(--tertiary-custom)]" }, toDisplayString(destination.country), 1)
                        ]),
                        destination.image ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: unref(getImageUrl)(destination.image.file_path),
                          alt: ((_b = destination.image) == null ? void 0 : _b.alt_text) || destination.country + " travel destination",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "w-full h-full bg-gray-200 flex items-center justify-center"
                        }, [
                          createVNode(unref(Icon), {
                            icon: "mdi:image-off",
                            width: "48",
                            height: "48",
                            class: "text-gray-400"
                          })
                        ]))
                      ], 10, ["onClick"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.countries, (destination, index) => {
                return openBlock(), createBlock(unref(Slide), {
                  key: destination.id
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode("div", {
                        onClick: ($event) => selectDestination(index),
                        class: ["h-[60px] md:h-[100px] w-full relative cursor-pointer overflow-hidden border-2 transition-all duration-200", index === selectedImage.value ? "border-[var(--tertiary-custom)]" : "border-transparent"]
                      }, [
                        createVNode("div", { class: "absolute inset-0 bg-black/40 flex items-center justify-center" }, [
                          createVNode("span", { class: "text-white text-xs md:text-sm font-bold uppercase border px-2 border-[var(--tertiary-custom)]" }, toDisplayString(destination.country), 1)
                        ]),
                        destination.image ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: unref(getImageUrl)(destination.image.file_path),
                          alt: ((_a = destination.image) == null ? void 0 : _a.alt_text) || destination.country + " travel destination",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "w-full h-full bg-gray-200 flex items-center justify-center"
                        }, [
                          createVNode(unref(Icon), {
                            icon: "mdi:image-off",
                            width: "48",
                            height: "48",
                            class: "text-gray-400"
                          })
                        ]))
                      ], 10, ["onClick"])
                    ];
                  }),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ImageDestinationCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full animate-pulse" }, _attrs))}><div class="relative h-[220px] overflow-hidden rounded-lg bg-gray-300 sm:h-[350px] lg:h-[500px]"><div class="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-gray-400"></div><div class="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-gray-400"></div><div class="absolute inset-0 skeleton-shimmer"></div></div><div class="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6"><!--[-->`);
  ssrRenderList(6, (n) => {
    _push(`<div class="relative h-16 overflow-hidden rounded-md bg-gray-300 sm:h-20 lg:h-24">`);
    if (n === 1) {
      _push(`<div class="absolute inset-0 border-2 border-[var(--primary-custom)]"></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="absolute bottom-2 left-1/2 h-4 w-20 -translate-x-1/2 rounded bg-gray-400"></div><div class="absolute inset-0 skeleton-shimmer"></div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/skeleton/CountryLocationImageSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CountryLocationImageSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  CountryLocationImageSkeleton as C,
  _sfc_main$1 as _
};
