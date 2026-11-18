import { defineComponent, ref, mergeProps, unref, useSSRContext, withCtx, createTextVNode, toDisplayString, createVNode, watch, openBlock, createBlock, createCommentVNode, Fragment, renderList, h, computed } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$8, e as _sfc_main$9, f as _sfc_main$c, g as _sfc_main$d, h as _sfc_main$e, _ as _sfc_main$f } from "./AppLayout-CSZsNKr7.js";
import { Link, router, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$a } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$b } from "../ssr.js";
import { Icon } from "@iconify/vue";
import { useVueTable, getFilteredRowModel, getPaginationRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { _ as _sfc_main$7 } from "./index-xORXC0Yx.js";
import { toast } from "vue-sonner";
import { _ as _sfc_main$g } from "./SummaryCard-DbEKLC5c.js";
import "class-variance-authority";
import "radix-vue";
import "lucide-vue-next";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "./MotionWrapper-DwlQ79CS.js";
import "./useCounterAnimation-DqMA6bbz.js";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CopiableCell",
  __ssrInlineRender: true,
  props: {
    value: {},
    isMono: { type: Boolean }
  },
  setup(__props) {
    const copied = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center gap-2 group max-w-full" }, _attrs))}><span class="${ssrRenderClass([
        __props.isMono ? "font-mono text-xs text-muted-foreground" : "text-xs text-zinc-600 dark:text-zinc-400",
        "truncate"
      ])}">${ssrInterpolate(__props.value)}</span><button type="button" class="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 focus:opacity-100 focus:outline-none" title="Copy to clipboard">`);
      _push(ssrRenderComponent(unref(Icon), {
        class: ["w-4 h-4", ["text-xs transition-colors", copied.value ? "text-emerald-500 dark:text-emerald-400" : ""]],
        icon: copied.value ? "iconoir:check" : "iconoir:copy"
      }, null, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/inquiry/CopiableCell.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StatusCell",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const statusConfig = {
      pending: { label: "Pending", class: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50" },
      resolved: { label: "Resolved", class: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50" },
      dismissed: { label: "Dismissed", class: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700" }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$5), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<button class="flex items-center gap-1 group hover:opacity-80 transition focus:outline-none"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    class: ["text-[11px] font-medium py-0.5 px-2 rounded-md select-none cursor-pointer", (_a = statusConfig[__props.status]) == null ? void 0 : _a.class]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2;
                      if (_push4) {
                        _push4(`${ssrInterpolate(((_a2 = statusConfig[__props.status]) == null ? void 0 : _a2.label) || __props.status)} `);
                        _push4(ssrRenderComponent(unref(Icon), {
                          icon: "iconoir:nav-arrow-down",
                          class: "text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(toDisplayString(((_b2 = statusConfig[__props.status]) == null ? void 0 : _b2.label) || __props.status) + " ", 1),
                          createVNode(unref(Icon), {
                            icon: "iconoir:nav-arrow-down",
                            class: "text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</button>`);
                } else {
                  return [
                    createVNode("button", { class: "flex items-center gap-1 group hover:opacity-80 transition focus:outline-none" }, [
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        class: ["text-[11px] font-medium py-0.5 px-2 rounded-md select-none cursor-pointer", (_b = statusConfig[__props.status]) == null ? void 0 : _b.class]
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString(((_a2 = statusConfig[__props.status]) == null ? void 0 : _a2.label) || __props.status) + " ", 1),
                            createVNode(unref(Icon), {
                              icon: "iconoir:nav-arrow-down",
                              class: "text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition"
                            })
                          ];
                        }),
                        _: 1
                      }, 8, ["class"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), {
              align: "start",
              class: "w-36"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-amber-600 dark:text-amber-400",
                    onClick: ($event) => emit("change", "pending")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Mark Pending `);
                      } else {
                        return [
                          createTextVNode(" Mark Pending ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-emerald-600 dark:text-emerald-400",
                    onClick: ($event) => emit("change", "resolved")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Mark Resolved `);
                      } else {
                        return [
                          createTextVNode(" Mark Resolved ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-zinc-600 dark:text-zinc-400",
                    onClick: ($event) => emit("change", "dismissed")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Mark Dismissed `);
                      } else {
                        return [
                          createTextVNode(" Mark Dismissed ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), {
                      class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-amber-600 dark:text-amber-400",
                      onClick: ($event) => emit("change", "pending")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Mark Pending ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(unref(_sfc_main$9), {
                      class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-emerald-600 dark:text-emerald-400",
                      onClick: ($event) => emit("change", "resolved")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Mark Resolved ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(unref(_sfc_main$9), {
                      class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-zinc-600 dark:text-zinc-400",
                      onClick: ($event) => emit("change", "dismissed")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Mark Dismissed ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { "as-child": "" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("button", { class: "flex items-center gap-1 group hover:opacity-80 transition focus:outline-none" }, [
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        class: ["text-[11px] font-medium py-0.5 px-2 rounded-md select-none cursor-pointer", (_a = statusConfig[__props.status]) == null ? void 0 : _a.class]
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString(((_a2 = statusConfig[__props.status]) == null ? void 0 : _a2.label) || __props.status) + " ", 1),
                            createVNode(unref(Icon), {
                              icon: "iconoir:nav-arrow-down",
                              class: "text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition"
                            })
                          ];
                        }),
                        _: 1
                      }, 8, ["class"])
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), {
                align: "start",
                class: "w-36"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$9), {
                    class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-amber-600 dark:text-amber-400",
                    onClick: ($event) => emit("change", "pending")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Mark Pending ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(unref(_sfc_main$9), {
                    class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-emerald-600 dark:text-emerald-400",
                    onClick: ($event) => emit("change", "resolved")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Mark Resolved ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(unref(_sfc_main$9), {
                    class: "text-xs gap-2 flex items-center cursor-pointer font-medium text-zinc-600 dark:text-zinc-400",
                    onClick: ($event) => emit("change", "dismissed")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Mark Dismissed ")
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
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/inquiry/StatusCell.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ActionCell",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/inquiry/ActionCell.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InquiryTable",
  __ssrInlineRender: true,
  props: {
    inquiries: {}
  },
  setup(__props) {
    const props = __props;
    const data = ref(props.inquiries);
    watch(() => props.inquiries, (newInquiries) => {
      data.value = newInquiries;
    }, { deep: true });
    const handleStatusChange = (id, currentStatus, newStatus, name) => {
      if (currentStatus === newStatus) return;
      router.patch(route("admin.inquiries.status.update", { id }), { status: newStatus }, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${name}'s inquiry has been ${newStatus}.`);
        },
        onError: () => {
          toast.error(`Failed to update status for ${name}'s inquiry. Please try again.`);
        }
      });
    };
    const globalFilter = ref("");
    const search = ref("");
    const columnFilters = ref([]);
    const selectedStatuses = ref([]);
    watch(selectedStatuses, (val) => {
      columnFilters.value = [
        {
          id: "status",
          value: val
        }
      ];
    });
    const columns = [
      {
        accessorKey: "id",
        header: "ID",
        enableHiding: true,
        meta: { hidden: true },
        cell: () => null
      },
      {
        header: "Sender Name",
        accessorKey: "fullname",
        minSize: 180,
        maxSize: 220,
        cell: ({ row }) => h("span", { class: "font-semibold text-zinc-900 dark:text-zinc-100" }, row.original.fullname)
      },
      {
        header: "Email Address",
        accessorKey: "email",
        minSize: 180,
        maxSize: 220,
        cell: ({ row }) => h(_sfc_main$4, { value: row.original.email, isMono: true })
      },
      {
        header: "Phone Number",
        accessorKey: "phone",
        minSize: 120,
        maxSize: 150,
        cell: ({ row }) => {
          const num = row.original.phone;
          return num ? h(_sfc_main$4, { value: num, isMono: true }) : h("span", { class: "text-[11px] text-zinc-400/60 italic" }, "Not left");
        }
      },
      {
        header: "Status",
        accessorKey: "status",
        minSize: 130,
        maxSize: 160,
        cell: ({ row }) => h(_sfc_main$3, {
          status: row.original.status,
          onChange: (newStatus) => handleStatusChange(row.original.id, row.original.status, newStatus, row.original.fullname)
        }),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          return filterValue.includes(row.getValue(columnId));
        }
      },
      {
        header: "Received",
        accessorKey: "created_at",
        minSize: 120,
        maxSize: 160,
        cell: ({ row }) => {
          const date = new Date(row.original.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });
          return h("span", { class: "text-xs text-muted-foreground whitespace-nowrap" }, date);
        }
      },
      {
        header: "Actions",
        accessorKey: "actions",
        minSize: 100,
        maxSize: 180,
        cell: ({ row }) => h(_sfc_main$2, {
          href: route("admin.inquiries.details", { id: row.original.id }),
          label: "View Details"
        })
      }
    ];
    const table = useVueTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
        pagination: { pageSize: 5 },
        columnVisibility: { id: false }
      },
      state: {
        get globalFilter() {
          return globalFilter.value;
        },
        get columnFilters() {
          return columnFilters.value;
        }
      },
      onGlobalFilterChange: (updater) => {
        globalFilter.value = typeof updater === "function" ? updater(globalFilter.value) : updater;
      },
      onColumnFiltersChange: (updater) => {
        columnFilters.value = typeof updater === "function" ? updater(columnFilters.value) : updater;
      }
    });
    const statusOptions = [
      { label: "Pending", value: "pending" },
      { label: "Resolved", value: "resolved" },
      { label: "Dismissed", value: "dismissed" }
    ];
    const toggleStatusFilter = (status) => {
      if (selectedStatuses.value.includes(status)) {
        selectedStatuses.value = selectedStatuses.value.filter((s) => s !== status);
      } else {
        selectedStatuses.value = [...selectedStatuses.value, status];
      }
    };
    const clearStatusFilter = () => {
      selectedStatuses.value = [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div class="flex items-center gap-2 w-full max-w-md"><div class="relative w-full">`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        type: "text",
        placeholder: "Search by Name, Email, or keywords...",
        class: "pl-3 pr-10 py-2 w-full border border-zinc-200 dark:border-zinc-800 rounded-md bg-background text-sm",
        onKeyup: ($event) => unref(table).setGlobalFilter(search.value),
        onInput: ($event) => !search.value.trim() && unref(table).setGlobalFilter("")
      }, null, _parent));
      _push(`<button type="button" class="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "iconoir:search",
        class: "text-lg"
      }, null, _parent));
      _push(`</button></div></div><div class="flex items-center gap-2 self-start sm:self-auto">`);
      _push(ssrRenderComponent(unref(_sfc_main$5), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    variant: "outline",
                    size: "sm",
                    class: "h-9 gap-2 border-dashed text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Icon), {
                          icon: "iconoir:filter-list",
                          class: "text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` Filter Status `);
                        if (selectedStatuses.value.length > 0) {
                          _push4(`<span class="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-full"${_scopeId3}>${ssrInterpolate(selectedStatuses.value.length)}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(Icon), {
                            icon: "iconoir:filter-list",
                            class: "text-sm"
                          }),
                          createTextVNode(" Filter Status "),
                          selectedStatuses.value.length > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-full"
                          }, toDisplayString(selectedStatuses.value.length), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), {
                      variant: "outline",
                      size: "sm",
                      class: "h-9 gap-2 border-dashed text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Icon), {
                          icon: "iconoir:filter-list",
                          class: "text-sm"
                        }),
                        createTextVNode(" Filter Status "),
                        selectedStatuses.value.length > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-full"
                        }, toDisplayString(selectedStatuses.value.length), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), {
              align: "end",
              class: "w-48"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { class: "text-xs font-semibold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Filter by Status `);
                      } else {
                        return [
                          createTextVNode(" Filter by Status ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(statusOptions, (option) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$e), {
                      key: option.value,
                      class: "text-xs cursor-pointer capitalize",
                      checked: selectedStatuses.value.includes(option.value),
                      onSelect: (e) => e.preventDefault(),
                      "onUpdate:checked": ($event) => toggleStatusFilter(option.value)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(option.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(option.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  if (selectedStatuses.value.length > 0) {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$d), null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$e), {
                      class: "text-xs justify-center text-center font-medium text-red-600 dark:text-red-400",
                      onClick: clearStatusFilter
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Clear Filters `);
                        } else {
                          return [
                            createTextVNode(" Clear Filters ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), { class: "text-xs font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode(" Filter by Status ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$d)),
                    (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (option) => {
                      return createVNode(unref(_sfc_main$e), {
                        key: option.value,
                        class: "text-xs cursor-pointer capitalize",
                        checked: selectedStatuses.value.includes(option.value),
                        onSelect: (e) => e.preventDefault(),
                        "onUpdate:checked": ($event) => toggleStatusFilter(option.value)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(option.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["checked", "onSelect", "onUpdate:checked"]);
                    }), 64)),
                    selectedStatuses.value.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode(unref(_sfc_main$d)),
                      createVNode(unref(_sfc_main$e), {
                        class: "text-xs justify-center text-center font-medium text-red-600 dark:text-red-400",
                        onClick: clearStatusFilter
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Clear Filters ")
                        ]),
                        _: 1
                      })
                    ], 64)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$b), {
                    variant: "outline",
                    size: "sm",
                    class: "h-9 gap-2 border-dashed text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Icon), {
                        icon: "iconoir:filter-list",
                        class: "text-sm"
                      }),
                      createTextVNode(" Filter Status "),
                      selectedStatuses.value.length > 0 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-full"
                      }, toDisplayString(selectedStatuses.value.length), 1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), {
                align: "end",
                class: "w-48"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), { class: "text-xs font-semibold" }, {
                    default: withCtx(() => [
                      createTextVNode(" Filter by Status ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$d)),
                  (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (option) => {
                    return createVNode(unref(_sfc_main$e), {
                      key: option.value,
                      class: "text-xs cursor-pointer capitalize",
                      checked: selectedStatuses.value.includes(option.value),
                      onSelect: (e) => e.preventDefault(),
                      "onUpdate:checked": ($event) => toggleStatusFilter(option.value)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(option.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["checked", "onSelect", "onUpdate:checked"]);
                  }), 64)),
                  selectedStatuses.value.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(unref(_sfc_main$d)),
                    createVNode(unref(_sfc_main$e), {
                      class: "text-xs justify-center text-center font-medium text-red-600 dark:text-red-400",
                      onClick: clearStatusFilter
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Clear Filters ")
                      ]),
                      _: 1
                    })
                  ], 64)) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"><table class="w-full text-left border-collapse"><thead><!--[-->`);
      ssrRenderList(unref(table).getHeaderGroups(), (columnHeaders) => {
        _push(`<tr class="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800"><!--[-->`);
        ssrRenderList(columnHeaders.headers, (header) => {
          _push(`<th class="px-4 py-3 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" style="${ssrRenderStyle({ width: `${header.column.getSize()}px` })}">`);
          _push(ssrRenderComponent(unref(FlexRender), {
            render: header.column.columnDef.header,
            props: header.getContext()
          }, null, _parent));
          _push(`</th>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></thead><tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">`);
      if (unref(table).getRowModel().rows.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(table).getRowModel().rows, (row) => {
          _push(`<tr class="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"><!--[-->`);
          ssrRenderList(row.getVisibleCells(), (cell) => {
            _push(`<td class="px-4 py-3 text-sm align-middle">`);
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
        _push(`<tr><td${ssrRenderAttr("colspan", columns.length)} class="px-4 py-12 text-center text-sm text-muted-foreground italic"> No Client Inquiries Found matching your metric filters... </td></tr>`);
      }
      _push(`</tbody></table></div><div class="flex items-center justify-between pt-2"><span class="text-xs text-muted-foreground"> Page <strong>${ssrInterpolate(unref(table).getState().pagination.pageIndex + 1)}</strong> of <strong>${ssrInterpolate(unref(table).getPageCount())}</strong></span><div class="flex gap-1.5">`);
      _push(ssrRenderComponent(unref(_sfc_main$b), {
        variant: "outline",
        size: "sm",
        class: "text-xs h-8 px-2.5",
        disabled: !unref(table).getCanPreviousPage(),
        onClick: ($event) => unref(table).previousPage()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Previous `);
          } else {
            return [
              createTextVNode(" Previous ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), {
        variant: "outline",
        size: "sm",
        class: "text-xs h-8 px-2.5",
        disabled: !unref(table).getCanNextPage(),
        onClick: ($event) => unref(table).nextPage()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Next `);
          } else {
            return [
              createTextVNode(" Next ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/inquiry/InquiryTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ClientsInquiry",
  __ssrInlineRender: true,
  props: {
    inquiries: {}
  },
  setup(__props) {
    const props = __props;
    const filteredInquiries = ref(props.inquiries);
    watch(() => props.inquiries, (newInquiries) => {
      filteredInquiries.value = newInquiries;
    }, { deep: true });
    const totalInquiries = computed(() => filteredInquiries.value.length);
    const pendingCount = computed(
      () => filteredInquiries.value.filter((i) => i.status === "pending").length
    );
    const resolvedCount = computed(
      () => filteredInquiries.value.filter((i) => i.status === "resolved").length
    );
    const dismissedCount = computed(
      () => filteredInquiries.value.filter((i) => i.status === "dismissed").length
    );
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Inquiries",
        href: route("admin.inquiries")
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Client Inquiries" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$f, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"${_scopeId}><div class="grid auto-rows-min gap-4 md:grid-cols-4"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              title: "Total Inquiries",
              value: totalInquiries.value,
              icon: "iconoir:mail",
              "trend-value": "12%",
              "trend-type": "up"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              title: "Pending",
              value: pendingCount.value,
              icon: "mdi:email-sent-outline"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              title: "Resolved",
              value: resolvedCount.value,
              icon: "mynaui:check"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              title: "Dismissed",
              value: dismissedCount.value,
              icon: "line-md:remove"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative min-h-[400vh] flex-1 md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { inquiries: __props.inquiries }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4" }, [
                createVNode("div", { class: "grid auto-rows-min gap-4 md:grid-cols-4" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$g, {
                      title: "Total Inquiries",
                      value: totalInquiries.value,
                      icon: "iconoir:mail",
                      "trend-value": "12%",
                      "trend-type": "up"
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$g, {
                      title: "Pending",
                      value: pendingCount.value,
                      icon: "mdi:email-sent-outline"
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$g, {
                      title: "Resolved",
                      value: resolvedCount.value,
                      icon: "mynaui:check"
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$g, {
                      title: "Dismissed",
                      value: dismissedCount.value,
                      icon: "line-md:remove"
                    }, null, 8, ["value"])
                  ])
                ]),
                createVNode("div", { class: "relative min-h-[400vh] flex-1 md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card shadow-sm" }, [
                  createVNode(_sfc_main$1, { inquiries: __props.inquiries }, null, 8, ["inquiries"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/inquiry/ClientsInquiry.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
