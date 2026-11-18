import { defineComponent, ref, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
import { h as _sfc_main$2, i as _sfc_main$3, j as _sfc_main$4, k as _sfc_main$5, n as _sfc_main$6, e as _sfc_main$7, _ as _sfc_main$8, b as formatCurrency, g as getPackageDurationLabel, q as formatPackageDateRange } from "../ssr.js";
import { Icon } from "@iconify/vue";
import { u as useCurrency } from "./useCurrency-Ta8J8A5v.js";
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
  __name: "AppModalHost",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const openState = ref(false);
    const payload = ref(null);
    function open(data) {
      payload.value = data;
      openState.value = true;
    }
    function close() {
      openState.value = false;
    }
    function confirm() {
      var _a, _b;
      (_b = (_a = payload.value) == null ? void 0 : _a.onConfirm) == null ? void 0 : _b.call(_a);
      close();
    }
    __expose({
      open,
      close
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$2), mergeProps({
        open: openState.value,
        "onUpdate:open": ($event) => openState.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2;
                            if (_push5) {
                              _push5(`${ssrInterpolate((_a2 = payload.value) == null ? void 0 : _a2.title)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString((_b2 = payload.value) == null ? void 0 : _b2.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if ((_a = payload.value) == null ? void 0 : _a.description) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              if (_push5) {
                                _push5(`${ssrInterpolate((_a2 = payload.value) == null ? void 0 : _a2.description)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString((_b2 = payload.value) == null ? void 0 : _b2.description), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString((_a2 = payload.value) == null ? void 0 : _a2.title), 1)
                              ];
                            }),
                            _: 1
                          }),
                          ((_b = payload.value) == null ? void 0 : _b.description) ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString((_a2 = payload.value) == null ? void 0 : _a2.description), 1)
                              ];
                            }),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "flex gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        if ((_a = payload.value) == null ? void 0 : _a.cancelText) {
                          _push4(ssrRenderComponent(unref(_sfc_main$8), {
                            variant: "secondary",
                            onClick: close
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              if (_push5) {
                                _push5(`${ssrInterpolate(((_a2 = payload.value) == null ? void 0 : _a2.cancelText) ?? "Close")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(((_b2 = payload.value) == null ? void 0 : _b2.cancelText) ?? "Close"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { onClick: confirm }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2;
                            if (_push5) {
                              _push5(`${ssrInterpolate(((_a2 = payload.value) == null ? void 0 : _a2.confirmText) ?? "OK")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(((_b2 = payload.value) == null ? void 0 : _b2.confirmText) ?? "OK"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          ((_b = payload.value) == null ? void 0 : _b.cancelText) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 0,
                            variant: "secondary",
                            onClick: close
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString(((_a2 = payload.value) == null ? void 0 : _a2.cancelText) ?? "Close"), 1)
                              ];
                            }),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$8), { onClick: confirm }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString(((_a2 = payload.value) == null ? void 0 : _a2.confirmText) ?? "OK"), 1)
                              ];
                            }),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString((_a2 = payload.value) == null ? void 0 : _a2.title), 1)
                              ];
                            }),
                            _: 1
                          }),
                          ((_a = payload.value) == null ? void 0 : _a.description) ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString((_a2 = payload.value) == null ? void 0 : _a2.description), 1)
                              ];
                            }),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "flex gap-2" }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          ((_a = payload.value) == null ? void 0 : _a.cancelText) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 0,
                            variant: "secondary",
                            onClick: close
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString(((_a2 = payload.value) == null ? void 0 : _a2.cancelText) ?? "Close"), 1)
                              ];
                            }),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$8), { onClick: confirm }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString(((_a2 = payload.value) == null ? void 0 : _a2.confirmText) ?? "OK"), 1)
                              ];
                            }),
                            _: 1
                          })
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString((_a2 = payload.value) == null ? void 0 : _a2.title), 1)
                            ];
                          }),
                          _: 1
                        }),
                        ((_a = payload.value) == null ? void 0 : _a.description) ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString((_a2 = payload.value) == null ? void 0 : _a2.description), 1)
                            ];
                          }),
                          _: 1
                        })) : createCommentVNode("", true)
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$7), { class: "flex gap-2" }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        ((_a = payload.value) == null ? void 0 : _a.cancelText) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                          key: 0,
                          variant: "secondary",
                          onClick: close
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString(((_a2 = payload.value) == null ? void 0 : _a2.cancelText) ?? "Close"), 1)
                            ];
                          }),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$8), { onClick: confirm }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString(((_a2 = payload.value) == null ? void 0 : _a2.confirmText) ?? "OK"), 1)
                            ];
                          }),
                          _: 1
                        })
                      ];
                    }),
                    _: 1
                  })
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/AppModalHost.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageRateAndPeriod",
  __ssrInlineRender: true,
  props: {
    package: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const { convertToUsd } = useCurrency();
    const handleCheckAvailability = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full relative overflow-hidden p-2 sm:p-4" }, _attrs))}><div class="max-w-5xl mx-auto w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[var(--shadow-custom)] p-2 pb-6 md:pb-2"><div class="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-x-4 gap-y-6 md:gap-x-8 lg:gap-11 w-full md:w-auto"><div class="flex flex-col min-w-0"><span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "tdesign:money",
        class: "text-lg text-[var(--muted-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span>Base Price</span></span><p class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--warning-custom)] break-words">${ssrInterpolate(unref(formatCurrency)(__props.isInbound ? unref(convertToUsd)(__props.package.base_price) : __props.package.base_price, __props.isInbound ? "USD" : "PHP"))}/pax </p></div><div class="flex flex-col min-w-0"><span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mingcute:time-duration-fill",
        class: "text-lg text-[var(--muted-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span>Duration</span></span><p class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--secondary-custom)] break-words">${ssrInterpolate(unref(getPackageDurationLabel)(__props.package.duration))}</p></div><div class="flex flex-col min-w-0 col-span-2 sm:col-span-1"><span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:calendar",
        class: "text-lg text-[var(--muted-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span>Selling Period</span></span><p class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--secondary-custom)] break-words">${ssrInterpolate(unref(formatPackageDateRange)(__props.package.selling_start_date, __props.package.selling_end_date))}</p></div><div class="flex flex-col min-w-0"><span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-payment",
        class: "text-lg text-[var(--muted-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span>Down Payment</span></span>`);
      if (__props.package.down_payment !== null && __props.package.down_payment > 0) {
        _push(`<p class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--correct-custom)] break-words">${ssrInterpolate(unref(formatCurrency)(__props.isInbound ? unref(convertToUsd)(__props.package.down_payment) : __props.package.down_payment, __props.isInbound ? "USD" : "PHP"))}/pax </p>`);
      } else {
        _push(`<p class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--muted-custom)]"> N/A </p>`);
      }
      _push(`</div></div><div class="w-full md:w-auto flex justify-start md:justify-end">`);
      _push(ssrRenderComponent(_sfc_main$8, {
        onClick: handleCheckAvailability,
        size: "lg",
        variant: "outline",
        class: "bg-[var(--secondary-custom)] text-[var(--primary-custom)] rounded-none w-full md:w-auto justify-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Check Availability</span>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "line-md:arrow-right",
              class: "text-2xl flex-shrink-0",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, "Check Availability"),
              createVNode(unref(Icon), {
                icon: "line-md:arrow-right",
                class: "text-2xl flex-shrink-0",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/section/PackageRateAndPeriod.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
