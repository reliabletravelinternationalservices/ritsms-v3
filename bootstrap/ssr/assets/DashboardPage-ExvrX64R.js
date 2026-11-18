import { defineComponent, computed, ref, watch, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$e } from "./SummaryCard-DbEKLC5c.js";
import { _ as _sfc_main$d } from "./AppLayout-CSZsNKr7.js";
import { Head } from "@inertiajs/vue3";
import apexchart from "vue3-apexcharts";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$c } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b } from "./SelectValue-CdQiWiXd.js";
import { _ as _sfc_main$2 } from "./MotionWrapper-DwlQ79CS.js";
import "@iconify/vue";
import "./useCounterAnimation-DqMA6bbz.js";
import "class-variance-authority";
import "radix-vue";
import "../ssr.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "lucide-vue-next";
import "vue-sonner";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "./Input-B-ZniF4D.js";
import "./TooltipTrigger-B2yyxzkT.js";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./index-xORXC0Yx.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MonthlyInquiriesChart",
  __ssrInlineRender: true,
  props: {
    title: { default: "Monthly inquiries" },
    description: { default: "Track inquiry volume over time." },
    data: { default: () => [
      { month: "Jan", count: 80, dateKey: "2026" },
      { month: "Feb", count: 95, dateKey: "2026" },
      { month: "Mar", count: 120, dateKey: "2026" },
      { month: "Apr", count: 110, dateKey: "2026" },
      { month: "May", count: 155, dateKey: "2026" },
      { month: "Jun", count: 178, dateKey: "2026" },
      { month: "Jan", count: 45, dateKey: "2025" },
      { month: "Feb", count: 60, dateKey: "2025" }
    ] }
  },
  emits: ["filterChange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const computedAvailableYears = computed(() => {
      const years = Array.from(new Set(props.data.map((d) => d.dateKey).filter(Boolean)));
      if (years.length) {
        return years.sort((a, b) => Number(b) - Number(a));
      }
      const current = (/* @__PURE__ */ new Date()).getFullYear();
      return Array.from({ length: 4 }, (_, i) => String(current - i));
    });
    const currentYear = ref(computedAvailableYears.value[0] ?? (/* @__PURE__ */ new Date()).getFullYear().toString());
    const availableYears = computedAvailableYears;
    watch(computedAvailableYears, (val) => {
      if (!val.includes(currentYear.value)) {
        currentYear.value = val[0];
      }
    }, { immediate: true });
    watch(currentYear, () => {
      handleFiltersUpdated();
    });
    const filteredData = computed(() => {
      return props.data.filter((d) => d.dateKey === currentYear.value);
    });
    const hasData = computed(() => filteredData.value.length > 0);
    const handleFiltersUpdated = () => {
      emit("filterChange", { year: currentYear.value });
    };
    const chartSeries = computed(() => [
      {
        name: "Inquiries",
        data: hasData.value ? filteredData.value.map((d) => d.count) : []
      }
    ]);
    const chartOptions = computed(() => ({
      chart: {
        type: "area",
        height: "100%",
        width: "100%",
        // 1. Tells Apex to target parent dimensions directly
        redrawOnParentResize: true,
        // 2. Forces recalculation when parent layout layout resolves
        redrawOnWindowResize: true,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: "transparent",
        foreColor: "#52525b"
      },
      colors: ["#0284c7"],
      stroke: {
        curve: "smooth",
        width: 3
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.25,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      markers: {
        size: 0,
        hover: { size: 5, sizeOffset: 3 }
      },
      noData: {
        text: `No inquiries recorded for ${currentYear.value}`,
        align: "center",
        verticalAlign: "middle",
        style: {
          color: "#a1a1aa",
          fontSize: "14px",
          fontFamily: "sans-serif"
        }
      },
      grid: {
        borderColor: "#e4e4e7",
        // Fallback light border color. (Note: ApexGrid borders aren't fully dynamic to system prefers-color-scheme via standard static configurations without a computed state dependency, but a neutral mid-tone ensures visibility across modes.)
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: hasData.value } },
        padding: { top: 10, right: 10, bottom: 0, left: 10 }
      },
      xaxis: {
        categories: hasData.value ? filteredData.value.map((d) => d.month) : [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: {
          show: hasData.value,
          style: { fontSize: "11px" }
        }
      },
      yaxis: {
        min: 0,
        max: hasData.value ? Math.max(...filteredData.value.map((d) => d.count), 200) + 20 : 100,
        tickAmount: 4,
        labels: {
          show: hasData.value,
          style: {
            colors: ["#52525b"],
            fontSize: "11px"
          }
        }
      },
      tooltip: {
        enabled: hasData.value,
        theme: "dark",
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const currentMonth = w.globals.categoryLabels[dataPointIndex];
          const currentValue = series[seriesIndex][dataPointIndex];
          return `
                <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 p-3 rounded-xl shadow-xl min-w-[120px] font-sans">
                    <div class="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">${currentMonth}</div>
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block"></span>
                        <span class="text-xs text-zinc-600 dark:text-zinc-300">Inquiries</span>
                        <span class="text-xs font-mono font-bold ml-auto">${currentValue}</span>
                    </div>
                </div>
            `;
        }
      }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({ delay: 0.2 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-2xl rounded-xl overflow-hidden p-4 sm:p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6 border-b border-zinc-100 dark:border-zinc-900/50 mb-6 p-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(props.title)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-xs text-zinc-500 dark:text-zinc-400" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(props.description)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(props.description), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="w-full sm:w-auto flex items-center justify-start sm:justify-end"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          modelValue: currentYear.value,
                          "onUpdate:modelValue": ($event) => currentYear.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$8), { class: "w-full sm:w-[120px] h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:ring-sky-600" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "Year" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$9), { placeholder: "Year" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(unref(availableYears), (year) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$b), {
                                        key: year,
                                        value: year
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(year)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(year), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(availableYears), (year) => {
                                        return openBlock(), createBlock(unref(_sfc_main$b), {
                                          key: year,
                                          value: year
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(year), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$8), { class: "w-full sm:w-[120px] h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:ring-sky-600" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { placeholder: "Year" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), { class: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(availableYears), (year) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: year,
                                        value: year
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(year), 1)
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
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode(unref(_sfc_main$5), { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(props.title), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), { class: "text-xs text-zinc-500 dark:text-zinc-400" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(props.description), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "w-full sm:w-auto flex items-center justify-start sm:justify-end" }, [
                            createVNode(unref(_sfc_main$7), {
                              modelValue: currentYear.value,
                              "onUpdate:modelValue": ($event) => currentYear.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), { class: "w-full sm:w-[120px] h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:ring-sky-600" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { placeholder: "Year" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), { class: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(availableYears), (year) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: year,
                                        value: year
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(year), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { class: "p-0 w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="h-[240px] sm:h-[300px] w-full block block-items relative transition-all [&amp;&gt;div]:!w-full [&amp;&gt;.apexcharts-container]:!w-full"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(apexchart), {
                          width: "100%",
                          height: "100%",
                          options: chartOptions.value,
                          series: chartSeries.value
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "h-[240px] sm:h-[300px] w-full block block-items relative transition-all [&>div]:!w-full [&>.apexcharts-container]:!w-full" }, [
                            createVNode(unref(apexchart), {
                              width: "100%",
                              height: "100%",
                              options: chartOptions.value,
                              series: chartSeries.value
                            }, null, 8, ["options", "series"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6 border-b border-zinc-100 dark:border-zinc-900/50 mb-6 p-0" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode(unref(_sfc_main$5), { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "text-xs text-zinc-500 dark:text-zinc-400" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.description), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "w-full sm:w-auto flex items-center justify-start sm:justify-end" }, [
                          createVNode(unref(_sfc_main$7), {
                            modelValue: currentYear.value,
                            "onUpdate:modelValue": ($event) => currentYear.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), { class: "w-full sm:w-[120px] h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:ring-sky-600" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), { placeholder: "Year" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), { class: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(availableYears), (year) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: year,
                                      value: year
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(year), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), { class: "p-0 w-full" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "h-[240px] sm:h-[300px] w-full block block-items relative transition-all [&>div]:!w-full [&>.apexcharts-container]:!w-full" }, [
                          createVNode(unref(apexchart), {
                            width: "100%",
                            height: "100%",
                            options: chartOptions.value,
                            series: chartSeries.value
                          }, null, 8, ["options", "series"])
                        ])
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
              createVNode(unref(_sfc_main$3), { class: "w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-2xl rounded-xl overflow-hidden p-4 sm:p-6" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6 border-b border-zinc-100 dark:border-zinc-900/50 mb-6 p-0" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode(unref(_sfc_main$5), { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(props.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), { class: "text-xs text-zinc-500 dark:text-zinc-400" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(props.description), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "w-full sm:w-auto flex items-center justify-start sm:justify-end" }, [
                        createVNode(unref(_sfc_main$7), {
                          modelValue: currentYear.value,
                          "onUpdate:modelValue": ($event) => currentYear.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), { class: "w-full sm:w-[120px] h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:ring-sky-600" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), { placeholder: "Year" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), { class: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200" }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(availableYears), (year) => {
                                  return openBlock(), createBlock(unref(_sfc_main$b), {
                                    key: year,
                                    value: year
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(year), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), { class: "p-0 w-full" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "h-[240px] sm:h-[300px] w-full block block-items relative transition-all [&>div]:!w-full [&>.apexcharts-container]:!w-full" }, [
                        createVNode(unref(apexchart), {
                          width: "100%",
                          height: "100%",
                          options: chartOptions.value,
                          series: chartSeries.value
                        }, null, 8, ["options", "series"])
                      ])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/statistic/MonthlyInquiriesChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DashboardPage",
  __ssrInlineRender: true,
  props: {
    dashboardData: { default: () => ({
      packages: { count: 0, trend_value: 0, trend_type: "neutral" },
      destinations: { count: 0, trend_value: 0, trend_type: "neutral" },
      inquiries: { count: 0, trend_value: 0, trend_type: "neutral" },
      collections: { count: 0, trend_value: 0, trend_type: "neutral" },
      bookings: { count: 0, trend_value: 0, trend_type: "neutral" },
      monthly_inquiries: []
    }) }
  },
  setup(__props) {
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      }
    ];
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative"${_scopeId}><div class="grid auto-rows-min gap-4 md:grid-cols-5"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, {
              title: "Inquiries",
              value: props.dashboardData.inquiries.count,
              icon: "iconoir:mail",
              "trend-value": `${props.dashboardData.inquiries.trend_value}%`,
              "trend-type": props.dashboardData.inquiries.trend_type,
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, {
              title: "Bookings",
              value: props.dashboardData.bookings.count,
              icon: "iconoir:book",
              "trend-value": `${props.dashboardData.bookings.trend_value}%`,
              "trend-type": props.dashboardData.bookings.trend_type,
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, {
              title: "Packages",
              value: props.dashboardData.packages.count,
              icon: "iconoir:package",
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, {
              title: "Package Group",
              value: props.dashboardData.collections.count,
              icon: "heroicons-outline:collection",
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, {
              title: "Destinations",
              value: props.dashboardData.destinations.count,
              icon: "iconoir:maps-arrow",
              delay: 0.05
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              data: props.dashboardData.monthly_inquiries
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative" }, [
                createVNode("div", { class: "grid auto-rows-min gap-4 md:grid-cols-5" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$e, {
                      title: "Inquiries",
                      value: props.dashboardData.inquiries.count,
                      icon: "iconoir:mail",
                      "trend-value": `${props.dashboardData.inquiries.trend_value}%`,
                      "trend-type": props.dashboardData.inquiries.trend_type,
                      delay: 0.05
                    }, null, 8, ["value", "trend-value", "trend-type"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$e, {
                      title: "Bookings",
                      value: props.dashboardData.bookings.count,
                      icon: "iconoir:book",
                      "trend-value": `${props.dashboardData.bookings.trend_value}%`,
                      "trend-type": props.dashboardData.bookings.trend_type,
                      delay: 0.05
                    }, null, 8, ["value", "trend-value", "trend-type"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$e, {
                      title: "Packages",
                      value: props.dashboardData.packages.count,
                      icon: "iconoir:package",
                      delay: 0.05
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$e, {
                      title: "Package Group",
                      value: props.dashboardData.collections.count,
                      icon: "heroicons-outline:collection",
                      delay: 0.05
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$e, {
                      title: "Destinations",
                      value: props.dashboardData.destinations.count,
                      icon: "iconoir:maps-arrow",
                      delay: 0.05
                    }, null, 8, ["value"])
                  ])
                ]),
                createVNode("div", { class: "relative" }, [
                  createVNode(_sfc_main$1, {
                    data: props.dashboardData.monthly_inquiries
                  }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/dashboard/DashboardPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
