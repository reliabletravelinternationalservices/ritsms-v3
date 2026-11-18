import { defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, computed, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, createTextVNode, toDisplayString, ref, createCommentVNode, onMounted, renderList } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { cva } from "class-variance-authority";
import { useForwardPropsEmits, DialogRoot, DialogClose, DialogDescription, DialogTitle, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, createContext, Primitive, TooltipProvider, Separator, CollapsibleRoot, CollapsibleContent, CollapsibleTrigger, AvatarRoot, AvatarFallback, AvatarImage, DropdownMenuRoot, DropdownMenuCheckboxItem, DropdownMenuItemIndicator, DropdownMenuPortal, DropdownMenuContent, DropdownMenuGroup, useForwardProps, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "radix-vue";
import { c as cn, l as _export_sfc, _ as _sfc_main$17 } from "../ssr.js";
import { X, PanelLeft, Check, Circle, ChevronRight, Settings, LogOut, ChevronsUpDown, Bell, ArrowRight, Info, XCircle, AlertTriangle, CheckCircle2 } from "lucide-vue-next";
import { _ as _sfc_main$13 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$14, a as _sfc_main$15, b as _sfc_main$16 } from "./TooltipTrigger-B2yyxzkT.js";
import { useMediaQuery, useVModel, useEventListener } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$18 } from "./AppLogoIcon-B2fdtLWF.js";
import { _ as _sfc_main$1e, a as _sfc_main$1f, b as _sfc_main$1g, c as _sfc_main$1h, d as _sfc_main$1i, e as _sfc_main$1j } from "./BreadcrumbSeparator-BM3Ehm2Y.js";
import { _ as _sfc_main$1a, a as _sfc_main$1b, b as _sfc_main$1c, d as _sfc_main$1d } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$19 } from "./index-xORXC0Yx.js";
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "Sheet",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/Sheet.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "SheetClose",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogClose), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/SheetClose.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "SheetDescription",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogDescription), mergeProps({
        class: unref(cn)("text-sm text-muted-foreground", props.class)
      }, delegatedProps.value, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/SheetDescription.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "SheetFooter",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/SheetFooter.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "SheetHeader",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col gap-y-2 text-center sm:text-left", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/SheetHeader.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "SheetTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTitle), mergeProps({
        class: unref(cn)("text-lg font-semibold text-foreground", props.class)
      }, delegatedProps.value, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/SheetTitle.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "SheetTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTrigger), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/SheetTrigger.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SheetContent",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] },
    side: {},
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, side, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DialogContent), mergeProps({
              class: unref(cn)(unref(sheetVariants)({ side: __props.side }), props.class)
            }, { ...unref(forwarded), ..._ctx.$attrs }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(X), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(X), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
                      default: withCtx(() => [
                        createVNode(unref(X), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
              createVNode(unref(DialogContent), mergeProps({
                class: unref(cn)(unref(sheetVariants)({ side: __props.side }), props.class)
              }, { ...unref(forwarded), ..._ctx.$attrs }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
                    default: withCtx(() => [
                      createVNode(unref(X), { class: "h-4 w-4 text-muted-foreground" })
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sheet/SheetContent.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const [useSidebar, provideSidebarContext] = createContext("Sidebar");
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    side: { default: "left" },
    variant: { default: "sidebar" },
    collapsible: { default: "offcanvas" },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.collapsible === "none") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: unref(cn)("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", props.class)
        }, _ctx.$attrs, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else if (unref(isMobile)) {
        _push(ssrRenderComponent(_sfc_main$12, mergeProps({ open: unref(openMobile) }, _ctx.$attrs, { "onUpdate:open": unref(setOpenMobile) }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$X, {
                "data-sidebar": "sidebar",
                "data-mobile": "true",
                side: __props.side,
                class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex h-full w-full flex-col"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex h-full w-full flex-col" }, [
                        renderSlot(_ctx.$slots, "default")
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$X, {
                  "data-sidebar": "sidebar",
                  "data-mobile": "true",
                  side: __props.side,
                  class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
                  style: {
                    "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                  }
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex h-full w-full flex-col" }, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ]),
                  _: 3
                }, 8, ["side", "style"])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "group peer hidden md:block",
          "data-state": unref(state),
          "data-collapsible": unref(state) === "collapsed" ? __props.collapsible : "",
          "data-variant": __props.variant,
          "data-side": __props.side
        }, _attrs))}><div class="${ssrRenderClass(
          unref(cn)(
            "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            __props.variant === "floating" || __props.variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )
        )}"></div><div${ssrRenderAttrs(mergeProps({
          class: unref(cn)(
            "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
            __props.side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            __props.variant === "floating" || __props.variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            props.class
          )
        }, _ctx.$attrs))}><div data-sidebar="sidebar" class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div></div></div>`);
      }
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/Sidebar.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "SidebarContent",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "content",
        class: unref(cn)("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarContent.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "SidebarFooter",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "footer",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarFooter.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroup",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "group",
        class: unref(cn)("relative flex w-full min-w-0 flex-col p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroup.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "group-action",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroupAction.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupContent",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "group-content",
        class: unref(cn)("w-full text-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroupContent.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "group-label",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroupLabel.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "SidebarHeader",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "header",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarHeader.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "SidebarInput",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$13, mergeProps({
        "data-sidebar": "input",
        class: unref(cn)("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarInput.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "SidebarInset",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "relative flex min-h-svh flex-1 flex-col bg-background",
          "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
});
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarInset.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenu",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu",
        class: unref(cn)("flex w-full min-w-0 flex-col gap-1", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenu.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "button" },
    showOnHover: { type: Boolean },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "menu-action",
        class: unref(cn)(
          "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          __props.showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
          props.class
        ),
        as: __props.as,
        "as-child": __props.asChild
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuAction.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuBadge",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
          "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuBadge.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuButtonChild",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: { type: [Boolean, null, String, Object, Array] },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "menu-button",
        "data-size": __props.size,
        "data-active": __props.isActive,
        class: unref(cn)(unref(sidebarMenuButtonVariants)({ variant: __props.variant, size: __props.size }), props.class),
        as: __props.as,
        "as-child": __props.asChild
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuButtonChild.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SidebarMenuButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: { type: [Boolean, null, String, Object, Array] },
    asChild: { type: Boolean },
    as: { default: "button" },
    tooltip: {}
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state } = useSidebar();
    const delegatedProps = computed(() => {
      const { tooltip, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!__props.tooltip) {
        _push(ssrRenderComponent(_sfc_main$J, mergeProps({ ...delegatedProps.value, ..._ctx.$attrs }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$14, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$15, { "as-child": "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$J, { ...delegatedProps.value, ..._ctx.$attrs }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$J, { ...delegatedProps.value, ..._ctx.$attrs }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 16)
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$16, {
                side: "right",
                align: "center",
                hidden: unref(state) !== "collapsed" || unref(isMobile)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (typeof __props.tooltip === "string") {
                      _push3(`<!--[-->${ssrInterpolate(__props.tooltip)}<!--]-->`);
                    } else {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.tooltip), null, null), _parent3, _scopeId2);
                    }
                  } else {
                    return [
                      typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(__props.tooltip), 1)
                      ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$15, { "as-child": "" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$J, { ...delegatedProps.value, ..._ctx.$attrs }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 16)
                  ]),
                  _: 3
                }),
                createVNode(_sfc_main$16, {
                  side: "right",
                  align: "center",
                  hidden: unref(state) !== "collapsed" || unref(isMobile)
                }, {
                  default: withCtx(() => [
                    typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(__props.tooltip), 1)
                    ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))
                  ]),
                  _: 1
                }, 8, ["hidden"])
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuButton.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuItem",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-item",
        class: unref(cn)("group/menu-item relative", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuItem.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "Skeleton",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("animate-pulse rounded-md bg-muted", props.class)
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/skeleton/Skeleton.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSkeleton",
  __ssrInlineRender: true,
  props: {
    showIcon: { type: Boolean },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const width = computed(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-skeleton",
        class: unref(cn)("flex h-8 items-center gap-2 rounded-md px-2", props.class)
      }, _attrs))}>`);
      if (__props.showIcon) {
        _push(ssrRenderComponent(_sfc_main$G, {
          class: "size-4 rounded-md",
          "data-sidebar": "menu-skeleton-icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$G, {
        class: "h-4 max-w-[--skeleton-width] flex-1",
        "data-sidebar": "menu-skeleton-text",
        style: { "--skeleton-width": width.value }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSkeleton.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSub",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSub.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSubButton",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "a" },
    size: { default: "md" },
    isActive: { type: Boolean },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "menu-sub-button",
        as: __props.as,
        "as-child": __props.asChild,
        "data-size": __props.size,
        "data-active": __props.isActive,
        class: unref(cn)(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          __props.size === "sm" && "text-xs",
          __props.size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSubButton.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const _sfc_main$C = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<li${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</li>`);
}
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSubItem.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const SidebarMenuSubItem = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "SidebarProvider",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean, default: true },
    open: { type: Boolean, default: void 0 },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const isMobile = useMediaQuery("(max-width: 768px)");
    const openMobile = ref(false);
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen ?? false,
      passive: props.open === void 0
    });
    function setOpen(value) {
      open.value = value;
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
    function setOpenMobile(value) {
      openMobile.value = value;
    }
    function toggleSidebar() {
      return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
    }
    useEventListener("keydown", (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    });
    const state = computed(() => open.value ? "expanded" : "collapsed");
    provideSidebarContext({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipProvider), mergeProps({ "delay-duration": 0 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({
              "--sidebar-width": unref(SIDEBAR_WIDTH),
              "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
            })}" class="${ssrRenderClass(unref(cn)("group/sidebar-wrapper flex min-h-svh w-full text-sidebar-foreground has-[[data-variant=inset]]:bg-sidebar", props.class))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH),
                  "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
                },
                class: unref(cn)("group/sidebar-wrapper flex min-h-svh w-full text-sidebar-foreground has-[[data-variant=inset]]:bg-sidebar", props.class)
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 6)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarProvider.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "SidebarRail",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabindex: -1,
        title: "Toggle Sidebar",
        class: unref(cn)(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarRail.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "Separator",
  __ssrInlineRender: true,
  props: {
    orientation: {},
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] },
    label: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Separator), mergeProps(delegatedProps.value, {
        class: unref(cn)("relative shrink-0 bg-border", props.orientation === "vertical" ? "h-full w-px" : "h-px w-full", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.label) {
              _push2(`<span class="${ssrRenderClass(
                unref(cn)(
                  "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-background text-xs text-muted-foreground",
                  props.orientation === "vertical" ? "w-[1px] px-1 py-2" : "h-[1px] px-2 py-1"
                )
              )}"${_scopeId}>${ssrInterpolate(props.label)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.label ? (openBlock(), createBlock("span", {
                key: 0,
                class: unref(cn)(
                  "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-background text-xs text-muted-foreground",
                  props.orientation === "vertical" ? "w-[1px] px-1 py-2" : "h-[1px] px-2 py-1"
                )
              }, toDisplayString(props.label), 3)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/separator/Separator.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "SidebarSeparator",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$z, mergeProps({
        "data-sidebar": "separator",
        class: unref(cn)("mx-2 w-auto bg-sidebar-border", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarSeparator.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "SidebarTrigger",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$17, mergeProps({
        "data-sidebar": "trigger",
        variant: "ghost",
        size: "icon",
        class: unref(cn)("h-7 w-7", props.class),
        onClick: unref(toggleSidebar)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PanelLeft), null, null, _parent2, _scopeId));
            _push2(`<span class="sr-only"${_scopeId}>Toggle Sidebar</span>`);
          } else {
            return [
              createVNode(unref(PanelLeft)),
              createVNode("span", { class: "sr-only" }, "Toggle Sidebar")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarTrigger.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "AppContent",
  __ssrInlineRender: true,
  props: {
    variant: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const className = computed(() => props.class);
    return (_ctx, _push, _parent, _attrs) => {
      if (props.variant === "sidebar") {
        _push(ssrRenderComponent(unref(_sfc_main$N), mergeProps({ class: className.value }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<main${ssrRenderAttrs(mergeProps({
          class: ["mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl", className.value]
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</main>`);
      }
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppContent.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "AppShell",
  __ssrInlineRender: true,
  props: {
    variant: {}
  },
  setup(__props) {
    const isOpen = ref(true);
    onMounted(() => {
      isOpen.value = localStorage.getItem("sidebar") !== "false";
    });
    const handleSidebarChange = (open) => {
      isOpen.value = open;
      localStorage.setItem("sidebar", String(open));
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.variant === "header") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen w-full flex-col" }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(unref(_sfc_main$B), mergeProps({
          "default-open": isOpen.value,
          open: isOpen.value,
          "onUpdate:open": handleSidebarChange
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppShell.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "NavFooter",
  __ssrInlineRender: true,
  props: {
    items: {},
    class: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$T), mergeProps({
        class: `group-data-[collapsible=icon]:p-0 ${_ctx.$props.class || ""}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$R), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$M), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.items, (item) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$H), {
                            key: item.title
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$I), {
                                  class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                  "as-child": ""
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<a${ssrRenderAttr("href", item.href)} target="_blank" rel="noopener noreferrer"${_scopeId5}><span${_scopeId5}>`);
                                      if (item.icon) {
                                        _push6(ssrRenderComponent(unref(Icon), {
                                          icon: item.icon,
                                          class: "text-lg"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</span><span${_scopeId5}>${ssrInterpolate(item.title)}</span></a>`);
                                    } else {
                                      return [
                                        createVNode("a", {
                                          href: item.href,
                                          target: "_blank",
                                          rel: "noopener noreferrer"
                                        }, [
                                          createVNode("span", null, [
                                            item.icon ? (openBlock(), createBlock(unref(Icon), {
                                              key: 0,
                                              icon: item.icon,
                                              class: "text-lg"
                                            }, null, 8, ["icon"])) : createCommentVNode("", true)
                                          ]),
                                          createVNode("span", null, toDisplayString(item.title), 1)
                                        ], 8, ["href"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$I), {
                                    class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                    "as-child": ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("a", {
                                        href: item.href,
                                        target: "_blank",
                                        rel: "noopener noreferrer"
                                      }, [
                                        createVNode("span", null, [
                                          item.icon ? (openBlock(), createBlock(unref(Icon), {
                                            key: 0,
                                            icon: item.icon,
                                            class: "text-lg"
                                          }, null, 8, ["icon"])) : createCommentVNode("", true)
                                        ]),
                                        createVNode("span", null, toDisplayString(item.title), 1)
                                      ], 8, ["href"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                            return openBlock(), createBlock(unref(_sfc_main$H), {
                              key: item.title
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$I), {
                                  class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("a", {
                                      href: item.href,
                                      target: "_blank",
                                      rel: "noopener noreferrer"
                                    }, [
                                      createVNode("span", null, [
                                        item.icon ? (openBlock(), createBlock(unref(Icon), {
                                          key: 0,
                                          icon: item.icon,
                                          class: "text-lg"
                                        }, null, 8, ["icon"])) : createCommentVNode("", true)
                                      ]),
                                      createVNode("span", null, toDisplayString(item.title), 1)
                                    ], 8, ["href"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$M), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                          return openBlock(), createBlock(unref(_sfc_main$H), {
                            key: item.title
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$I), {
                                class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode("a", {
                                    href: item.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                  }, [
                                    createVNode("span", null, [
                                      item.icon ? (openBlock(), createBlock(unref(Icon), {
                                        key: 0,
                                        icon: item.icon,
                                        class: "text-lg"
                                      }, null, 8, ["icon"])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("span", null, toDisplayString(item.title), 1)
                                  ], 8, ["href"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
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
              createVNode(unref(_sfc_main$R), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$M), null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                        return openBlock(), createBlock(unref(_sfc_main$H), {
                          key: item.title
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), {
                              class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode("a", {
                                  href: item.href,
                                  target: "_blank",
                                  rel: "noopener noreferrer"
                                }, [
                                  createVNode("span", null, [
                                    item.icon ? (openBlock(), createBlock(unref(Icon), {
                                      key: 0,
                                      icon: item.icon,
                                      class: "text-lg"
                                    }, null, 8, ["icon"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("span", null, toDisplayString(item.title), 1)
                                ], 8, ["href"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
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
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavFooter.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "Collapsible",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", { open })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/collapsible/Collapsible.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleContent), mergeProps(props, { class: "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/collapsible/CollapsibleContent.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleTrigger), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/collapsible/CollapsibleTrigger.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "NavMain",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const page = usePage();
    const isDropdownActive = (item) => {
      if (!item.children) return false;
      return item.children.some((child) => child.href === page.url);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$T), mergeProps({ class: "px-2 py-0" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$Q), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Main Menu`);
                } else {
                  return [
                    createTextVNode("Main Menu")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$M), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.items.filter((item) => item.isShow ?? true), (item) => {
                    _push3(`<!--[-->`);
                    if (!item.children) {
                      _push3(ssrRenderComponent(unref(_sfc_main$H), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$I), {
                              "as-child": "",
                              "is-active": item.href === unref(page).url
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (item.icon) {
                                          _push6(ssrRenderComponent(unref(Icon), {
                                            icon: item.icon,
                                            class: "text-lg"
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(`<span${_scopeId5}>${ssrInterpolate(item.title)}</span>`);
                                      } else {
                                        return [
                                          item.icon ? (openBlock(), createBlock(unref(Icon), {
                                            key: 0,
                                            icon: item.icon,
                                            class: "text-lg"
                                          }, null, 8, ["icon"])) : createCommentVNode("", true),
                                          createVNode("span", null, toDisplayString(item.title), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Link), {
                                      href: item.href
                                    }, {
                                      default: withCtx(() => [
                                        item.icon ? (openBlock(), createBlock(unref(Icon), {
                                          key: 0,
                                          icon: item.icon,
                                          class: "text-lg"
                                        }, null, 8, ["icon"])) : createCommentVNode("", true),
                                        createVNode("span", null, toDisplayString(item.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$I), {
                                "as-child": "",
                                "is-active": item.href === unref(page).url
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href
                                  }, {
                                    default: withCtx(() => [
                                      item.icon ? (openBlock(), createBlock(unref(Icon), {
                                        key: 0,
                                        icon: item.icon,
                                        class: "text-lg"
                                      }, null, 8, ["icon"])) : createCommentVNode("", true),
                                      createVNode("span", null, toDisplayString(item.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ]),
                                _: 2
                              }, 1032, ["is-active"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(_sfc_main$t), {
                        "default-open": isDropdownActive(item),
                        class: "group/collapsible"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$H), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$r), { "as-child": "" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(_sfc_main$I), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              if (item.icon) {
                                                _push7(ssrRenderComponent(unref(Icon), {
                                                  icon: item.icon,
                                                  class: "text-lg"
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              _push7(`<span${_scopeId6}>${ssrInterpolate(item.title)}</span>`);
                                              _push7(ssrRenderComponent(unref(Icon), {
                                                icon: "lucide:chevron-right",
                                                class: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                item.icon ? (openBlock(), createBlock(unref(Icon), {
                                                  key: 0,
                                                  icon: item.icon,
                                                  class: "text-lg"
                                                }, null, 8, ["icon"])) : createCommentVNode("", true),
                                                createVNode("span", null, toDisplayString(item.title), 1),
                                                createVNode(unref(Icon), {
                                                  icon: "lucide:chevron-right",
                                                  class: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$I), null, {
                                            default: withCtx(() => [
                                              item.icon ? (openBlock(), createBlock(unref(Icon), {
                                                key: 0,
                                                icon: item.icon,
                                                class: "text-lg"
                                              }, null, 8, ["icon"])) : createCommentVNode("", true),
                                              createVNode("span", null, toDisplayString(item.title), 1),
                                              createVNode(unref(Icon), {
                                                icon: "lucide:chevron-right",
                                                class: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                              })
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$s), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(_sfc_main$E), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(item.children.filter((child) => child.isShow ?? true), (child) => {
                                                _push7(ssrRenderComponent(unref(SidebarMenuSubItem), {
                                                  key: child.title
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$D), {
                                                        "as-child": "",
                                                        "is-active": child.href === unref(page).url
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(ssrRenderComponent(unref(Link), {
                                                              href: child.href
                                                            }, {
                                                              default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                                if (_push10) {
                                                                  _push10(`<span${_scopeId9}>${ssrInterpolate(child.title)}</span>`);
                                                                } else {
                                                                  return [
                                                                    createVNode("span", null, toDisplayString(child.title), 1)
                                                                  ];
                                                                }
                                                              }),
                                                              _: 2
                                                            }, _parent9, _scopeId8));
                                                          } else {
                                                            return [
                                                              createVNode(unref(Link), {
                                                                href: child.href
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode("span", null, toDisplayString(child.title), 1)
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["href"])
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(unref(_sfc_main$D), {
                                                          "as-child": "",
                                                          "is-active": child.href === unref(page).url
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Link), {
                                                              href: child.href
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode("span", null, toDisplayString(child.title), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["href"])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["is-active"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(item.children.filter((child) => child.isShow ?? true), (child) => {
                                                  return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                    key: child.title
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$D), {
                                                        "as-child": "",
                                                        "is-active": child.href === unref(page).url
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Link), {
                                                            href: child.href
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("span", null, toDisplayString(child.title), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["href"])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["is-active"])
                                                    ]),
                                                    _: 2
                                                  }, 1024);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$E), null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.children.filter((child) => child.isShow ?? true), (child) => {
                                                return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                  key: child.title
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$D), {
                                                      "as-child": "",
                                                      "is-active": child.href === unref(page).url
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Link), {
                                                          href: child.href
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("span", null, toDisplayString(child.title), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["href"])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["is-active"])
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$r), { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$I), null, {
                                          default: withCtx(() => [
                                            item.icon ? (openBlock(), createBlock(unref(Icon), {
                                              key: 0,
                                              icon: item.icon,
                                              class: "text-lg"
                                            }, null, 8, ["icon"])) : createCommentVNode("", true),
                                            createVNode("span", null, toDisplayString(item.title), 1),
                                            createVNode(unref(Icon), {
                                              icon: "lucide:chevron-right",
                                              class: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                            })
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$s), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$E), null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.children.filter((child) => child.isShow ?? true), (child) => {
                                              return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                key: child.title
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$D), {
                                                    "as-child": "",
                                                    "is-active": child.href === unref(page).url
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Link), {
                                                        href: child.href
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("span", null, toDisplayString(child.title), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["href"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["is-active"])
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$H), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$r), { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$I), null, {
                                        default: withCtx(() => [
                                          item.icon ? (openBlock(), createBlock(unref(Icon), {
                                            key: 0,
                                            icon: item.icon,
                                            class: "text-lg"
                                          }, null, 8, ["icon"])) : createCommentVNode("", true),
                                          createVNode("span", null, toDisplayString(item.title), 1),
                                          createVNode(unref(Icon), {
                                            icon: "lucide:chevron-right",
                                            class: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                          })
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$s), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$E), null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.children.filter((child) => child.isShow ?? true), (child) => {
                                            return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                              key: child.title
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$D), {
                                                  "as-child": "",
                                                  "is-active": child.href === unref(page).url
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Link), {
                                                      href: child.href
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("span", null, toDisplayString(child.title), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["href"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["is-active"])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items.filter((item) => item.isShow ?? true), (item) => {
                      return openBlock(), createBlock(Fragment, {
                        key: item.title
                      }, [
                        !item.children ? (openBlock(), createBlock(unref(_sfc_main$H), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), {
                              "as-child": "",
                              "is-active": item.href === unref(page).url
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href
                                }, {
                                  default: withCtx(() => [
                                    item.icon ? (openBlock(), createBlock(unref(Icon), {
                                      key: 0,
                                      icon: item.icon,
                                      class: "text-lg"
                                    }, null, 8, ["icon"])) : createCommentVNode("", true),
                                    createVNode("span", null, toDisplayString(item.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1032, ["is-active"])
                          ]),
                          _: 2
                        }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$t), {
                          key: 1,
                          "default-open": isDropdownActive(item),
                          class: "group/collapsible"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$H), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$r), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$I), null, {
                                      default: withCtx(() => [
                                        item.icon ? (openBlock(), createBlock(unref(Icon), {
                                          key: 0,
                                          icon: item.icon,
                                          class: "text-lg"
                                        }, null, 8, ["icon"])) : createCommentVNode("", true),
                                        createVNode("span", null, toDisplayString(item.title), 1),
                                        createVNode(unref(Icon), {
                                          icon: "lucide:chevron-right",
                                          class: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                        })
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$s), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$E), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.children.filter((child) => child.isShow ?? true), (child) => {
                                          return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                            key: child.title
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$D), {
                                                "as-child": "",
                                                "is-active": child.href === unref(page).url
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Link), {
                                                    href: child.href
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("span", null, toDisplayString(child.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["href"])
                                                ]),
                                                _: 2
                                              }, 1032, ["is-active"])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["default-open"]))
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$Q), null, {
                default: withCtx(() => [
                  createTextVNode("Main Menu")
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$M), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items.filter((item) => item.isShow ?? true), (item) => {
                    return openBlock(), createBlock(Fragment, {
                      key: item.title
                    }, [
                      !item.children ? (openBlock(), createBlock(unref(_sfc_main$H), { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$I), {
                            "as-child": "",
                            "is-active": item.href === unref(page).url
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href
                              }, {
                                default: withCtx(() => [
                                  item.icon ? (openBlock(), createBlock(unref(Icon), {
                                    key: 0,
                                    icon: item.icon,
                                    class: "text-lg"
                                  }, null, 8, ["icon"])) : createCommentVNode("", true),
                                  createVNode("span", null, toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            _: 2
                          }, 1032, ["is-active"])
                        ]),
                        _: 2
                      }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$t), {
                        key: 1,
                        "default-open": isDropdownActive(item),
                        class: "group/collapsible"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$H), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$r), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$I), null, {
                                    default: withCtx(() => [
                                      item.icon ? (openBlock(), createBlock(unref(Icon), {
                                        key: 0,
                                        icon: item.icon,
                                        class: "text-lg"
                                      }, null, 8, ["icon"])) : createCommentVNode("", true),
                                      createVNode("span", null, toDisplayString(item.title), 1),
                                      createVNode(unref(Icon), {
                                        icon: "lucide:chevron-right",
                                        class: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                      })
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$s), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$E), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.children.filter((child) => child.isShow ?? true), (child) => {
                                        return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                          key: child.title
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$D), {
                                              "as-child": "",
                                              "is-active": child.href === unref(page).url
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Link), {
                                                  href: child.href
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("span", null, toDisplayString(child.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["href"])
                                              ]),
                                              _: 2
                                            }, 1032, ["is-active"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["default-open"]))
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
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavMain.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "Avatar",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] },
    size: { default: "sm" },
    shape: { default: "circle" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AvatarRoot), mergeProps({
        class: unref(cn)(unref(avatarVariant)({ size: __props.size, shape: __props.shape }), props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/avatar/Avatar.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "AvatarFallback",
  __ssrInlineRender: true,
  props: {
    delayMs: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AvatarFallback), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/avatar/AvatarFallback.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "AvatarImage",
  __ssrInlineRender: true,
  props: {
    src: {},
    referrerPolicy: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AvatarImage), mergeProps(props, { class: "h-full w-full object-cover" }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/avatar/AvatarImage.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const avatarVariant = cva(
  "inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-10 w-10 text-xs",
        base: "h-16 w-16 text-2xl",
        lg: "h-32 w-32 text-5xl"
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md"
      }
    }
  }
);
function getInitials(fullName) {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  if (names.length === 0) return "";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
}
function useInitials() {
  return { getInitials };
}
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "UserInfo",
  __ssrInlineRender: true,
  props: {
    user: {},
    showEmail: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { getInitials: getInitials2 } = useInitials();
    const showAvatar = computed(() => props.user.avatar && props.user.avatar !== "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$p), { class: "h-8 w-8 overflow-hidden rounded-lg" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (showAvatar.value) {
              _push2(ssrRenderComponent(unref(_sfc_main$n), {
                src: __props.user.avatar,
                alt: __props.user.name
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(_sfc_main$o), { class: "rounded-lg text-black dark:text-white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(getInitials2)(__props.user.name))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(getInitials2)(__props.user.name)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              showAvatar.value ? (openBlock(), createBlock(unref(_sfc_main$n), {
                key: 0,
                src: __props.user.avatar,
                alt: __props.user.name
              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
              createVNode(unref(_sfc_main$o), { class: "rounded-lg text-black dark:text-white" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(getInitials2)(__props.user.name)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-medium">${ssrInterpolate(__props.user.name)}</span>`);
      if (__props.showEmail) {
        _push(`<span class="truncate text-xs text-muted-foreground">${ssrInterpolate(__props.user.email)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/UserInfo.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenu",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    dir: {},
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenu.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuCheckboxItem",
  __ssrInlineRender: true,
  props: {
    checked: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["select", "update:checked"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuCheckboxItem), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Check), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [
                createVNode(unref(DropdownMenuItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Check), { class: "h-4 w-4" })
                  ]),
                  _: 1
                })
              ]),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DropdownMenuContent), mergeProps(unref(forwarded), {
              class: unref(cn)(
                "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DropdownMenuContent), mergeProps(unref(forwarded), {
                class: unref(cn)(
                  "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuContent.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuGroup), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuGroup.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuItem",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] },
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuItem), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
          __props.inset && "pl-8",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuItem.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] },
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuLabel), mergeProps(unref(forwardedProps), {
        class: unref(cn)("px-2 py-1.5 text-sm font-semibold", __props.inset && "pl-8", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuLabel.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRadioGroup",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRadioGroup), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRadioItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRadioItem), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Circle), { class: "h-2 w-2 fill-current" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Circle), { class: "h-2 w-2 fill-current" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [
                createVNode(unref(DropdownMenuItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Circle), { class: "h-2 w-2 fill-current" })
                  ]),
                  _: 1
                })
              ]),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuRadioItem.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSeparator",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSeparator), mergeProps(delegatedProps.value, {
        class: unref(cn)("-mx-1 my-1 h-px bg-muted", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSeparator.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuShortcut",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: unref(cn)("ml-auto text-xs tracking-widest opacity-60", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuShortcut.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSub",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSub), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSub.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSubContent), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSubContent.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSubTrigger), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode(unref(ChevronRight), { class: "ml-auto h-4 w-4" })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const forwardedProps = useForwardProps(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuTrigger), mergeProps({ class: "outline-none" }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuTrigger.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "UserMenuContent",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$g), { class: "p-0 font-normal" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              user: __props.user,
              "show-email": true
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                createVNode(_sfc_main$m, {
                  user: __props.user,
                  "show-email": true
                }, null, 8, ["user"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$d), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$i), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$h), { "as-child": true }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    class: "block w-full",
                    href: _ctx.route("profile.edit"),
                    as: "button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Settings), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Settings `);
                      } else {
                        return [
                          createVNode(unref(Settings), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Settings ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      class: "block w-full",
                      href: _ctx.route("profile.edit"),
                      as: "button"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Settings), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Settings ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$h), { "as-child": true }, {
                default: withCtx(() => [
                  createVNode(unref(Link), {
                    class: "block w-full",
                    href: _ctx.route("profile.edit"),
                    as: "button"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Settings), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Settings ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$d), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$h), { "as-child": true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link), {
              class: "block w-full",
              method: "post",
              href: _ctx.route("logout"),
              as: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(LogOut), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Log out `);
                } else {
                  return [
                    createVNode(unref(LogOut), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Log out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link), {
                class: "block w-full",
                method: "post",
                href: _ctx.route("logout"),
                as: "button"
              }, {
                default: withCtx(() => [
                  createVNode(unref(LogOut), { class: "mr-2 h-4 w-4" }),
                  createTextVNode(" Log out ")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/UserMenuContent.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NavUser",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = page.props.auth.user;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$M), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$H), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$I), {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$m, { user: unref(user) }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-auto size-4" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$m, { user: unref(user) }, null, 8, ["user"]),
                                      createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$I), {
                                  size: "lg",
                                  class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$m, { user: unref(user) }, null, 8, ["user"]),
                                    createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), {
                          class: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                          side: "bottom",
                          align: "end",
                          "side-offset": 4
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$7, { user: unref(user) }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$I), {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$m, { user: unref(user) }, null, 8, ["user"]),
                                  createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), {
                            class: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                            side: "bottom",
                            align: "end",
                            "side-offset": 4
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$l), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), {
                              size: "lg",
                              class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$m, { user: unref(user) }, null, 8, ["user"]),
                                createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), {
                          class: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                          side: "bottom",
                          align: "end",
                          "side-offset": 4
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$H), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$8), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$I), {
                            size: "lg",
                            class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$m, { user: unref(user) }, null, 8, ["user"]),
                              createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), {
                        class: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                        side: "bottom",
                        align: "end",
                        "side-offset": 4
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
                        ]),
                        _: 1
                      })
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavUser.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AppLogo",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex aspect-square size-8 items-center justify-center rounded-none bg-sidebar-primary text-sidebar-primary-foreground">`);
      _push(ssrRenderComponent(_sfc_main$18, { class: "size-7" }, null, _parent));
      _push(`</div><div class="ml-1 grid flex-1 text-left text-sm"><span class="mb-0.5 truncate font-semibold leading-none">RITS ADMIN PANEL</span></div><!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppLogo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const page = usePage();
    const mainNavItems = [
      {
        title: "Dashboard",
        href: route("admin.dashboard"),
        icon: "si:grid-duotone"
      },
      {
        title: "Packages",
        icon: "lucide:package",
        children: [
          {
            title: "Packages List",
            href: route("admin.packages")
          },
          {
            title: "Groups",
            href: route("admin.packages.groups")
          }
        ]
      },
      {
        title: "Destinations",
        icon: "lucide:map",
        children: [
          {
            title: "Countries List",
            href: route("admin.destinations")
          }
        ]
      },
      {
        title: "Bookings",
        href: route("admin.bookings"),
        icon: "ant-design:book-outlined"
      },
      {
        title: "Inquiries",
        href: route("admin.inquiries"),
        icon: "ix:inquiry"
      },
      {
        title: "Users",
        icon: "lucide:users",
        isShow: ((_a = page.props.auth.user) == null ? void 0 : _a.role) === "admin",
        children: [
          {
            title: "Admins",
            href: route("admin.users.admins")
          },
          {
            title: "Clients",
            href: route("admin.users.clients")
          }
        ]
      },
      {
        title: "Logs",
        href: route("admin.logs"),
        icon: "streamline-sharp:reset-clock"
      }
    ];
    const footerNavItems = [
      {
        title: "Github Repo",
        href: "https://github.com/reliabletravelinternationalservices/ritsms-v3",
        icon: "mdi:github",
        isShow: ((_b = page.props.auth.user) == null ? void 0 : _b.role) === "admin"
      },
      {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits",
        icon: "tabler:book",
        isShow: ((_c = page.props.auth.user) == null ? void 0 : _c.role) === "admin"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$W), {
        collapsible: "icon",
        variant: "inset"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$P), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$M), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$H), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$I), {
                                size: "lg",
                                "as-child": ""
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Link), {
                                      href: _ctx.route("admin.dashboard")
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_sfc_main$5, null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_sfc_main$5)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Link), {
                                        href: _ctx.route("admin.dashboard")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$5)
                                        ]),
                                        _: 1
                                      }, 8, ["href"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$I), {
                                  size: "lg",
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin.dashboard")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$5)
                                      ]),
                                      _: 1
                                    }, 8, ["href"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$H), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$I), {
                                size: "lg",
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin.dashboard")
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$5)
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$M), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$H), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), {
                              size: "lg",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.dashboard")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$5)
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$V), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$q, { items: mainNavItems }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$q, { items: mainNavItems })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$U), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$u, { items: footerNavItems }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$u, { items: footerNavItems }),
                    createVNode(_sfc_main$6)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$P), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$M), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$H), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$I), {
                            size: "lg",
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.dashboard")
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$5)
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$V), null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$q, { items: mainNavItems })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$U), null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$u, { items: footerNavItems }),
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NotificationDropdown",
  __ssrInlineRender: true,
  props: {
    notifications: { default: () => [] }
  },
  emits: ["markAsRead", "markAllAsRead", "seeAll"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isOpen = ref(false);
    const unreadCount = computed(() => {
      return props.notifications.filter((n) => n.unread).length;
    });
    const getTypeIcon = (type) => {
      switch (type) {
        case "success":
          return CheckCircle2;
        case "warning":
          return AlertTriangle;
        case "error":
          return XCircle;
        default:
          return Info;
      }
    };
    const getTypeIconClass = (type) => {
      switch (type) {
        case "success":
          return "text-emerald-500 bg-emerald-500/10";
        case "warning":
          return "text-amber-500 bg-amber-500/10";
        case "error":
          return "text-destructive bg-destructive/10";
        default:
          return "text-blue-500 bg-blue-500/10";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$l), mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$8), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$17), {
                    variant: "outline",
                    size: "icon",
                    class: "relative rounded-full bg-background border-input",
                    "aria-label": "Notifications"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Bell), { class: "h-5 w-5 text-muted-foreground" }, null, _parent4, _scopeId3));
                        if (unreadCount.value > 0) {
                          _push4(ssrRenderComponent(unref(_sfc_main$19), {
                            variant: "destructive",
                            class: "absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-[10px] font-bold animate-pulse"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unreadCount.value)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unreadCount.value), 1)
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
                          createVNode(unref(Bell), { class: "h-5 w-5 text-muted-foreground" }),
                          unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                            key: 0,
                            variant: "destructive",
                            class: "absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-[10px] font-bold animate-pulse"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unreadCount.value), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$17), {
                      variant: "outline",
                      size: "icon",
                      class: "relative rounded-full bg-background border-input",
                      "aria-label": "Notifications"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Bell), { class: "h-5 w-5 text-muted-foreground" }),
                        unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                          key: 0,
                          variant: "destructive",
                          class: "absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-[10px] font-bold animate-pulse"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unreadCount.value), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$j), {
              align: "end",
              class: "w-[360px] p-0 md:w-[400px] bg-popover border border-border shadow-lg rounded-xl overflow-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1a), { class: "border-0 shadow-none bg-transparent" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1b), { class: "flex flex-row items-center justify-between space-y-0 px-4 py-3 border-b border-border bg-muted/20" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$1c), { class: "text-sm font-semibold flex items-center gap-2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Notifications `);
                                    if (unreadCount.value > 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$19), {
                                        variant: "secondary",
                                        class: "text-xs font-normal"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(unreadCount.value)} new `);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      createTextVNode(" Notifications "),
                                      unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                                        key: 0,
                                        variant: "secondary",
                                        class: "text-xs font-normal"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unreadCount.value > 0) {
                                _push5(ssrRenderComponent(unref(_sfc_main$17), {
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground",
                                  onClick: ($event) => emit("markAllAsRead")
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Mark all read `);
                                    } else {
                                      return [
                                        createTextVNode(" Mark all read ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(unref(_sfc_main$1c), { class: "text-sm font-semibold flex items-center gap-2" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Notifications "),
                                    unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                                      key: 0,
                                      variant: "secondary",
                                      class: "text-xs font-normal"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$17), {
                                  key: 0,
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground",
                                  onClick: ($event) => emit("markAllAsRead")
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Mark all read ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$1d), { class: "p-0 max-h-[380px] overflow-y-auto divide-y divide-border/60" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.notifications.length === 0) {
                                _push5(`<div class="flex flex-col items-center justify-center py-12 px-4 text-center"${_scopeId4}><div class="p-3 bg-muted rounded-full mb-3"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Bell), { class: "h-6 w-6 text-muted-foreground/60" }, null, _parent5, _scopeId4));
                                _push5(`</div><p class="text-sm font-medium text-foreground"${_scopeId4}>All caught up!</p><p class="text-xs text-muted-foreground mt-1"${_scopeId4}>No new notifications at the moment.</p></div>`);
                              } else {
                                _push5(`<!--[-->`);
                                ssrRenderList(__props.notifications, (item) => {
                                  _push5(`<div class="${ssrRenderClass([
                                    "flex items-start gap-3 p-4 transition-all relative group border-l-[3px]",
                                    item.unread ? "bg-accent/40 dark:bg-accent/15 border-l-primary font-medium opacity-100" : "border-l-transparent opacity-65 hover:opacity-100 hover:bg-muted/40"
                                  ])}"${_scopeId4}><div class="${ssrRenderClass(["p-2 rounded-lg shrink-0 mt-0.5", getTypeIconClass(item.type)])}"${_scopeId4}>`);
                                  ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(getTypeIcon(item.type)), { class: "h-4 w-4" }, null), _parent5, _scopeId4);
                                  _push5(`</div><div class="flex-1 min-w-0 space-y-1"${_scopeId4}><div class="flex items-baseline justify-between gap-2"${_scopeId4}><p class="${ssrRenderClass(["text-sm leading-tight text-foreground truncate", item.unread ? "font-semibold" : "font-normal"])}"${_scopeId4}>${ssrInterpolate(item.title)}</p><span class="text-[11px] text-muted-foreground shrink-0"${_scopeId4}>${ssrInterpolate(item.time)}</span></div><p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed break-words"${_scopeId4}>${ssrInterpolate(item.description)}</p></div><div class="flex items-center self-center shrink-0 ml-1 min-w-[28px]"${_scopeId4}>`);
                                  if (item.unread) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$17), {
                                      variant: "ghost",
                                      size: "icon",
                                      class: "h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity",
                                      title: "Mark as read",
                                      onClick: ($event) => emit("markAsRead", item.id)
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(unref(Check), { class: "h-4 w-4" })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div></div>`);
                                });
                                _push5(`<!--]-->`);
                              }
                            } else {
                              return [
                                __props.notifications.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex flex-col items-center justify-center py-12 px-4 text-center"
                                }, [
                                  createVNode("div", { class: "p-3 bg-muted rounded-full mb-3" }, [
                                    createVNode(unref(Bell), { class: "h-6 w-6 text-muted-foreground/60" })
                                  ]),
                                  createVNode("p", { class: "text-sm font-medium text-foreground" }, "All caught up!"),
                                  createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "No new notifications at the moment.")
                                ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.notifications, (item) => {
                                  return openBlock(), createBlock("div", {
                                    key: item.id,
                                    class: [
                                      "flex items-start gap-3 p-4 transition-all relative group border-l-[3px]",
                                      item.unread ? "bg-accent/40 dark:bg-accent/15 border-l-primary font-medium opacity-100" : "border-l-transparent opacity-65 hover:opacity-100 hover:bg-muted/40"
                                    ]
                                  }, [
                                    createVNode("div", {
                                      class: ["p-2 rounded-lg shrink-0 mt-0.5", getTypeIconClass(item.type)]
                                    }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(getTypeIcon(item.type)), { class: "h-4 w-4" }))
                                    ], 2),
                                    createVNode("div", { class: "flex-1 min-w-0 space-y-1" }, [
                                      createVNode("div", { class: "flex items-baseline justify-between gap-2" }, [
                                        createVNode("p", {
                                          class: ["text-sm leading-tight text-foreground truncate", item.unread ? "font-semibold" : "font-normal"]
                                        }, toDisplayString(item.title), 3),
                                        createVNode("span", { class: "text-[11px] text-muted-foreground shrink-0" }, toDisplayString(item.time), 1)
                                      ]),
                                      createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2 leading-relaxed break-words" }, toDisplayString(item.description), 1)
                                    ]),
                                    createVNode("div", { class: "flex items-center self-center shrink-0 ml-1 min-w-[28px]" }, [
                                      item.unread ? (openBlock(), createBlock(unref(_sfc_main$17), {
                                        key: 0,
                                        variant: "ghost",
                                        size: "icon",
                                        class: "h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity",
                                        title: "Mark as read",
                                        onClick: ($event) => emit("markAsRead", item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Check), { class: "h-4 w-4" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true)
                                    ])
                                  ], 2);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.notifications.length > 0) {
                          _push4(`<div class="p-2 border-t border-border bg-muted/30"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$17), {
                            variant: "ghost",
                            size: "sm",
                            class: "w-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 transition-colors",
                            onClick: ($event) => emit("seeAll")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` See all notifications `);
                                _push5(ssrRenderComponent(unref(ArrowRight), { class: "h-3.5 w-3.5" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createTextVNode(" See all notifications "),
                                  createVNode(unref(ArrowRight), { class: "h-3.5 w-3.5" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1b), { class: "flex flex-row items-center justify-between space-y-0 px-4 py-3 border-b border-border bg-muted/20" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$1c), { class: "text-sm font-semibold flex items-center gap-2" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Notifications "),
                                  unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                                    key: 0,
                                    variant: "secondary",
                                    class: "text-xs font-normal"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$17), {
                                key: 0,
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground",
                                onClick: ($event) => emit("markAllAsRead")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Mark all read ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$1d), { class: "p-0 max-h-[380px] overflow-y-auto divide-y divide-border/60" }, {
                            default: withCtx(() => [
                              __props.notifications.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex flex-col items-center justify-center py-12 px-4 text-center"
                              }, [
                                createVNode("div", { class: "p-3 bg-muted rounded-full mb-3" }, [
                                  createVNode(unref(Bell), { class: "h-6 w-6 text-muted-foreground/60" })
                                ]),
                                createVNode("p", { class: "text-sm font-medium text-foreground" }, "All caught up!"),
                                createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "No new notifications at the moment.")
                              ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.notifications, (item) => {
                                return openBlock(), createBlock("div", {
                                  key: item.id,
                                  class: [
                                    "flex items-start gap-3 p-4 transition-all relative group border-l-[3px]",
                                    item.unread ? "bg-accent/40 dark:bg-accent/15 border-l-primary font-medium opacity-100" : "border-l-transparent opacity-65 hover:opacity-100 hover:bg-muted/40"
                                  ]
                                }, [
                                  createVNode("div", {
                                    class: ["p-2 rounded-lg shrink-0 mt-0.5", getTypeIconClass(item.type)]
                                  }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(getTypeIcon(item.type)), { class: "h-4 w-4" }))
                                  ], 2),
                                  createVNode("div", { class: "flex-1 min-w-0 space-y-1" }, [
                                    createVNode("div", { class: "flex items-baseline justify-between gap-2" }, [
                                      createVNode("p", {
                                        class: ["text-sm leading-tight text-foreground truncate", item.unread ? "font-semibold" : "font-normal"]
                                      }, toDisplayString(item.title), 3),
                                      createVNode("span", { class: "text-[11px] text-muted-foreground shrink-0" }, toDisplayString(item.time), 1)
                                    ]),
                                    createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2 leading-relaxed break-words" }, toDisplayString(item.description), 1)
                                  ]),
                                  createVNode("div", { class: "flex items-center self-center shrink-0 ml-1 min-w-[28px]" }, [
                                    item.unread ? (openBlock(), createBlock(unref(_sfc_main$17), {
                                      key: 0,
                                      variant: "ghost",
                                      size: "icon",
                                      class: "h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity",
                                      title: "Mark as read",
                                      onClick: ($event) => emit("markAsRead", item.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Check), { class: "h-4 w-4" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ], 2);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          __props.notifications.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-2 border-t border-border bg-muted/30"
                          }, [
                            createVNode(unref(_sfc_main$17), {
                              variant: "ghost",
                              size: "sm",
                              class: "w-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 transition-colors",
                              onClick: ($event) => emit("seeAll")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" See all notifications "),
                                createVNode(unref(ArrowRight), { class: "h-3.5 w-3.5" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$1a), { class: "border-0 shadow-none bg-transparent" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1b), { class: "flex flex-row items-center justify-between space-y-0 px-4 py-3 border-b border-border bg-muted/20" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$1c), { class: "text-sm font-semibold flex items-center gap-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Notifications "),
                                unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                                  key: 0,
                                  variant: "secondary",
                                  class: "text-xs font-normal"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$17), {
                              key: 0,
                              variant: "ghost",
                              size: "sm",
                              class: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground",
                              onClick: ($event) => emit("markAllAsRead")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Mark all read ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$1d), { class: "p-0 max-h-[380px] overflow-y-auto divide-y divide-border/60" }, {
                          default: withCtx(() => [
                            __props.notifications.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-col items-center justify-center py-12 px-4 text-center"
                            }, [
                              createVNode("div", { class: "p-3 bg-muted rounded-full mb-3" }, [
                                createVNode(unref(Bell), { class: "h-6 w-6 text-muted-foreground/60" })
                              ]),
                              createVNode("p", { class: "text-sm font-medium text-foreground" }, "All caught up!"),
                              createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "No new notifications at the moment.")
                            ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.notifications, (item) => {
                              return openBlock(), createBlock("div", {
                                key: item.id,
                                class: [
                                  "flex items-start gap-3 p-4 transition-all relative group border-l-[3px]",
                                  item.unread ? "bg-accent/40 dark:bg-accent/15 border-l-primary font-medium opacity-100" : "border-l-transparent opacity-65 hover:opacity-100 hover:bg-muted/40"
                                ]
                              }, [
                                createVNode("div", {
                                  class: ["p-2 rounded-lg shrink-0 mt-0.5", getTypeIconClass(item.type)]
                                }, [
                                  (openBlock(), createBlock(resolveDynamicComponent(getTypeIcon(item.type)), { class: "h-4 w-4" }))
                                ], 2),
                                createVNode("div", { class: "flex-1 min-w-0 space-y-1" }, [
                                  createVNode("div", { class: "flex items-baseline justify-between gap-2" }, [
                                    createVNode("p", {
                                      class: ["text-sm leading-tight text-foreground truncate", item.unread ? "font-semibold" : "font-normal"]
                                    }, toDisplayString(item.title), 3),
                                    createVNode("span", { class: "text-[11px] text-muted-foreground shrink-0" }, toDisplayString(item.time), 1)
                                  ]),
                                  createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2 leading-relaxed break-words" }, toDisplayString(item.description), 1)
                                ]),
                                createVNode("div", { class: "flex items-center self-center shrink-0 ml-1 min-w-[28px]" }, [
                                  item.unread ? (openBlock(), createBlock(unref(_sfc_main$17), {
                                    key: 0,
                                    variant: "ghost",
                                    size: "icon",
                                    class: "h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity",
                                    title: "Mark as read",
                                    onClick: ($event) => emit("markAsRead", item.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Check), { class: "h-4 w-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ], 2);
                            }), 128))
                          ]),
                          _: 1
                        }),
                        __props.notifications.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-2 border-t border-border bg-muted/30"
                        }, [
                          createVNode(unref(_sfc_main$17), {
                            variant: "ghost",
                            size: "sm",
                            class: "w-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 transition-colors",
                            onClick: ($event) => emit("seeAll")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" See all notifications "),
                              createVNode(unref(ArrowRight), { class: "h-3.5 w-3.5" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])) : createCommentVNode("", true)
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
              createVNode(unref(_sfc_main$8), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$17), {
                    variant: "outline",
                    size: "icon",
                    class: "relative rounded-full bg-background border-input",
                    "aria-label": "Notifications"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Bell), { class: "h-5 w-5 text-muted-foreground" }),
                      unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                        key: 0,
                        variant: "destructive",
                        class: "absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-[10px] font-bold animate-pulse"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unreadCount.value), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$j), {
                align: "end",
                class: "w-[360px] p-0 md:w-[400px] bg-popover border border-border shadow-lg rounded-xl overflow-hidden"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1a), { class: "border-0 shadow-none bg-transparent" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1b), { class: "flex flex-row items-center justify-between space-y-0 px-4 py-3 border-b border-border bg-muted/20" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1c), { class: "text-sm font-semibold flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Notifications "),
                              unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$19), {
                                key: 0,
                                variant: "secondary",
                                class: "text-xs font-normal"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          unreadCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$17), {
                            key: 0,
                            variant: "ghost",
                            size: "sm",
                            class: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground",
                            onClick: ($event) => emit("markAllAsRead")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Mark all read ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1d), { class: "p-0 max-h-[380px] overflow-y-auto divide-y divide-border/60" }, {
                        default: withCtx(() => [
                          __props.notifications.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-col items-center justify-center py-12 px-4 text-center"
                          }, [
                            createVNode("div", { class: "p-3 bg-muted rounded-full mb-3" }, [
                              createVNode(unref(Bell), { class: "h-6 w-6 text-muted-foreground/60" })
                            ]),
                            createVNode("p", { class: "text-sm font-medium text-foreground" }, "All caught up!"),
                            createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "No new notifications at the moment.")
                          ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.notifications, (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: [
                                "flex items-start gap-3 p-4 transition-all relative group border-l-[3px]",
                                item.unread ? "bg-accent/40 dark:bg-accent/15 border-l-primary font-medium opacity-100" : "border-l-transparent opacity-65 hover:opacity-100 hover:bg-muted/40"
                              ]
                            }, [
                              createVNode("div", {
                                class: ["p-2 rounded-lg shrink-0 mt-0.5", getTypeIconClass(item.type)]
                              }, [
                                (openBlock(), createBlock(resolveDynamicComponent(getTypeIcon(item.type)), { class: "h-4 w-4" }))
                              ], 2),
                              createVNode("div", { class: "flex-1 min-w-0 space-y-1" }, [
                                createVNode("div", { class: "flex items-baseline justify-between gap-2" }, [
                                  createVNode("p", {
                                    class: ["text-sm leading-tight text-foreground truncate", item.unread ? "font-semibold" : "font-normal"]
                                  }, toDisplayString(item.title), 3),
                                  createVNode("span", { class: "text-[11px] text-muted-foreground shrink-0" }, toDisplayString(item.time), 1)
                                ]),
                                createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2 leading-relaxed break-words" }, toDisplayString(item.description), 1)
                              ]),
                              createVNode("div", { class: "flex items-center self-center shrink-0 ml-1 min-w-[28px]" }, [
                                item.unread ? (openBlock(), createBlock(unref(_sfc_main$17), {
                                  key: 0,
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity",
                                  title: "Mark as read",
                                  onClick: ($event) => emit("markAsRead", item.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Check), { class: "h-4 w-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ], 2);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      __props.notifications.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-2 border-t border-border bg-muted/30"
                      }, [
                        createVNode(unref(_sfc_main$17), {
                          variant: "ghost",
                          size: "sm",
                          class: "w-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 transition-colors",
                          onClick: ($event) => emit("seeAll")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" See all notifications "),
                            createVNode(unref(ArrowRight), { class: "h-3.5 w-3.5" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])) : createCommentVNode("", true)
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NotificationDropdown.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebarHeader",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: {}
  },
  setup(__props) {
    const sampleNotifications = [
      {
        id: 1,
        title: "New Inquiry Received",
        description: "You have a new inquiry from John Doe.",
        time: "2 hours ago",
        unread: true,
        type: "info"
      },
      {
        id: 2,
        title: "Booking Confirmed",
        description: "Your booking for Paris has been confirmed.",
        time: "1 day ago",
        unread: false,
        type: "success"
      },
      {
        id: 3,
        title: "Payment Failed",
        description: "Payment for your recent booking failed.",
        time: "3 days ago",
        unread: true,
        type: "error"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:px-4" }, _attrs))}><div class="flex items-center gap-2 flex-1">`);
      _push(ssrRenderComponent(unref(_sfc_main$x), { class: "-ml-1" }, null, _parent));
      if (__props.breadcrumbs && __props.breadcrumbs.length > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$1e), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1f), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.breadcrumbs, (item, index) => {
                      _push3(`<!--[-->`);
                      _push3(ssrRenderComponent(unref(_sfc_main$1g), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (index === __props.breadcrumbs.length - 1) {
                              _push4(ssrRenderComponent(unref(_sfc_main$1h), null, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(item.title)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(item.title), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(_sfc_main$1i), {
                                href: item.href
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(item.title)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(item.title), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            }
                          } else {
                            return [
                              index === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$1h), { key: 0 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$1i), {
                                key: 1,
                                href: item.href
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      if (index !== __props.breadcrumbs.length - 1) {
                        _push3(ssrRenderComponent(unref(_sfc_main$1j), null, null, _parent3, _scopeId2));
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
                          createVNode(unref(_sfc_main$1g), null, {
                            default: withCtx(() => [
                              index === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$1h), { key: 0 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$1i), {
                                key: 1,
                                href: item.href
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]))
                            ]),
                            _: 2
                          }, 1024),
                          index !== __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$1j), { key: 0 })) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1f), null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.breadcrumbs, (item, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        createVNode(unref(_sfc_main$1g), null, {
                          default: withCtx(() => [
                            index === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$1h), { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$1i), {
                              key: 1,
                              href: item.href
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]))
                          ]),
                          _: 2
                        }, 1024),
                        index !== __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$1j), { key: 0 })) : createCommentVNode("", true)
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
      _push(`<div class="ml-auto flex items-center">`);
      _push(ssrRenderComponent(_sfc_main$3, { notifications: sampleNotifications }, null, _parent));
      _push(`</div></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppSidebarHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebarLayout",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({ variant: "sidebar" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$w, { variant: "sidebar" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { breadcrumbs: __props.breadcrumbs }, null, _parent3, _scopeId2));
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode(_sfc_main$2, { breadcrumbs: __props.breadcrumbs }, null, 8, ["breadcrumbs"]),
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4),
              createVNode(_sfc_main$w, { variant: "sidebar" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, { breadcrumbs: __props.breadcrumbs }, null, 8, ["breadcrumbs"]),
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/app/AppSidebarLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppLayout",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: __props.breadcrumbs }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/AppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$z as a,
  _sfc_main$l as b,
  _sfc_main$8 as c,
  _sfc_main$j as d,
  _sfc_main$h as e,
  _sfc_main$g as f,
  _sfc_main$d as g,
  _sfc_main$k as h,
  _sfc_main$p as i,
  _sfc_main$n as j,
  _sfc_main$o as k
};
