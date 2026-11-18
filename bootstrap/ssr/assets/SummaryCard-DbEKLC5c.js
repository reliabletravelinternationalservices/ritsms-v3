import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$2, d as _sfc_main$3 } from "./CardTitle-CO_w4Cob.js";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1 } from "./MotionWrapper-DwlQ79CS.js";
import { u as useCounterAnimation } from "./useCounterAnimation-DqMA6bbz.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SummaryCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    value: {},
    icon: { default: "iconoir:database" },
    trendValue: { default: void 0 },
    trendType: { default: "neutral" },
    trendLabel: { default: void 0 },
    delay: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const { animatedValue } = useCounterAnimation(props.value, { duration: 1e3, delay: props.delay * 1e3 });
    const trendConfig = computed(() => {
      switch (props.trendType) {
        case "up":
          return {
            icon: "iconoir:arrow-tr",
            classes: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/20"
          };
        case "down":
          return {
            icon: "iconoir:arrow-bl",
            classes: "text-rose-600 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-500/20"
          };
        case "neutral":
        default:
          return {
            icon: "iconoir:arrow-right",
            classes: "text-zinc-500 bg-zinc-500/10 dark:text-zinc-400 dark:bg-zinc-500/20"
          };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ delay: __props.delay }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 shadow-sm rounded-lg overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "p-5 flex items-center justify-between" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-1.5 min-w-0"${_scopeId3}><p class="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate"${_scopeId3}>${ssrInterpolate(props.title)}</p><div class="flex items-baseline gap-2.5"${_scopeId3}><span class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans"${_scopeId3}>${ssrInterpolate(unref(animatedValue))}</span>`);
                        if (props.trendValue && !props.trendLabel) {
                          _push4(`<span class="${ssrRenderClass([trendConfig.value.classes, "inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold font-mono rounded-full"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Icon), {
                            icon: trendConfig.value.icon,
                            class: "text-[10px] stroke-[2.5]"
                          }, null, _parent4, _scopeId3));
                          _push4(`<span${_scopeId3}>${ssrInterpolate(props.trendValue)}</span></span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                        if (props.trendLabel) {
                          _push4(`<div class="flex items-center gap-1.5 pt-1"${_scopeId3}><span class="${ssrRenderClass([trendConfig.value.classes, "p-0.5 rounded-md"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Icon), {
                            icon: trendConfig.value.icon,
                            class: "text-xs stroke-[3]"
                          }, null, _parent4, _scopeId3));
                          _push4(`</span><p class="text-xs text-zinc-500 dark:text-zinc-400"${_scopeId3}><span class="font-semibold font-mono text-zinc-800 dark:text-zinc-200"${_scopeId3}>${ssrInterpolate(props.trendValue)}</span> ${ssrInterpolate(props.trendLabel)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800/80"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Icon), {
                          icon: props.icon,
                          class: "text-2xl"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-1.5 min-w-0" }, [
                            createVNode("p", { class: "text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate" }, toDisplayString(props.title), 1),
                            createVNode("div", { class: "flex items-baseline gap-2.5" }, [
                              createVNode("span", { class: "text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans" }, toDisplayString(unref(animatedValue)), 1),
                              props.trendValue && !props.trendLabel ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ["inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold font-mono rounded-full", trendConfig.value.classes]
                              }, [
                                createVNode(unref(Icon), {
                                  icon: trendConfig.value.icon,
                                  class: "text-[10px] stroke-[2.5]"
                                }, null, 8, ["icon"]),
                                createVNode("span", null, toDisplayString(props.trendValue), 1)
                              ], 2)) : createCommentVNode("", true)
                            ]),
                            props.trendLabel ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-1.5 pt-1"
                            }, [
                              createVNode("span", {
                                class: ["p-0.5 rounded-md", trendConfig.value.classes]
                              }, [
                                createVNode(unref(Icon), {
                                  icon: trendConfig.value.icon,
                                  class: "text-xs stroke-[3]"
                                }, null, 8, ["icon"])
                              ], 2),
                              createVNode("p", { class: "text-xs text-zinc-500 dark:text-zinc-400" }, [
                                createVNode("span", { class: "font-semibold font-mono text-zinc-800 dark:text-zinc-200" }, toDisplayString(props.trendValue), 1),
                                createTextVNode(" " + toDisplayString(props.trendLabel), 1)
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800/80" }, [
                            createVNode(unref(Icon), {
                              icon: props.icon,
                              class: "text-2xl"
                            }, null, 8, ["icon"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "p-5 flex items-center justify-between" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-1.5 min-w-0" }, [
                          createVNode("p", { class: "text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate" }, toDisplayString(props.title), 1),
                          createVNode("div", { class: "flex items-baseline gap-2.5" }, [
                            createVNode("span", { class: "text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans" }, toDisplayString(unref(animatedValue)), 1),
                            props.trendValue && !props.trendLabel ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ["inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold font-mono rounded-full", trendConfig.value.classes]
                            }, [
                              createVNode(unref(Icon), {
                                icon: trendConfig.value.icon,
                                class: "text-[10px] stroke-[2.5]"
                              }, null, 8, ["icon"]),
                              createVNode("span", null, toDisplayString(props.trendValue), 1)
                            ], 2)) : createCommentVNode("", true)
                          ]),
                          props.trendLabel ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-1.5 pt-1"
                          }, [
                            createVNode("span", {
                              class: ["p-0.5 rounded-md", trendConfig.value.classes]
                            }, [
                              createVNode(unref(Icon), {
                                icon: trendConfig.value.icon,
                                class: "text-xs stroke-[3]"
                              }, null, 8, ["icon"])
                            ], 2),
                            createVNode("p", { class: "text-xs text-zinc-500 dark:text-zinc-400" }, [
                              createVNode("span", { class: "font-semibold font-mono text-zinc-800 dark:text-zinc-200" }, toDisplayString(props.trendValue), 1),
                              createTextVNode(" " + toDisplayString(props.trendLabel), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800/80" }, [
                          createVNode(unref(Icon), {
                            icon: props.icon,
                            class: "text-2xl"
                          }, null, 8, ["icon"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 shadow-sm rounded-lg overflow-hidden" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "p-5 flex items-center justify-between" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-1.5 min-w-0" }, [
                        createVNode("p", { class: "text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate" }, toDisplayString(props.title), 1),
                        createVNode("div", { class: "flex items-baseline gap-2.5" }, [
                          createVNode("span", { class: "text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans" }, toDisplayString(unref(animatedValue)), 1),
                          props.trendValue && !props.trendLabel ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ["inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold font-mono rounded-full", trendConfig.value.classes]
                          }, [
                            createVNode(unref(Icon), {
                              icon: trendConfig.value.icon,
                              class: "text-[10px] stroke-[2.5]"
                            }, null, 8, ["icon"]),
                            createVNode("span", null, toDisplayString(props.trendValue), 1)
                          ], 2)) : createCommentVNode("", true)
                        ]),
                        props.trendLabel ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-1.5 pt-1"
                        }, [
                          createVNode("span", {
                            class: ["p-0.5 rounded-md", trendConfig.value.classes]
                          }, [
                            createVNode(unref(Icon), {
                              icon: trendConfig.value.icon,
                              class: "text-xs stroke-[3]"
                            }, null, 8, ["icon"])
                          ], 2),
                          createVNode("p", { class: "text-xs text-zinc-500 dark:text-zinc-400" }, [
                            createVNode("span", { class: "font-semibold font-mono text-zinc-800 dark:text-zinc-200" }, toDisplayString(props.trendValue), 1),
                            createTextVNode(" " + toDisplayString(props.trendLabel), 1)
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800/80" }, [
                        createVNode(unref(Icon), {
                          icon: props.icon,
                          class: "text-2xl"
                        }, null, 8, ["icon"])
                      ])
                    ]),
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/statistic/SummaryCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
