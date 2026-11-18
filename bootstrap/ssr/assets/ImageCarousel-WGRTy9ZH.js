import { defineComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
/* empty css                  */
import { Carousel, Slide } from "vue3-carousel";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1, s as scrollToSection, l as _export_sfc } from "../ssr.js";
import { H as HERO_CAROUSEL_IMAGES } from "./constants-D5Z3FOm2.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const carouselConfig = {
      itemsToShow: 1,
      wrapAround: true,
      autoplay: 8e3,
      slideEffect: "fade",
      touchDrag: true
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative group/main overflow-hidden w-full" }, _attrs))} data-v-7d8c3413><div class="w-full h-full bg-black/70 absolute top-0 left-0 z-10 flex items-center justify-center flex-col gap-6 md:gap-8 px-4 text-center" data-v-7d8c3413><div class="space-y-3" data-v-7d8c3413><h1 class="text-3xl md:text-4xl lg:text-5xl text-[var(--primary-custom)] uppercase font-montserrat font-bold tracking-wider leading-tight" data-v-7d8c3413> Discover <br class="block md:hidden" data-v-7d8c3413> The World With Us </h1><p class="text-[var(--primary-custom)] text-base md:text-lg lg:text-xl tracking-wider font-roboto opacity-90" data-v-7d8c3413> Your trusted Philippine travel agency for inbound &amp; outbound tours </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        type: "button",
        class: "transition-transform duration-300 h-11 md:h-12 px-6 md:px-8 hover:scale-105 bg-[var(--tertiary-custom)] font-medium hover:bg-[var(--tertiary-hover-custom)] rounded-none font-roboto",
        onClick: ($event) => unref(scrollToSection)("destinations")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm md:text-base" data-v-7d8c3413${_scopeId}>Explore Packages</span>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "ep:arrow-right-bold",
              width: "20",
              height: "20",
              class: "ml-2",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", { class: "text-sm md:text-base" }, "Explore Packages"),
              createVNode(unref(Icon), {
                icon: "ep:arrow-right-bold",
                width: "20",
                height: "20",
                class: "ml-2",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Carousel), carouselConfig, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(HERO_CAROUSEL_IMAGES), (image, index) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: image.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="carousel__item w-full h-[450px] md:h-[600px] overflow-hidden" data-v-7d8c3413${_scopeId2}><img${ssrRenderAttr("src", image.src)}${ssrRenderAttr("alt", image.alt)}${ssrRenderAttr("loading", index === 0 ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", index === 0 ? "high" : "auto")} decoding="async" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/main:scale-110" data-v-7d8c3413${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "carousel__item w-full h-[450px] md:h-[600px] overflow-hidden" }, [
                        createVNode("img", {
                          src: image.src,
                          alt: image.alt,
                          loading: index === 0 ? "eager" : "lazy",
                          fetchpriority: index === 0 ? "high" : "auto",
                          decoding: "async",
                          class: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover/main:scale-110"
                        }, null, 8, ["src", "alt", "loading", "fetchpriority"])
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(HERO_CAROUSEL_IMAGES), (image, index) => {
                return openBlock(), createBlock(unref(Slide), {
                  key: image.id
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "carousel__item w-full h-[450px] md:h-[600px] overflow-hidden" }, [
                      createVNode("img", {
                        src: image.src,
                        alt: image.alt,
                        loading: index === 0 ? "eager" : "lazy",
                        fetchpriority: index === 0 ? "high" : "auto",
                        decoding: "async",
                        class: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover/main:scale-110"
                      }, null, 8, ["src", "alt", "loading", "fetchpriority"])
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
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/ImageCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CarouselSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d8c3413"]]);
export {
  CarouselSection as default
};
