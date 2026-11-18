import { defineComponent, mergeProps, unref, useSSRContext, withCtx, createTextVNode, ref, createVNode, h } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$7 } from "./AppLayout-CSZsNKr7.js";
import { Link, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./Input-B-ZniF4D.js";
import { Icon } from "@iconify/vue";
import { useVueTable, getFilteredRowModel, getPaginationRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { _ as _sfc_main$6 } from "../ssr.js";
import { _ as _sfc_main$8 } from "./StatsCard-DAT7bJLR.js";
import "class-variance-authority";
import "radix-vue";
import "lucide-vue-next";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
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
import "./MotionWrapper-DwlQ79CS.js";
import "./useCounterAnimation-DqMA6bbz.js";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DestinationNameCell",
  __ssrInlineRender: true,
  props: {
    destination: {}
  },
  setup(__props) {
    const props = __props;
    const title = props.destination.title || "";
    const displayTitle = title.length > 70 ? `${title.slice(0, 70)}...` : title;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-start gap-3 min-w-0" }, _attrs))}><div class="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">`);
      if ((_a = __props.destination.image) == null ? void 0 : _a.url) {
        _push(`<img${ssrRenderAttr("src", __props.destination.image.url)}${ssrRenderAttr("alt", ((_b = __props.destination.image) == null ? void 0 : _b.alt_text) || __props.destination.title)} class="h-full w-full object-cover">`);
      } else {
        _push(`<div class="flex h-full w-full items-center justify-center text-muted-foreground">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:image-off",
          width: "24",
          height: "24"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="min-w-0"><p class="font-semibold text-sm leading-5 line-clamp-2 break-words">${ssrInterpolate(unref(displayTitle))}</p></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/destinations/DestinationNameCell.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DestinationLocationsCell",
  __ssrInlineRender: true,
  props: {
    locations: {}
  },
  setup(__props) {
    const props = __props;
    const displayedLocations = (() => {
      const names = props.locations.map((location) => location.name);
      if (names.length === 0) {
        return "No locations available";
      }
      const visibleNames = names.slice(0, 3);
      const remaining = names.length - visibleNames.length;
      return remaining > 0 ? `${visibleNames.join(", ")} and ${remaining} more` : visibleNames.join(", ");
    })();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(displayedLocations))}</p></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/destinations/DestinationLocationsCell.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DestinationDetailsCell",
  __ssrInlineRender: true,
  props: {
    destinationId: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.destinations.details", { id: props.destinationId }),
        class: "italic underline text-sm hover:text-[var(--tertiary-custom)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Details `);
          } else {
            return [
              createTextVNode(" View Details ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/destinations/DestinationDetailsCell.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DestinationTable",
  __ssrInlineRender: true,
  props: {
    destinations: {}
  },
  setup(__props) {
    const props = __props;
    const data = ref(props.destinations);
    const columns = [
      {
        accessorKey: "id",
        header: "ID",
        enableHiding: true,
        enableSorting: true,
        cell: () => null,
        meta: {
          hidden: true
        }
      },
      {
        id: "destination",
        header: "Destination",
        accessorFn: (row) => row.title,
        enableSorting: true,
        minSize: 300,
        maxSize: 520,
        cell: (info) => h(_sfc_main$4, {
          destination: info.row.original
        })
      },
      {
        accessorKey: "country",
        header: "Country",
        enableSorting: true,
        minSize: 150
      },
      {
        accessorKey: "tag",
        header: "Tag",
        minSize: 120,
        cell: (info) => info.getValue() ? String(info.getValue()) : "-"
      },
      {
        id: "locations",
        header: "Locations",
        accessorFn: (row) => row.locations,
        enableSorting: true,
        minSize: 220,
        cell: (info) => h(_sfc_main$3, {
          locations: info.row.original.locations
        })
      },
      {
        id: "details",
        header: "Details",
        minSize: 140,
        cell: (info) => h(_sfc_main$2, {
          destinationId: info.row.original.id
        })
      }
    ];
    const globalFilter = ref("");
    const search = ref("");
    const table = useVueTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
        pagination: {
          pageSize: 5
        },
        columnVisibility: {
          id: false
        }
      },
      state: {
        get globalFilter() {
          return globalFilter.value;
        }
      },
      onGlobalFilterChange: (updater) => {
        globalFilter.value = typeof updater === "function" ? updater(globalFilter.value) : updater;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        type: "text",
        placeholder: "Search by title, country or tag...",
        class: "border rounded-sm px-3 py-2 w-full max-w-sm",
        onKeyup: ($event) => unref(table).setGlobalFilter(search.value),
        onInput: ($event) => !search.value.trim() && unref(table).setGlobalFilter("")
      }, null, _parent));
      _push(`<button class="flex items-center">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "iconoir:search",
        class: "text-2xl"
      }, null, _parent));
      _push(`</button></div><div class="flex flex-col gap-1"><span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.destinations.create")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), {
              type: "button",
              variant: "default"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create `);
                } else {
                  return [
                    createTextVNode(" Create ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), {
                type: "button",
                variant: "default"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Create ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div><table class="w-full table-auto"><thead><!--[-->`);
      ssrRenderList(unref(table).getHeaderGroups(), (columnHeaders) => {
        _push(`<tr><!--[-->`);
        ssrRenderList(columnHeaders.headers, (header) => {
          _push(`<th class="border px-4 py-2 text-left" style="${ssrRenderStyle({ width: `${header.column.getSize()}px` })}">`);
          _push(ssrRenderComponent(unref(FlexRender), {
            render: header.column.columnDef.header,
            props: header.getContext()
          }, null, _parent));
          _push(`</th>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></thead><tbody>`);
      if (unref(table).getRowModel().rows.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(table).getRowModel().rows, (row) => {
          _push(`<tr class="odd:bg-muted/50"><!--[-->`);
          ssrRenderList(row.getVisibleCells(), (cell) => {
            _push(`<td class="border px-4 py-2 align-top">`);
            _push(ssrRenderComponent(unref(FlexRender), {
              render: cell.column.columnDef.cell,
              props: cell.getContext()
            }, null, _parent));
            _push(`</td>`);
          });
          _push(`<!--]--></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<tr><td${ssrRenderAttr("colspan", columns.length)} class="border px-4 py-2 text-center text-sm text-muted-foreground italic"> No destinations found. </td></tr>`);
      }
      _push(`</tbody><tfoot><tr><td${ssrRenderAttr("colspan", columns.length)}><div class="flex items-center justify-between mt-4"><span class="text-sm text-muted-foreground"> Page ${ssrInterpolate(unref(table).getState().pagination.pageIndex + 1)} of ${ssrInterpolate(unref(table).getPageCount())}</span><div class="flex gap-2"><button class="border px-3 py-1 rounded"${ssrIncludeBooleanAttr(!unref(table).getCanPreviousPage()) ? " disabled" : ""}> Previous </button><button class="border px-3 py-1 rounded"${ssrIncludeBooleanAttr(!unref(table).getCanNextPage()) ? " disabled" : ""}> Next </button></div></div></td></tr></tfoot></table></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/destinations/DestinationTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServiceCountry",
  __ssrInlineRender: true,
  props: {
    destinations: {},
    stats: {}
  },
  setup(__props) {
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Destinations",
        href: route("admin.destinations")
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Service Countries" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"${_scopeId}><div class="grid auto-rows-min gap-4 md:grid-cols-3"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              title: "Displayed Destinations",
              value: __props.stats.total_destinations,
              icon: "majesticons:map-simple-destination-line",
              delay: 0.5
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              title: "Total Countries",
              value: __props.stats.total_listed_countries,
              icon: "boxicons:location",
              delay: 0.5
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              title: "Featured Locations",
              value: __props.stats.total_locations,
              icon: "mingcute:mountain-2-line",
              delay: 0.5
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { destinations: __props.destinations }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4" }, [
                createVNode("div", { class: "grid auto-rows-min gap-4 md:grid-cols-3" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$8, {
                      title: "Displayed Destinations",
                      value: __props.stats.total_destinations,
                      icon: "majesticons:map-simple-destination-line",
                      delay: 0.5
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$8, {
                      title: "Total Countries",
                      value: __props.stats.total_listed_countries,
                      icon: "boxicons:location",
                      delay: 0.5
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$8, {
                      title: "Featured Locations",
                      value: __props.stats.total_locations,
                      icon: "mingcute:mountain-2-line",
                      delay: 0.5
                    }, null, 8, ["value"])
                  ])
                ]),
                createVNode("div", { class: "relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                  createVNode(_sfc_main$1, { destinations: __props.destinations }, null, 8, ["destinations"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/destination/ServiceCountry.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
