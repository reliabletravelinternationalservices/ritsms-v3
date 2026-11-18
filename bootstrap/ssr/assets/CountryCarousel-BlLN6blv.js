import { defineComponent, ref, computed, onMounted, onBeforeUnmount, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
/* empty css                  */
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import { Icon } from "@iconify/vue";
import { a as _sfc_main$1 } from "./CountryCarouselSkeleton-D3n6tthg.js";
import { l as _export_sfc } from "../ssr.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CountryCarousel",
  __ssrInlineRender: true,
  props: {
    countries: {}
  },
  setup(__props) {
    const windowWidth = ref(window.innerWidth);
    const isDesktop = computed(() => windowWidth.value >= 768);
    const updateWidth = () => {
      windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
      window.addEventListener("resize", updateWidth);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateWidth);
    });
    const carouselConfig = {
      itemsToShow: 1,
      itemsToScroll: 1,
      gap: 10,
      clamp: true,
      mouseDrag: true,
      breakpoints: {
        768: {
          itemsToShow: 2,
          itemsToScroll: 1,
          gap: 10,
          mouseDrag: true
        },
        1024: {
          itemsToShow: 3.1,
          itemsToScroll: 2,
          gap: 15,
          mouseDrag: false
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Carousel), mergeProps(carouselConfig, { class: "w-full relative" }, _attrs), {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), { class: "hidden md:block" }, {
              prev: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100" data-v-e062e115${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-left",
                    width: "24",
                    height: "24",
                    class: "text-[var(--primary-custom)]"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-left",
                        width: "24",
                        height: "24",
                        class: "text-[var(--primary-custom)]"
                      })
                    ])
                  ];
                }
              }),
              next: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100" data-v-e062e115${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "material-symbols:keyboard-arrow-right",
                    width: "24",
                    height: "24",
                    class: "text-[var(--primary-custom)]"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:keyboard-arrow-right",
                        width: "24",
                        height: "24",
                        class: "text-[var(--primary-custom)]"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (isDesktop.value) {
              _push2(ssrRenderComponent(unref(Pagination), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Navigation), { class: "hidden md:block" }, {
                prev: withCtx(() => [
                  createVNode("div", { class: "h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-left",
                      width: "24",
                      height: "24",
                      class: "text-[var(--primary-custom)]"
                    })
                  ])
                ]),
                next: withCtx(() => [
                  createVNode("div", { class: "h-[400px] md:h-[500px] w-full bg-black/20 hover:bg-black/50 flex items-center justify-center duration-100" }, [
                    createVNode(unref(Icon), {
                      icon: "material-symbols:keyboard-arrow-right",
                      width: "24",
                      height: "24",
                      class: "text-[var(--primary-custom)]"
                    })
                  ])
                ]),
                _: 1
              }),
              isDesktop.value ? (openBlock(), createBlock(unref(Pagination), { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.countries, (country) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: country.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      country,
                      href: _ctx.route("client.destination.country", { slug: country.slug })
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$1, {
                        country,
                        href: _ctx.route("client.destination.country", { slug: country.slug })
                      }, null, 8, ["country", "href"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.countries, (country) => {
                return openBlock(), createBlock(unref(Slide), {
                  key: country.id
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$1, {
                      country,
                      href: _ctx.route("client.destination.country", { slug: country.slug })
                    }, null, 8, ["country", "href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/carousel/country/CountryCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CountryCarousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e062e115"]]);
export {
  CountryCarousel as C
};
