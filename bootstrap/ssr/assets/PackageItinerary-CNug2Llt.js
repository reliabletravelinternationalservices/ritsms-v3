import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4 } from "./AccordionTrigger-BwG7gcww.js";
import { c as cn } from "../ssr.js";
import "reka-ui";
import "@vueuse/core";
import "lucide-vue-next";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageItinerary",
  __ssrInlineRender: true,
  props: {
    package: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-auto relative overflow-hidden p-2 sm:p-4" }, _attrs))}><div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-2 sm:p-4"><h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Itineraries</h2>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        type: "single",
        collapsible: "",
        class: "w-full",
        "default-value": "day-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.package.itineraries_array, (item, index) => {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                key: index,
                value: `day-${item.day}`,
                class: "border border-[var(--shadow-custom)] px-3 sm:px-6 mb-1 rounded-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "hover:no-underline text-left" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-bold text-sm sm:text-base text-[var(--secondary-custom)] pr-4"${_scopeId3}> Day ${ssrInterpolate(item.day)}: ${ssrInterpolate(item.title)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "font-bold text-sm sm:text-base text-[var(--secondary-custom)] pr-4" }, " Day " + toDisplayString(item.day) + ": " + toDisplayString(item.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<ul class="flex flex-col gap-2.5 py-2 px-1 sm:px-6"${_scopeId3}><!--[-->`);
                          ssrRenderList(item.activity, (activity, aIndex) => {
                            _push4(`<li class="flex items-start gap-2 min-w-0"${_scopeId3}><div class="${ssrRenderClass([unref(cn)(__props.isInbound ? "bg-[var(--inbound-custom)]" : "bg-[var(--outbound-custom)]"), "mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full shrink-0"])}" aria-hidden="true"${_scopeId3}></div><p class="text-xs sm:text-sm md:text-base text-[var(--secondary-custom)] leading-relaxed break-words w-full"${_scopeId3}>${ssrInterpolate(activity)}</p></li>`);
                          });
                          _push4(`<!--]--></ul>`);
                        } else {
                          return [
                            createVNode("ul", { class: "flex flex-col gap-2.5 py-2 px-1 sm:px-6" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(item.activity, (activity, aIndex) => {
                                return openBlock(), createBlock("li", {
                                  key: aIndex,
                                  class: "flex items-start gap-2 min-w-0"
                                }, [
                                  createVNode("div", {
                                    class: ["mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full shrink-0", unref(cn)(__props.isInbound ? "bg-[var(--inbound-custom)]" : "bg-[var(--outbound-custom)]")],
                                    "aria-hidden": "true"
                                  }, null, 2),
                                  createVNode("p", { class: "text-xs sm:text-sm md:text-base text-[var(--secondary-custom)] leading-relaxed break-words w-full" }, toDisplayString(activity), 1)
                                ]);
                              }), 128))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), { class: "hover:no-underline text-left" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "font-bold text-sm sm:text-base text-[var(--secondary-custom)] pr-4" }, " Day " + toDisplayString(item.day) + ": " + toDisplayString(item.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode("ul", { class: "flex flex-col gap-2.5 py-2 px-1 sm:px-6" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(item.activity, (activity, aIndex) => {
                              return openBlock(), createBlock("li", {
                                key: aIndex,
                                class: "flex items-start gap-2 min-w-0"
                              }, [
                                createVNode("div", {
                                  class: ["mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full shrink-0", unref(cn)(__props.isInbound ? "bg-[var(--inbound-custom)]" : "bg-[var(--outbound-custom)]")],
                                  "aria-hidden": "true"
                                }, null, 2),
                                createVNode("p", { class: "text-xs sm:text-sm md:text-base text-[var(--secondary-custom)] leading-relaxed break-words w-full" }, toDisplayString(activity), 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.package.itineraries_array, (item, index) => {
                return openBlock(), createBlock(unref(_sfc_main$2), {
                  key: index,
                  value: `day-${item.day}`,
                  class: "border border-[var(--shadow-custom)] px-3 sm:px-6 mb-1 rounded-sm"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), { class: "hover:no-underline text-left" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "font-bold text-sm sm:text-base text-[var(--secondary-custom)] pr-4" }, " Day " + toDisplayString(item.day) + ": " + toDisplayString(item.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("ul", { class: "flex flex-col gap-2.5 py-2 px-1 sm:px-6" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.activity, (activity, aIndex) => {
                            return openBlock(), createBlock("li", {
                              key: aIndex,
                              class: "flex items-start gap-2 min-w-0"
                            }, [
                              createVNode("div", {
                                class: ["mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full shrink-0", unref(cn)(__props.isInbound ? "bg-[var(--inbound-custom)]" : "bg-[var(--outbound-custom)]")],
                                "aria-hidden": "true"
                              }, null, 2),
                              createVNode("p", { class: "text-xs sm:text-sm md:text-base text-[var(--secondary-custom)] leading-relaxed break-words w-full" }, toDisplayString(activity), 1)
                            ]);
                          }), 128))
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageItinerary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
