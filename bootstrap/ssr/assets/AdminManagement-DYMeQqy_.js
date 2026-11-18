import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext, createTextVNode, ref, watch, computed, openBlock, createBlock, createCommentVNode, Fragment, renderList, h } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$k } from "./StatsCard-DAT7bJLR.js";
import { _ as _sfc_main$c } from "./Input-B-ZniF4D.js";
import { Icon } from "@iconify/vue";
import { useVueTable, getFilteredRowModel, getPaginationRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { _ as _sfc_main$a, a as formatDateString } from "../ssr.js";
import { b as _sfc_main$d, c as _sfc_main$e, d as _sfc_main$f, f as _sfc_main$g, g as _sfc_main$h, h as _sfc_main$i, _ as _sfc_main$j } from "./AppLayout-CSZsNKr7.js";
import { usePage, Link, Head } from "@inertiajs/vue3";
import { useClipboard } from "@vueuse/core";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$b } from "./TooltipTrigger-B2yyxzkT.js";
import { _ as _sfc_main$7 } from "./TooltipProvider-D2JAfXHP.js";
import "./CardTitle-CO_w4Cob.js";
import "./MotionWrapper-DwlQ79CS.js";
import "./useCounterAnimation-DqMA6bbz.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "lucide-vue-next";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./index-xORXC0Yx.js";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ContactCell",
  __ssrInlineRender: true,
  props: {
    email: {},
    phone: {}
  },
  setup(__props) {
    usePage();
    const { copy, copied } = useClipboard();
    const handleCopy = (text) => {
      copy(text);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3 group" }, _attrs))}><div class="flex flex-col text-sm"><span class="line-clamp-2">${ssrInterpolate(__props.email)}</span>`);
      if (__props.phone) {
        _push(`<span class="text-xs font-light text-muted-foreground">${ssrInterpolate(__props.phone)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$7), { "delay-duration": 100 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          variant: "ghost",
                          size: "icon",
                          class: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                          onClick: ($event) => handleCopy(__props.email),
                          "aria-label": "Copy email"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Icon), {
                                icon: unref(copied) ? "lucide:check" : "lucide:copy",
                                class: ["h-4 w-4 text-muted-foreground transition-all", { "text-emerald-500": unref(copied) }]
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Icon), {
                                  icon: unref(copied) ? "lucide:check" : "lucide:copy",
                                  class: ["h-4 w-4 text-muted-foreground transition-all", { "text-emerald-500": unref(copied) }]
                                }, null, 8, ["icon", "class"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), {
                            variant: "ghost",
                            size: "icon",
                            class: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                            onClick: ($event) => handleCopy(__props.email),
                            "aria-label": "Copy email"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Icon), {
                                icon: unref(copied) ? "lucide:check" : "lucide:copy",
                                class: ["h-4 w-4 text-muted-foreground transition-all", { "text-emerald-500": unref(copied) }]
                              }, null, 8, ["icon", "class"])
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { side: "right" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p${_scopeId3}>${ssrInterpolate(unref(copied) ? "Copied!" : "Copy email")}</p>`);
                      } else {
                        return [
                          createVNode("p", null, toDisplayString(unref(copied) ? "Copied!" : "Copy email"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), {
                          variant: "ghost",
                          size: "icon",
                          class: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                          onClick: ($event) => handleCopy(__props.email),
                          "aria-label": "Copy email"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Icon), {
                              icon: unref(copied) ? "lucide:check" : "lucide:copy",
                              class: ["h-4 w-4 text-muted-foreground transition-all", { "text-emerald-500": unref(copied) }]
                            }, null, 8, ["icon", "class"])
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), { side: "right" }, {
                      default: withCtx(() => [
                        createVNode("p", null, toDisplayString(unref(copied) ? "Copied!" : "Copy email"), 1)
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
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$9), { "as-child": "" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), {
                        variant: "ghost",
                        size: "icon",
                        class: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                        onClick: ($event) => handleCopy(__props.email),
                        "aria-label": "Copy email"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Icon), {
                            icon: unref(copied) ? "lucide:check" : "lucide:copy",
                            class: ["h-4 w-4 text-muted-foreground transition-all", { "text-emerald-500": unref(copied) }]
                          }, null, 8, ["icon", "class"])
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$b), { side: "right" }, {
                    default: withCtx(() => [
                      createVNode("p", null, toDisplayString(unref(copied) ? "Copied!" : "Copy email"), 1)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/admin/ContactCell.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DateRecordCell",
  __ssrInlineRender: true,
  props: {
    createdAt: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><span class="text-xs text-muted-foreground">${ssrInterpolate(__props.createdAt)}</span></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/admin/DateRecordCell.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/admin/LinkCell.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NameWithImageCell",
  __ssrInlineRender: true,
  props: {
    id: {},
    avatar: {},
    name: {},
    display_name: {}
  },
  setup(__props) {
    const page = usePage();
    const currentUser = page.props.auth.user;
    const envUrl = "http://127.0.0.1:8000/";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><span class="flex items-center justify-center">`);
      if (__props.avatar) {
        _push(`<img class="w-10 h-10 object-cover rounded-sm"${ssrRenderAttr("src", `${unref(envUrl)}/storage/${__props.avatar}`)}${ssrRenderAttr("alt", __props.name)}>`);
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
      _push(`</span><span class="font-semibold line-clamp-2 flex flex-col"><span>${ssrInterpolate(__props.name)} `);
      if (__props.id === unref(currentUser).id) {
        _push(`<span class="text-xs text-orange-500">(Owned)</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
      if (__props.display_name) {
        _push(`<span class="text-xs font-light text-muted-foreground flex items-center">${ssrInterpolate(__props.display_name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/admin/NameWithImageCell.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StatusIndicatorCell",
  __ssrInlineRender: true,
  props: {
    status: {},
    verifiedDate: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><span class="${ssrRenderClass([__props.status === "inactive" ? "text-red-500" : "text-green-500", "font-semibold"])}">${ssrInterpolate(__props.status === "inactive" ? "Inactive" : "Active")}</span>`);
      if (__props.verifiedDate) {
        _push(`<span class="text-xs font-light text-muted-foreground flex items-center">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "lets-icons:check-fill",
          width: "16",
          height: "16",
          class: "text-green-500"
        }, null, _parent));
        _push(` Verified at ${ssrInterpolate(unref(formatDateString)(__props.verifiedDate))}</span>`);
      } else {
        _push(`<span class="text-xs font-light text-muted-foreground flex items-center">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "lets-icons:close-round-fill",
          width: "14",
          height: "14",
          class: "text-red-500"
        }, null, _parent));
        _push(` Not verified yet </span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/admin/StatusIndicatorCell.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminTable",
  __ssrInlineRender: true,
  props: {
    users: {}
  },
  setup(__props) {
    const props = __props;
    const data = ref(props.users);
    const globalFilter = ref("");
    const search = ref("");
    const columnFilters = ref([]);
    const selectedRoles = ref(["admin", "agent"]);
    const selectedStatuses = ref(["active", "inactive"]);
    watch(
      () => props.users,
      (newUsers) => {
        data.value = newUsers;
      },
      { deep: true }
    );
    const syncColumnFilters = () => {
      columnFilters.value = [
        {
          id: "role",
          value: selectedRoles.value
        },
        {
          id: "status",
          value: selectedStatuses.value
        }
      ];
    };
    watch([selectedRoles, selectedStatuses], syncColumnFilters, { deep: true, immediate: true });
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
        header: "Display Name",
        accessorKey: "display_name",
        enableSorting: true,
        minSize: 300,
        maxSize: 700,
        cell: (info) => h(_sfc_main$3, {
          id: info.row.original.id,
          name: info.row.original.name,
          avatar: info.row.original.avatar,
          display_name: info.row.original.display_name
        })
      },
      {
        header: "Name",
        accessorKey: "name",
        enableHiding: true,
        cell: () => null
      },
      {
        header: "Contacts",
        accessorKey: "email",
        minSize: 150,
        maxSize: 300,
        cell: (info) => h(_sfc_main$6, {
          email: info.row.original.email,
          phone: info.row.original.phone
        })
      },
      {
        header: "Status",
        accessorKey: "status",
        minSize: 200,
        maxSize: 300,
        cell: (info) => h(_sfc_main$2, {
          status: info.row.original.status,
          verifiedDate: info.row.original.email_verified_at
        }),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return false;
          return filterValue.includes(row.getValue(columnId));
        }
      },
      {
        header: "Access Level",
        accessorKey: "role",
        minSize: 120,
        maxSize: 180,
        cell: (info) => h("span", { class: "capitalize" }, info.row.original.role),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return false;
          return filterValue.includes(row.getValue(columnId));
        }
      },
      {
        header: "Date Created",
        accessorKey: "created_at",
        minSize: 200,
        maxSize: 300,
        cell: (info) => h(_sfc_main$5, {
          createdAt: formatDateString(info.row.original.created_at)
        })
      },
      {
        header: "Actions",
        accessorKey: "actions",
        minSize: 100,
        maxSize: 300,
        cell: (info) => h(_sfc_main$4, {
          href: route("admin.users.admins.details", { id: info.row.original.id }),
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
        pagination: {
          pageSize: 5
        },
        columnVisibility: {
          id: false,
          name: false
        }
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
    const roleOptions = [
      { label: "Admin", value: "admin" },
      { label: "Agent", value: "agent" }
    ];
    const statusOptions = [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" }
    ];
    const toggleRoleFilter = (role) => {
      if (selectedRoles.value.includes(role)) {
        selectedRoles.value = selectedRoles.value.filter((selectedRole) => selectedRole !== role);
        return;
      }
      selectedRoles.value = [...selectedRoles.value, role];
    };
    const toggleStatusFilter = (status) => {
      if (selectedStatuses.value.includes(status)) {
        selectedStatuses.value = selectedStatuses.value.filter((selectedStatus) => selectedStatus !== status);
        return;
      }
      selectedStatuses.value = [...selectedStatuses.value, status];
    };
    const submitSearch = () => {
      table.setGlobalFilter(search.value.trim());
    };
    const handleSearchInput = () => {
      if (!search.value.trim()) {
        table.setGlobalFilter("");
      }
    };
    const isShowingAllRoles = (roles) => roles.length === roleOptions.length;
    const isShowingAllStatuses = (statuses) => statuses.length === statusOptions.length;
    const hasActiveFilters = computed(
      () => Boolean(search.value.trim() || globalFilter.value) || !isShowingAllRoles(selectedRoles.value) || !isShowingAllStatuses(selectedStatuses.value)
    );
    const resetFilters = () => {
      search.value = "";
      table.setGlobalFilter("");
      selectedRoles.value = roleOptions.map((option) => option.value);
      selectedStatuses.value = statusOptions.map((option) => option.value);
      table.setPageIndex(0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div class="flex w-full flex-col gap-2 sm:max-w-xl sm:flex-row sm:items-center"><div class="relative min-w-[300px] w-full sm:max-w-md">`);
      _push(ssrRenderComponent(unref(_sfc_main$c), {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        type: "text",
        placeholder: "Search admins...",
        class: "w-full pr-10",
        onInput: handleSearchInput,
        onKeyup: submitSearch
      }, null, _parent));
      _push(`<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground" aria-label="Search admins">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "iconoir:search",
        class: "text-lg"
      }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$d), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    variant: "outline",
                    size: "sm",
                    class: "h-10 gap-2 border-dashed"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Icon), {
                          icon: "iconoir:filter-list",
                          class: "text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` Role `);
                        if (!isShowingAllRoles(selectedRoles.value)) {
                          _push4(`<span class="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"${_scopeId3}>${ssrInterpolate(selectedRoles.value.length)}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(Icon), {
                            icon: "iconoir:filter-list",
                            class: "text-sm"
                          }),
                          createTextVNode(" Role "),
                          !isShowingAllRoles(selectedRoles.value) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                          }, toDisplayString(selectedRoles.value.length), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), {
                      variant: "outline",
                      size: "sm",
                      class: "h-10 gap-2 border-dashed"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Icon), {
                          icon: "iconoir:filter-list",
                          class: "text-sm"
                        }),
                        createTextVNode(" Role "),
                        !isShowingAllRoles(selectedRoles.value) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                        }, toDisplayString(selectedRoles.value.length), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$f), {
              align: "start",
              class: "w-44"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$g), { class: "text-xs font-semibold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Filter by Role `);
                      } else {
                        return [
                          createTextVNode(" Filter by Role ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(roleOptions, (option) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$i), {
                      key: option.value,
                      class: "cursor-pointer text-xs",
                      checked: selectedRoles.value.includes(option.value),
                      onSelect: (event) => event.preventDefault(),
                      "onUpdate:checked": ($event) => toggleRoleFilter(option.value)
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$g), { class: "text-xs font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode(" Filter by Role ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$h)),
                    (openBlock(), createBlock(Fragment, null, renderList(roleOptions, (option) => {
                      return createVNode(unref(_sfc_main$i), {
                        key: option.value,
                        class: "cursor-pointer text-xs",
                        checked: selectedRoles.value.includes(option.value),
                        onSelect: (event) => event.preventDefault(),
                        "onUpdate:checked": ($event) => toggleRoleFilter(option.value)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(option.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["checked", "onSelect", "onUpdate:checked"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$a), {
                    variant: "outline",
                    size: "sm",
                    class: "h-10 gap-2 border-dashed"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Icon), {
                        icon: "iconoir:filter-list",
                        class: "text-sm"
                      }),
                      createTextVNode(" Role "),
                      !isShowingAllRoles(selectedRoles.value) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                      }, toDisplayString(selectedRoles.value.length), 1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$f), {
                align: "start",
                class: "w-44"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$g), { class: "text-xs font-semibold" }, {
                    default: withCtx(() => [
                      createTextVNode(" Filter by Role ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$h)),
                  (openBlock(), createBlock(Fragment, null, renderList(roleOptions, (option) => {
                    return createVNode(unref(_sfc_main$i), {
                      key: option.value,
                      class: "cursor-pointer text-xs",
                      checked: selectedRoles.value.includes(option.value),
                      onSelect: (event) => event.preventDefault(),
                      "onUpdate:checked": ($event) => toggleRoleFilter(option.value)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(option.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["checked", "onSelect", "onUpdate:checked"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$d), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    variant: "outline",
                    size: "sm",
                    class: "h-10 gap-2 border-dashed"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Icon), {
                          icon: "iconoir:filter-list",
                          class: "text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` Status `);
                        if (!isShowingAllStatuses(selectedStatuses.value)) {
                          _push4(`<span class="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"${_scopeId3}>${ssrInterpolate(selectedStatuses.value.length)}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(Icon), {
                            icon: "iconoir:filter-list",
                            class: "text-sm"
                          }),
                          createTextVNode(" Status "),
                          !isShowingAllStatuses(selectedStatuses.value) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                          }, toDisplayString(selectedStatuses.value.length), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), {
                      variant: "outline",
                      size: "sm",
                      class: "h-10 gap-2 border-dashed"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Icon), {
                          icon: "iconoir:filter-list",
                          class: "text-sm"
                        }),
                        createTextVNode(" Status "),
                        !isShowingAllStatuses(selectedStatuses.value) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                        }, toDisplayString(selectedStatuses.value.length), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$f), {
              align: "start",
              class: "w-44"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$g), { class: "text-xs font-semibold" }, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(statusOptions, (option) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$i), {
                      key: option.value,
                      class: "cursor-pointer text-xs",
                      checked: selectedStatuses.value.includes(option.value),
                      onSelect: (event) => event.preventDefault(),
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$g), { class: "text-xs font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode(" Filter by Status ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$h)),
                    (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (option) => {
                      return createVNode(unref(_sfc_main$i), {
                        key: option.value,
                        class: "cursor-pointer text-xs",
                        checked: selectedStatuses.value.includes(option.value),
                        onSelect: (event) => event.preventDefault(),
                        "onUpdate:checked": ($event) => toggleStatusFilter(option.value)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(option.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["checked", "onSelect", "onUpdate:checked"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$a), {
                    variant: "outline",
                    size: "sm",
                    class: "h-10 gap-2 border-dashed"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Icon), {
                        icon: "iconoir:filter-list",
                        class: "text-sm"
                      }),
                      createTextVNode(" Status "),
                      !isShowingAllStatuses(selectedStatuses.value) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                      }, toDisplayString(selectedStatuses.value.length), 1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$f), {
                align: "start",
                class: "w-44"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$g), { class: "text-xs font-semibold" }, {
                    default: withCtx(() => [
                      createTextVNode(" Filter by Status ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$h)),
                  (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (option) => {
                    return createVNode(unref(_sfc_main$i), {
                      key: option.value,
                      class: "cursor-pointer text-xs",
                      checked: selectedStatuses.value.includes(option.value),
                      onSelect: (event) => event.preventDefault(),
                      "onUpdate:checked": ($event) => toggleStatusFilter(option.value)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(option.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["checked", "onSelect", "onUpdate:checked"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (hasActiveFilters.value) {
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          type: "button",
          variant: "ghost",
          size: "sm",
          class: "h-10 gap-2",
          disabled: !hasActiveFilters.value,
          onClick: resetFilters
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Icon), {
                icon: "iconoir:cancel",
                class: "text-sm"
              }, null, _parent2, _scopeId));
              _push2(` Reset `);
            } else {
              return [
                createVNode(unref(Icon), {
                  icon: "iconoir:cancel",
                  class: "text-sm"
                }),
                createTextVNode(" Reset ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.users.admins.create"),
        class: "self-start sm:self-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), {
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
              createVNode(unref(_sfc_main$a), {
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
      _push(`</div><table class="w-full table-auto"><thead><!--[-->`);
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
        _push(`<tr><td${ssrRenderAttr("colspan", columns.length)} class="border px-4 py-2 text-center text-sm italic text-muted-foreground"> No Account Found... </td></tr>`);
      }
      _push(`</tbody><tfoot><tr><td${ssrRenderAttr("colspan", columns.length)}><div class="mt-4 flex items-center justify-between"><span class="text-sm text-muted-foreground"> Page ${ssrInterpolate(unref(table).getState().pagination.pageIndex + 1)} of ${ssrInterpolate(unref(table).getPageCount())}</span><div class="flex gap-2"><button class="rounded border px-3 py-1"${ssrIncludeBooleanAttr(!unref(table).getCanPreviousPage()) ? " disabled" : ""}> Previous </button><button class="rounded border px-3 py-1"${ssrIncludeBooleanAttr(!unref(table).getCanNextPage()) ? " disabled" : ""}> Next </button></div></div></td></tr></tfoot></table></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/table/admin/AdminTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminManagement",
  __ssrInlineRender: true,
  props: {
    admins: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Admin Management",
        href: route("admin.users.admins")
      }
    ];
    const adminCountsByStatus = computed(() => {
      let activeCount = 0;
      let inactiveCount = 0;
      props.admins.forEach((admin) => {
        if (admin.status === "active") activeCount++;
        if (admin.status === "inactive") inactiveCount++;
      });
      return {
        active: activeCount,
        inactive: inactiveCount,
        total: props.admins.length
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Admin Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$j, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"${_scopeId}><div class="grid auto-rows-min gap-4 md:grid-cols-3"${_scopeId}><div class="relative h-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              title: "Total Admin Accounts",
              value: adminCountsByStatus.value.total,
              icon: "solar:user-outline",
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative h-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              title: "Total Active",
              value: adminCountsByStatus.value.active,
              icon: "tabler:user-key",
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative h-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              title: "Total Inactive",
              value: adminCountsByStatus.value.inactive,
              icon: "boxicons:user-x",
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { users: __props.admins }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4" }, [
                createVNode("div", { class: "grid auto-rows-min gap-4 md:grid-cols-3" }, [
                  createVNode("div", { class: "relative h-auto" }, [
                    createVNode(_sfc_main$k, {
                      title: "Total Admin Accounts",
                      value: adminCountsByStatus.value.total,
                      icon: "solar:user-outline",
                      delay: 0.05
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative h-auto" }, [
                    createVNode(_sfc_main$k, {
                      title: "Total Active",
                      value: adminCountsByStatus.value.active,
                      icon: "tabler:user-key",
                      delay: 0.05
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative h-auto" }, [
                    createVNode(_sfc_main$k, {
                      title: "Total Inactive",
                      value: adminCountsByStatus.value.inactive,
                      icon: "boxicons:user-x",
                      delay: 0.05
                    }, null, 8, ["value"])
                  ])
                ]),
                createVNode("div", { class: "relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                  createVNode(_sfc_main$1, { users: __props.admins }, null, 8, ["users"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/user/admin/AdminManagement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
