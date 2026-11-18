import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { t as truncateText, _ as _sfc_main$2 } from "../ssr.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7, e as _sfc_main$c } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$9 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$b } from "./Textarea-BvWBAMsq.js";
import { _ as _sfc_main$8 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$a } from "./InputError-BhTWS2NZ.js";
import { ChevronLeft, Compass, MapPin, Map, ImagePlus, X, RefreshCcw, LoaderCircle, Save } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "radix-vue";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./index-xORXC0Yx.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditLocation",
  __ssrInlineRender: true,
  props: {
    destination: {},
    location: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const originalImageUrl = ((_a = props.location.image) == null ? void 0 : _a.url) ?? null;
    const breadcrumbs = [
      { title: "Dashboard", href: route("admin.dashboard") },
      { title: "Destinations", href: route("admin.destinations") },
      { title: truncateText(props.destination.title, 20), href: route("admin.destinations.details", { id: props.destination.id }) },
      { title: "Edit Location", href: route("admin.destinations.locations.edit", { destID: props.destination.id, id: props.location.id }) }
    ];
    const form = useForm({
      name: props.location.name,
      description: props.location.description,
      map_link: props.location.map_link ?? "",
      image: null,
      remove_image: false
    });
    const imagePreview = ref(originalImageUrl);
    const isBlobPreview = ref(false);
    const removeImage = ref(false);
    const handleFileSelect = (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        if (isBlobPreview.value && imagePreview.value) {
          URL.revokeObjectURL(imagePreview.value);
        }
        form.image = file;
        form.remove_image = false;
        imagePreview.value = URL.createObjectURL(file);
        isBlobPreview.value = true;
        removeImage.value = false;
      }
    };
    const clearSelectedImage = () => {
      if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
      }
      form.image = null;
      imagePreview.value = null;
      isBlobPreview.value = false;
      removeImage.value = originalImageUrl !== null;
      form.remove_image = originalImageUrl !== null;
    };
    const resetForm = () => {
      if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
      }
      form.reset();
      form.image = null;
      form.remove_image = false;
      imagePreview.value = originalImageUrl;
      isBlobPreview.value = false;
      removeImage.value = false;
    };
    const submitForm = () => {
      if (removeImage.value) {
        form.remove_image = true;
      }
      form.transform((data) => ({
        ...data,
        _method: "put"
      })).post(route("admin.destinations.locations.update", {
        destID: props.destination.id,
        id: props.location.id
      }), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Location updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update location.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Destination Location" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 mx-auto w-full space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2"${_scopeId}><div${_scopeId}><h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2"${_scopeId}> Edit Destination Location </h1><p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5"${_scopeId}> Update the specific localized attraction parameters, details, or cover imagery asset rules. </p></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "sm",
              "as-child": "",
              class: "h-9 text-xs gap-1.5 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.destinations.details", { id: __props.destination.id })
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ChevronLeft), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Back `);
                      } else {
                        return [
                          createVNode(unref(ChevronLeft), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Back ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.destinations.details", { id: __props.destination.id })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ChevronLeft), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Back ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form${_scopeId}><div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"${_scopeId}><div class="md:col-span-7 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "dark:border-zinc-800 shadow-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "p-4 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Location Parameters`);
                            } else {
                              return [
                                createTextVNode("Location Parameters")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-xs" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Specify regional metadata configurations for this sub-location entity.`);
                            } else {
                              return [
                                createTextVNode("Specify regional metadata configurations for this sub-location entity.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                            default: withCtx(() => [
                              createTextVNode("Location Parameters")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Specify regional metadata configurations for this sub-location entity.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "p-4 pt-2 space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "text-xs font-medium text-zinc-400" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Parent Destination Context`);
                            } else {
                              return [
                                createTextVNode("Parent Destination Context")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 text-xs"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Compass), { class: "w-4 h-4 text-indigo-500 shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="font-medium truncate"${_scopeId3}>${ssrInterpolate(__props.destination.title)}</span><span class="text-[10px] text-zinc-400 font-normal"${_scopeId3}>(${ssrInterpolate(__props.destination.country)})</span></div><div class="min-h-[0.5rem]"${_scopeId3}></div></div><div class="space-y-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          for: "name",
                          class: "text-xs font-medium"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Location Name <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Location Name "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(MapPin), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "name",
                          type: "text",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "e.g., Shinjuku Gyoen National Garden",
                          class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.name }]
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.name
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="space-y-1.5"${_scopeId3}><div class="flex justify-between items-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          for: "map_link",
                          class: "text-xs font-medium"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Google Maps URL / Coordinates`);
                            } else {
                              return [
                                createTextVNode("Google Maps URL / Coordinates")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-[10px] text-zinc-400 font-normal italic"${_scopeId3}>Optional</span></div><div class="relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Map), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "map_link",
                          type: "url",
                          modelValue: unref(form).map_link,
                          "onUpdate:modelValue": ($event) => unref(form).map_link = $event,
                          placeholder: "e.g., https://maps.google.com/?q=...",
                          class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.map_link }]
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.map_link
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="space-y-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          for: "description",
                          class: "text-xs font-medium"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Spot Overview Summary <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Spot Overview Summary "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "description",
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "5",
                          placeholder: "Detail entry rules, points of interest, coordinate guides...",
                          class: ["text-xs dark:bg-zinc-950 dark:border-zinc-800 resize-none leading-relaxed", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }]
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.description
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(_sfc_main$8), { class: "text-xs font-medium text-zinc-400" }, {
                              default: withCtx(() => [
                                createTextVNode("Parent Destination Context")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 text-xs" }, [
                              createVNode(unref(Compass), { class: "w-4 h-4 text-indigo-500 shrink-0" }),
                              createVNode("span", { class: "font-medium truncate" }, toDisplayString(__props.destination.title), 1),
                              createVNode("span", { class: "text-[10px] text-zinc-400 font-normal" }, "(" + toDisplayString(__props.destination.country) + ")", 1)
                            ]),
                            createVNode("div", { class: "min-h-[0.5rem]" })
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(_sfc_main$8), {
                              for: "name",
                              class: "text-xs font-medium"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Location Name "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "relative" }, [
                              createVNode(unref(MapPin), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }),
                              createVNode(unref(_sfc_main$9), {
                                id: "name",
                                type: "text",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "e.g., Shinjuku Gyoen National Garden",
                                class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.name }]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                            ]),
                            createVNode("div", { class: "min-h-[1.5rem]" }, [
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.name
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode(unref(_sfc_main$8), {
                                for: "map_link",
                                class: "text-xs font-medium"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Google Maps URL / Coordinates")
                                ]),
                                _: 1
                              }),
                              createVNode("span", { class: "text-[10px] text-zinc-400 font-normal italic" }, "Optional")
                            ]),
                            createVNode("div", { class: "relative" }, [
                              createVNode(unref(Map), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }),
                              createVNode(unref(_sfc_main$9), {
                                id: "map_link",
                                type: "url",
                                modelValue: unref(form).map_link,
                                "onUpdate:modelValue": ($event) => unref(form).map_link = $event,
                                placeholder: "e.g., https://maps.google.com/?q=...",
                                class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.map_link }]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                            ]),
                            createVNode("div", { class: "min-h-[1.5rem]" }, [
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.map_link
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(_sfc_main$8), {
                              for: "description",
                              class: "text-xs font-medium"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Spot Overview Summary "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "description",
                              modelValue: unref(form).description,
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "5",
                              placeholder: "Detail entry rules, points of interest, coordinate guides...",
                              class: ["text-xs dark:bg-zinc-950 dark:border-zinc-800 resize-none leading-relaxed", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("div", { class: "min-h-[1.5rem]" }, [
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.description
                              }, null, 8, ["message"])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "p-4 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                          default: withCtx(() => [
                            createTextVNode("Location Parameters")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), { class: "text-xs" }, {
                          default: withCtx(() => [
                            createTextVNode("Specify regional metadata configurations for this sub-location entity.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "p-4 pt-2 space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode(unref(_sfc_main$8), { class: "text-xs font-medium text-zinc-400" }, {
                            default: withCtx(() => [
                              createTextVNode("Parent Destination Context")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 text-xs" }, [
                            createVNode(unref(Compass), { class: "w-4 h-4 text-indigo-500 shrink-0" }),
                            createVNode("span", { class: "font-medium truncate" }, toDisplayString(__props.destination.title), 1),
                            createVNode("span", { class: "text-[10px] text-zinc-400 font-normal" }, "(" + toDisplayString(__props.destination.country) + ")", 1)
                          ]),
                          createVNode("div", { class: "min-h-[0.5rem]" })
                        ]),
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode(unref(_sfc_main$8), {
                            for: "name",
                            class: "text-xs font-medium"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Location Name "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(MapPin), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }),
                            createVNode(unref(_sfc_main$9), {
                              id: "name",
                              type: "text",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              placeholder: "e.g., Shinjuku Gyoen National Garden",
                              class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.name }]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                          ]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.name
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode(unref(_sfc_main$8), {
                              for: "map_link",
                              class: "text-xs font-medium"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Google Maps URL / Coordinates")
                              ]),
                              _: 1
                            }),
                            createVNode("span", { class: "text-[10px] text-zinc-400 font-normal italic" }, "Optional")
                          ]),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(Map), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }),
                            createVNode(unref(_sfc_main$9), {
                              id: "map_link",
                              type: "url",
                              modelValue: unref(form).map_link,
                              "onUpdate:modelValue": ($event) => unref(form).map_link = $event,
                              placeholder: "e.g., https://maps.google.com/?q=...",
                              class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.map_link }]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                          ]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.map_link
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode(unref(_sfc_main$8), {
                            for: "description",
                            class: "text-xs font-medium"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Spot Overview Summary "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "description",
                            modelValue: unref(form).description,
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "5",
                            placeholder: "Detail entry rules, points of interest, coordinate guides...",
                            class: ["text-xs dark:bg-zinc-950 dark:border-zinc-800 resize-none leading-relaxed", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.description
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-5 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "dark:border-zinc-800 shadow-sm overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "p-4 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Location Thumbnail`);
                            } else {
                              return [
                                createTextVNode("Location Thumbnail")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-xs" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Upload an asset showcasing this specific local hub. `);
                            } else {
                              return [
                                createTextVNode("Upload an asset showcasing this specific local hub. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                            default: withCtx(() => [
                              createTextVNode("Location Thumbnail")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Upload an asset showcasing this specific local hub. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "p-4 pt-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!imagePreview.value) {
                          _push4(`<div class="relative group border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-150"${_scopeId3}><label class="flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[190px]"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(ImagePlus), { class: "w-8 h-8 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-105 transition" }, null, _parent4, _scopeId3));
                          _push4(`<span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300"${_scopeId3}>Select Image File</span><span class="text-[10px] text-zinc-400 mt-0.5"${_scopeId3}>Supports PNG, JPG, or WEBP formats</span><input type="file" accept="image/*" class="hidden"${_scopeId3}></label></div>`);
                        } else {
                          _push4(`<div class="relative aspect-[4/3] w-full rounded-lg overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"${_scopeId3}><img${ssrRenderAttr("src", imagePreview.value)} alt="Sub-Location asset preview" class="w-full h-full object-cover"${_scopeId3}><div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-150"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            type: "button",
                            variant: "destructive",
                            size: "sm",
                            class: "h-8 text-xs font-medium flex items-center gap-1.5 shadow-md",
                            onClick: clearSelectedImage
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent5, _scopeId4));
                                _push5(` Remove Photo `);
                              } else {
                                return [
                                  createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Remove Photo ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        }
                        if (removeImage.value) {
                          _push4(`<p class="text-xs text-red-500 mt-2"${_scopeId3}>Current image will be removed when you save.</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div class="min-h-[1.5rem] mt-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.image
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          !imagePreview.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative group border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-150"
                          }, [
                            createVNode("label", { class: "flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[190px]" }, [
                              createVNode(unref(ImagePlus), { class: "w-8 h-8 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-105 transition" }),
                              createVNode("span", { class: "text-xs font-semibold text-zinc-700 dark:text-zinc-300" }, "Select Image File"),
                              createVNode("span", { class: "text-[10px] text-zinc-400 mt-0.5" }, "Supports PNG, JPG, or WEBP formats"),
                              createVNode("input", {
                                type: "file",
                                accept: "image/*",
                                class: "hidden",
                                onChange: handleFileSelect
                              }, null, 32)
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "relative aspect-[4/3] w-full rounded-lg overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"
                          }, [
                            createVNode("img", {
                              src: imagePreview.value,
                              alt: "Sub-Location asset preview",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("div", { class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-150" }, [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "destructive",
                                size: "sm",
                                class: "h-8 text-xs font-medium flex items-center gap-1.5 shadow-md",
                                onClick: clearSelectedImage
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Remove Photo ")
                                ]),
                                _: 1
                              })
                            ])
                          ])),
                          removeImage.value ? (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-xs text-red-500 mt-2"
                          }, "Current image will be removed when you save.")) : createCommentVNode("", true),
                          createVNode("div", { class: "min-h-[1.5rem] mt-2" }, [
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.image
                            }, null, 8, ["message"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { class: "bg-zinc-50/50 dark:bg-zinc-900/40 px-4 py-3 border-t dark:border-zinc-800 flex justify-end items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          class: "h-9 text-xs gap-1.5",
                          onClick: resetForm
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(RefreshCcw), { class: "w-3.5 h-3.5" }, null, _parent5, _scopeId4));
                              _push5(` Reset `);
                            } else {
                              return [
                                createVNode(unref(RefreshCcw), { class: "w-3.5 h-3.5" }),
                                createTextVNode(" Reset ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "submit",
                          size: "sm",
                          class: "h-8 text-xs gap-1.5 shadow-sm px-4",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(form).processing) {
                                _push5(ssrRenderComponent(unref(LoaderCircle), { class: "w-3.5 h-3.5 animate-spin" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(Save), { class: "w-3.5 h-3.5" }, null, _parent5, _scopeId4));
                              }
                              _push5(` Save Changes `);
                            } else {
                              return [
                                unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                                  key: 0,
                                  class: "w-3.5 h-3.5 animate-spin"
                                })) : (openBlock(), createBlock(unref(Save), {
                                  key: 1,
                                  class: "w-3.5 h-3.5"
                                })),
                                createTextVNode(" Save Changes ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            class: "h-9 text-xs gap-1.5",
                            onClick: resetForm
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(RefreshCcw), { class: "w-3.5 h-3.5" }),
                              createTextVNode(" Reset ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2), {
                            type: "submit",
                            size: "sm",
                            class: "h-8 text-xs gap-1.5 shadow-sm px-4",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                                key: 0,
                                class: "w-3.5 h-3.5 animate-spin"
                              })) : (openBlock(), createBlock(unref(Save), {
                                key: 1,
                                class: "w-3.5 h-3.5"
                              })),
                              createTextVNode(" Save Changes ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "p-4 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                          default: withCtx(() => [
                            createTextVNode("Location Thumbnail")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), { class: "text-xs" }, {
                          default: withCtx(() => [
                            createTextVNode("Upload an asset showcasing this specific local hub. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "p-4 pt-2" }, {
                      default: withCtx(() => [
                        !imagePreview.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "relative group border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-150"
                        }, [
                          createVNode("label", { class: "flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[190px]" }, [
                            createVNode(unref(ImagePlus), { class: "w-8 h-8 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-105 transition" }),
                            createVNode("span", { class: "text-xs font-semibold text-zinc-700 dark:text-zinc-300" }, "Select Image File"),
                            createVNode("span", { class: "text-[10px] text-zinc-400 mt-0.5" }, "Supports PNG, JPG, or WEBP formats"),
                            createVNode("input", {
                              type: "file",
                              accept: "image/*",
                              class: "hidden",
                              onChange: handleFileSelect
                            }, null, 32)
                          ])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "relative aspect-[4/3] w-full rounded-lg overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"
                        }, [
                          createVNode("img", {
                            src: imagePreview.value,
                            alt: "Sub-Location asset preview",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-150" }, [
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              variant: "destructive",
                              size: "sm",
                              class: "h-8 text-xs font-medium flex items-center gap-1.5 shadow-md",
                              onClick: clearSelectedImage
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                createTextVNode(" Remove Photo ")
                              ]),
                              _: 1
                            })
                          ])
                        ])),
                        removeImage.value ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "text-xs text-red-500 mt-2"
                        }, "Current image will be removed when you save.")) : createCommentVNode("", true),
                        createVNode("div", { class: "min-h-[1.5rem] mt-2" }, [
                          createVNode(_sfc_main$a, {
                            message: unref(form).errors.image
                          }, null, 8, ["message"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), { class: "bg-zinc-50/50 dark:bg-zinc-900/40 px-4 py-3 border-t dark:border-zinc-800 flex justify-end items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          class: "h-9 text-xs gap-1.5",
                          onClick: resetForm
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RefreshCcw), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" Reset ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2), {
                          type: "submit",
                          size: "sm",
                          class: "h-8 text-xs gap-1.5 shadow-sm px-4",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                              key: 0,
                              class: "w-3.5 h-3.5 animate-spin"
                            })) : (openBlock(), createBlock(unref(Save), {
                              key: 1,
                              class: "w-3.5 h-3.5"
                            })),
                            createTextVNode(" Save Changes ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 mx-auto w-full space-y-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2" }, " Edit Destination Location "),
                    createVNode("p", { class: "text-xs text-zinc-500 dark:text-zinc-400 mt-0.5" }, " Update the specific localized attraction parameters, details, or cover imagery asset rules. ")
                  ]),
                  createVNode(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "sm",
                    "as-child": "",
                    class: "h-9 text-xs gap-1.5 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.destinations.details", { id: __props.destination.id })
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronLeft), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Back ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"])
                }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-12 gap-6 items-start" }, [
                    createVNode("div", { class: "md:col-span-7 space-y-4" }, [
                      createVNode(unref(_sfc_main$3), { class: "dark:border-zinc-800 shadow-sm" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "p-4 pb-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                                default: withCtx(() => [
                                  createTextVNode("Location Parameters")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Specify regional metadata configurations for this sub-location entity.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), { class: "p-4 pt-2 space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(_sfc_main$8), { class: "text-xs font-medium text-zinc-400" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Parent Destination Context")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 text-xs" }, [
                                  createVNode(unref(Compass), { class: "w-4 h-4 text-indigo-500 shrink-0" }),
                                  createVNode("span", { class: "font-medium truncate" }, toDisplayString(__props.destination.title), 1),
                                  createVNode("span", { class: "text-[10px] text-zinc-400 font-normal" }, "(" + toDisplayString(__props.destination.country) + ")", 1)
                                ]),
                                createVNode("div", { class: "min-h-[0.5rem]" })
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(_sfc_main$8), {
                                  for: "name",
                                  class: "text-xs font-medium"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Location Name "),
                                    createVNode("span", { class: "text-red-500" }, "*")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "relative" }, [
                                  createVNode(unref(MapPin), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }),
                                  createVNode(unref(_sfc_main$9), {
                                    id: "name",
                                    type: "text",
                                    modelValue: unref(form).name,
                                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                    placeholder: "e.g., Shinjuku Gyoen National Garden",
                                    class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.name }]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                                ]),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$a, {
                                    message: unref(form).errors.name
                                  }, null, 8, ["message"])
                                ])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode("div", { class: "flex justify-between items-center" }, [
                                  createVNode(unref(_sfc_main$8), {
                                    for: "map_link",
                                    class: "text-xs font-medium"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Google Maps URL / Coordinates")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", { class: "text-[10px] text-zinc-400 font-normal italic" }, "Optional")
                                ]),
                                createVNode("div", { class: "relative" }, [
                                  createVNode(unref(Map), { class: "absolute left-3 top-2.5 h-4 w-4 text-zinc-400" }),
                                  createVNode(unref(_sfc_main$9), {
                                    id: "map_link",
                                    type: "url",
                                    modelValue: unref(form).map_link,
                                    "onUpdate:modelValue": ($event) => unref(form).map_link = $event,
                                    placeholder: "e.g., https://maps.google.com/?q=...",
                                    class: ["pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.map_link }]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                                ]),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$a, {
                                    message: unref(form).errors.map_link
                                  }, null, 8, ["message"])
                                ])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(_sfc_main$8), {
                                  for: "description",
                                  class: "text-xs font-medium"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Spot Overview Summary "),
                                    createVNode("span", { class: "text-red-500" }, "*")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$b), {
                                  id: "description",
                                  modelValue: unref(form).description,
                                  "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                  rows: "5",
                                  placeholder: "Detail entry rules, points of interest, coordinate guides...",
                                  class: ["text-xs dark:bg-zinc-950 dark:border-zinc-800 resize-none leading-relaxed", { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$a, {
                                    message: unref(form).errors.description
                                  }, null, 8, ["message"])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "md:col-span-5 space-y-4" }, [
                      createVNode(unref(_sfc_main$3), { class: "dark:border-zinc-800 shadow-sm overflow-hidden" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "p-4 pb-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50" }, {
                                default: withCtx(() => [
                                  createTextVNode("Location Thumbnail")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Upload an asset showcasing this specific local hub. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), { class: "p-4 pt-2" }, {
                            default: withCtx(() => [
                              !imagePreview.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "relative group border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-150"
                              }, [
                                createVNode("label", { class: "flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[190px]" }, [
                                  createVNode(unref(ImagePlus), { class: "w-8 h-8 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-105 transition" }),
                                  createVNode("span", { class: "text-xs font-semibold text-zinc-700 dark:text-zinc-300" }, "Select Image File"),
                                  createVNode("span", { class: "text-[10px] text-zinc-400 mt-0.5" }, "Supports PNG, JPG, or WEBP formats"),
                                  createVNode("input", {
                                    type: "file",
                                    accept: "image/*",
                                    class: "hidden",
                                    onChange: handleFileSelect
                                  }, null, 32)
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "relative aspect-[4/3] w-full rounded-lg overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"
                              }, [
                                createVNode("img", {
                                  src: imagePreview.value,
                                  alt: "Sub-Location asset preview",
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src"]),
                                createVNode("div", { class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-150" }, [
                                  createVNode(unref(_sfc_main$2), {
                                    type: "button",
                                    variant: "destructive",
                                    size: "sm",
                                    class: "h-8 text-xs font-medium flex items-center gap-1.5 shadow-md",
                                    onClick: clearSelectedImage
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                      createTextVNode(" Remove Photo ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])),
                              removeImage.value ? (openBlock(), createBlock("p", {
                                key: 2,
                                class: "text-xs text-red-500 mt-2"
                              }, "Current image will be removed when you save.")) : createCommentVNode("", true),
                              createVNode("div", { class: "min-h-[1.5rem] mt-2" }, [
                                createVNode(_sfc_main$a, {
                                  message: unref(form).errors.image
                                }, null, 8, ["message"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { class: "bg-zinc-50/50 dark:bg-zinc-900/40 px-4 py-3 border-t dark:border-zinc-800 flex justify-end items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                class: "h-9 text-xs gap-1.5",
                                onClick: resetForm
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(RefreshCcw), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Reset ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2), {
                                type: "submit",
                                size: "sm",
                                class: "h-8 text-xs gap-1.5 shadow-sm px-4",
                                disabled: unref(form).processing
                              }, {
                                default: withCtx(() => [
                                  unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                                    key: 0,
                                    class: "w-3.5 h-3.5 animate-spin"
                                  })) : (openBlock(), createBlock(unref(Save), {
                                    key: 1,
                                    class: "w-3.5 h-3.5"
                                  })),
                                  createTextVNode(" Save Changes ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/destination/EditLocation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
