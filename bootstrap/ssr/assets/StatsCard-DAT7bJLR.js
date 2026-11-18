import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$2, d as _sfc_main$3 } from "./CardTitle-CO_w4Cob.js";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1 } from "./MotionWrapper-DwlQ79CS.js";
import { u as useCounterAnimation } from "./useCounterAnimation-DqMA6bbz.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatsCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    value: {},
    icon: { default: "iconoir:package" },
    trendValue: { default: void 0 },
    trendType: { default: "up" },
    delay: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const { animatedValue } = useCounterAnimation(props.value, { duration: 1e3, delay: props.delay * 1e3 });
    const trendConfig = computed(() => {
      if (props.trendType === "down") {
        return {
          icon: "iconoir:arrow-bl",
          classes: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400"
        };
      }
      if (props.trendType === "neutral") {
        return {
          icon: "iconoir:arrow-right",
          classes: "text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-400"
        };
      }
      return {
        icon: "iconoir:arrow-tr",
        classes: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ delay: __props.delay }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 shadow-sm rounded-2xl overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "p-4 flex items-center gap-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Icon), {
                          icon: props.icon,
                          class: "text-xl"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-0.5 min-w-0"${_scopeId3}><p class="text-xs font-medium text-zinc-400 dark:text-zinc-500 truncate"${_scopeId3}>${ssrInterpolate(props.title)}</p><div class="flex items-center gap-2 flex-wrap"${_scopeId3}><span class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans"${_scopeId3}>${ssrInterpolate(unref(animatedValue))}</span>`);
                        if (props.trendValue !== void 0) {
                          _push4(`<div class="${ssrRenderClass([trendConfig.value.classes, "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Icon), {
                            icon: trendConfig.value.icon,
                            class: "text-xs stroke-[2.5]"
                          }, null, _parent4, _scopeId3));
                          _push4(`<span${_scopeId3}>${ssrInterpolate(props.trendValue)}</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100" }, [
                            createVNode(unref(Icon), {
                              icon: props.icon,
                              class: "text-xl"
                            }, null, 8, ["icon"])
                          ]),
                          createVNode("div", { class: "space-y-0.5 min-w-0" }, [
                            createVNode("p", { class: "text-xs font-medium text-zinc-400 dark:text-zinc-500 truncate" }, toDisplayString(props.title), 1),
                            createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                              createVNode("span", { class: "text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans" }, toDisplayString(unref(animatedValue)), 1),
                              props.trendValue !== void 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: ["inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide", trendConfig.value.classes]
                              }, [
                                createVNode(unref(Icon), {
                                  icon: trendConfig.value.icon,
                                  class: "text-xs stroke-[2.5]"
                                }, null, 8, ["icon"]),
                                createVNode("span", null, toDisplayString(props.trendValue), 1)
                              ], 2)) : createCommentVNode("", true)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "p-4 flex items-center gap-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100" }, [
                          createVNode(unref(Icon), {
                            icon: props.icon,
                            class: "text-xl"
                          }, null, 8, ["icon"])
                        ]),
                        createVNode("div", { class: "space-y-0.5 min-w-0" }, [
                          createVNode("p", { class: "text-xs font-medium text-zinc-400 dark:text-zinc-500 truncate" }, toDisplayString(props.title), 1),
                          createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                            createVNode("span", { class: "text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans" }, toDisplayString(unref(animatedValue)), 1),
                            props.trendValue !== void 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: ["inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide", trendConfig.value.classes]
                            }, [
                              createVNode(unref(Icon), {
                                icon: trendConfig.value.icon,
                                class: "text-xs stroke-[2.5]"
                              }, null, 8, ["icon"]),
                              createVNode("span", null, toDisplayString(props.trendValue), 1)
                            ], 2)) : createCommentVNode("", true)
                          ])
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
              createVNode(unref(_sfc_main$2), { class: "bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 shadow-sm rounded-2xl overflow-hidden" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "p-4 flex items-center gap-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100" }, [
                        createVNode(unref(Icon), {
                          icon: props.icon,
                          class: "text-xl"
                        }, null, 8, ["icon"])
                      ]),
                      createVNode("div", { class: "space-y-0.5 min-w-0" }, [
                        createVNode("p", { class: "text-xs font-medium text-zinc-400 dark:text-zinc-500 truncate" }, toDisplayString(props.title), 1),
                        createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                          createVNode("span", { class: "text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans" }, toDisplayString(unref(animatedValue)), 1),
                          props.trendValue !== void 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: ["inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide", trendConfig.value.classes]
                          }, [
                            createVNode(unref(Icon), {
                              icon: trendConfig.value.icon,
                              class: "text-xs stroke-[2.5]"
                            }, null, 8, ["icon"]),
                            createVNode("span", null, toDisplayString(props.trendValue), 1)
                          ], 2)) : createCommentVNode("", true)
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/statistic/StatsCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
