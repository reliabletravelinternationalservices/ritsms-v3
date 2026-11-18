import { defineComponent, mergeProps, useSSRContext, unref, computed, withCtx, createTextVNode, toDisplayString, ref, createVNode, openBlock, createBlock, Fragment, renderList, h } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$f } from "./AppLayout-CSZsNKr7.js";
import { Link, Head } from "@inertiajs/vue3";
import { g as getPackageDurationLabel, b as formatCurrency, _ as _sfc_main$e } from "../ssr.js";
import { Icon } from "@iconify/vue";
import { formatDate } from "@vueuse/core";
import { _ as _sfc_main$8 } from "./Input-B-ZniF4D.js";
import { useVueTable, getFilteredRowModel, getPaginationRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d } from "./SelectValue-CdQiWiXd.js";
import { _ as _sfc_main$g } from "./StatsCard-DAT7bJLR.js";
import "class-variance-authority";
import "radix-vue";
import "lucide-vue-next";
import "./TooltipTrigger-B2yyxzkT.js";
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
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DestinationCell",
  __ssrInlineRender: true,
  props: {
    destination: {},
    season: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><span class="font-semibold">${ssrInterpolate(__props.destination)}</span><span class="text-xs font-light text-muted-foreground flex items-center capitalize">${ssrInterpolate(__props.season)}</span></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/package/DestinationCell.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DurationCell",
  __ssrInlineRender: true,
  props: {
    duration: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><span class="font-semibold">${ssrInterpolate(unref(getPackageDurationLabel)(__props.duration))}</span></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/package/DurationCell.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NameWithImageCell",
  __ssrInlineRender: true,
  props: {
    image: {},
    name: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><span class="flex items-center justify-center">`);
      if (__props.image && __props.image.url) {
        _push(`<img class="w-32 h-10 object-cover rounded-xs"${ssrRenderAttr("src", __props.image.url)}${ssrRenderAttr("alt", __props.image.alt_text)}>`);
      } else {
        _push(`<div class="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-sm">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:image-off",
          width: "24",
          height: "24",
          class: "text-gray-400"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</span><span class="font-semibold line-clamp-2">${ssrInterpolate(__props.name)}</span></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/package/NameWithImageCell.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PriceCell",
  __ssrInlineRender: true,
  props: {
    price: {},
    downPayment: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><span class="font-semibold">${ssrInterpolate(unref(formatCurrency)(__props.price, "PHP", 2))}</span><span class="text-xs font-light text-muted-foreground flex items-center">${ssrInterpolate(unref(formatCurrency)(__props.downPayment, "PHP"))} <span>-DP</span></span></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/package/PriceCell.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StatusIndicatorCell",
  __ssrInlineRender: true,
  props: {
    endDate: {}
  },
  setup(__props) {
    const props = __props;
    const isEnded = computed(() => {
      return new Date(props.endDate) < /* @__PURE__ */ new Date();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><span class="${ssrRenderClass([isEnded.value ? "text-red-500" : "text-green-500", "font-semibold"])}">${ssrInterpolate(isEnded.value ? "Ended" : "Selling")}</span><span class="text-xs font-light text-muted-foreground flex items-center"> End at ${ssrInterpolate(unref(formatDate)(new Date(props.endDate), "MMM DD, YYYY"))}</span></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/package/StatusIndicatorCell.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LinkCell",
  __ssrInlineRender: true,
  props: {
    href: {},
    label: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: __props.href,
        class: "italic underline text-sm hover:text-[var(--tertiary-custom)] duration-75"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.label), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/package/LinkCell.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PackageTable",
  __ssrInlineRender: true,
  props: {
    packages: {},
    countries: {}
  },
  setup(__props) {
    const props = __props;
    const data = ref(props.packages);
    const destinationFilter = ref("");
    const search = ref("");
    const filteredByDestination = computed(() => {
      if (!destinationFilter.value) return data.value;
      return data.value.filter((pkg) => {
        return pkg.destination === destinationFilter.value;
      });
    });
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
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
        minSize: 400,
        maxSize: 700,
        cell: (info) => h(_sfc_main$5, {
          name: info.row.original.name,
          image: info.row.original.primary_image
        })
      },
      {
        header: "Destination",
        accessorKey: "destination",
        minSize: 200,
        maxSize: 300,
        cell: (info) => h(_sfc_main$7, {
          destination: info.row.original.destination,
          season: info.row.original.season
        })
      },
      {
        header: "Price",
        accessorKey: "base_price",
        minSize: 200,
        maxSize: 300,
        cell: (info) => h(_sfc_main$4, {
          price: Number(info.row.original.base_price),
          downPayment: Number(info.row.original.down_payment)
        })
      },
      {
        header: "Duration",
        accessorKey: "duration",
        minSize: 100,
        maxSize: 200,
        cell: (info) => h(_sfc_main$6, {
          duration: info.row.original.duration
        })
      },
      {
        header: "Status",
        accessorKey: "selling_end_date",
        minSize: 200,
        maxSize: 300,
        cell: (info) => h(_sfc_main$3, {
          endDate: info.row.original.selling_end_date
        })
      },
      {
        header: "Actions",
        accessorKey: "actions",
        minSize: 100,
        maxSize: 300,
        cell: (info) => h(_sfc_main$2, {
          href: route("admin.packages.details", { id: info.row.original.id }),
          label: "View Details"
        })
      }
    ];
    const globalFilter = ref("");
    const table = useVueTable({
      data: filteredByDestination,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        type: "text",
        placeholder: "Search by Name, Destination and Season...",
        class: "border rounded-sm px-3 py-2 w-full max-w-sm",
        onKeyup: ($event) => unref(table).setGlobalFilter(search.value),
        onInput: ($event) => !search.value.trim() && unref(table).setGlobalFilter("")
      }, null, _parent));
      _push(`<button class="flex items-center">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "iconoir:search",
        class: "text-2xl"
      }, null, _parent));
      _push(`</button></div><div class="flex flex-wrap items-end gap-4"><div class="flex flex-col gap-1">`);
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        modelValue: destinationFilter.value,
        "onUpdate:modelValue": ($event) => destinationFilter.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "w-[200px] border rounded-sm px-3 py-2 h-10" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    placeholder: destinationFilter.value ? destinationFilter.value : "All Countries"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), {
                      placeholder: destinationFilter.value ? destinationFilter.value : "All Countries"
                    }, null, 8, ["placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { value: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` All Countries `);
                      } else {
                        return [
                          createTextVNode(" All Countries ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.countries, (country) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$d), {
                      key: country,
                      value: country
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(country)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(country), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$d), { value: "" }, {
                      default: withCtx(() => [
                        createTextVNode(" All Countries ")
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.countries, (country) => {
                      return openBlock(), createBlock(unref(_sfc_main$d), {
                        key: country,
                        value: country
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(country), 1)
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
              createVNode(unref(_sfc_main$a), { class: "w-[200px] border rounded-sm px-3 py-2 h-10" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$b), {
                    placeholder: destinationFilter.value ? destinationFilter.value : "All Countries"
                  }, null, 8, ["placeholder"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$d), { value: "" }, {
                    default: withCtx(() => [
                      createTextVNode(" All Countries ")
                    ]),
                    _: 1
                  }),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.countries, (country) => {
                    return openBlock(), createBlock(unref(_sfc_main$d), {
                      key: country,
                      value: country
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country), 1)
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
      _push(`</div><div class="flex flex-col gap-1"><span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.packages.create")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$e, {
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
              createVNode(_sfc_main$e, {
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
      _push(`</span></div></div></div><table class="w-full table-auto"><thead><!--[-->`);
      ssrRenderList(unref(table).getHeaderGroups(), (columnHeaders) => {
        _push(`<tr><!--[-->`);
        ssrRenderList(columnHeaders.headers, (header) => {
          _push(`<th class="border px-4 py-2" style="${ssrRenderStyle({ width: `${header.column.getSize()}px` })}">`);
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
          _push(`<tr><!--[-->`);
          ssrRenderList(row.getVisibleCells(), (cell) => {
            _push(`<td class="border px-4 py-2">`);
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
        _push(`<tr><td${ssrRenderAttr("colspan", columns.length)} class="border px-4 py-2 text-center text-sm text-muted-foreground italic"> No Package Found... </td></tr>`);
      }
      _push(`</tbody><tfoot><tr><td colspan="8"><div class="flex items-center justify-between mt-4"><span class="text-sm text-muted-foreground"> Page ${ssrInterpolate(unref(table).getState().pagination.pageIndex + 1)} of ${ssrInterpolate(unref(table).getPageCount())}</span><div class="flex gap-2"><button class="border px-3 py-1 rounded"${ssrIncludeBooleanAttr(!unref(table).getCanPreviousPage()) ? " disabled" : ""}> Previous </button><button class="border px-3 py-1 rounded"${ssrIncludeBooleanAttr(!unref(table).getCanNextPage()) ? " disabled" : ""}> Next </button></div></div></td></tr></tfoot></table></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/package/PackageTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServicePackage",
  __ssrInlineRender: true,
  props: {
    packages: { default: () => [] },
    countries: { default: () => [] },
    metrics: { default: () => ({
      total_packages: 0,
      packages_trend: 0,
      average_price: 0,
      foreign_exclusive_count: 0
    }) }
  },
  setup(__props) {
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Packages",
        href: route("admin.packages")
      }
    ];
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Service Packages" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$f, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"${_scopeId}><div class="grid auto-rows-min gap-4 md:grid-cols-3"${_scopeId}><div class="relative h-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              title: "Total products",
              value: props.metrics.total_packages,
              icon: "iconoir:package",
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              packages: __props.packages,
              countries: props.countries
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4" }, [
                createVNode("div", { class: "grid auto-rows-min gap-4 md:grid-cols-3" }, [
                  createVNode("div", { class: "relative h-auto" }, [
                    createVNode(_sfc_main$g, {
                      title: "Total products",
                      value: props.metrics.total_packages,
                      icon: "iconoir:package",
                      delay: 0.05
                    }, null, 8, ["value"])
                  ])
                ]),
                createVNode("div", { class: "relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                  createVNode(_sfc_main$1, {
                    packages: __props.packages,
                    countries: props.countries
                  }, null, 8, ["packages", "countries"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/ServicePackage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
