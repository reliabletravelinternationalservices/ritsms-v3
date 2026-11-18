import { defineComponent, mergeProps, unref, withCtx, openBlock, createBlock, createTextVNode, useSSRContext, createVNode, computed, toDisplayString, Fragment, renderList, ref, watch } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$c } from "./AppLayout-CSZsNKr7.js";
import { _ as _sfc_main$4, a as formatDateString } from "../ssr.js";
import { Loader2, Save, GripVertical, Compass, PinOff, Search, SlidersHorizontal, CloudSun, MapPin, Calendar, ChevronLeft, ChevronRight, Plus, Pin } from "lucide-vue-next";
import { _ as _sfc_main$5 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$6 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b } from "./SelectValue-CdQiWiXd.js";
import { _ as _sfc_main$d } from "./index-xORXC0Yx.js";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "radix-vue";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PackagePinToolbar",
  __ssrInlineRender: true,
  props: {
    isDirty: { type: Boolean },
    processing: { type: Boolean }
  },
  emits: ["save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center gap-3" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        onClick: ($event) => emit("save"),
        disabled: !props.isDirty || props.processing,
        size: "sm",
        class: "flex items-center gap-2 shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.processing) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Save), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            }
            _push2(` Save Sequence `);
          } else {
            return [
              props.processing ? (openBlock(), createBlock(unref(Loader2), {
                key: 0,
                class: "w-4 h-4 animate-spin"
              })) : (openBlock(), createBlock(unref(Save), {
                key: 1,
                class: "w-4 h-4"
              })),
              createTextVNode(" Save Sequence ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (props.isDirty) {
        _push(`<span class="text-xs text-amber-600"><span class="font-medium">●</span> You have unsaved changes </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/package/PackagePinToolbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PinnedPackageList",
  __ssrInlineRender: true,
  props: {
    packages: {},
    draggedIndex: {}
  },
  emits: ["drag-start", "drag-over", "drag-end", "unpin"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5 max-h-[600px] overflow-y-auto p-2 rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/20 dark:border-zinc-800" }, _attrs))}><!--[-->`);
      ssrRenderList(props.packages, (pkg, idx) => {
        var _a;
        _push(`<div draggable="true" class="${ssrRenderClass([{ "opacity-30 border-indigo-500 bg-indigo-50/10": props.draggedIndex === idx }, "flex items-center gap-3 p-2 rounded-lg border bg-white dark:bg-zinc-950 dark:border-zinc-800 shadow-sm transition-all cursor-grab active:cursor-grabbing hover:border-zinc-300 dark:hover:border-zinc-700"])}">`);
        _push(ssrRenderComponent(unref(GripVertical), { class: "w-3.5 h-3.5 text-zinc-400 shrink-0" }, null, _parent));
        _push(`<span class="text-xs font-bold text-zinc-400 w-4 text-center">${ssrInterpolate(idx + 1)}</span><div class="w-8 h-8 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0">`);
        if ((_a = pkg.primary_image) == null ? void 0 : _a.url) {
          _push(`<img${ssrRenderAttr("src", pkg.primary_image.url)} class="w-full h-full object-cover">`);
        } else {
          _push(ssrRenderComponent(unref(Compass), { class: "w-4 h-4 m-2 text-zinc-400" }, null, _parent));
        }
        _push(`</div><div class="flex-1 min-w-0"><h4 class="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">${ssrInterpolate(pkg.name)}</h4><p class="text-[11px] text-zinc-400 truncate">${ssrInterpolate(pkg.destination)} • <span class="capitalize">${ssrInterpolate(pkg.season)}</span></p></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$4), {
          onClick: () => emit("unpin", pkg),
          variant: "ghost",
          size: "icon",
          class: "w-7 h-7 text-zinc-400 hover:text-red-500 shrink-0 rounded-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(PinOff), { class: "w-3.5 h-3.5" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(PinOff), { class: "w-3.5 h-3.5" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (props.packages.length === 0) {
        _push(`<div class="text-center py-12 text-zinc-400 text-xs">`);
        _push(ssrRenderComponent(unref(PinOff), { class: "w-6 h-6 mx-auto opacity-40 mb-1.5" }, null, _parent));
        _push(`<p>No packages pinned to this group.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/package/PinnedPackageList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PackageCatalogList",
  __ssrInlineRender: true,
  props: {
    searchQuery: {},
    showFilters: { type: Boolean },
    filterSeason: {},
    filterDestination: {},
    filterDateRange: {},
    uniquelyFoundDestinations: {},
    paginatedCatalog: {},
    sortedCatalogPoolLength: {},
    currentPage: {},
    totalPageCount: {},
    canPrevPage: { type: Boolean },
    canNextPage: { type: Boolean }
  },
  emits: ["update:searchQuery", "search", "update:showFilters", "update:filterSeason", "update:filterDestination", "update:filterDateRange", "prev", "next", "pin"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showFilters = computed({
      get: () => props.showFilters,
      set: (value) => emit("update:showFilters", value)
    });
    const filterSeason = computed({
      get: () => props.filterSeason,
      set: (value) => emit("update:filterSeason", value)
    });
    const filterDestination = computed({
      get: () => props.filterDestination,
      set: (value) => emit("update:filterDestination", value)
    });
    const filterDateRange = computed({
      get: () => props.filterDateRange,
      set: (value) => emit("update:filterDateRange", value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lg:col-span-7 space-y-3" }, _attrs))}><div class="flex items-center gap-2"><div class="relative flex-1">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        type: "text",
        placeholder: "Quick search catalog...",
        value: props.searchQuery,
        onInput: (event) => emit("update:searchQuery", event.target.value),
        onKeyup: ($event) => emit("search"),
        class: "pl-8 pr-16 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        variant: "ghost",
        size: "sm",
        class: "absolute right-0 top-0 h-9 px-3 text-xs",
        onClick: ($event) => emit("search")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Search `);
          } else {
            return [
              createTextVNode(" Search ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => showFilters.value = !showFilters.value,
        class: ["h-9 gap-1.5 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "bg-zinc-100 dark:bg-zinc-800 border-zinc-400": showFilters.value }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SlidersHorizontal), { class: "w-3.5 h-3.5" }, null, _parent2, _scopeId));
            _push2(` Filter Settings `);
          } else {
            return [
              createVNode(unref(SlidersHorizontal), { class: "w-3.5 h-3.5" }),
              createTextVNode(" Filter Settings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (props.showFilters) {
        _push(`<div class="p-3 rounded-lg border bg-zinc-50/50 dark:bg-zinc-900/40 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-3 transition-all"><div class="space-y-1">`);
        _push(ssrRenderComponent(unref(_sfc_main$6), { class: "text-[11px] font-medium text-zinc-400 flex items-center gap-1" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CloudSun), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(` Season`);
            } else {
              return [
                createVNode(unref(CloudSun), { class: "w-3 h-3" }),
                createTextVNode(" Season")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$7), {
          modelValue: filterSeason.value,
          "onUpdate:modelValue": ($event) => filterSeason.value = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$8), { class: "h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "All" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$9), { placeholder: "All" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "dark:bg-zinc-950 dark:border-zinc-800" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$b), { value: "all" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`All Seasons`);
                        } else {
                          return [
                            createTextVNode("All Seasons")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$b), { value: "spring" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Spring`);
                        } else {
                          return [
                            createTextVNode("Spring")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$b), { value: "summer" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Summer`);
                        } else {
                          return [
                            createTextVNode("Summer")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$b), { value: "autumn" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Autumn`);
                        } else {
                          return [
                            createTextVNode("Autumn")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$b), { value: "winter" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Winter`);
                        } else {
                          return [
                            createTextVNode("Winter")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$b), { value: "all" }, {
                        default: withCtx(() => [
                          createTextVNode("All Seasons")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), { value: "spring" }, {
                        default: withCtx(() => [
                          createTextVNode("Spring")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), { value: "summer" }, {
                        default: withCtx(() => [
                          createTextVNode("Summer")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), { value: "autumn" }, {
                        default: withCtx(() => [
                          createTextVNode("Autumn")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), { value: "winter" }, {
                        default: withCtx(() => [
                          createTextVNode("Winter")
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
                createVNode(unref(_sfc_main$8), { class: "h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$9), { placeholder: "All" })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$a), { class: "dark:bg-zinc-950 dark:border-zinc-800" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$b), { value: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("All Seasons")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), { value: "spring" }, {
                      default: withCtx(() => [
                        createTextVNode("Spring")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), { value: "summer" }, {
                      default: withCtx(() => [
                        createTextVNode("Summer")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), { value: "autumn" }, {
                      default: withCtx(() => [
                        createTextVNode("Autumn")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), { value: "winter" }, {
                      default: withCtx(() => [
                        createTextVNode("Winter")
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
        _push(`</div><div class="space-y-1">`);
        _push(ssrRenderComponent(unref(_sfc_main$6), { class: "text-[11px] font-medium text-zinc-400 flex items-center gap-1" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(MapPin), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(` Location`);
            } else {
              return [
                createVNode(unref(MapPin), { class: "w-3 h-3" }),
                createTextVNode(" Location")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$7), {
          modelValue: filterDestination.value,
          "onUpdate:modelValue": ($event) => filterDestination.value = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$8), { class: "h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "All" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$9), { placeholder: "All" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "dark:bg-zinc-950 dark:border-zinc-800" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(props.uniquelyFoundDestinations, (dest) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$b), {
                        key: dest,
                        value: dest
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="capitalize"${_scopeId3}>${ssrInterpolate(dest === "all" ? "All Locations" : dest)}</span>`);
                          } else {
                            return [
                              createVNode("span", { class: "capitalize" }, toDisplayString(dest === "all" ? "All Locations" : dest), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.uniquelyFoundDestinations, (dest) => {
                        return openBlock(), createBlock(unref(_sfc_main$b), {
                          key: dest,
                          value: dest
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "capitalize" }, toDisplayString(dest === "all" ? "All Locations" : dest), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$8), { class: "h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$9), { placeholder: "All" })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$a), { class: "dark:bg-zinc-950 dark:border-zinc-800" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.uniquelyFoundDestinations, (dest) => {
                      return openBlock(), createBlock(unref(_sfc_main$b), {
                        key: dest,
                        value: dest
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "capitalize" }, toDisplayString(dest === "all" ? "All Locations" : dest), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="space-y-1">`);
        _push(ssrRenderComponent(unref(_sfc_main$6), { class: "text-[11px] font-medium text-zinc-400 flex items-center gap-1" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Calendar), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(` Active Date`);
            } else {
              return [
                createVNode(unref(Calendar), { class: "w-3 h-3" }),
                createTextVNode(" Active Date")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$5), {
          type: "date",
          modelValue: filterDateRange.value,
          "onUpdate:modelValue": ($event) => filterDateRange.value = $event,
          class: "h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden shadow-sm"><div class="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between bg-zinc-50/80 dark:bg-zinc-900/50 border-b dark:border-zinc-800"><div class="text-xs text-zinc-500 dark:text-zinc-400"> Showing <span class="font-semibold text-zinc-900 dark:text-zinc-100">${ssrInterpolate(props.paginatedCatalog.length)}</span> of <span class="font-semibold text-zinc-900 dark:text-zinc-100">${ssrInterpolate(props.sortedCatalogPoolLength)}</span> packages </div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        onClick: ($event) => emit("prev"),
        disabled: !props.canPrevPage,
        variant: "outline",
        size: "sm",
        class: "h-8 text-xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronLeft), { class: "w-3.5 h-3.5" }, null, _parent2, _scopeId));
            _push2(` Prev `);
          } else {
            return [
              createVNode(unref(ChevronLeft), { class: "w-3.5 h-3.5" }),
              createTextVNode(" Prev ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-xs text-zinc-500 dark:text-zinc-400"> Page ${ssrInterpolate(props.currentPage)} of ${ssrInterpolate(props.totalPageCount)}</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        onClick: ($event) => emit("next"),
        disabled: !props.canNextPage,
        variant: "outline",
        size: "sm",
        class: "h-8 text-xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Next `);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Next "),
              createVNode(unref(ChevronRight), { class: "w-3.5 h-3.5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="max-h-[550px] overflow-y-auto divide-y dark:divide-zinc-800"><!--[-->`);
      ssrRenderList(props.paginatedCatalog, (pkg) => {
        var _a;
        _push(`<div class="flex items-center justify-between p-2.5 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 border-b last:border-0 dark:border-zinc-800 transition"><div class="flex items-center gap-3 min-w-0 flex-1 pr-4"><div class="w-8 h-8 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0">`);
        if ((_a = pkg.primary_image) == null ? void 0 : _a.url) {
          _push(`<img${ssrRenderAttr("src", pkg.primary_image.url)} class="w-full h-full object-cover">`);
        } else {
          _push(ssrRenderComponent(unref(Compass), { class: "w-4 h-4 m-2 text-zinc-400" }, null, _parent));
        }
        _push(`</div><div class="min-w-0 flex-1"><h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate leading-snug">${ssrInterpolate(pkg.name)}</h3><div class="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400 whitespace-nowrap overflow-hidden"><span class="flex items-center gap-0.5">`);
        _push(ssrRenderComponent(unref(MapPin), { class: "w-2.5 h-2.5" }, null, _parent));
        _push(` ${ssrInterpolate(pkg.destination)}</span><span>•</span><span class="capitalize">${ssrInterpolate(pkg.season)}</span><span>•</span><span>Sales: ${ssrInterpolate(unref(formatDateString)(pkg.selling_start_date))} - ${ssrInterpolate(unref(formatDateString)(pkg.selling_end_date))}</span></div></div></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$4), {
          onClick: () => emit("pin", pkg),
          variant: "secondary",
          size: "sm",
          class: "h-7 text-[11px] font-medium gap-1 shrink-0 px-2.5 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(` Pin `);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-3 h-3" }),
                createTextVNode(" Pin ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (props.sortedCatalogPoolLength === 0) {
        _push(`<div class="text-center py-16 text-zinc-400 text-xs">`);
        _push(ssrRenderComponent(unref(Compass), { class: "w-6 h-6 mx-auto opacity-30 mb-2" }, null, _parent));
        _push(`<p class="font-medium">No match found inside catalog</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/package/PackageCatalogList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const itemsPerPage = 5;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageGroupPin",
  __ssrInlineRender: true,
  props: {
    destinations: {},
    group: {},
    packages: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const breadcrumbs = [
      { title: "Dashboard", href: route("admin.dashboard") },
      { title: "Package Groups", href: route("admin.packages.groups") },
      { title: "Pinned Items", href: route("admin.packages.groups.pin", { id: props.group.id }) }
    ];
    const availablePackages = computed(() => props.packages ?? []);
    const pinnedPackages = ref(props.group.packages ?? []);
    const initialPinnedIds = ref(((_a = props.group.packages) == null ? void 0 : _a.map((p) => p.id)) ?? []);
    const isDirty = computed(() => {
      const current = pinnedPackages.value.map((p) => p.id);
      if (current.length !== initialPinnedIds.value.length) return true;
      return !current.every((id, index) => id === initialPinnedIds.value[index]);
    });
    const searchQuery = ref("");
    const activeSearchQuery = ref("");
    const filterSeason = ref("all");
    const filterDestination = ref("all");
    const filterDateRange = ref("");
    const showFilters = ref(false);
    const currentPage = ref(1);
    const uniquelyFoundDestinations = computed(() => {
      return ["all", ...props.destinations.map((d) => d.country)];
    });
    const performSearch = () => {
      activeSearchQuery.value = searchQuery.value;
      currentPage.value = 1;
    };
    const filteredCatalogPool = computed(() => {
      return availablePackages.value.filter((pkg) => {
        if (pinnedPackages.value.some((p) => p.id === pkg.id)) return false;
        const term = activeSearchQuery.value.toLowerCase();
        const matchQuery = pkg.name.toLowerCase().includes(term) || pkg.destination.toLowerCase().includes(term);
        const matchSeason = filterSeason.value === "all" || pkg.season.toLowerCase() === filterSeason.value.toLowerCase();
        const matchDest = filterDestination.value === "all" || pkg.destination.toLowerCase().includes(filterDestination.value.toLowerCase());
        let matchDate = true;
        if (filterDateRange.value && pkg.selling_start_date && pkg.selling_end_date) {
          const checkDate = new Date(filterDateRange.value).getTime();
          const start = new Date(pkg.selling_start_date).getTime();
          const end = new Date(pkg.selling_end_date).getTime();
          matchDate = checkDate >= start && checkDate <= end;
        }
        return matchQuery && matchSeason && matchDest && matchDate;
      });
    });
    const sortedCatalogPool = computed(() => {
      return [...filteredCatalogPool.value].sort(
        (a, b) => a.name.localeCompare(b.name, void 0, { sensitivity: "base", numeric: true })
      );
    });
    const totalPageCount = computed(() => Math.max(1, Math.ceil(sortedCatalogPool.value.length / itemsPerPage)));
    const paginatedCatalog = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return sortedCatalogPool.value.slice(start, start + itemsPerPage);
    });
    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };
    const nextPage = () => {
      if (currentPage.value < totalPageCount.value) currentPage.value++;
    };
    watch([filterSeason, filterDestination, filterDateRange], () => {
      currentPage.value = 1;
    });
    const pinPackage = (pkg) => {
      if (!pinnedPackages.value.some((p) => p.id === pkg.id)) pinnedPackages.value.push(pkg);
    };
    const unpinPackage = (pkg) => {
      pinnedPackages.value = pinnedPackages.value.filter((p) => p.id !== pkg.id);
    };
    const draggedIndex = ref(null);
    const onDragStart = (index) => {
      draggedIndex.value = index;
    };
    const onDragOver = (index) => {
      if (draggedIndex.value === null || draggedIndex.value === index) return;
      const items = [...pinnedPackages.value];
      const draggedItem = items.splice(draggedIndex.value, 1)[0];
      items.splice(index, 0, draggedItem);
      pinnedPackages.value = items;
      draggedIndex.value = index;
    };
    const onDragEnd = () => {
      draggedIndex.value = null;
    };
    const form = useForm({ pinned_package_ids: [] });
    const saveOrdering = () => {
      form.pinned_package_ids = pinnedPackages.value.map((pkg, idx) => ({
        package_id: pkg.id,
        order_number: idx + 1
      }));
      form.put(route("admin.packages.groups.pin.update", { id: props.group.id }), {
        preserveScroll: true,
        onSuccess: () => {
          initialPinnedIds.value = pinnedPackages.value.map((p) => p.id);
          toast.success("Pinned package order updated successfully");
        },
        onError: () => toast.error("Failed to update pinned package order")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Arrange Pinned Packages" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$c, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b dark:border-zinc-800"${_scopeId}><div${_scopeId}><div class="flex items-center gap-2 mb-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              variant: "outline",
              class: "text-xs px-2 bg-zinc-50 dark:bg-zinc-900 font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Pin Layout Settings`);
                } else {
                  return [
                    createTextVNode("Pin Layout Settings")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="text-xs text-zinc-400"${_scopeId}>Last Synced: ${ssrInterpolate(unref(formatDateString)(__props.group.updated_at))}</span></div><h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"${_scopeId}>${ssrInterpolate(__props.group.title)}</h1></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              isDirty: isDirty.value,
              processing: unref(form).processing,
              onSave: saveOrdering
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"${_scopeId}><div class="lg:col-span-5 space-y-3"${_scopeId}><h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Pin), { class: "w-3.5 h-3.5 text-indigo-500 fill-indigo-500" }, null, _parent2, _scopeId));
            _push2(` Pinned Items (${ssrInterpolate(pinnedPackages.value.length)}) </h2>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              packages: pinnedPackages.value,
              draggedIndex: draggedIndex.value,
              onDragStart,
              onDragOver,
              onDragEnd,
              onUnpin: unpinPackage
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              searchQuery: searchQuery.value,
              showFilters: showFilters.value,
              filterSeason: filterSeason.value,
              filterDestination: filterDestination.value,
              filterDateRange: filterDateRange.value,
              uniquelyFoundDestinations: uniquelyFoundDestinations.value,
              paginatedCatalog: paginatedCatalog.value,
              sortedCatalogPoolLength: sortedCatalogPool.value.length,
              currentPage: currentPage.value,
              totalPageCount: totalPageCount.value,
              canPrevPage: currentPage.value > 1,
              canNextPage: currentPage.value < totalPageCount.value,
              "onUpdate:searchQuery": (value) => searchQuery.value = value,
              onSearch: performSearch,
              "onUpdate:showFilters": (value) => showFilters.value = value,
              "onUpdate:filterSeason": (value) => filterSeason.value = value,
              "onUpdate:filterDestination": (value) => filterDestination.value = value,
              "onUpdate:filterDateRange": (value) => filterDateRange.value = value,
              onPrev: prevPage,
              onNext: nextPage,
              onPin: pinPackage
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-w-7xl mx-auto w-full flex flex-col gap-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b dark:border-zinc-800" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                      createVNode(unref(_sfc_main$d), {
                        variant: "outline",
                        class: "text-xs px-2 bg-zinc-50 dark:bg-zinc-900 font-medium"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Pin Layout Settings")
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "text-xs text-zinc-400" }, "Last Synced: " + toDisplayString(unref(formatDateString)(__props.group.updated_at)), 1)
                    ]),
                    createVNode("h1", { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" }, toDisplayString(__props.group.title), 1)
                  ]),
                  createVNode(_sfc_main$3, {
                    isDirty: isDirty.value,
                    processing: unref(form).processing,
                    onSave: saveOrdering
                  }, null, 8, ["isDirty", "processing"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" }, [
                  createVNode("div", { class: "lg:col-span-5 space-y-3" }, [
                    createVNode("h2", { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2" }, [
                      createVNode(unref(Pin), { class: "w-3.5 h-3.5 text-indigo-500 fill-indigo-500" }),
                      createTextVNode(" Pinned Items (" + toDisplayString(pinnedPackages.value.length) + ") ", 1)
                    ]),
                    createVNode(_sfc_main$2, {
                      packages: pinnedPackages.value,
                      draggedIndex: draggedIndex.value,
                      onDragStart,
                      onDragOver,
                      onDragEnd,
                      onUnpin: unpinPackage
                    }, null, 8, ["packages", "draggedIndex"])
                  ]),
                  createVNode(_sfc_main$1, {
                    searchQuery: searchQuery.value,
                    showFilters: showFilters.value,
                    filterSeason: filterSeason.value,
                    filterDestination: filterDestination.value,
                    filterDateRange: filterDateRange.value,
                    uniquelyFoundDestinations: uniquelyFoundDestinations.value,
                    paginatedCatalog: paginatedCatalog.value,
                    sortedCatalogPoolLength: sortedCatalogPool.value.length,
                    currentPage: currentPage.value,
                    totalPageCount: totalPageCount.value,
                    canPrevPage: currentPage.value > 1,
                    canNextPage: currentPage.value < totalPageCount.value,
                    "onUpdate:searchQuery": (value) => searchQuery.value = value,
                    onSearch: performSearch,
                    "onUpdate:showFilters": (value) => showFilters.value = value,
                    "onUpdate:filterSeason": (value) => filterSeason.value = value,
                    "onUpdate:filterDestination": (value) => filterDestination.value = value,
                    "onUpdate:filterDateRange": (value) => filterDateRange.value = value,
                    onPrev: prevPage,
                    onNext: nextPage,
                    onPin: pinPackage
                  }, null, 8, ["searchQuery", "showFilters", "filterSeason", "filterDestination", "filterDateRange", "uniquelyFoundDestinations", "paginatedCatalog", "sortedCatalogPoolLength", "currentPage", "totalPageCount", "canPrevPage", "canNextPage", "onUpdate:searchQuery", "onUpdate:showFilters", "onUpdate:filterSeason", "onUpdate:filterDestination", "onUpdate:filterDateRange"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/PackageGroupPin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
