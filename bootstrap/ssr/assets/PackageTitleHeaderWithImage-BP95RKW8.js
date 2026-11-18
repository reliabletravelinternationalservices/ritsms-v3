import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createVNode, createCommentVNode, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$8 } from "./Banner-CPbdlVa7.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6, e as _sfc_main$7 } from "./BreadcrumbSeparator-BM3Ehm2Y.js";
import { t as truncateText } from "../ssr.js";
import { Icon } from "@iconify/vue";
import "./ImagePreviewModal-ClUZaSKV.js";
import "lucide-vue-next";
import "radix-vue";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "vue-sonner";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "embla-carousel-vue";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ClientBreadcrumb",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "flex shrink-0 items-center ease-linear" }, _attrs))}><div class="flex items-center gap-2">`);
      if (__props.breadcrumbs && __props.breadcrumbs.length > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$2), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.breadcrumbs, (item, index) => {
                      _push3(`<!--[-->`);
                      _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-[var(--secondary-custom)] font-roboto" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (index === __props.breadcrumbs.length - 1) {
                              _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-[var(--muted-custom)] font-roboto" }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(unref(truncateText)(item.title, 20))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(_sfc_main$6), {
                                href: item.href,
                                class: "hover:text-[var(--muted-custom)] hover:underline"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(unref(truncateText)(item.title, 20))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            }
                          } else {
                            return [
                              index === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$5), {
                                key: 0,
                                class: "text-[var(--muted-custom)] font-roboto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                                ]),
                                _: 2
                              }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$6), {
                                key: 1,
                                href: item.href,
                                class: "hover:text-[var(--muted-custom)] hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      if (index !== __props.breadcrumbs.length - 1) {
                        _push3(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.breadcrumbs, (item, index) => {
                        return openBlock(), createBlock(Fragment, { key: index }, [
                          createVNode(unref(_sfc_main$4), { class: "text-[var(--secondary-custom)] font-roboto" }, {
                            default: withCtx(() => [
                              index === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$5), {
                                key: 0,
                                class: "text-[var(--muted-custom)] font-roboto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                                ]),
                                _: 2
                              }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$6), {
                                key: 1,
                                href: item.href,
                                class: "hover:text-[var(--muted-custom)] hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]))
                            ]),
                            _: 2
                          }, 1024),
                          index !== __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 })) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.breadcrumbs, (item, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        createVNode(unref(_sfc_main$4), { class: "text-[var(--secondary-custom)] font-roboto" }, {
                          default: withCtx(() => [
                            index === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$5), {
                              key: 0,
                              class: "text-[var(--muted-custom)] font-roboto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$6), {
                              key: 1,
                              href: item.href,
                              class: "hover:text-[var(--muted-custom)] hover:underline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(truncateText)(item.title, 20)), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]))
                          ]),
                          _: 2
                        }, 1024),
                        index !== __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 })) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ClientBreadcrumb.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageTitleHeaderWithImage",
  __ssrInlineRender: true,
  props: {
    package: {},
    isInbound: { type: Boolean },
    breadcrumbs: {}
  },
  setup(__props) {
    const props = __props;
    const previewImage = computed(() => {
      return (props.package.images ?? []).flat().slice(0, 4);
    });
    computed(() => {
      return (props.package.images ?? []).map((img) => ({
        url: img.url,
        alt_text: img.alt ?? `${props.package.name} travel package photo`
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto min-h-[400px] relative overflow-hidden p-3 sm:p-4" }, _attrs))}><div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-4"><div class="min-h-12 h-auto py-1">`);
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs: __props.breadcrumbs }, null, _parent));
      _push(`</div><div class="flex flex-col gap-2"><div class="flex flex-wrap items-center gap-2">`);
      _push(ssrRenderComponent(_sfc_main$8, {
        title: props.isInbound ? "Inbound" : "Outbound",
        class: props.isInbound ? "bg-[var(--inbound-custom)]" : "bg-[var(--outbound-custom)]"
      }, null, _parent));
      if (__props.package.is_foreign_only) {
        _push(ssrRenderComponent(_sfc_main$8, {
          title: "Valid For Foreign Tourists Only",
          class: "bg-[var(--warning-custom)]"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.package.tag) {
        _push(ssrRenderComponent(_sfc_main$8, {
          title: __props.package.tag,
          class: "bg-orange-700"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h1 class="text-xl md:text-2xl lg:text-3xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase leading-tight">${ssrInterpolate(__props.package.name)}</h1><div class="flex flex-wrap items-center gap-x-4 gap-y-2"><button type="button" aria-label="Message us on Facebook Messenger" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "tabler:message",
        class: "text-lg",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span>Message us</span></button><a href="tel:+639085721338" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:call-outline",
        class: "text-lg",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span>Call us</span></a><button type="button" aria-label="Share this package" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:share-outline",
        class: "text-lg",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span>Share now</span></button></div></div>`);
      if (previewImage.value.length > 0) {
        _push(`<div class="w-full"><button type="button" class="grid grid-cols-3 gap-1 w-full text-left"><span class="col-span-3 h-[180px] sm:h-[240px] md:h-[280px] relative flex items-center justify-center overflow-hidden">`);
        if (previewImage.value[0] && previewImage.value[0].url) {
          _push(`<img${ssrRenderAttr("src", previewImage.value[0].url)}${ssrRenderAttr("alt", previewImage.value[0].alt_text || `${__props.package.name} main photo`)} loading="eager" fetchpriority="high" decoding="async" class="object-cover h-full w-full">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="col-span-1 h-[100px] sm:h-[140px] md:h-[180px] relative flex items-center justify-center overflow-hidden">`);
        if (previewImage.value[1] && previewImage.value[1].url) {
          _push(`<img${ssrRenderAttr("src", previewImage.value[1].url)}${ssrRenderAttr("alt", previewImage.value[1].alt_text || `${__props.package.name} photo 2`)} loading="lazy" decoding="async" class="object-cover h-full w-full">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="col-span-1 h-[100px] sm:h-[140px] md:h-[180px] relative flex items-center justify-center overflow-hidden">`);
        if (previewImage.value[2] && previewImage.value[2].url) {
          _push(`<img${ssrRenderAttr("src", previewImage.value[2].url)}${ssrRenderAttr("alt", previewImage.value[2].alt_text || `${__props.package.name} photo 3`)} loading="lazy" decoding="async" class="object-cover h-full w-full">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="col-span-1 h-[100px] sm:h-[140px] md:h-[180px] relative flex items-center justify-center overflow-hidden">`);
        if (previewImage.value[3] && previewImage.value[3].url) {
          _push(`<img${ssrRenderAttr("src", previewImage.value[3].url)}${ssrRenderAttr("alt", previewImage.value[3].alt_text || `${__props.package.name} photo 4`)} loading="lazy" decoding="async" class="object-cover h-full w-full">`);
        } else {
          _push(`<!---->`);
        }
        if (props.package.images && props.package.images.length > 4) {
          _push(`<span class="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center select-none"><span class="underline text-[var(--primary-custom)] text-xs sm:text-sm font-medium">${ssrInterpolate(props.package.images.length - 4)} more images...</span></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span></button></div>`);
      } else {
        _push(`<div class="relative"><span class="flex items-center justify-center h-[240px] sm:h-[300px] md:h-[360px] w-full bg-[var(--shadow-custom)]">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "ic:baseline-image-not-supported",
          class: "text-5xl md:text-6xl text-[var(--muted-custom)]",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</span></div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageTitleHeaderWithImage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
