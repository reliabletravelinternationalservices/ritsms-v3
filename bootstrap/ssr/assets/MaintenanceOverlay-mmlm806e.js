import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, d as _sfc_main$2 } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$3 } from "./index-xORXC0Yx.js";
import { Icon } from "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MaintenanceOverlay",
  __ssrInlineRender: true,
  props: {
    title: { default: "Section Under Maintenance" },
    description: { default: "We are currently running critical updates to enhance platform stability. Access will be restored shortly." },
    mode: { default: "update" },
    estimatedTime: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const modeConfig = computed(() => {
      switch (props.mode) {
        case "maintenance":
          return {
            icon: "wpf:maintenance",
            badgeText: "Critical Maintenance",
            badgeStyle: "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive-foreground",
            iconColor: "text-rose-500"
          };
        case "optimization":
          return {
            icon: "mdi:flash",
            badgeText: "Performance Optimization",
            badgeStyle: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400",
            iconColor: "text-amber-500"
          };
        case "features":
          return {
            icon: "mdi:sparkles",
            badgeText: "New Features Deploying",
            badgeStyle: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400",
            iconColor: "text-emerald-500"
          };
        case "update":
        default:
          return {
            icon: "iconoir:system-restart",
            badgeText: "System Update Running",
            badgeStyle: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400",
            iconColor: "text-blue-500"
          };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full min-h-[70vh] flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "max-w-md w-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md overflow-hidden relative" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"${_scopeId}></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "p-6 md:p-8 flex flex-col items-center text-center space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"${_scopeId2}><span class="absolute inline-flex h-full w-full rounded-2xl opacity-40 animate-ping bg-zinc-200 dark:bg-zinc-800/60 [animation-duration:3s]"${_scopeId2}></span>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: modeConfig.value.icon,
                    class: ["text-3xl", [modeConfig.value.iconColor, props.mode === "update" ? "animate-spin [animation-duration:12s]" : ""]]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}><div class="flex justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    variant: "outline",
                    class: ["text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold", modeConfig.value.badgeStyle]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(modeConfig.value.badgeText)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(modeConfig.value.badgeText), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"${_scopeId2}>${ssrInterpolate(props.title)}</h1><p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2"${_scopeId2}>${ssrInterpolate(props.description)}</p></div>`);
                  if (props.estimatedTime) {
                    _push3(`<div class="w-full pt-4 border-t border-zinc-100 dark:border-zinc-900/60"${_scopeId2}><div class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 px-4 py-2.5 rounded-lg flex items-center justify-between text-left"${_scopeId2}><span class="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider"${_scopeId2}>Estimated Finish</span><span class="text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200"${_scopeId2}>${ssrInterpolate(props.estimatedTime)}</span></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "relative flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm" }, [
                      createVNode("span", { class: "absolute inline-flex h-full w-full rounded-2xl opacity-40 animate-ping bg-zinc-200 dark:bg-zinc-800/60 [animation-duration:3s]" }),
                      createVNode(unref(Icon), {
                        icon: modeConfig.value.icon,
                        class: ["text-3xl", [modeConfig.value.iconColor, props.mode === "update" ? "animate-spin [animation-duration:12s]" : ""]]
                      }, null, 8, ["icon", "class"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode(unref(_sfc_main$3), {
                          variant: "outline",
                          class: ["text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold", modeConfig.value.badgeStyle]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(modeConfig.value.badgeText), 1)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      createVNode("h1", { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" }, toDisplayString(props.title), 1),
                      createVNode("p", { class: "text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2" }, toDisplayString(props.description), 1)
                    ]),
                    props.estimatedTime ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "w-full pt-4 border-t border-zinc-100 dark:border-zinc-900/60"
                    }, [
                      createVNode("div", { class: "bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 px-4 py-2.5 rounded-lg flex items-center justify-between text-left" }, [
                        createVNode("span", { class: "text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider" }, "Estimated Finish"),
                        createVNode("span", { class: "text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200" }, toDisplayString(props.estimatedTime), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" }),
              createVNode(unref(_sfc_main$2), { class: "p-6 md:p-8 flex flex-col items-center text-center space-y-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm" }, [
                    createVNode("span", { class: "absolute inline-flex h-full w-full rounded-2xl opacity-40 animate-ping bg-zinc-200 dark:bg-zinc-800/60 [animation-duration:3s]" }),
                    createVNode(unref(Icon), {
                      icon: modeConfig.value.icon,
                      class: ["text-3xl", [modeConfig.value.iconColor, props.mode === "update" ? "animate-spin [animation-duration:12s]" : ""]]
                    }, null, 8, ["icon", "class"])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode(unref(_sfc_main$3), {
                        variant: "outline",
                        class: ["text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold", modeConfig.value.badgeStyle]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(modeConfig.value.badgeText), 1)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    createVNode("h1", { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" }, toDisplayString(props.title), 1),
                    createVNode("p", { class: "text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2" }, toDisplayString(props.description), 1)
                  ]),
                  props.estimatedTime ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-full pt-4 border-t border-zinc-100 dark:border-zinc-900/60"
                  }, [
                    createVNode("div", { class: "bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 px-4 py-2.5 rounded-lg flex items-center justify-between text-left" }, [
                      createVNode("span", { class: "text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider" }, "Estimated Finish"),
                      createVNode("span", { class: "text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200" }, toDisplayString(props.estimatedTime), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/MaintenanceOverlay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
