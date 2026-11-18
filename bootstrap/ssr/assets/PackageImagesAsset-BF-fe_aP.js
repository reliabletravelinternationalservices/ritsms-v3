import { defineComponent, unref, mergeProps, withCtx, createVNode, useSSRContext, renderSlot, ref, computed, withModifiers, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, watch } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Pin, GripVertical, Trash2, UploadCloud, CheckCircle2, AlertCircle, X, Plus, Image } from "lucide-vue-next";
import { Icon } from "@iconify/vue";
import { c as cn, _ as _sfc_main$a, e as _sfc_main$c, h as _sfc_main$d, i as _sfc_main$e, j as _sfc_main$f, k as _sfc_main$g } from "../ssr.js";
import axios from "axios";
import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaRoot, ScrollAreaViewport, ScrollAreaCorner, ProgressRoot, ProgressIndicator } from "reka-ui";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$b } from "./TooltipTrigger-B2yyxzkT.js";
import { _ as _sfc_main$7 } from "./TooltipProvider-D2JAfXHP.js";
import { useForm } from "@inertiajs/vue3";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ScrollBar",
  __ssrInlineRender: true,
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaScrollbar), mergeProps(unref(delegatedProps), {
        class: unref(cn)(
          "flex touch-none select-none transition-colors",
          __props.orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
          __props.orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaThumb), { class: "relative flex-1 rounded-full bg-border" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaThumb), { class: "relative flex-1 rounded-full bg-border" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/scroll-area/ScrollBar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ScrollArea",
  __ssrInlineRender: true,
  props: {
    type: {},
    dir: {},
    scrollHideDelay: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaRoot), mergeProps(unref(delegatedProps), {
        class: unref(cn)("relative overflow-hidden", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaViewport), { class: "h-full w-full rounded-[inherit]" }, {
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
            _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ScrollAreaCorner), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaViewport), { class: "h-full w-full rounded-[inherit]" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(_sfc_main$6),
              createVNode(unref(ScrollAreaCorner))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/scroll-area/ScrollArea.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "GalleryView",
  __ssrInlineRender: true,
  props: {
    images: {},
    originalImages: {},
    deletedIds: {},
    isSaving: { type: Boolean }
  },
  emits: ["update:images", "update:deletedIds", "close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const draggedIndex = ref(null);
    const getOriginalIndex = (id) => {
      return props.originalImages.findIndex((image) => image.id === id);
    };
    const hasChanges = computed(() => {
      if (props.deletedIds.length > 0) {
        return true;
      }
      if (props.images.length !== props.originalImages.length) {
        return true;
      }
      return props.images.some((image, index) => {
        const original = props.originalImages.find((originalImage) => originalImage.id === image.id);
        if (!original) {
          return true;
        }
        return image.is_primary !== original.is_primary || index !== getOriginalIndex(image.id);
      });
    });
    const onDragStart = (index) => {
      if (props.isSaving) return;
      draggedIndex.value = index;
    };
    const onDragEnter = (targetIndex) => {
      if (draggedIndex.value === null || draggedIndex.value === targetIndex || props.isSaving) return;
      const updatedList = [...props.images];
      const [removedItem] = updatedList.splice(draggedIndex.value, 1);
      updatedList.splice(targetIndex, 0, removedItem);
      draggedIndex.value = targetIndex;
      emit("update:images", updatedList);
    };
    const onDragEnd = () => {
      draggedIndex.value = null;
    };
    const togglePin = (targetId) => {
      if (props.isSaving) return;
      const targetItem = props.images.find((img) => img.id === targetId);
      if (!targetItem) return;
      const willBePrimary = !targetItem.is_primary;
      const updated = props.images.map((img) => ({
        ...img,
        // If setting to true, explicitly flip all other image records to false
        is_primary: img.id === targetId ? willBePrimary : willBePrimary ? false : img.is_primary
      }));
      emit("update:images", updated);
    };
    const deleteImage = (targetId) => {
      if (props.isSaving) return;
      const updated = props.images.filter((img) => img.id !== targetId);
      emit("update:images", updated);
      if (!props.deletedIds.includes(targetId)) {
        emit("update:deletedIds", [...props.deletedIds, targetId]);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-1 flex flex-col min-h-0" }, _attrs))}><div class="flex-1 min-h-0 my-2 relative">`);
      _push(ssrRenderComponent(unref(_sfc_main$5), { class: "h-full w-full absolute inset-0 pr-3" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.images.length === 0) {
              _push2(`<div class="flex flex-col items-center justify-center h-full min-h-[250px] text-muted-foreground border-2 border-dashed rounded-lg"${_scopeId}><p class="text-sm font-medium"${_scopeId}>No images assigned to this package yet.</p></div>`);
            } else {
              _push2(`<div class="grid grid-cols-2 gap-4 pt-1 pb-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.images, (image, index) => {
                _push2(`<div${ssrRenderAttr("draggable", !__props.isSaving)} class="${ssrRenderClass([{
                  "cursor-grab active:cursor-grabbing": !__props.isSaving,
                  "border-primary ring-2 ring-primary/10": image.is_primary,
                  "opacity-40 border-dashed border-muted-foreground scale-95": draggedIndex.value === index,
                  "opacity-60 pointer-events-none": __props.isSaving
                }, "group relative border rounded-lg overflow-hidden bg-secondary/10 transition-all duration-200 select-none"])}"${_scopeId}><div class="aspect-video w-full overflow-hidden bg-zinc-950 flex items-center justify-center relative pointer-events-none"${_scopeId}><img${ssrRenderAttr("src", image.url || image.file_path)}${ssrRenderAttr("alt", image.alt_text || "Package media")} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"${_scopeId}>`);
                if (image.is_primary) {
                  _push2(`<div class="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-medium shadow-sm"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Pin), { class: "h-2.5 w-2.5 fill-current" }, null, _parent2, _scopeId));
                  _push2(` Cover Image </div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="p-1.5 bg-background flex items-center justify-between border-t gap-1"${_scopeId}><div class="flex items-center text-muted-foreground/60 px-1"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(GripVertical), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`<span class="text-[10px] font-bold tracking-wider ml-0.5 text-zinc-400"${_scopeId}>#${ssrInterpolate(index + 1)}</span></div><div class="flex items-center gap-0.5"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(_sfc_main$7), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$9), { asChild: "" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "icon",
                                    class: ["h-7 w-7 text-muted-foreground", { "text-primary bg-primary/10 hover:bg-primary/20": image.is_primary }],
                                    onClick: ($event) => togglePin(image.id),
                                    disabled: __props.isSaving
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Pin), {
                                          class: ["h-3.5 w-3.5", { "fill-current": image.is_primary }]
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Pin), {
                                            class: ["h-3.5 w-3.5", { "fill-current": image.is_primary }]
                                          }, null, 8, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "icon",
                                      class: ["h-7 w-7 text-muted-foreground", { "text-primary bg-primary/10 hover:bg-primary/20": image.is_primary }],
                                      onClick: withModifiers(($event) => togglePin(image.id), ["stop"]),
                                      disabled: __props.isSaving
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pin), {
                                          class: ["h-3.5 w-3.5", { "fill-current": image.is_primary }]
                                        }, null, 8, ["class"])
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "onClick", "disabled"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$b), { class: "text-[10px]" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(image.is_primary ? "Unset Cover status" : "Make Exclusive Main Cover")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(image.is_primary ? "Unset Cover status" : "Make Exclusive Main Cover"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$9), { asChild: "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "icon",
                                    class: ["h-7 w-7 text-muted-foreground", { "text-primary bg-primary/10 hover:bg-primary/20": image.is_primary }],
                                    onClick: withModifiers(($event) => togglePin(image.id), ["stop"]),
                                    disabled: __props.isSaving
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Pin), {
                                        class: ["h-3.5 w-3.5", { "fill-current": image.is_primary }]
                                      }, null, 8, ["class"])
                                    ]),
                                    _: 2
                                  }, 1032, ["class", "onClick", "disabled"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$b), { class: "text-[10px]" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(image.is_primary ? "Unset Cover status" : "Make Exclusive Main Cover"), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), { asChild: "" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), {
                                  type: "button",
                                  variant: "ghost",
                                  size: "icon",
                                  class: ["h-7 w-7 text-muted-foreground", { "text-primary bg-primary/10 hover:bg-primary/20": image.is_primary }],
                                  onClick: withModifiers(($event) => togglePin(image.id), ["stop"]),
                                  disabled: __props.isSaving
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pin), {
                                      class: ["h-3.5 w-3.5", { "fill-current": image.is_primary }]
                                    }, null, 8, ["class"])
                                  ]),
                                  _: 2
                                }, 1032, ["class", "onClick", "disabled"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$b), { class: "text-[10px]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(image.is_primary ? "Unset Cover status" : "Make Exclusive Main Cover"), 1)
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
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$a), {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  class: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                  onClick: ($event) => deleteImage(image.id),
                  disabled: __props.isSaving
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Trash2), { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(Trash2), { class: "h-3.5 w-3.5" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              __props.images.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col items-center justify-center h-full min-h-[250px] text-muted-foreground border-2 border-dashed rounded-lg"
              }, [
                createVNode("p", { class: "text-sm font-medium" }, "No images assigned to this package yet.")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "grid grid-cols-2 gap-4 pt-1 pb-4"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.images, (image, index) => {
                  return openBlock(), createBlock("div", {
                    key: image.id,
                    draggable: !__props.isSaving,
                    onDragstart: ($event) => onDragStart(index),
                    onDragover: withModifiers(() => {
                    }, ["prevent"]),
                    onDragenter: ($event) => onDragEnter(index),
                    onDragend: onDragEnd,
                    class: ["group relative border rounded-lg overflow-hidden bg-secondary/10 transition-all duration-200 select-none", {
                      "cursor-grab active:cursor-grabbing": !__props.isSaving,
                      "border-primary ring-2 ring-primary/10": image.is_primary,
                      "opacity-40 border-dashed border-muted-foreground scale-95": draggedIndex.value === index,
                      "opacity-60 pointer-events-none": __props.isSaving
                    }]
                  }, [
                    createVNode("div", { class: "aspect-video w-full overflow-hidden bg-zinc-950 flex items-center justify-center relative pointer-events-none" }, [
                      createVNode("img", {
                        src: image.url || image.file_path,
                        alt: image.alt_text || "Package media",
                        class: "object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                      }, null, 8, ["src", "alt"]),
                      image.is_primary ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-medium shadow-sm"
                      }, [
                        createVNode(unref(Pin), { class: "h-2.5 w-2.5 fill-current" }),
                        createTextVNode(" Cover Image ")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "p-1.5 bg-background flex items-center justify-between border-t gap-1" }, [
                      createVNode("div", { class: "flex items-center text-muted-foreground/60 px-1" }, [
                        createVNode(unref(GripVertical), { class: "w-4 h-4" }),
                        createVNode("span", { class: "text-[10px] font-bold tracking-wider ml-0.5 text-zinc-400" }, "#" + toDisplayString(index + 1), 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-0.5" }, [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), { asChild: "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "icon",
                                      class: ["h-7 w-7 text-muted-foreground", { "text-primary bg-primary/10 hover:bg-primary/20": image.is_primary }],
                                      onClick: withModifiers(($event) => togglePin(image.id), ["stop"]),
                                      disabled: __props.isSaving
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pin), {
                                          class: ["h-3.5 w-3.5", { "fill-current": image.is_primary }]
                                        }, null, 8, ["class"])
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "onClick", "disabled"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$b), { class: "text-[10px]" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(image.is_primary ? "Unset Cover status" : "Make Exclusive Main Cover"), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$a), {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          class: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                          onClick: withModifiers(($event) => deleteImage(image.id), ["stop"]),
                          disabled: __props.isSaving
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "h-3.5 w-3.5" })
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"])
                      ])
                    ])
                  ], 42, ["draggable", "onDragstart", "onDragover", "onDragenter"]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$c), { class: "border-t pt-4 flex sm:justify-between items-center gap-2 shrink-0 mt-auto" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-xs text-muted-foreground text-left hidden sm:block"${_scopeId}>`);
            if (hasChanges.value && !__props.isSaving) {
              _push2(`<span class="text-amber-600 dark:text-amber-400 font-medium"${_scopeId}>● Unsaved layout sorting or covers active</span>`);
            } else if (__props.isSaving) {
              _push2(`<span class="text-primary font-medium animate-pulse"${_scopeId}>Syncing layout transformations...</span>`);
            } else {
              _push2(`<span${_scopeId}>Layout arrangements synchronized</span>`);
            }
            _push2(`</div><div class="flex items-center gap-2 w-full sm:w-auto justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$a), {
              variant: "outline",
              size: "sm",
              onClick: ($event) => emit("close"),
              type: "button",
              disabled: __props.isSaving
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$a), {
              disabled: !hasChanges.value || __props.isSaving,
              size: "sm",
              onClick: ($event) => emit("save"),
              type: "button",
              class: "min-w-[110px] shadow-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.isSaving) {
                    _push3(`<span class="flex items-center gap-1.5"${_scopeId2}><span class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent"${_scopeId2}></span> Saving... </span>`);
                  } else {
                    _push3(`<span${_scopeId2}>Save Changes</span>`);
                  }
                } else {
                  return [
                    __props.isSaving ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex items-center gap-1.5"
                    }, [
                      createVNode("span", { class: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent" }),
                      createTextVNode(" Saving... ")
                    ])) : (openBlock(), createBlock("span", { key: 1 }, "Save Changes"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-xs text-muted-foreground text-left hidden sm:block" }, [
                hasChanges.value && !__props.isSaving ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-amber-600 dark:text-amber-400 font-medium"
                }, "● Unsaved layout sorting or covers active")) : __props.isSaving ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "text-primary font-medium animate-pulse"
                }, "Syncing layout transformations...")) : (openBlock(), createBlock("span", { key: 2 }, "Layout arrangements synchronized"))
              ]),
              createVNode("div", { class: "flex items-center gap-2 w-full sm:w-auto justify-end" }, [
                createVNode(unref(_sfc_main$a), {
                  variant: "outline",
                  size: "sm",
                  onClick: ($event) => emit("close"),
                  type: "button",
                  disabled: __props.isSaving
                }, {
                  default: withCtx(() => [
                    createTextVNode("Cancel")
                  ]),
                  _: 1
                }, 8, ["onClick", "disabled"]),
                createVNode(unref(_sfc_main$a), {
                  disabled: !hasChanges.value || __props.isSaving,
                  size: "sm",
                  onClick: ($event) => emit("save"),
                  type: "button",
                  class: "min-w-[110px] shadow-sm"
                }, {
                  default: withCtx(() => [
                    __props.isSaving ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex items-center gap-1.5"
                    }, [
                      createVNode("span", { class: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent" }),
                      createTextVNode(" Saving... ")
                    ])) : (openBlock(), createBlock("span", { key: 1 }, "Save Changes"))
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/GalleryView.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Progress",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: 0 },
    max: {},
    getValueLabel: {},
    getValueText: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ProgressRoot), mergeProps(unref(delegatedProps), {
        class: unref(cn)(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ProgressIndicator), {
              class: "h-full w-full flex-1 bg-primary transition-all",
              style: `transform: translateX(-${100 - (props.modelValue ?? 0)}%);`
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ProgressIndicator), {
                class: "h-full w-full flex-1 bg-primary transition-all",
                style: `transform: translateX(-${100 - (props.modelValue ?? 0)}%);`
              }, null, 8, ["style"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/progress/Progress.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UploadPackageImageView",
  __ssrInlineRender: true,
  props: {
    packageId: {}
  },
  emits: ["upload-success", "back"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    ref(null);
    const uploadQueue = ref([]);
    const isUploadingGlobal = ref(false);
    const canUpload = computed(() => uploadQueue.value.some((item) => item.status === "pending") && !isUploadingGlobal.value);
    const removeFromQueue = (id) => {
      const item = uploadQueue.value.find((f) => f.id === id);
      if (item) {
        URL.revokeObjectURL(item.previewUrl);
        uploadQueue.value = uploadQueue.value.filter((f) => f.id !== id);
      }
    };
    const startUploadProcess = async () => {
      if (uploadQueue.value.length === 0 || isUploadingGlobal.value) return;
      isUploadingGlobal.value = true;
      const pendingItems = uploadQueue.value.filter((item) => item.status === "pending");
      const uploadPromises = pendingItems.map(async (item) => {
        var _a, _b;
        item.status = "uploading";
        const formData = new FormData();
        formData.append("image", item.file);
        formData.append("package_id", props.packageId.toString());
        try {
          await axios.post(route("admin.packages.images.store", { id: props.packageId }), formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                item.serverProgress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
              } else if (progressEvent.progress) {
                item.serverProgress = Math.round(progressEvent.progress * 100);
              }
            }
          });
          item.status = "success";
          item.serverProgress = 100;
        } catch (err) {
          item.status = "error";
          item.serverProgress = 0;
          item.errorMsg = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Server upload failed";
        }
      });
      await Promise.all(uploadPromises);
      isUploadingGlobal.value = false;
      const hasErrors = uploadQueue.value.some((item) => item.status === "error");
      if (!hasErrors) {
        setTimeout(() => {
          uploadQueue.value.forEach((item) => URL.revokeObjectURL(item.previewUrl));
          uploadQueue.value = [];
          emit("upload-success");
        }, 600);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-1 flex flex-col min-h-0 my-2" }, _attrs))}><div class="${ssrRenderClass([{ "opacity-40 pointer-events-none select-none": isUploadingGlobal.value }, "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors bg-secondary/10 hover:bg-secondary/30 hover:border-primary/50 text-center shrink-0"])}"><input type="file" multiple accept="image/*" class="hidden"${ssrIncludeBooleanAttr(isUploadingGlobal.value) ? " disabled" : ""}><div class="p-2 bg-background rounded-full shadow-sm border text-muted-foreground">`);
      _push(ssrRenderComponent(unref(UploadCloud), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><p class="text-xs font-semibold">Click or drag images here to process upload</p></div><div class="flex-1 min-h-0 mt-4 relative">`);
      _push(ssrRenderComponent(unref(_sfc_main$5), { class: "h-full w-full absolute inset-0 pr-3" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2.5 pb-4"${_scopeId}><!--[-->`);
            ssrRenderList(uploadQueue.value, (item) => {
              _push2(`<div class="flex items-center gap-3 p-2.5 border rounded-lg bg-background shadow-sm"${_scopeId}><img${ssrRenderAttr("src", item.previewUrl)} class="w-11 h-11 object-cover rounded-md border shrink-0" alt="Preview"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center justify-between gap-2 mb-1"${_scopeId}><p class="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate"${_scopeId}>${ssrInterpolate(item.file.name)}</p><span class="text-[10px] font-bold text-zinc-500 whitespace-nowrap"${_scopeId}>`);
              if (item.status === "reading") {
                _push2(`<span${_scopeId}>Loading (${ssrInterpolate(item.localProgress)}%)</span>`);
              } else if (item.status === "uploading") {
                _push2(`<span${_scopeId}>Uploading (${ssrInterpolate(item.serverProgress)}%)</span>`);
              } else if (item.status === "success") {
                _push2(`<span${_scopeId}>Finished</span>`);
              } else if (item.status === "error") {
                _push2(`<span${_scopeId}>Failed</span>`);
              } else {
                _push2(`<span${_scopeId}>Staged &amp; Ready</span>`);
              }
              _push2(`</span></div>`);
              if (item.status === "reading") {
                _push2(ssrRenderComponent(unref(_sfc_main$3), {
                  "model-value": item.localProgress,
                  class: "h-1.5 [&>div]:bg-amber-500"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(_sfc_main$3), {
                  "model-value": item.serverProgress,
                  class: ["h-1.5", {
                    "[&>div]:bg-emerald-500": item.status === "success",
                    "[&>div]:bg-destructive": item.status === "error",
                    "[&>div]:bg-primary": item.status === "uploading"
                  }]
                }, null, _parent2, _scopeId));
              }
              if (item.status === "error") {
                _push2(`<p class="text-[10px] text-destructive mt-0.5 font-medium"${_scopeId}>${ssrInterpolate(item.errorMsg)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="shrink-0 ml-1"${_scopeId}>`);
              if (item.status === "success") {
                _push2(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-emerald-500" }, null, _parent2, _scopeId));
              } else if (item.status === "error") {
                _push2(ssrRenderComponent(unref(AlertCircle), { class: "w-4 h-4 text-destructive" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(_sfc_main$a), {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  class: "h-6 w-6 rounded-full",
                  disabled: isUploadingGlobal.value,
                  onClick: ($event) => removeFromQueue(item.id)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(X), { class: "w-3.5 h-3.5" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2.5 pb-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(uploadQueue.value, (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.id,
                    class: "flex items-center gap-3 p-2.5 border rounded-lg bg-background shadow-sm"
                  }, [
                    createVNode("img", {
                      src: item.previewUrl,
                      class: "w-11 h-11 object-cover rounded-md border shrink-0",
                      alt: "Preview"
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("div", { class: "flex items-center justify-between gap-2 mb-1" }, [
                        createVNode("p", { class: "text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate" }, toDisplayString(item.file.name), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-zinc-500 whitespace-nowrap" }, [
                          item.status === "reading" ? (openBlock(), createBlock("span", { key: 0 }, "Loading (" + toDisplayString(item.localProgress) + "%)", 1)) : item.status === "uploading" ? (openBlock(), createBlock("span", { key: 1 }, "Uploading (" + toDisplayString(item.serverProgress) + "%)", 1)) : item.status === "success" ? (openBlock(), createBlock("span", { key: 2 }, "Finished")) : item.status === "error" ? (openBlock(), createBlock("span", { key: 3 }, "Failed")) : (openBlock(), createBlock("span", { key: 4 }, "Staged & Ready"))
                        ])
                      ]),
                      item.status === "reading" ? (openBlock(), createBlock(unref(_sfc_main$3), {
                        key: 0,
                        "model-value": item.localProgress,
                        class: "h-1.5 [&>div]:bg-amber-500"
                      }, null, 8, ["model-value"])) : (openBlock(), createBlock(unref(_sfc_main$3), {
                        key: 1,
                        "model-value": item.serverProgress,
                        class: ["h-1.5", {
                          "[&>div]:bg-emerald-500": item.status === "success",
                          "[&>div]:bg-destructive": item.status === "error",
                          "[&>div]:bg-primary": item.status === "uploading"
                        }]
                      }, null, 8, ["model-value", "class"])),
                      item.status === "error" ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: "text-[10px] text-destructive mt-0.5 font-medium"
                      }, toDisplayString(item.errorMsg), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "shrink-0 ml-1" }, [
                      item.status === "success" ? (openBlock(), createBlock(unref(CheckCircle2), {
                        key: 0,
                        class: "w-4 h-4 text-emerald-500"
                      })) : item.status === "error" ? (openBlock(), createBlock(unref(AlertCircle), {
                        key: 1,
                        class: "w-4 h-4 text-destructive"
                      })) : (openBlock(), createBlock(unref(_sfc_main$a), {
                        key: 2,
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        class: "h-6 w-6 rounded-full",
                        disabled: isUploadingGlobal.value,
                        onClick: withModifiers(($event) => removeFromQueue(item.id), ["stop"])
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(X), { class: "w-3.5 h-3.5" })
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]))
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center justify-end gap-2 border-t pt-4 mt-auto shrink-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        variant: "ghost",
        size: "sm",
        disabled: isUploadingGlobal.value,
        onClick: ($event) => emit("back")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back to Gallery`);
          } else {
            return [
              createTextVNode("Back to Gallery")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        size: "sm",
        disabled: !canUpload.value,
        onClick: startUploadProcess,
        class: "min-w-[120px] shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isUploadingGlobal.value) {
              _push2(`<span class="flex items-center gap-1.5"${_scopeId}><span class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent"${_scopeId}></span> Uploading... </span>`);
            } else {
              _push2(`<span${_scopeId}>Process Upload</span>`);
            }
          } else {
            return [
              isUploadingGlobal.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "flex items-center gap-1.5"
              }, [
                createVNode("span", { class: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent" }),
                createTextVNode(" Uploading... ")
              ])) : (openBlock(), createBlock("span", { key: 1 }, "Process Upload"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/UploadPackageImageView.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PackageMediaModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    images: {},
    packageId: {}
  },
  emits: ["update:open", "refresh-data"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isUploadPaneOpen = ref(false);
    const isSaving = ref(false);
    const localImages = ref([]);
    const originalImages = ref([]);
    const deletedImageIds = ref([]);
    const sortedImages = (images) => {
      return JSON.parse(JSON.stringify(images)).sort((a, b) => a.order_number - b.order_number);
    };
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        localImages.value = sortedImages(props.images);
        originalImages.value = sortedImages(props.images);
        deletedImageIds.value = [];
        isUploadPaneOpen.value = false;
        isSaving.value = false;
      }
    }, { immediate: true });
    const handleGallerySave = async () => {
      if (isSaving.value) return;
      isSaving.value = true;
      const payloadMeta = localImages.value.map((img, index) => ({
        id: img.id,
        is_primary: Boolean(img.is_primary),
        order: index + 1
        // Forces explicit sequencing arrangements cleanly
      }));
      try {
        await axios.post(route("admin.packages.images.update", { id: props.packageId }), {
          _method: "PUT",
          // Route method spoofing wrapper fallback for Laravel systems
          deleted_ids: deletedImageIds.value,
          meta: payloadMeta
        });
        emit("refresh-data");
        emit("update:open", false);
      } catch (error) {
        console.error("Failed to update gallery arrangement settings:", error);
      } finally {
        isSaving.value = false;
      }
    };
    const handleUploadSuccess = () => {
      isUploadPaneOpen.value = false;
      emit("refresh-data");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$d), mergeProps({
        open: __props.open,
        "onUpdate:open": ($event) => !isSaving.value && emit("update:open", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$e), { class: "sm:max-w-[620px] h-[85vh] max-h-[700px] flex flex-col p-6 overflow-hidden transition-all duration-300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$f), { class: "flex flex-row items-center justify-between border-b pb-4 shrink-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$g), { class: "text-xl font-bold" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Package Images`);
                            } else {
                              return [
                                createTextVNode("Package Images")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-sm text-muted-foreground mt-1"${_scopeId3}>Manage, sort, and pin your package media assets.</p></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          variant: isUploadPaneOpen.value ? "default" : "outline",
                          size: "sm",
                          onClick: ($event) => isUploadPaneOpen.value = !isUploadPaneOpen.value,
                          disabled: isSaving.value,
                          type: "button",
                          class: "gap-1 shadow-sm shrink-0"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(isUploadPaneOpen.value ? "View Gallery" : "Add New")}`);
                            } else {
                              return [
                                createVNode(unref(Plus), { class: "h-4 w-4" }),
                                createTextVNode(" " + toDisplayString(isUploadPaneOpen.value ? "View Gallery" : "Add New"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$g), { class: "text-xl font-bold" }, {
                              default: withCtx(() => [
                                createTextVNode("Package Images")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, "Manage, sort, and pin your package media assets.")
                          ]),
                          createVNode(unref(_sfc_main$a), {
                            variant: isUploadPaneOpen.value ? "default" : "outline",
                            size: "sm",
                            onClick: ($event) => isUploadPaneOpen.value = !isUploadPaneOpen.value,
                            disabled: isSaving.value,
                            type: "button",
                            class: "gap-1 shadow-sm shrink-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "h-4 w-4" }),
                              createTextVNode(" " + toDisplayString(isUploadPaneOpen.value ? "View Gallery" : "Add New"), 1)
                            ]),
                            _: 1
                          }, 8, ["variant", "onClick", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (isUploadPaneOpen.value) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      "package-id": __props.packageId,
                      onBack: ($event) => isUploadPaneOpen.value = false,
                      onUploadSuccess: handleUploadSuccess
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      images: localImages.value,
                      "onUpdate:images": ($event) => localImages.value = $event,
                      deletedIds: deletedImageIds.value,
                      "onUpdate:deletedIds": ($event) => deletedImageIds.value = $event,
                      "original-images": originalImages.value,
                      "is-saving": isSaving.value,
                      onClose: ($event) => emit("update:open", false),
                      onSave: handleGallerySave
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$f), { class: "flex flex-row items-center justify-between border-b pb-4 shrink-0" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$g), { class: "text-xl font-bold" }, {
                            default: withCtx(() => [
                              createTextVNode("Package Images")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, "Manage, sort, and pin your package media assets.")
                        ]),
                        createVNode(unref(_sfc_main$a), {
                          variant: isUploadPaneOpen.value ? "default" : "outline",
                          size: "sm",
                          onClick: ($event) => isUploadPaneOpen.value = !isUploadPaneOpen.value,
                          disabled: isSaving.value,
                          type: "button",
                          class: "gap-1 shadow-sm shrink-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "h-4 w-4" }),
                            createTextVNode(" " + toDisplayString(isUploadPaneOpen.value ? "View Gallery" : "Add New"), 1)
                          ]),
                          _: 1
                        }, 8, ["variant", "onClick", "disabled"])
                      ]),
                      _: 1
                    }),
                    isUploadPaneOpen.value ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      "package-id": __props.packageId,
                      onBack: ($event) => isUploadPaneOpen.value = false,
                      onUploadSuccess: handleUploadSuccess
                    }, null, 8, ["package-id", "onBack"])) : (openBlock(), createBlock(_sfc_main$4, {
                      key: 1,
                      images: localImages.value,
                      "onUpdate:images": ($event) => localImages.value = $event,
                      deletedIds: deletedImageIds.value,
                      "onUpdate:deletedIds": ($event) => deletedImageIds.value = $event,
                      "original-images": originalImages.value,
                      "is-saving": isSaving.value,
                      onClose: ($event) => emit("update:open", false),
                      onSave: handleGallerySave
                    }, null, 8, ["images", "onUpdate:images", "deletedIds", "onUpdate:deletedIds", "original-images", "is-saving", "onClose"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$e), { class: "sm:max-w-[620px] h-[85vh] max-h-[700px] flex flex-col p-6 overflow-hidden transition-all duration-300" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$f), { class: "flex flex-row items-center justify-between border-b pb-4 shrink-0" }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$g), { class: "text-xl font-bold" }, {
                          default: withCtx(() => [
                            createTextVNode("Package Images")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, "Manage, sort, and pin your package media assets.")
                      ]),
                      createVNode(unref(_sfc_main$a), {
                        variant: isUploadPaneOpen.value ? "default" : "outline",
                        size: "sm",
                        onClick: ($event) => isUploadPaneOpen.value = !isUploadPaneOpen.value,
                        disabled: isSaving.value,
                        type: "button",
                        class: "gap-1 shadow-sm shrink-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4" }),
                          createTextVNode(" " + toDisplayString(isUploadPaneOpen.value ? "View Gallery" : "Add New"), 1)
                        ]),
                        _: 1
                      }, 8, ["variant", "onClick", "disabled"])
                    ]),
                    _: 1
                  }),
                  isUploadPaneOpen.value ? (openBlock(), createBlock(_sfc_main$2, {
                    key: 0,
                    "package-id": __props.packageId,
                    onBack: ($event) => isUploadPaneOpen.value = false,
                    onUploadSuccess: handleUploadSuccess
                  }, null, 8, ["package-id", "onBack"])) : (openBlock(), createBlock(_sfc_main$4, {
                    key: 1,
                    images: localImages.value,
                    "onUpdate:images": ($event) => localImages.value = $event,
                    deletedIds: deletedImageIds.value,
                    "onUpdate:deletedIds": ($event) => deletedImageIds.value = $event,
                    "original-images": originalImages.value,
                    "is-saving": isSaving.value,
                    onClose: ($event) => emit("update:open", false),
                    onSave: handleGallerySave
                  }, null, 8, ["images", "onUpdate:images", "deletedIds", "onUpdate:deletedIds", "original-images", "is-saving", "onClose"]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/PackageMediaModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageImagesAsset",
  __ssrInlineRender: true,
  props: {
    packageId: {},
    primaryImage: {},
    images: {}
  },
  emits: ["refresh-data"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      images: [],
      meta: [],
      deleted_ids: []
    });
    const isModalOpen = ref(false);
    const localImagesOverride = ref(null);
    watch(() => props.images, () => {
      localImagesOverride.value = null;
    }, { deep: true });
    const currentImagesList = computed(() => {
      return localImagesOverride.value ?? props.images ?? [];
    });
    const handleImagesSaved = (payload) => {
      localImagesOverride.value = payload.updatedImages;
      const metaPayload = payload.updatedImages.map((img, index) => ({
        id: img.id,
        is_primary: img.is_primary,
        order: index + 1
      }));
      form.meta = metaPayload;
      form.deleted_ids = payload.deletedIds;
      form.post(route("admin.packages.images.store", { id: props.packageId }), {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          isModalOpen.value = false;
          emit("refresh-data");
          console.log("Images package layout configuration synchronized successfully!");
        }
      });
    };
    const handleRefreshMediaData = () => {
      localImagesOverride.value = null;
      emit("refresh-data");
    };
    const activePrimaryImage = computed(() => {
      var _a;
      if (currentImagesList.value.length > 0) {
        const localPrimary = currentImagesList.value.find((img) => img.is_primary);
        return localPrimary || currentImagesList.value[0];
      }
      if ((_a = props.primaryImage) == null ? void 0 : _a.url) {
        return props.primaryImage;
      }
      return null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><section class="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-100/10 border dark:bg-zinc-800/10 dark:border-zinc-800 shadow-sm"><div class="absolute top-3 right-3 z-20">`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        type: "button",
        size: "icon",
        variant: "secondary",
        class: "rounded-full shadow-md hover:scale-105 transition-transform",
        onClick: ($event) => isModalOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "solar:pen-bold",
              class: "w-4 h-4 text-zinc-700 dark:text-zinc-200"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Icon), {
                icon: "solar:pen-bold",
                class: "w-4 h-4 text-zinc-700 dark:text-zinc-200"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if ((_a = activePrimaryImage.value) == null ? void 0 : _a.url) {
        _push(`<img${ssrRenderAttr("src", activePrimaryImage.value.url)}${ssrRenderAttr("alt", activePrimaryImage.value.alt_text || "Package Cover Display Showcase")} class="w-full h-full object-cover select-none animate-in fade-in duration-300">`);
      } else {
        _push(`<div class="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2 bg-muted/20">`);
        _push(ssrRenderComponent(unref(Image), { class: "w-12 h-12 stroke-[1.5] text-zinc-400/80" }, null, _parent));
        _push(`<p class="text-sm font-medium tracking-tight">No package image assigned</p></div>`);
      }
      _push(`</section>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: isModalOpen.value,
        "onUpdate:open": ($event) => isModalOpen.value = $event,
        images: currentImagesList.value,
        "package-id": __props.packageId,
        onSave: handleImagesSaved,
        onRefreshData: handleRefreshMediaData
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/section/PackageImagesAsset.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
