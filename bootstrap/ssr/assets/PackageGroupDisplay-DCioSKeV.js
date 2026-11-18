import { defineComponent, computed, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, ref, Fragment, renderList, withKeys } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link, router, Head } from "@inertiajs/vue3";
import { b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$6, e as _sfc_main$7, a as _sfc_main$d, _ as _sfc_main$f } from "./AppLayout-CSZsNKr7.js";
import { _ as _sfc_main$5, o as openDeleteDialog } from "../ssr.js";
import { toast } from "vue-sonner";
import { _ as _sfc_main$2, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b, e as _sfc_main$e } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$c } from "./index-xORXC0Yx.js";
import { Compass, Sparkles, Star, MoreHorizontal, Pencil, Trash2, PlaneTakeoff, PlaneLanding, Layers, Calendar, ArrowRight, Plus, Search, X } from "lucide-vue-next";
import { _ as _sfc_main$h } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$g } from "./Label-6hRdN-Dm.js";
import "class-variance-authority";
import "radix-vue";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PackageGroupCard",
  __ssrInlineRender: true,
  props: {
    group: {},
    highlighted: { type: Boolean },
    href: {}
  },
  emits: ["group-updated", "group-deleted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const cardClasses = computed(() => {
      return [
        "overflow-hidden group flex flex-col justify-between shadow-sm",
        props.highlighted ? "border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-b from-indigo-50/10 to-transparent dark:from-indigo-950/5" : "border dark:border-zinc-800"
      ].join(" ");
    });
    const imageAlt = computed(() => {
      var _a;
      return ((_a = props.group.image) == null ? void 0 : _a.alt_text) || props.group.title;
    });
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const handleFeatureToggle = () => {
      router.put(
        route("admin.packages.groups.feature", { id: props.group.id }),
        {},
        {
          onSuccess: () => {
            const updatedGroup = {
              ...props.group,
              is_featured: !props.group.is_featured,
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            };
            emit("group-updated", updatedGroup);
            toast.success(
              props.group.is_featured ? "Featured label removed" : "Package group marked featured"
            );
          },
          onError: () => {
            toast.error("Failed to update featured status");
          }
        }
      );
    };
    const handleDelete = () => {
      openDeleteDialog({
        title: "Delete package group",
        message: `Are you sure you want to delete "${props.group.title}"?`,
        confirmText: "Delete group",
        cancelText: "Cancel",
        onConfirm: () => {
          router.delete(route("admin.packages.groups.destroy", { id: props.group.id }), {
            onSuccess: () => {
              emit("group-deleted", props.group.id);
              toast.success("Package group deleted successfully");
            },
            onError: () => {
              toast.error("Failed to delete package group");
            }
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$2), mergeProps({ class: cardClasses.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div${_scopeId}><div class="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-b dark:border-zinc-800"${_scopeId}>`);
            if ((_a = props.group.image) == null ? void 0 : _a.url) {
              _push2(`<img${ssrRenderAttr("src", props.group.image.url)}${ssrRenderAttr("alt", imageAlt.value)} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center text-zinc-400"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Compass), { class: "w-10 h-10 stroke-[1.5]" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            if (props.highlighted || props.group.is_featured) {
              _push2(`<div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start max-w-[85%]"${_scopeId}>`);
              if (props.group.tag && props.group.tag !== null) {
                _push2(`<span class="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-red-600 text-white shadow-sm"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Sparkles), { class: "w-2.5 h-2.5 fill-current" }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(props.group.tag)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (props.group.is_featured) {
                _push2(`<span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-white shadow-sm"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Star), { class: "w-2.5 h-2.5 fill-current" }, null, _parent2, _scopeId));
                _push2(` Featured </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="absolute top-3 right-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          variant: "secondary",
                          size: "icon",
                          class: "h-7 w-7 rounded-md opacity-90 backdrop-blur hover:opacity-100 shadow-sm"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(MoreHorizontal), { class: "w-4 h-4 text-zinc-700 dark:text-zinc-300" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(MoreHorizontal), { class: "w-4 h-4 text-zinc-700 dark:text-zinc-300" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), {
                            variant: "secondary",
                            size: "icon",
                            class: "h-7 w-7 rounded-md opacity-90 backdrop-blur hover:opacity-100 shadow-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MoreHorizontal), { class: "w-4 h-4 text-zinc-700 dark:text-zinc-300" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    align: "end",
                    class: "w-40 dark:bg-zinc-950 dark:border-zinc-800"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Link), {
                                href: _ctx.route("admin.packages.groups.edit", { id: props.group.id }),
                                class: "flex items-center gap-2"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4 text-zinc-400" }, null, _parent6, _scopeId5));
                                    _push6(` Edit Details `);
                                  } else {
                                    return [
                                      createVNode(unref(Pencil), { class: "w-4 h-4 text-zinc-400" }),
                                      createTextVNode(" Edit Details ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.packages.groups.edit", { id: props.group.id }),
                                  class: "flex items-center gap-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), { class: "w-4 h-4 text-zinc-400" }),
                                    createTextVNode(" Edit Details ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          onClick: handleFeatureToggle,
                          class: "flex items-center gap-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Star), { class: "w-4 h-4 text-amber-500" }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(props.group.is_featured ? "Unpin" : "Feature")}`);
                            } else {
                              return [
                                createVNode(unref(Star), { class: "w-4 h-4 text-amber-500" }),
                                createTextVNode(" " + toDisplayString(props.group.is_featured ? "Unpin" : "Feature"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          onClick: handleDelete,
                          class: "flex items-center gap-2 text-red-600 dark:text-red-400"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent5, _scopeId4));
                              _push5(` Delete `);
                            } else {
                              return [
                                createVNode(unref(Trash2), { class: "w-4 h-4" }),
                                createTextVNode(" Delete ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.packages.groups.edit", { id: props.group.id }),
                                class: "flex items-center gap-2"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Pencil), { class: "w-4 h-4 text-zinc-400" }),
                                  createTextVNode(" Edit Details ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), {
                            onClick: handleFeatureToggle,
                            class: "flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Star), { class: "w-4 h-4 text-amber-500" }),
                              createTextVNode(" " + toDisplayString(props.group.is_featured ? "Unpin" : "Feature"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), {
                            onClick: handleDelete,
                            class: "flex items-center gap-2 text-red-600 dark:text-red-400"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-4 h-4" }),
                              createTextVNode(" Delete ")
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
                    createVNode(unref(_sfc_main$4), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), {
                          variant: "secondary",
                          size: "icon",
                          class: "h-7 w-7 rounded-md opacity-90 backdrop-blur hover:opacity-100 shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(MoreHorizontal), { class: "w-4 h-4 text-zinc-700 dark:text-zinc-300" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      align: "end",
                      class: "w-40 dark:bg-zinc-950 dark:border-zinc-800"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(unref(Link), {
                              href: _ctx.route("admin.packages.groups.edit", { id: props.group.id }),
                              class: "flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Pencil), { class: "w-4 h-4 text-zinc-400" }),
                                createTextVNode(" Edit Details ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          onClick: handleFeatureToggle,
                          class: "flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Star), { class: "w-4 h-4 text-amber-500" }),
                            createTextVNode(" " + toDisplayString(props.group.is_featured ? "Unpin" : "Feature"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          onClick: handleDelete,
                          class: "flex items-center gap-2 text-red-600 dark:text-red-400"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4" }),
                            createTextVNode(" Delete ")
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
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$8), { class: "p-4 space-y-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { class: "text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(props.group.title)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(props.group.title), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "text-xs line-clamp-2 min-h-[32px] leading-relaxed" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(props.group.description || "No description summary added.")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(props.group.description || "No description summary added."), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), { class: "text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.group.title), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "text-xs line-clamp-2 min-h-[32px] leading-relaxed" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.group.description || "No description summary added."), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "px-4 pb-3 pt-0 space-y-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div class="flex flex-wrap gap-1"${_scopeId2}>`);
                  if (props.group.include_as_outbound) {
                    _push3(ssrRenderComponent(unref(_sfc_main$c), {
                      variant: "secondary",
                      class: "text-[10px] font-normal px-2 py-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(PlaneTakeoff), { class: "w-2.5 h-2.5 mr-1 text-sky-500" }, null, _parent4, _scopeId3));
                          _push4(` Outbound `);
                        } else {
                          return [
                            createVNode(unref(PlaneTakeoff), { class: "w-2.5 h-2.5 mr-1 text-sky-500" }),
                            createTextVNode(" Outbound ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (props.group.include_as_inbound) {
                    _push3(ssrRenderComponent(unref(_sfc_main$c), {
                      variant: "secondary",
                      class: "text-[10px] font-normal px-2 py-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(PlaneLanding), { class: "w-2.5 h-2.5 mr-1 text-emerald-500" }, null, _parent4, _scopeId3));
                          _push4(` Inbound `);
                        } else {
                          return [
                            createVNode(unref(PlaneLanding), { class: "w-2.5 h-2.5 mr-1 text-emerald-500" }),
                            createTextVNode(" Inbound ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { class: "dark:bg-zinc-800" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400"${_scopeId2}><span class="flex items-center gap-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Layers), { class: "w-3.5 h-3.5" }, null, _parent3, _scopeId2));
                  _push3(` Inside Collection:</span><span class="font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded"${_scopeId2}>${ssrInterpolate(((_a2 = props.group.packages) == null ? void 0 : _a2.length) || 0)} items </span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-wrap gap-1" }, [
                      props.group.include_as_outbound ? (openBlock(), createBlock(unref(_sfc_main$c), {
                        key: 0,
                        variant: "secondary",
                        class: "text-[10px] font-normal px-2 py-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(PlaneTakeoff), { class: "w-2.5 h-2.5 mr-1 text-sky-500" }),
                          createTextVNode(" Outbound ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      props.group.include_as_inbound ? (openBlock(), createBlock(unref(_sfc_main$c), {
                        key: 1,
                        variant: "secondary",
                        class: "text-[10px] font-normal px-2 py-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(PlaneLanding), { class: "w-2.5 h-2.5 mr-1 text-emerald-500" }),
                          createTextVNode(" Inbound ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(_sfc_main$d), { class: "dark:bg-zinc-800" }),
                    createVNode("div", { class: "flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400" }, [
                      createVNode("span", { class: "flex items-center gap-1.5" }, [
                        createVNode(unref(Layers), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Inside Collection:")
                      ]),
                      createVNode("span", { class: "font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded" }, toDisplayString(((_b2 = props.group.packages) == null ? void 0 : _b2.length) || 0) + " items ", 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), { class: "p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-t dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="flex items-center gap-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Calendar), { class: "w-3 h-3" }, null, _parent3, _scopeId2));
                  _push3(` Modified ${ssrInterpolate(formatDate(props.group.updated_at))}</span>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: props.href,
                    class: "inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Manage `);
                        _push4(ssrRenderComponent(unref(ArrowRight), { class: "w-3 h-3" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Manage "),
                          createVNode(unref(ArrowRight), { class: "w-3 h-3" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      createVNode(unref(Calendar), { class: "w-3 h-3" }),
                      createTextVNode(" Modified " + toDisplayString(formatDate(props.group.updated_at)), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: props.href,
                      class: "inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Manage "),
                        createVNode(unref(ArrowRight), { class: "w-3 h-3" })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-b dark:border-zinc-800" }, [
                  ((_b = props.group.image) == null ? void 0 : _b.url) ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: props.group.image.url,
                    alt: imageAlt.value,
                    class: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-full h-full flex items-center justify-center text-zinc-400"
                  }, [
                    createVNode(unref(Compass), { class: "w-10 h-10 stroke-[1.5]" })
                  ])),
                  props.highlighted || props.group.is_featured ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "absolute top-3 left-3 flex flex-col gap-1.5 items-start max-w-[85%]"
                  }, [
                    props.group.tag && props.group.tag !== null ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-red-600 text-white shadow-sm"
                    }, [
                      createVNode(unref(Sparkles), { class: "w-2.5 h-2.5 fill-current" }),
                      createTextVNode(" " + toDisplayString(props.group.tag), 1)
                    ])) : createCommentVNode("", true),
                    props.group.is_featured ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-white shadow-sm"
                    }, [
                      createVNode(unref(Star), { class: "w-2.5 h-2.5 fill-current" }),
                      createTextVNode(" Featured ")
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "absolute top-3 right-3" }, [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), {
                              variant: "secondary",
                              size: "icon",
                              class: "h-7 w-7 rounded-md opacity-90 backdrop-blur hover:opacity-100 shadow-sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(MoreHorizontal), { class: "w-4 h-4 text-zinc-700 dark:text-zinc-300" })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          align: "end",
                          class: "w-40 dark:bg-zinc-950 dark:border-zinc-800"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$7), { "as-child": "" }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.packages.groups.edit", { id: props.group.id }),
                                  class: "flex items-center gap-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), { class: "w-4 h-4 text-zinc-400" }),
                                    createTextVNode(" Edit Details ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), {
                              onClick: handleFeatureToggle,
                              class: "flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Star), { class: "w-4 h-4 text-amber-500" }),
                                createTextVNode(" " + toDisplayString(props.group.is_featured ? "Unpin" : "Feature"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), {
                              onClick: handleDelete,
                              class: "flex items-center gap-2 text-red-600 dark:text-red-400"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "w-4 h-4" }),
                                createTextVNode(" Delete ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode(unref(_sfc_main$8), { class: "p-4 space-y-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$9), { class: "text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.group.title), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "text-xs line-clamp-2 min-h-[32px] leading-relaxed" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.group.description || "No description summary added."), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", null, [
                createVNode(unref(_sfc_main$b), { class: "px-4 pb-3 pt-0 space-y-3" }, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode("div", { class: "flex flex-wrap gap-1" }, [
                        props.group.include_as_outbound ? (openBlock(), createBlock(unref(_sfc_main$c), {
                          key: 0,
                          variant: "secondary",
                          class: "text-[10px] font-normal px-2 py-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(PlaneTakeoff), { class: "w-2.5 h-2.5 mr-1 text-sky-500" }),
                            createTextVNode(" Outbound ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        props.group.include_as_inbound ? (openBlock(), createBlock(unref(_sfc_main$c), {
                          key: 1,
                          variant: "secondary",
                          class: "text-[10px] font-normal px-2 py-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(PlaneLanding), { class: "w-2.5 h-2.5 mr-1 text-emerald-500" }),
                            createTextVNode(" Inbound ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(_sfc_main$d), { class: "dark:bg-zinc-800" }),
                      createVNode("div", { class: "flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400" }, [
                        createVNode("span", { class: "flex items-center gap-1.5" }, [
                          createVNode(unref(Layers), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Inside Collection:")
                        ]),
                        createVNode("span", { class: "font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded" }, toDisplayString(((_a2 = props.group.packages) == null ? void 0 : _a2.length) || 0) + " items ", 1)
                      ])
                    ];
                  }),
                  _: 1
                }),
                createVNode(unref(_sfc_main$e), { class: "p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-t dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400" }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      createVNode(unref(Calendar), { class: "w-3 h-3" }),
                      createTextVNode(" Modified " + toDisplayString(formatDate(props.group.updated_at)), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: props.href,
                      class: "inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Manage "),
                        createVNode(unref(ArrowRight), { class: "w-3 h-3" })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  _: 1
                })
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/PackageGroupCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageGroupDisplay",
  __ssrInlineRender: true,
  props: {
    groups: {}
  },
  setup(__props) {
    const breadcrumbs = [
      { title: "Dashboard", href: route("admin.dashboard") },
      { title: "Package Groups", href: route("admin.packages.groups") }
    ];
    const props = __props;
    const packageGroups = ref(props.groups ?? []);
    const searchTerm = ref("");
    const appliedSearchTerm = ref("");
    const selectedType = ref("");
    const applySearch = () => {
      appliedSearchTerm.value = (searchTerm.value ?? "").trim().toLowerCase();
    };
    const clearSearch = () => {
      searchTerm.value = "";
      appliedSearchTerm.value = "";
    };
    const setType = (type) => {
      selectedType.value = type;
    };
    const fortyEightHoursAgo = (/* @__PURE__ */ new Date()).getTime() - 48 * 60 * 60 * 1e3;
    const isRecent = (dateString) => {
      return new Date(dateString).getTime() > fortyEightHoursAgo;
    };
    const recentGroups = computed(() => {
      return packageGroups.value.filter((g) => isRecent(g.updated_at || g.created_at)).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    });
    const handleGroupUpdated = (updatedGroup) => {
      packageGroups.value = packageGroups.value.map(
        (group) => group.id === updatedGroup.id ? updatedGroup : group
      );
    };
    const handleGroupDeleted = (deletedGroupId) => {
      packageGroups.value = packageGroups.value.filter((group) => group.id !== deletedGroupId);
    };
    const olderGroups = computed(() => {
      const list = packageGroups.value.filter((g) => !isRecent(g.updated_at || g.created_at));
      const typeFiltered = list.filter((g) => {
        if (!selectedType.value) return true;
        if (selectedType.value === "featured") return !!g.is_featured;
        if (selectedType.value === "inbound") return !!g.include_as_inbound;
        if (selectedType.value === "outbound") return !!g.include_as_outbound;
        return true;
      });
      const searched = appliedSearchTerm.value ? typeFiltered.filter((g) => (g.title ?? "").toLowerCase().includes(appliedSearchTerm.value)) : typeFiltered;
      return searched.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Package Groups Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$f, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"${_scopeId}>Package Groups</h1><p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1"${_scopeId}> Manage your curated marketing bundles and package catalog collections. </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.packages.groups.create")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "sm:w-auto w-full flex items-center gap-2 shadow-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(` New Package Group `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "w-4 h-4" }),
                          createTextVNode(" New Package Group ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "sm:w-auto w-full flex items-center gap-2 shadow-sm" }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4" }),
                        createTextVNode(" New Package Group ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (recentGroups.value.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="p-1 rounded bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Sparkles), { class: "w-4 h-4 text-indigo-600 dark:text-indigo-400" }, null, _parent2, _scopeId));
              _push2(`</div><h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight"${_scopeId}>Recently Edited Groups</h2>`);
              _push2(ssrRenderComponent(unref(_sfc_main$c), {
                variant: "outline",
                class: "text-[11px] bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/30"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Last 48 Hours `);
                  } else {
                    return [
                      createTextVNode(" Last 48 Hours ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(recentGroups.value, (group) => {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  key: group.id,
                  group,
                  href: _ctx.route("admin.packages.groups.pin", { id: group.id }),
                  highlighted: "",
                  onGroupUpdated: handleGroupUpdated,
                  onGroupDeleted: handleGroupDeleted
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4 mt-2"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"${_scopeId}><h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight"${_scopeId}>All Collections</h2><div class="flex items-center gap-2 w-full sm:w-auto"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              for: "group-search",
              class: "sr-only"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Search groups`);
                } else {
                  return [
                    createTextVNode("Search groups")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$h), {
              id: "group-search",
              modelValue: searchTerm.value,
              "onUpdate:modelValue": ($event) => searchTerm.value = $event,
              placeholder: "Search collections by name",
              onKeydown: applySearch,
              class: "w-56"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              variant: "outline",
              size: "sm",
              onClick: applySearch,
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Search), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Search), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              variant: "ghost",
              size: "sm",
              onClick: clearSearch,
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(X), { class: "w-4 h-4 text-zinc-400" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(X), { class: "w-4 h-4 text-zinc-400" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          variant: "outline",
                          size: "sm",
                          class: "ml-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!selectedType.value) {
                                _push5(`<span${_scopeId4}>All types</span>`);
                              } else if (selectedType.value === "featured") {
                                _push5(`<span${_scopeId4}>Featured</span>`);
                              } else if (selectedType.value === "inbound") {
                                _push5(`<span${_scopeId4}>Inbound</span>`);
                              } else {
                                _push5(`<span${_scopeId4}>Outbound</span>`);
                              }
                            } else {
                              return [
                                !selectedType.value ? (openBlock(), createBlock("span", { key: 0 }, "All types")) : selectedType.value === "featured" ? (openBlock(), createBlock("span", { key: 1 }, "Featured")) : selectedType.value === "inbound" ? (openBlock(), createBlock("span", { key: 2 }, "Inbound")) : (openBlock(), createBlock("span", { key: 3 }, "Outbound"))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), {
                            variant: "outline",
                            size: "sm",
                            class: "ml-2"
                          }, {
                            default: withCtx(() => [
                              !selectedType.value ? (openBlock(), createBlock("span", { key: 0 }, "All types")) : selectedType.value === "featured" ? (openBlock(), createBlock("span", { key: 1 }, "Featured")) : selectedType.value === "inbound" ? (openBlock(), createBlock("span", { key: 2 }, "Inbound")) : (openBlock(), createBlock("span", { key: 3 }, "Outbound"))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          onClick: ($event) => setType("")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`All types`);
                            } else {
                              return [
                                createTextVNode("All types")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          onClick: ($event) => setType("featured")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Featured`);
                            } else {
                              return [
                                createTextVNode("Featured")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          onClick: ($event) => setType("inbound")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Inbound`);
                            } else {
                              return [
                                createTextVNode("Inbound")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          onClick: ($event) => setType("outbound")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Outbound`);
                            } else {
                              return [
                                createTextVNode("Outbound")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), {
                            onClick: ($event) => setType("")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("All types")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$7), {
                            onClick: ($event) => setType("featured")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Featured")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$7), {
                            onClick: ($event) => setType("inbound")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Inbound")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$7), {
                            onClick: ($event) => setType("outbound")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Outbound")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          size: "sm",
                          class: "ml-2"
                        }, {
                          default: withCtx(() => [
                            !selectedType.value ? (openBlock(), createBlock("span", { key: 0 }, "All types")) : selectedType.value === "featured" ? (openBlock(), createBlock("span", { key: 1 }, "Featured")) : selectedType.value === "inbound" ? (openBlock(), createBlock("span", { key: 2 }, "Inbound")) : (openBlock(), createBlock("span", { key: 3 }, "Outbound"))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), {
                          onClick: ($event) => setType("")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("All types")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$7), {
                          onClick: ($event) => setType("featured")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Featured")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$7), {
                          onClick: ($event) => setType("inbound")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Inbound")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$7), {
                          onClick: ($event) => setType("outbound")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Outbound")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (olderGroups.value.length > 0) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(olderGroups.value, (group) => {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  key: group.id,
                  group,
                  href: _ctx.route("admin.packages.groups.pin", { id: group.id }),
                  onGroupUpdated: handleGroupUpdated,
                  onGroupDeleted: handleGroupDeleted
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else if (recentGroups.value.length > 0 && olderGroups.value.length === 0) {
              _push2(`<div class="text-center py-8 rounded-xl border border-dashed dark:border-zinc-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Compass), { class: "w-8 h-8 mx-auto text-zinc-400 stroke-[1.25] mb-2" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50"${_scopeId}>No older collections</h3><p class="text-xs text-zinc-500 mt-1"${_scopeId}>All recent edits are shown above — create more collections to populate this area.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (olderGroups.value.length === 0 && recentGroups.value.length === 0) {
              _push2(`<div class="text-center py-12 border border-dashed rounded-xl dark:border-zinc-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Compass), { class: "w-10 h-10 mx-auto text-zinc-400 stroke-[1.25] mb-2" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50"${_scopeId}>No collections found</h3><p class="text-xs text-zinc-500 mt-1"${_scopeId}>Get started by creating your first package group container.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" }, "Package Groups"),
                    createVNode("p", { class: "text-sm text-zinc-500 dark:text-zinc-400 mt-1" }, " Manage your curated marketing bundles and package catalog collections. ")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.packages.groups.create")
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { class: "sm:w-auto w-full flex items-center gap-2 shadow-sm" }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4" }),
                          createTextVNode(" New Package Group ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                recentGroups.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "p-1 rounded bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40" }, [
                      createVNode(unref(Sparkles), { class: "w-4 h-4 text-indigo-600 dark:text-indigo-400" })
                    ]),
                    createVNode("h2", { class: "text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight" }, "Recently Edited Groups"),
                    createVNode(unref(_sfc_main$c), {
                      variant: "outline",
                      class: "text-[11px] bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/30"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Last 48 Hours ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(recentGroups.value, (group) => {
                      return openBlock(), createBlock(_sfc_main$1, {
                        key: group.id,
                        group,
                        href: _ctx.route("admin.packages.groups.pin", { id: group.id }),
                        highlighted: "",
                        onGroupUpdated: handleGroupUpdated,
                        onGroupDeleted: handleGroupDeleted
                      }, null, 8, ["group", "href"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "space-y-4 mt-2" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" }, [
                    createVNode("h2", { class: "text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight" }, "All Collections"),
                    createVNode("div", { class: "flex items-center gap-2 w-full sm:w-auto" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(_sfc_main$g), {
                          for: "group-search",
                          class: "sr-only"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Search groups")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$h), {
                          id: "group-search",
                          modelValue: searchTerm.value,
                          "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                          placeholder: "Search collections by name",
                          onKeydown: withKeys(applySearch, ["enter"]),
                          class: "w-56"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          size: "sm",
                          onClick: applySearch,
                          class: "p-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Search), { class: "w-4 h-4" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          variant: "ghost",
                          size: "sm",
                          onClick: clearSearch,
                          class: "p-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "w-4 h-4 text-zinc-400" })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), {
                                variant: "outline",
                                size: "sm",
                                class: "ml-2"
                              }, {
                                default: withCtx(() => [
                                  !selectedType.value ? (openBlock(), createBlock("span", { key: 0 }, "All types")) : selectedType.value === "featured" ? (openBlock(), createBlock("span", { key: 1 }, "Featured")) : selectedType.value === "inbound" ? (openBlock(), createBlock("span", { key: 2 }, "Inbound")) : (openBlock(), createBlock("span", { key: 3 }, "Outbound"))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$7), {
                                onClick: ($event) => setType("")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("All types")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$7), {
                                onClick: ($event) => setType("featured")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Featured")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$7), {
                                onClick: ($event) => setType("inbound")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Inbound")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$7), {
                                onClick: ($event) => setType("outbound")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Outbound")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  olderGroups.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(olderGroups.value, (group) => {
                      return openBlock(), createBlock(_sfc_main$1, {
                        key: group.id,
                        group,
                        href: _ctx.route("admin.packages.groups.pin", { id: group.id }),
                        onGroupUpdated: handleGroupUpdated,
                        onGroupDeleted: handleGroupDeleted
                      }, null, 8, ["group", "href"]);
                    }), 128))
                  ])) : recentGroups.value.length > 0 && olderGroups.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-8 rounded-xl border border-dashed dark:border-zinc-800"
                  }, [
                    createVNode(unref(Compass), { class: "w-8 h-8 mx-auto text-zinc-400 stroke-[1.25] mb-2" }),
                    createVNode("h3", { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, "No older collections"),
                    createVNode("p", { class: "text-xs text-zinc-500 mt-1" }, "All recent edits are shown above — create more collections to populate this area.")
                  ])) : createCommentVNode("", true),
                  olderGroups.value.length === 0 && recentGroups.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "text-center py-12 border border-dashed rounded-xl dark:border-zinc-800"
                  }, [
                    createVNode(unref(Compass), { class: "w-10 h-10 mx-auto text-zinc-400 stroke-[1.25] mb-2" }),
                    createVNode("h3", { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, "No collections found"),
                    createVNode("p", { class: "text-xs text-zinc-500 mt-1" }, "Get started by creating your first package group container.")
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/PackageGroupDisplay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
