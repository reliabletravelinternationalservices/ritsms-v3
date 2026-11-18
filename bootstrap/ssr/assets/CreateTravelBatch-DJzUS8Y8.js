import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$3 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$4 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$5 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$6 } from "./SwitchWithLabel-OwdWRQEb.js";
import { t as truncateText, _ as _sfc_main$7 } from "../ssr.js";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "radix-vue";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "./index-xORXC0Yx.js";
import "./Switch-C_HW8oQD.js";
import "reka-ui";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreateTravelBatch",
  __ssrInlineRender: true,
  props: {
    package: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbs = [
      { title: "Dashboard", href: route("admin.dashboard") },
      { title: "Packages", href: route("admin.packages") },
      { title: truncateText(props.package.name, 20) ?? "Package", href: route("admin.packages.details", { id: props.package.id }) },
      { title: "New Batch", href: route("admin.packages.batches.create", { id: props.package.id }) }
    ];
    const form = useForm({
      departure_date: "",
      return_date: "",
      price: "",
      is_available: true,
      is_limited: false
    });
    const submit = () => {
      form.post(route("admin.packages.batches.store", { id: props.package.id }), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Batch travel schedule created successfully");
        },
        onError: () => {
          toast.error("Failed to create batch travel schedule");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "New Batch Travel Schedule" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"${_scopeId}><div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}><div class="flex flex-col space-y-6 max-w-4xl"${_scopeId}><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Create travel batch",
              description: "Add a new schedule for this package."
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-sm text-zinc-500 dark:text-zinc-400"${_scopeId}>Package: ${ssrInterpolate(props.package.name)}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.packages.details", { id: props.package.id }),
              class: "inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to package `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
                    createTextVNode(" Back to package ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form class="flex flex-col gap-6"${_scopeId}><div class="grid gap-6 md:grid-cols-2"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "departure_date" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Departure Date`);
                } else {
                  return [
                    createTextVNode("Departure Date")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "departure_date",
              type: "date",
              class: "mt-1 block w-full",
              modelValue: unref(form).departure_date,
              "onUpdate:modelValue": ($event) => unref(form).departure_date = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.departure_date
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "return_date" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Return Date <span class="text-zinc-400"${_scopeId2}>(Optional)</span>`);
                } else {
                  return [
                    createTextVNode("Return Date "),
                    createVNode("span", { class: "text-zinc-400" }, "(Optional)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "return_date",
              type: "date",
              class: "mt-1 block w-full",
              modelValue: unref(form).return_date,
              "onUpdate:modelValue": ($event) => unref(form).return_date = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.return_date
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "price" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Price per person`);
                } else {
                  return [
                    createTextVNode("Price per person")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "price",
              type: "number",
              min: "0",
              step: "0.01",
              class: "mt-1 block w-full",
              modelValue: unref(form).price,
              "onUpdate:modelValue": ($event) => unref(form).price = $event,
              placeholder: "0.00"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.price
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              "is-checked": unref(form).is_available,
              onChange: (value) => unref(form).is_available = value,
              label: "Available"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              "is-checked": unref(form).is_limited,
              onChange: (value) => unref(form).is_limited = value,
              label: "Limited slots"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              type: "submit",
              class: "shadow-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create batch travel`);
                } else {
                  return [
                    createTextVNode("Create batch travel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4" }, [
                createVNode("div", { class: "relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                  createVNode("div", { class: "flex flex-col space-y-6 max-w-4xl" }, [
                    createVNode("div", { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$2, {
                          title: "Create travel batch",
                          description: "Add a new schedule for this package."
                        }),
                        createVNode("p", { class: "text-sm text-zinc-500 dark:text-zinc-400" }, "Package: " + toDisplayString(props.package.name), 1)
                      ]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.packages.details", { id: props.package.id }),
                        class: "inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
                          createTextVNode(" Back to package ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "flex flex-col gap-6"
                    }, [
                      createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "departure_date" }, {
                            default: withCtx(() => [
                              createTextVNode("Departure Date")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "departure_date",
                            type: "date",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).departure_date,
                            "onUpdate:modelValue": ($event) => unref(form).departure_date = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.departure_date
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "return_date" }, {
                            default: withCtx(() => [
                              createTextVNode("Return Date "),
                              createVNode("span", { class: "text-zinc-400" }, "(Optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "return_date",
                            type: "date",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).return_date,
                            "onUpdate:modelValue": ($event) => unref(form).return_date = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.return_date
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_sfc_main$3, { for: "price" }, {
                          default: withCtx(() => [
                            createTextVNode("Price per person")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, {
                          id: "price",
                          type: "number",
                          min: "0",
                          step: "0.01",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).price,
                          "onUpdate:modelValue": ($event) => unref(form).price = $event,
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "min-h-[1.5rem]" }, [
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.price
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, {
                            "is-checked": unref(form).is_available,
                            onChange: (value) => unref(form).is_available = value,
                            label: "Available"
                          }, null, 8, ["is-checked", "onChange"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$6, {
                            "is-checked": unref(form).is_limited,
                            onChange: (value) => unref(form).is_limited = value,
                            label: "Limited slots"
                          }, null, 8, ["is-checked", "onChange"])
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end" }, [
                        createVNode(unref(_sfc_main$7), {
                          type: "submit",
                          class: "shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Create batch travel")
                          ]),
                          _: 1
                        })
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/CreateTravelBatch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
