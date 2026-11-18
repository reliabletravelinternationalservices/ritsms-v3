import { defineComponent, ref, onMounted, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$6 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { _ as _sfc_main$2 } from "./Layout-BQS3kTSn.js";
import "./MaintenanceOverlay-mmlm806e.js";
import { TransitionRoot } from "@headlessui/vue";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$7 } from "../ssr.js";
import { _ as _sfc_main$5 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$4 } from "./Label-6hRdN-Dm.js";
import "class-variance-authority";
import "radix-vue";
import "lucide-vue-next";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "./index-xORXC0Yx.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "vue-sonner";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Currency",
  __ssrInlineRender: true,
  props: {
    className: {}
  },
  setup(__props) {
    var _a;
    const breadcrumbItems = [
      {
        title: "Currency settings",
        href: "/settings/currency"
      }
    ];
    const currencyInputRef = ref(null);
    const page = usePage();
    const initialUsdRate = ((_a = page.props.settings) == null ? void 0 : _a.usd_to_php_rate) ?? "";
    const form = useForm({
      key: "usd_to_php_rate",
      value: initialUsdRate.toString(),
      type: "number"
    });
    onMounted(() => {
      if (initialUsdRate) {
        form.value = initialUsdRate.toString();
      }
    });
    const updateCurrency = () => {
      form.put(route("currency.update"), {
        preserveScroll: true,
        onSuccess: () => {
        },
        onError: (errors) => {
          if (errors.value && currencyInputRef.value instanceof HTMLInputElement) {
            currencyInputRef.value.focus();
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Currency settings" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  {
                    _push3(`<div class="space-y-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      title: "Exchange Rate Configuration",
                      description: "Defines the value of 1 US Dollar (USD) in Philippine Peso (PHP) used across all transaction calculations."
                    }, null, _parent3, _scopeId2));
                    _push3(`<form class="space-y-6 max-w-xl"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "currency_rate" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Exchange Rate (PHP per 1 USD) `);
                        } else {
                          return [
                            createTextVNode(" Exchange Rate (PHP per 1 USD) ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="relative flex items-center"${_scopeId2}><span class="absolute left-3 text-md text-zinc-400 font-mono select-none"${_scopeId2}> ₱ </span>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      id: "currency_rate",
                      ref_key: "currencyInputRef",
                      ref: currencyInputRef,
                      modelValue: unref(form).value,
                      "onUpdate:modelValue": ($event) => unref(form).value = $event,
                      type: "number",
                      step: "0.0001",
                      class: "pl-7 block w-full font-mono",
                      placeholder: "e.g. 56.45",
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><p class="text-[11px] text-muted-foreground"${_scopeId2}> Current live state detected inside session context: <span class="font-mono font-medium text-zinc-800 dark:text-zinc-200"${_scopeId2}>${ssrInterpolate(unref(initialUsdRate) || "None configured")}</span></p>`);
                    _push3(ssrRenderComponent(_sfc_main$6, {
                      message: unref(form).errors.value
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$6, {
                      message: unref(form).errors.key
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="flex items-center gap-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      disabled: unref(form).processing
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(form).processing ? "Saving..." : "Update Currency Rate")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(form).processing ? "Saving..." : "Update Currency Rate"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(TransitionRoot), {
                      show: unref(form).recentlySuccessful,
                      enter: "transition ease-in-out duration-300",
                      "enter-from": "opacity-0 translate-y-1",
                      leave: "transition ease-in-out duration-300",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium"${_scopeId3}><span${_scopeId3}>Rate saved successfully</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium" }, [
                              createVNode("span", null, "Rate saved successfully")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></form></div>`);
                  }
                } else {
                  return [
                    (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-6"
                    }, [
                      createVNode(_sfc_main$3, {
                        title: "Exchange Rate Configuration",
                        description: "Defines the value of 1 US Dollar (USD) in Philippine Peso (PHP) used across all transaction calculations."
                      }),
                      createVNode("form", {
                        onSubmit: withModifiers(updateCurrency, ["prevent"]),
                        class: "space-y-6 max-w-xl"
                      }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "currency_rate" }, {
                            default: withCtx(() => [
                              createTextVNode(" Exchange Rate (PHP per 1 USD) ")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "relative flex items-center" }, [
                            createVNode("span", { class: "absolute left-3 text-md text-zinc-400 font-mono select-none" }, " ₱ "),
                            createVNode(unref(_sfc_main$5), {
                              id: "currency_rate",
                              ref_key: "currencyInputRef",
                              ref: currencyInputRef,
                              modelValue: unref(form).value,
                              "onUpdate:modelValue": ($event) => unref(form).value = $event,
                              type: "number",
                              step: "0.0001",
                              class: "pl-7 block w-full font-mono",
                              placeholder: "e.g. 56.45",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("p", { class: "text-[11px] text-muted-foreground" }, [
                            createTextVNode(" Current live state detected inside session context: "),
                            createVNode("span", { class: "font-mono font-medium text-zinc-800 dark:text-zinc-200" }, toDisplayString(unref(initialUsdRate) || "None configured"), 1)
                          ]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.value
                          }, null, 8, ["message"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.key
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(unref(_sfc_main$7), {
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(form).processing ? "Saving..." : "Update Currency Rate"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(TransitionRoot), {
                            show: unref(form).recentlySuccessful,
                            enter: "transition ease-in-out duration-300",
                            "enter-from": "opacity-0 translate-y-1",
                            leave: "transition ease-in-out duration-300",
                            "leave-to": "opacity-0"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium" }, [
                                createVNode("span", null, "Rate saved successfully")
                              ])
                            ]),
                            _: 1
                          }, 8, ["show"])
                        ])
                      ], 32)
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Currency settings" }),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-6"
                  }, [
                    createVNode(_sfc_main$3, {
                      title: "Exchange Rate Configuration",
                      description: "Defines the value of 1 US Dollar (USD) in Philippine Peso (PHP) used across all transaction calculations."
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(updateCurrency, ["prevent"]),
                      class: "space-y-6 max-w-xl"
                    }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$4), { for: "currency_rate" }, {
                          default: withCtx(() => [
                            createTextVNode(" Exchange Rate (PHP per 1 USD) ")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative flex items-center" }, [
                          createVNode("span", { class: "absolute left-3 text-md text-zinc-400 font-mono select-none" }, " ₱ "),
                          createVNode(unref(_sfc_main$5), {
                            id: "currency_rate",
                            ref_key: "currencyInputRef",
                            ref: currencyInputRef,
                            modelValue: unref(form).value,
                            "onUpdate:modelValue": ($event) => unref(form).value = $event,
                            type: "number",
                            step: "0.0001",
                            class: "pl-7 block w-full font-mono",
                            placeholder: "e.g. 56.45",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("p", { class: "text-[11px] text-muted-foreground" }, [
                          createTextVNode(" Current live state detected inside session context: "),
                          createVNode("span", { class: "font-mono font-medium text-zinc-800 dark:text-zinc-200" }, toDisplayString(unref(initialUsdRate) || "None configured"), 1)
                        ]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.value
                        }, null, 8, ["message"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.key
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode(unref(_sfc_main$7), {
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(form).processing ? "Saving..." : "Update Currency Rate"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(unref(TransitionRoot), {
                          show: unref(form).recentlySuccessful,
                          enter: "transition ease-in-out duration-300",
                          "enter-from": "opacity-0 translate-y-1",
                          leave: "transition ease-in-out duration-300",
                          "leave-to": "opacity-0"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium" }, [
                              createVNode("span", null, "Rate saved successfully")
                            ])
                          ]),
                          _: 1
                        }, 8, ["show"])
                      ])
                    ], 32)
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/Currency.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
