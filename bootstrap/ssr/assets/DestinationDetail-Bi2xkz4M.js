import { defineComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$6 } from "./AppLayout-CSZsNKr7.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { t as truncateText, _ as _sfc_main$3, o as openDeleteDialog } from "../ssr.js";
import { toast } from "vue-sonner";
import { _ as _sfc_main$4, d as _sfc_main$5, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9 } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$2 } from "./index-xORXC0Yx.js";
import { Compass, ChevronLeft, Trash2, Edit, Globe, Tag, FileText, MapPin, Plus, Map } from "lucide-vue-next";
import "class-variance-authority";
import "radix-vue";
import "./Input-B-ZniF4D.js";
import "@vueuse/core";
import "./TooltipTrigger-B2yyxzkT.js";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DestinationDetail",
  __ssrInlineRender: true,
  props: {
    destination: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbs = [
      { title: "Dashboard", href: route("admin.dashboard") },
      { title: "Destinations", href: route("admin.destinations") },
      { title: truncateText(props.destination.title, 20), href: route("admin.destinations.details", { id: props.destination.id }) }
    ];
    const onDelete = () => {
      openDeleteDialog({
        title: "Delete destination",
        message: `Are you sure you want to delete "${props.destination.title}"? This action cannot be undone.`,
        confirmText: "Delete destination",
        cancelText: "Cancel",
        onConfirm: () => {
          router.delete(route("admin.destinations.destroy", { id: props.destination.id }), {
            preserveScroll: true,
            onSuccess: () => {
              toast.success("Destination deleted successfully");
            },
            onError: () => {
              toast.error("Failed to delete destination. Please try again.");
            }
          });
        }
      });
    };
    const onDeleteLocation = ({ location }) => {
      openDeleteDialog({
        title: "Delete Location",
        message: `Are you sure you want to delete "${location.name}"? This action cannot be undone.`,
        confirmText: "Delete location",
        cancelText: "Cancel",
        onConfirm: () => {
          router.delete(route("admin.destinations.locations.destroy", { destID: props.destination.id, id: location.id }), {
            preserveScroll: true,
            onSuccess: () => {
              toast.success("Location deleted successfully");
            },
            onError: () => {
              toast.error("Failed to delete location. Please try again.");
            }
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.destination.title} - Details`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-w-7xl mx-auto w-full space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b dark:border-zinc-800"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border dark:border-zinc-800 shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Compass), { class: "w-5 h-5 text-indigo-500" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><div class="flex items-center gap-2 mb-0.5"${_scopeId}><span class="text-xs text-zinc-400"${_scopeId}>Destination ID: #${ssrInterpolate(__props.destination.id)}</span>`);
            if (__props.destination.tag) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: "secondary",
                class: "text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.destination.tag)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.destination.tag), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"${_scopeId}>${ssrInterpolate(__props.destination.title)}</h1></div></div><div class="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: "outline",
              size: "sm",
              "as-child": "",
              class: "h-9 text-xs bg-white dark:bg-zinc-950 dark:border-zinc-800"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.destinations")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ChevronLeft), { class: "w-3.5 h-3.5 mr-1" }, null, _parent4, _scopeId3));
                        _push4(` Back `);
                      } else {
                        return [
                          createVNode(unref(ChevronLeft), { class: "w-3.5 h-3.5 mr-1" }),
                          createTextVNode(" Back ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.destinations")
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ChevronLeft), { class: "w-3.5 h-3.5 mr-1" }),
                        createTextVNode(" Back ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: "ghost",
              size: "sm",
              class: "h-9 text-xs gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
              onClick: onDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Trash2), { class: "w-3.5 h-3.5" }, null, _parent3, _scopeId2));
                  _push3(` Delete `);
                } else {
                  return [
                    createVNode(unref(Trash2), { class: "w-3.5 h-3.5" }),
                    createTextVNode(" Delete ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              size: "sm",
              "as-child": "",
              class: "h-9 text-xs gap-1.5 shadow-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.destinations.edit", { id: __props.destination.id })
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Edit), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Edit `);
                      } else {
                        return [
                          createVNode(unref(Edit), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Edit ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.destinations.edit", { id: __props.destination.id })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Edit), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Edit ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"${_scopeId}><div class="lg:col-span-4 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "dark:border-zinc-800 shadow-sm overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900 border-b dark:border-zinc-800"${_scopeId2}>`);
                  if ((_a = __props.destination.image) == null ? void 0 : _a.url) {
                    _push3(`<img${ssrRenderAttr("src", __props.destination.image.url)} alt="Destination Showcase Media Graphic" class="w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    _push3(`<div class="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-1.5"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Compass), { class: "w-8 h-8 stroke-[1.25] opacity-40" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-xs"${_scopeId2}>No cover image uploaded</span></div>`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "p-4 space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2 text-xs"${_scopeId3}><div class="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900"${_scopeId3}><span class="text-zinc-400 flex items-center gap-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Globe), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Country </span><span class="font-semibold text-zinc-800 dark:text-zinc-200"${_scopeId3}>${ssrInterpolate(__props.destination.country)}</span></div><div class="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900"${_scopeId3}><span class="text-zinc-400 flex items-center gap-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Tag), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Segment Tag </span><span class="font-mono text-zinc-600 dark:text-zinc-400"${_scopeId3}>${ssrInterpolate(__props.destination.tag ?? "—")}</span></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "dark:bg-zinc-800" }, null, _parent4, _scopeId3));
                        _push4(`<div class="space-y-1.5"${_scopeId3}><h3 class="text-xs font-semibold text-zinc-400 flex items-center gap-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(FileText), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Detailed Description </h3><p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-lg border dark:border-zinc-900"${_scopeId3}>${ssrInterpolate(__props.destination.description)}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2 text-xs" }, [
                            createVNode("div", { class: "flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900" }, [
                              createVNode("span", { class: "text-zinc-400 flex items-center gap-1.5" }, [
                                createVNode(unref(Globe), { class: "w-3.5 h-3.5" }),
                                createTextVNode(" Country ")
                              ]),
                              createVNode("span", { class: "font-semibold text-zinc-800 dark:text-zinc-200" }, toDisplayString(__props.destination.country), 1)
                            ]),
                            createVNode("div", { class: "flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900" }, [
                              createVNode("span", { class: "text-zinc-400 flex items-center gap-1.5" }, [
                                createVNode(unref(Tag), { class: "w-3.5 h-3.5" }),
                                createTextVNode(" Segment Tag ")
                              ]),
                              createVNode("span", { class: "font-mono text-zinc-600 dark:text-zinc-400" }, toDisplayString(__props.destination.tag ?? "—"), 1)
                            ])
                          ]),
                          createVNode(unref(_sfc_main$6), { class: "dark:bg-zinc-800" }),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode("h3", { class: "text-xs font-semibold text-zinc-400 flex items-center gap-1.5" }, [
                              createVNode(unref(FileText), { class: "w-3.5 h-3.5" }),
                              createTextVNode(" Detailed Description ")
                            ]),
                            createVNode("p", { class: "text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-lg border dark:border-zinc-900" }, toDisplayString(__props.destination.description), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900 border-b dark:border-zinc-800" }, [
                      ((_b = __props.destination.image) == null ? void 0 : _b.url) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: __props.destination.image.url,
                        alt: "Destination Showcase Media Graphic",
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-1.5"
                      }, [
                        createVNode(unref(Compass), { class: "w-8 h-8 stroke-[1.25] opacity-40" }),
                        createVNode("span", { class: "text-xs" }, "No cover image uploaded")
                      ]))
                    ]),
                    createVNode(unref(_sfc_main$5), { class: "p-4 space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2 text-xs" }, [
                          createVNode("div", { class: "flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900" }, [
                            createVNode("span", { class: "text-zinc-400 flex items-center gap-1.5" }, [
                              createVNode(unref(Globe), { class: "w-3.5 h-3.5" }),
                              createTextVNode(" Country ")
                            ]),
                            createVNode("span", { class: "font-semibold text-zinc-800 dark:text-zinc-200" }, toDisplayString(__props.destination.country), 1)
                          ]),
                          createVNode("div", { class: "flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900" }, [
                            createVNode("span", { class: "text-zinc-400 flex items-center gap-1.5" }, [
                              createVNode(unref(Tag), { class: "w-3.5 h-3.5" }),
                              createTextVNode(" Segment Tag ")
                            ]),
                            createVNode("span", { class: "font-mono text-zinc-600 dark:text-zinc-400" }, toDisplayString(__props.destination.tag ?? "—"), 1)
                          ])
                        ]),
                        createVNode(unref(_sfc_main$6), { class: "dark:bg-zinc-800" }),
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode("h3", { class: "text-xs font-semibold text-zinc-400 flex items-center gap-1.5" }, [
                            createVNode(unref(FileText), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" Detailed Description ")
                          ]),
                          createVNode("p", { class: "text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-lg border dark:border-zinc-900" }, toDisplayString(__props.destination.description), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="lg:col-span-8 space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "dark:border-zinc-800 shadow-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "p-4 pb-3 flex flex-row items-center justify-between space-y-0 border-b dark:border-zinc-800" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(MapPin), { class: "w-4 h-4 text-indigo-500" }, null, _parent5, _scopeId4));
                              _push5(` Locations (${ssrInterpolate(((_a = __props.destination.locations) == null ? void 0 : _a.length) ?? 0)}) `);
                            } else {
                              return [
                                createVNode(unref(MapPin), { class: "w-4 h-4 text-indigo-500" }),
                                createTextVNode(" Locations (" + toDisplayString(((_b = __props.destination.locations) == null ? void 0 : _b.length) ?? 0) + ") ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-[11px] mt-0.5" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Specific drop-off locations, historical landmarks, or hotel hubs tied to this region.`);
                            } else {
                              return [
                                createTextVNode("Specific drop-off locations, historical landmarks, or hotel hubs tied to this region.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          size: "sm",
                          variant: "outline",
                          "as-child": "",
                          class: "h-8 text-xs gap-1 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Link), {
                                href: _ctx.route("admin.destinations.locations.create", { destID: __props.destination.id })
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Plus), { class: "w-3.5 h-3.5" }, null, _parent6, _scopeId5));
                                    _push6(` Add Location `);
                                  } else {
                                    return [
                                      createVNode(unref(Plus), { class: "w-3.5 h-3.5" }),
                                      createTextVNode(" Add Location ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.destinations.locations.create", { destID: __props.destination.id })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus), { class: "w-3.5 h-3.5" }),
                                    createTextVNode(" Add Location ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$8), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2" }, {
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createVNode(unref(MapPin), { class: "w-4 h-4 text-indigo-500" }),
                                  createTextVNode(" Locations (" + toDisplayString(((_a = __props.destination.locations) == null ? void 0 : _a.length) ?? 0) + ") ", 1)
                                ];
                              }),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), { class: "text-[11px] mt-0.5" }, {
                              default: withCtx(() => [
                                createTextVNode("Specific drop-off locations, historical landmarks, or hotel hubs tied to this region.")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$3), {
                            size: "sm",
                            variant: "outline",
                            "as-child": "",
                            class: "h-8 text-xs gap-1 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.destinations.locations.create", { destID: __props.destination.id })
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Add Location ")
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "p-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="divide-y dark:divide-zinc-800"${_scopeId3}><!--[-->`);
                        ssrRenderList(__props.destination.locations, (location) => {
                          var _a;
                          _push4(`<div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition"${_scopeId3}><div class="flex items-start gap-3 min-w-0 flex-1"${_scopeId3}><div class="w-12 h-12 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0"${_scopeId3}>`);
                          if ((_a = location.image) == null ? void 0 : _a.url) {
                            _push4(`<img${ssrRenderAttr("src", location.image.url)} class="w-full h-full object-cover"${_scopeId3}>`);
                          } else {
                            _push4(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5 m-3 text-zinc-400" }, null, _parent4, _scopeId3));
                          }
                          _push4(`</div><div class="min-w-0 flex-1 space-y-0.5"${_scopeId3}><h4 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5"${_scopeId3}>${ssrInterpolate(location.name)}</h4><p class="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed"${_scopeId3}>${ssrInterpolate(location.description)}</p></div></div><div class="flex items-center gap-1 self-end sm:self-center shrink-0 pl-15 sm:pl-0"${_scopeId3}><a${ssrRenderAttr("href", location.map_link)} target="_blank" rel="noopener noreferrer" title="View Map"${_scopeId3}>`);
                          if (location.map_link) {
                            _push4(ssrRenderComponent(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "icon",
                              "as-child": "",
                              class: "w-8 h-8 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Map), { class: "w-3.5 h-3.5" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Map), { class: "w-3.5 h-3.5" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</a>`);
                          _push4(ssrRenderComponent(unref(Link), {
                            href: _ctx.route("admin.destinations.locations.edit", { destID: __props.destination.id, id: location.id })
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                  variant: "ghost",
                                  size: "icon",
                                  "as-child": "",
                                  class: "w-5 h-5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Edit), { class: "w-4.5 h-4.5" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(Edit), { class: "w-4.5 h-4.5" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$3), {
                                    variant: "ghost",
                                    size: "icon",
                                    "as-child": "",
                                    class: "w-5 h-5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Edit), { class: "w-4.5 h-4.5" })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$3), {
                            variant: "ghost",
                            size: "icon",
                            "as-child": "",
                            class: "w-5 h-5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                            onClick: ($event) => onDeleteLocation({ location })
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Trash2), { class: "w-3.5 h-3.5" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(Trash2), { class: "w-3.5 h-3.5" })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        });
                        _push4(`<!--]-->`);
                        if (!__props.destination.locations || __props.destination.locations.length === 0) {
                          _push4(`<div class="text-center py-12 text-zinc-400 text-xs"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(MapPin), { class: "w-6 h-6 mx-auto opacity-30 mb-2 stroke-[1.25]" }, null, _parent4, _scopeId3));
                          _push4(`<p class="font-medium"${_scopeId3}>No secondary locations added</p><p class="text-[11px] text-zinc-500 mt-0.5"${_scopeId3}>Add mapped target spaces to link packages smoothly.</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "divide-y dark:divide-zinc-800" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.destination.locations, (location) => {
                              var _a;
                              return openBlock(), createBlock("div", {
                                key: location.id,
                                class: "flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition"
                              }, [
                                createVNode("div", { class: "flex items-start gap-3 min-w-0 flex-1" }, [
                                  createVNode("div", { class: "w-12 h-12 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0" }, [
                                    ((_a = location.image) == null ? void 0 : _a.url) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: location.image.url,
                                      class: "w-full h-full object-cover"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock(unref(MapPin), {
                                      key: 1,
                                      class: "w-5 h-5 m-3 text-zinc-400"
                                    }))
                                  ]),
                                  createVNode("div", { class: "min-w-0 flex-1 space-y-0.5" }, [
                                    createVNode("h4", { class: "text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5" }, toDisplayString(location.name), 1),
                                    createVNode("p", { class: "text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed" }, toDisplayString(location.description), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "flex items-center gap-1 self-end sm:self-center shrink-0 pl-15 sm:pl-0" }, [
                                  createVNode("a", {
                                    href: location.map_link,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    title: "View Map"
                                  }, [
                                    location.map_link ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                      key: 0,
                                      variant: "ghost",
                                      size: "icon",
                                      "as-child": "",
                                      class: "w-8 h-8 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Map), { class: "w-3.5 h-3.5" })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ], 8, ["href"]),
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin.destinations.locations.edit", { destID: __props.destination.id, id: location.id })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$3), {
                                        variant: "ghost",
                                        size: "icon",
                                        "as-child": "",
                                        class: "w-5 h-5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Edit), { class: "w-4.5 h-4.5" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  createVNode(unref(_sfc_main$3), {
                                    variant: "ghost",
                                    size: "icon",
                                    "as-child": "",
                                    class: "w-5 h-5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                                    onClick: ($event) => onDeleteLocation({ location })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "w-3.5 h-3.5" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]);
                            }), 128)),
                            !__props.destination.locations || __props.destination.locations.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-12 text-zinc-400 text-xs"
                            }, [
                              createVNode(unref(MapPin), { class: "w-6 h-6 mx-auto opacity-30 mb-2 stroke-[1.25]" }),
                              createVNode("p", { class: "font-medium" }, "No secondary locations added"),
                              createVNode("p", { class: "text-[11px] text-zinc-500 mt-0.5" }, "Add mapped target spaces to link packages smoothly.")
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "p-4 pb-3 flex flex-row items-center justify-between space-y-0 border-b dark:border-zinc-800" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$8), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2" }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode(unref(MapPin), { class: "w-4 h-4 text-indigo-500" }),
                                createTextVNode(" Locations (" + toDisplayString(((_a = __props.destination.locations) == null ? void 0 : _a.length) ?? 0) + ") ", 1)
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), { class: "text-[11px] mt-0.5" }, {
                            default: withCtx(() => [
                              createTextVNode("Specific drop-off locations, historical landmarks, or hotel hubs tied to this region.")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$3), {
                          size: "sm",
                          variant: "outline",
                          "as-child": "",
                          class: "h-8 text-xs gap-1 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Link), {
                              href: _ctx.route("admin.destinations.locations.create", { destID: __props.destination.id })
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Plus), { class: "w-3.5 h-3.5" }),
                                createTextVNode(" Add Location ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), { class: "p-0" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "divide-y dark:divide-zinc-800" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.destination.locations, (location) => {
                            var _a;
                            return openBlock(), createBlock("div", {
                              key: location.id,
                              class: "flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition"
                            }, [
                              createVNode("div", { class: "flex items-start gap-3 min-w-0 flex-1" }, [
                                createVNode("div", { class: "w-12 h-12 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0" }, [
                                  ((_a = location.image) == null ? void 0 : _a.url) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: location.image.url,
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock(unref(MapPin), {
                                    key: 1,
                                    class: "w-5 h-5 m-3 text-zinc-400"
                                  }))
                                ]),
                                createVNode("div", { class: "min-w-0 flex-1 space-y-0.5" }, [
                                  createVNode("h4", { class: "text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5" }, toDisplayString(location.name), 1),
                                  createVNode("p", { class: "text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed" }, toDisplayString(location.description), 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center gap-1 self-end sm:self-center shrink-0 pl-15 sm:pl-0" }, [
                                createVNode("a", {
                                  href: location.map_link,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  title: "View Map"
                                }, [
                                  location.map_link ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                    key: 0,
                                    variant: "ghost",
                                    size: "icon",
                                    "as-child": "",
                                    class: "w-8 h-8 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Map), { class: "w-3.5 h-3.5" })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ], 8, ["href"]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.destinations.locations.edit", { destID: __props.destination.id, id: location.id })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$3), {
                                      variant: "ghost",
                                      size: "icon",
                                      "as-child": "",
                                      class: "w-5 h-5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Edit), { class: "w-4.5 h-4.5" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode(unref(_sfc_main$3), {
                                  variant: "ghost",
                                  size: "icon",
                                  "as-child": "",
                                  class: "w-5 h-5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                                  onClick: ($event) => onDeleteLocation({ location })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), { class: "w-3.5 h-3.5" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ]);
                          }), 128)),
                          !__props.destination.locations || __props.destination.locations.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-12 text-zinc-400 text-xs"
                          }, [
                            createVNode(unref(MapPin), { class: "w-6 h-6 mx-auto opacity-30 mb-2 stroke-[1.25]" }),
                            createVNode("p", { class: "font-medium" }, "No secondary locations added"),
                            createVNode("p", { class: "text-[11px] text-zinc-500 mt-0.5" }, "Add mapped target spaces to link packages smoothly.")
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-w-7xl mx-auto w-full space-y-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b dark:border-zinc-800" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border dark:border-zinc-800 shrink-0" }, [
                      createVNode(unref(Compass), { class: "w-5 h-5 text-indigo-500" })
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center gap-2 mb-0.5" }, [
                        createVNode("span", { class: "text-xs text-zinc-400" }, "Destination ID: #" + toDisplayString(__props.destination.id), 1),
                        __props.destination.tag ? (openBlock(), createBlock(unref(_sfc_main$2), {
                          key: 0,
                          variant: "secondary",
                          class: "text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.destination.tag), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("h1", { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" }, toDisplayString(__props.destination.title), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto" }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: "outline",
                      size: "sm",
                      "as-child": "",
                      class: "h-9 text-xs bg-white dark:bg-zinc-950 dark:border-zinc-800"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.destinations")
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronLeft), { class: "w-3.5 h-3.5 mr-1" }),
                            createTextVNode(" Back ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      variant: "ghost",
                      size: "sm",
                      class: "h-9 text-xs gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: onDelete
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Trash2), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Delete ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      size: "sm",
                      "as-child": "",
                      class: "h-9 text-xs gap-1.5 shadow-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.destinations.edit", { id: __props.destination.id })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" }, [
                  createVNode("div", { class: "lg:col-span-4 space-y-4" }, [
                    createVNode(unref(_sfc_main$4), { class: "dark:border-zinc-800 shadow-sm overflow-hidden" }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode("div", { class: "relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900 border-b dark:border-zinc-800" }, [
                            ((_a = __props.destination.image) == null ? void 0 : _a.url) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: __props.destination.image.url,
                              alt: "Destination Showcase Media Graphic",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-1.5"
                            }, [
                              createVNode(unref(Compass), { class: "w-8 h-8 stroke-[1.25] opacity-40" }),
                              createVNode("span", { class: "text-xs" }, "No cover image uploaded")
                            ]))
                          ]),
                          createVNode(unref(_sfc_main$5), { class: "p-4 space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-2 text-xs" }, [
                                createVNode("div", { class: "flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900" }, [
                                  createVNode("span", { class: "text-zinc-400 flex items-center gap-1.5" }, [
                                    createVNode(unref(Globe), { class: "w-3.5 h-3.5" }),
                                    createTextVNode(" Country ")
                                  ]),
                                  createVNode("span", { class: "font-semibold text-zinc-800 dark:text-zinc-200" }, toDisplayString(__props.destination.country), 1)
                                ]),
                                createVNode("div", { class: "flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900" }, [
                                  createVNode("span", { class: "text-zinc-400 flex items-center gap-1.5" }, [
                                    createVNode(unref(Tag), { class: "w-3.5 h-3.5" }),
                                    createTextVNode(" Segment Tag ")
                                  ]),
                                  createVNode("span", { class: "font-mono text-zinc-600 dark:text-zinc-400" }, toDisplayString(__props.destination.tag ?? "—"), 1)
                                ])
                              ]),
                              createVNode(unref(_sfc_main$6), { class: "dark:bg-zinc-800" }),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode("h3", { class: "text-xs font-semibold text-zinc-400 flex items-center gap-1.5" }, [
                                  createVNode(unref(FileText), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Detailed Description ")
                                ]),
                                createVNode("p", { class: "text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-lg border dark:border-zinc-900" }, toDisplayString(__props.destination.description), 1)
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "lg:col-span-8 space-y-6" }, [
                    createVNode(unref(_sfc_main$4), { class: "dark:border-zinc-800 shadow-sm" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), { class: "p-4 pb-3 flex flex-row items-center justify-between space-y-0 border-b dark:border-zinc-800" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$8), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2" }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(unref(MapPin), { class: "w-4 h-4 text-indigo-500" }),
                                    createTextVNode(" Locations (" + toDisplayString(((_a = __props.destination.locations) == null ? void 0 : _a.length) ?? 0) + ") ", 1)
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), { class: "text-[11px] mt-0.5" }, {
                                default: withCtx(() => [
                                  createTextVNode("Specific drop-off locations, historical landmarks, or hotel hubs tied to this region.")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(unref(_sfc_main$3), {
                              size: "sm",
                              variant: "outline",
                              "as-child": "",
                              class: "h-8 text-xs gap-1 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.destinations.locations.create", { destID: __props.destination.id })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus), { class: "w-3.5 h-3.5" }),
                                    createTextVNode(" Add Location ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "divide-y dark:divide-zinc-800" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.destination.locations, (location) => {
                                var _a;
                                return openBlock(), createBlock("div", {
                                  key: location.id,
                                  class: "flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition"
                                }, [
                                  createVNode("div", { class: "flex items-start gap-3 min-w-0 flex-1" }, [
                                    createVNode("div", { class: "w-12 h-12 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0" }, [
                                      ((_a = location.image) == null ? void 0 : _a.url) ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: location.image.url,
                                        class: "w-full h-full object-cover"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock(unref(MapPin), {
                                        key: 1,
                                        class: "w-5 h-5 m-3 text-zinc-400"
                                      }))
                                    ]),
                                    createVNode("div", { class: "min-w-0 flex-1 space-y-0.5" }, [
                                      createVNode("h4", { class: "text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5" }, toDisplayString(location.name), 1),
                                      createVNode("p", { class: "text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed" }, toDisplayString(location.description), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-1 self-end sm:self-center shrink-0 pl-15 sm:pl-0" }, [
                                    createVNode("a", {
                                      href: location.map_link,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      title: "View Map"
                                    }, [
                                      location.map_link ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                        key: 0,
                                        variant: "ghost",
                                        size: "icon",
                                        "as-child": "",
                                        class: "w-8 h-8 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Map), { class: "w-3.5 h-3.5" })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ], 8, ["href"]),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin.destinations.locations.edit", { destID: __props.destination.id, id: location.id })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$3), {
                                          variant: "ghost",
                                          size: "icon",
                                          "as-child": "",
                                          class: "w-5 h-5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Edit), { class: "w-4.5 h-4.5" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["href"]),
                                    createVNode(unref(_sfc_main$3), {
                                      variant: "ghost",
                                      size: "icon",
                                      "as-child": "",
                                      class: "w-5 h-5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                                      onClick: ($event) => onDeleteLocation({ location })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), { class: "w-3.5 h-3.5" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ]);
                              }), 128)),
                              !__props.destination.locations || __props.destination.locations.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-12 text-zinc-400 text-xs"
                              }, [
                                createVNode(unref(MapPin), { class: "w-6 h-6 mx-auto opacity-30 mb-2 stroke-[1.25]" }),
                                createVNode("p", { class: "font-medium" }, "No secondary locations added"),
                                createVNode("p", { class: "text-[11px] text-zinc-500 mt-0.5" }, "Add mapped target spaces to link packages smoothly.")
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/destination/DestinationDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
