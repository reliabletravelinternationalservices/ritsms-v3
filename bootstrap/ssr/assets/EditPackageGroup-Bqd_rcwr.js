import { defineComponent, ref, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6, e as _sfc_main$c } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$8 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$9 } from "./Textarea-BvWBAMsq.js";
import { _ as _sfc_main$7 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$b } from "./Switch-C_HW8oQD.js";
import { _ as _sfc_main$a } from "../ssr.js";
import { FolderPlus, ImagePlus, X, PlaneTakeoff, PlaneLanding, Star, RefreshCcw, Loader2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "radix-vue";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./index-xORXC0Yx.js";
import "reka-ui";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditPackageGroup",
  __ssrInlineRender: true,
  props: {
    group: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const originalImageUrl = ((_a = props.group.image) == null ? void 0 : _a.url) ?? null;
    const breadcrumbs = [
      { title: "Dashboard", href: route("admin.dashboard") },
      { title: "Package Groups", href: route("admin.packages.groups") },
      { title: "Edit", href: route("admin.packages.groups.edit", { id: props.group.id }) }
    ];
    const form = useForm({
      title: props.group.title,
      description: props.group.description ?? "",
      include_as_outbound: props.group.include_as_outbound,
      include_as_inbound: props.group.include_as_inbound,
      is_featured: props.group.is_featured,
      tag: props.group.tag ?? "",
      image: null
    });
    const imagePreview = ref(originalImageUrl);
    const isBlobPreview = ref(false);
    const handleFileSelect = (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        if (isBlobPreview.value && imagePreview.value) {
          URL.revokeObjectURL(imagePreview.value);
        }
        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
        isBlobPreview.value = true;
      }
    };
    const clearSelectedImage = () => {
      if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
      }
      form.image = null;
      imagePreview.value = null;
      isBlobPreview.value = false;
    };
    const resetForm = () => {
      if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
      }
      form.reset();
      form.image = null;
      imagePreview.value = originalImageUrl;
      isBlobPreview.value = false;
    };
    const submitForm = () => {
      form.transform((data) => ({
        ...data,
        _method: "put"
      })).post(route("admin.packages.groups.update", {
        id: props.group.id
      }), {
        forceFormData: true,
        onSuccess: () => {
          if (!form.image) {
            imagePreview.value = originalImageUrl;
            isBlobPreview.value = false;
          }
          toast.success(
            "Package group updated successfully."
          );
        },
        onError: () => {
          toast.error(
            "Failed to update package group."
          );
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Package Group" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-w-4xl mx-auto w-full"${_scopeId}><div class="mb-6 flex items-center gap-2"${_scopeId}><div class="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FolderPlus), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50"${_scopeId}>Edit Package Group</h1><p class="text-sm text-zinc-500 dark:text-zinc-400"${_scopeId}>Update the details for this package group.</p></div></div><form${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="md:col-span-2 space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "dark:border-zinc-800" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Group Details`);
                            } else {
                              return [
                                createTextVNode("Group Details")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Basic storefront marketing identities.`);
                            } else {
                              return [
                                createTextVNode("Basic storefront marketing identities.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Group Details")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Basic storefront marketing identities.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "title" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Collection Title <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Collection Title "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          id: "title",
                          type: "text",
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          placeholder: "e.g., Autumn Cherry Blossom Luxury Escapes",
                          class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.title }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-xs text-red-500 font-medium"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "tag" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tag <span class="text-sm text-zinc-400"${_scopeId4}>(Optional)</span>`);
                            } else {
                              return [
                                createTextVNode("Tag "),
                                createVNode("span", { class: "text-sm text-zinc-400" }, "(Optional)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          id: "tag",
                          type: "text",
                          modelValue: unref(form).tag,
                          "onUpdate:modelValue": ($event) => unref(form).tag = $event,
                          placeholder: "e.g., Hot Deals, Valid for Foreigners, Last Minute",
                          class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.tag }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.tag) {
                          _push4(`<p class="text-xs text-red-500 font-medium"${_scopeId3}>${ssrInterpolate(unref(form).errors.tag)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-1.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Description Summary`);
                            } else {
                              return [
                                createTextVNode("Description Summary")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "description",
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "4",
                          placeholder: "Brief summary detailing destinations, experiences, or itineraries featured inside this bundle group...",
                          class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.description) {
                          _push4(`<p class="text-xs text-red-500 font-medium"${_scopeId3}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(_sfc_main$7), { for: "title" }, {
                              default: withCtx(() => [
                                createTextVNode("Collection Title "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), {
                              id: "title",
                              type: "text",
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "e.g., Autumn Cherry Blossom Luxury Escapes",
                              class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-red-500 font-medium"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(_sfc_main$7), { for: "tag" }, {
                              default: withCtx(() => [
                                createTextVNode("Tag "),
                                createVNode("span", { class: "text-sm text-zinc-400" }, "(Optional)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), {
                              id: "tag",
                              type: "text",
                              modelValue: unref(form).tag,
                              "onUpdate:modelValue": ($event) => unref(form).tag = $event,
                              placeholder: "e.g., Hot Deals, Valid for Foreigners, Last Minute",
                              class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.tag }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.tag ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-red-500 font-medium"
                            }, toDisplayString(unref(form).errors.tag), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(_sfc_main$7), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Description Summary")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "description",
                              modelValue: unref(form).description,
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "4",
                              placeholder: "Brief summary detailing destinations, experiences, or itineraries featured inside this bundle group...",
                              class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-red-500 font-medium"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Group Details")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Basic storefront marketing identities.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode(unref(_sfc_main$7), { for: "title" }, {
                            default: withCtx(() => [
                              createTextVNode("Collection Title "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), {
                            id: "title",
                            type: "text",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            placeholder: "e.g., Autumn Cherry Blossom Luxury Escapes",
                            class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.title }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 font-medium"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode(unref(_sfc_main$7), { for: "tag" }, {
                            default: withCtx(() => [
                              createTextVNode("Tag "),
                              createVNode("span", { class: "text-sm text-zinc-400" }, "(Optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), {
                            id: "tag",
                            type: "text",
                            modelValue: unref(form).tag,
                            "onUpdate:modelValue": ($event) => unref(form).tag = $event,
                            placeholder: "e.g., Hot Deals, Valid for Foreigners, Last Minute",
                            class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.tag }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.tag ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 font-medium"
                          }, toDisplayString(unref(form).errors.tag), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode(unref(_sfc_main$7), { for: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Description Summary")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "description",
                            modelValue: unref(form).description,
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            placeholder: "Brief summary detailing destinations, experiences, or itineraries featured inside this bundle group...",
                            class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500 font-medium"
                          }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "dark:border-zinc-800" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cover Banner Image`);
                            } else {
                              return [
                                createTextVNode("Cover Banner Image")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Upload a single high-resolution cover image representation for this collection.`);
                            } else {
                              return [
                                createTextVNode("Upload a single high-resolution cover image representation for this collection.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Cover Banner Image")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Upload a single high-resolution cover image representation for this collection.")
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
                        if (!imagePreview.value) {
                          _push4(`<div class="relative group border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-200"${_scopeId3}><label class="flex flex-col items-center justify-center p-8 text-center cursor-pointer h-48"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(ImagePlus), { class: "w-10 h-10 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-110 transition duration-200" }, null, _parent4, _scopeId3));
                          _push4(`<span class="text-sm font-medium text-zinc-700 dark:text-zinc-300"${_scopeId3}>Click to upload file</span><span class="text-xs text-zinc-400 mt-1"${_scopeId3}>Accepts PNG, JPG, or WEBP formats</span><input type="file" accept="image/*" class="hidden"${_scopeId3}></label></div>`);
                        } else {
                          _push4(`<div class="relative aspect-[16/7] w-full rounded-xl overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"${_scopeId3}><img${ssrRenderAttr("src", imagePreview.value)} alt="Upload preview asset" class="w-full h-full object-cover"${_scopeId3}><div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$a), {
                            type: "button",
                            variant: "destructive",
                            size: "sm",
                            class: "flex items-center gap-1.5",
                            onClick: clearSelectedImage
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent5, _scopeId4));
                                _push5(` Remove Image `);
                              } else {
                                return [
                                  createVNode(unref(X), { class: "w-4 h-4" }),
                                  createTextVNode(" Remove Image ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        }
                        if (unref(form).errors.image) {
                          _push4(`<p class="text-xs text-red-500 font-medium mt-2"${_scopeId3}>${ssrInterpolate(unref(form).errors.image)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          !imagePreview.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative group border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-200"
                          }, [
                            createVNode("label", { class: "flex flex-col items-center justify-center p-8 text-center cursor-pointer h-48" }, [
                              createVNode(unref(ImagePlus), { class: "w-10 h-10 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-110 transition duration-200" }),
                              createVNode("span", { class: "text-sm font-medium text-zinc-700 dark:text-zinc-300" }, "Click to upload file"),
                              createVNode("span", { class: "text-xs text-zinc-400 mt-1" }, "Accepts PNG, JPG, or WEBP formats"),
                              createVNode("input", {
                                type: "file",
                                accept: "image/*",
                                class: "hidden",
                                onChange: handleFileSelect
                              }, null, 32)
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "relative aspect-[16/7] w-full rounded-xl overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"
                          }, [
                            createVNode("img", {
                              src: imagePreview.value,
                              alt: "Upload preview asset",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("div", { class: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200" }, [
                              createVNode(unref(_sfc_main$a), {
                                type: "button",
                                variant: "destructive",
                                size: "sm",
                                class: "flex items-center gap-1.5",
                                onClick: clearSelectedImage
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(X), { class: "w-4 h-4" }),
                                  createTextVNode(" Remove Image ")
                                ]),
                                _: 1
                              })
                            ])
                          ])),
                          unref(form).errors.image ? (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-xs text-red-500 font-medium mt-2"
                          }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Cover Banner Image")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Upload a single high-resolution cover image representation for this collection.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        !imagePreview.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "relative group border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-200"
                        }, [
                          createVNode("label", { class: "flex flex-col items-center justify-center p-8 text-center cursor-pointer h-48" }, [
                            createVNode(unref(ImagePlus), { class: "w-10 h-10 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-110 transition duration-200" }),
                            createVNode("span", { class: "text-sm font-medium text-zinc-700 dark:text-zinc-300" }, "Click to upload file"),
                            createVNode("span", { class: "text-xs text-zinc-400 mt-1" }, "Accepts PNG, JPG, or WEBP formats"),
                            createVNode("input", {
                              type: "file",
                              accept: "image/*",
                              class: "hidden",
                              onChange: handleFileSelect
                            }, null, 32)
                          ])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "relative aspect-[16/7] w-full rounded-xl overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"
                        }, [
                          createVNode("img", {
                            src: imagePreview.value,
                            alt: "Upload preview asset",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200" }, [
                            createVNode(unref(_sfc_main$a), {
                              type: "button",
                              variant: "destructive",
                              size: "sm",
                              class: "flex items-center gap-1.5",
                              onClick: clearSelectedImage
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(X), { class: "w-4 h-4" }),
                                createTextVNode(" Remove Image ")
                              ]),
                              _: 1
                            })
                          ])
                        ])),
                        unref(form).errors.image ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "text-xs text-red-500 font-medium mt-2"
                        }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "dark:border-zinc-800" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Visibility Scopes`);
                            } else {
                              return [
                                createTextVNode("Visibility Scopes")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Configure search indexing options.`);
                            } else {
                              return [
                                createTextVNode("Configure search indexing options.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Visibility Scopes")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Configure search indexing options.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30"${_scopeId3}><div class="flex gap-2.5 items-start max-w-[80%]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(PlaneTakeoff), { class: "w-4 h-4 text-sky-500 mt-1 shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          for: "outbound",
                          class: "font-medium cursor-pointer"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Include Outbound`);
                            } else {
                              return [
                                createTextVNode("Include Outbound")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-[11px] text-zinc-400 mt-0.5 leading-tight"${_scopeId3}>Display on international travel directories.</p></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "outbound",
                          modelValue: unref(form).include_as_outbound,
                          "onUpdate:modelValue": ($event) => unref(form).include_as_outbound = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30"${_scopeId3}><div class="flex gap-2.5 items-start max-w-[80%]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(PlaneLanding), { class: "w-4 h-4 text-emerald-500 mt-1 shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          for: "inbound",
                          class: "font-medium cursor-pointer"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Include Inbound`);
                            } else {
                              return [
                                createTextVNode("Include Inbound")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-[11px] text-zinc-400 mt-0.5 leading-tight"${_scopeId3}>Display on localized domestic directories.</p></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "inbound",
                          modelValue: unref(form).include_as_inbound,
                          "onUpdate:modelValue": ($event) => unref(form).include_as_inbound = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><hr class="dark:border-zinc-800"${_scopeId3}><div class="flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30"${_scopeId3}><div class="flex gap-2.5 items-start max-w-[80%]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Star), { class: "w-4 h-4 text-amber-500 mt-1 shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          for: "featured",
                          class: "font-medium cursor-pointer"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Feature Collection`);
                            } else {
                              return [
                                createTextVNode("Feature Collection")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-[11px] text-zinc-400 mt-0.5 leading-tight"${_scopeId3}>Promote container on front hero banners.</p></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "featured",
                          modelValue: unref(form).is_featured,
                          "onUpdate:modelValue": ($event) => unref(form).is_featured = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                            createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                              createVNode(unref(PlaneTakeoff), { class: "w-4 h-4 text-sky-500 mt-1 shrink-0" }),
                              createVNode("div", null, [
                                createVNode(unref(_sfc_main$7), {
                                  for: "outbound",
                                  class: "font-medium cursor-pointer"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Include Outbound")
                                  ]),
                                  _: 1
                                }),
                                createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Display on international travel directories.")
                              ])
                            ]),
                            createVNode(unref(_sfc_main$b), {
                              id: "outbound",
                              modelValue: unref(form).include_as_outbound,
                              "onUpdate:modelValue": ($event) => unref(form).include_as_outbound = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                            createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                              createVNode(unref(PlaneLanding), { class: "w-4 h-4 text-emerald-500 mt-1 shrink-0" }),
                              createVNode("div", null, [
                                createVNode(unref(_sfc_main$7), {
                                  for: "inbound",
                                  class: "font-medium cursor-pointer"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Include Inbound")
                                  ]),
                                  _: 1
                                }),
                                createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Display on localized domestic directories.")
                              ])
                            ]),
                            createVNode(unref(_sfc_main$b), {
                              id: "inbound",
                              modelValue: unref(form).include_as_inbound,
                              "onUpdate:modelValue": ($event) => unref(form).include_as_inbound = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("hr", { class: "dark:border-zinc-800" }),
                          createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                            createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                              createVNode(unref(Star), { class: "w-4 h-4 text-amber-500 mt-1 shrink-0" }),
                              createVNode("div", null, [
                                createVNode(unref(_sfc_main$7), {
                                  for: "featured",
                                  class: "font-medium cursor-pointer"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Feature Collection")
                                  ]),
                                  _: 1
                                }),
                                createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Promote container on front hero banners.")
                              ])
                            ]),
                            createVNode(unref(_sfc_main$b), {
                              id: "featured",
                              modelValue: unref(form).is_featured,
                              "onUpdate:modelValue": ($event) => unref(form).is_featured = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { class: "bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-t dark:border-zinc-800 flex justify-end gap-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!unref(form).processing) {
                          _push4(ssrRenderComponent(unref(_sfc_main$a), {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: resetForm
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(RefreshCcw), { class: "w-4 h-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(RefreshCcw), { class: "w-4 h-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(Link), {
                          href: _ctx.route("admin.packages.groups")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                disabled: unref(form).processing
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Cancel `);
                                  } else {
                                    return [
                                      createTextVNode(" Cancel ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), {
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  disabled: unref(form).processing
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cancel ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          type: "submit",
                          size: "sm",
                          class: "shadow-sm",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(form).processing) {
                                _push5(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 animate-spin mr-1.5" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` Save Group `);
                            } else {
                              return [
                                unref(form).processing ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "w-4 h-4 animate-spin mr-1.5"
                                })) : createCommentVNode("", true),
                                createTextVNode(" Save Group ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          !unref(form).processing ? (openBlock(), createBlock(unref(_sfc_main$a), {
                            key: 0,
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: resetForm
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(RefreshCcw), { class: "w-4 h-4" })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.packages.groups")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                disabled: unref(form).processing
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cancel ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(_sfc_main$a), {
                            type: "submit",
                            size: "sm",
                            class: "shadow-sm",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              unref(form).processing ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "w-4 h-4 animate-spin mr-1.5"
                              })) : createCommentVNode("", true),
                              createTextVNode(" Save Group ")
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
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Visibility Scopes")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Configure search indexing options.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-5" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                          createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                            createVNode(unref(PlaneTakeoff), { class: "w-4 h-4 text-sky-500 mt-1 shrink-0" }),
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$7), {
                                for: "outbound",
                                class: "font-medium cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Include Outbound")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Display on international travel directories.")
                            ])
                          ]),
                          createVNode(unref(_sfc_main$b), {
                            id: "outbound",
                            modelValue: unref(form).include_as_outbound,
                            "onUpdate:modelValue": ($event) => unref(form).include_as_outbound = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                          createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                            createVNode(unref(PlaneLanding), { class: "w-4 h-4 text-emerald-500 mt-1 shrink-0" }),
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$7), {
                                for: "inbound",
                                class: "font-medium cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Include Inbound")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Display on localized domestic directories.")
                            ])
                          ]),
                          createVNode(unref(_sfc_main$b), {
                            id: "inbound",
                            modelValue: unref(form).include_as_inbound,
                            "onUpdate:modelValue": ($event) => unref(form).include_as_inbound = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("hr", { class: "dark:border-zinc-800" }),
                        createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                          createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                            createVNode(unref(Star), { class: "w-4 h-4 text-amber-500 mt-1 shrink-0" }),
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$7), {
                                for: "featured",
                                class: "font-medium cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Feature Collection")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Promote container on front hero banners.")
                            ])
                          ]),
                          createVNode(unref(_sfc_main$b), {
                            id: "featured",
                            modelValue: unref(form).is_featured,
                            "onUpdate:modelValue": ($event) => unref(form).is_featured = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), { class: "bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-t dark:border-zinc-800 flex justify-end gap-3" }, {
                      default: withCtx(() => [
                        !unref(form).processing ? (openBlock(), createBlock(unref(_sfc_main$a), {
                          key: 0,
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: resetForm
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RefreshCcw), { class: "w-4 h-4" })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.packages.groups")
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), {
                              type: "button",
                              variant: "outline",
                              size: "sm",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(_sfc_main$a), {
                          type: "submit",
                          size: "sm",
                          class: "shadow-sm",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            unref(form).processing ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "w-4 h-4 animate-spin mr-1.5"
                            })) : createCommentVNode("", true),
                            createTextVNode(" Save Group ")
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
              createVNode("div", { class: "p-6 max-w-4xl mx-auto w-full" }, [
                createVNode("div", { class: "mb-6 flex items-center gap-2" }, [
                  createVNode("div", { class: "p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" }, [
                    createVNode(unref(FolderPlus), { class: "w-5 h-5" })
                  ]),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-bold text-zinc-900 dark:text-zinc-50" }, "Edit Package Group"),
                    createVNode("p", { class: "text-sm text-zinc-500 dark:text-zinc-400" }, "Update the details for this package group.")
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"])
                }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "md:col-span-2 space-y-6" }, [
                      createVNode(unref(_sfc_main$2), { class: "dark:border-zinc-800" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                                default: withCtx(() => [
                                  createTextVNode("Group Details")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode("Basic storefront marketing identities.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(_sfc_main$7), { for: "title" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Collection Title "),
                                    createVNode("span", { class: "text-red-500" }, "*")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$8), {
                                  id: "title",
                                  type: "text",
                                  modelValue: unref(form).title,
                                  "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                  placeholder: "e.g., Autumn Cherry Blossom Luxury Escapes",
                                  class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.title }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                unref(form).errors.title ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-red-500 font-medium"
                                }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(_sfc_main$7), { for: "tag" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Tag "),
                                    createVNode("span", { class: "text-sm text-zinc-400" }, "(Optional)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$8), {
                                  id: "tag",
                                  type: "text",
                                  modelValue: unref(form).tag,
                                  "onUpdate:modelValue": ($event) => unref(form).tag = $event,
                                  placeholder: "e.g., Hot Deals, Valid for Foreigners, Last Minute",
                                  class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.tag }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                unref(form).errors.tag ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-red-500 font-medium"
                                }, toDisplayString(unref(form).errors.tag), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(_sfc_main$7), { for: "description" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Description Summary")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), {
                                  id: "description",
                                  modelValue: unref(form).description,
                                  "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                  rows: "4",
                                  placeholder: "Brief summary detailing destinations, experiences, or itineraries featured inside this bundle group...",
                                  class: { "border-red-500 focus-visible:ring-red-500": unref(form).errors.description }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                unref(form).errors.description ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-red-500 font-medium"
                                }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2), { class: "dark:border-zinc-800" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cover Banner Image")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode("Upload a single high-resolution cover image representation for this collection.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              !imagePreview.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "relative group border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-200"
                              }, [
                                createVNode("label", { class: "flex flex-col items-center justify-center p-8 text-center cursor-pointer h-48" }, [
                                  createVNode(unref(ImagePlus), { class: "w-10 h-10 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-110 transition duration-200" }),
                                  createVNode("span", { class: "text-sm font-medium text-zinc-700 dark:text-zinc-300" }, "Click to upload file"),
                                  createVNode("span", { class: "text-xs text-zinc-400 mt-1" }, "Accepts PNG, JPG, or WEBP formats"),
                                  createVNode("input", {
                                    type: "file",
                                    accept: "image/*",
                                    class: "hidden",
                                    onChange: handleFileSelect
                                  }, null, 32)
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "relative aspect-[16/7] w-full rounded-xl overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group"
                              }, [
                                createVNode("img", {
                                  src: imagePreview.value,
                                  alt: "Upload preview asset",
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src"]),
                                createVNode("div", { class: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200" }, [
                                  createVNode(unref(_sfc_main$a), {
                                    type: "button",
                                    variant: "destructive",
                                    size: "sm",
                                    class: "flex items-center gap-1.5",
                                    onClick: clearSelectedImage
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(X), { class: "w-4 h-4" }),
                                      createTextVNode(" Remove Image ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])),
                              unref(form).errors.image ? (openBlock(), createBlock("p", {
                                key: 2,
                                class: "text-xs text-red-500 font-medium mt-2"
                              }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(unref(_sfc_main$2), { class: "dark:border-zinc-800" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), { class: "text-base" }, {
                                default: withCtx(() => [
                                  createTextVNode("Visibility Scopes")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode("Configure search indexing options.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "space-y-5" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                                createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                                  createVNode(unref(PlaneTakeoff), { class: "w-4 h-4 text-sky-500 mt-1 shrink-0" }),
                                  createVNode("div", null, [
                                    createVNode(unref(_sfc_main$7), {
                                      for: "outbound",
                                      class: "font-medium cursor-pointer"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Include Outbound")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Display on international travel directories.")
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$b), {
                                  id: "outbound",
                                  modelValue: unref(form).include_as_outbound,
                                  "onUpdate:modelValue": ($event) => unref(form).include_as_outbound = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                                createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                                  createVNode(unref(PlaneLanding), { class: "w-4 h-4 text-emerald-500 mt-1 shrink-0" }),
                                  createVNode("div", null, [
                                    createVNode(unref(_sfc_main$7), {
                                      for: "inbound",
                                      class: "font-medium cursor-pointer"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Include Inbound")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Display on localized domestic directories.")
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$b), {
                                  id: "inbound",
                                  modelValue: unref(form).include_as_inbound,
                                  "onUpdate:modelValue": ($event) => unref(form).include_as_inbound = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("hr", { class: "dark:border-zinc-800" }),
                              createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30" }, [
                                createVNode("div", { class: "flex gap-2.5 items-start max-w-[80%]" }, [
                                  createVNode(unref(Star), { class: "w-4 h-4 text-amber-500 mt-1 shrink-0" }),
                                  createVNode("div", null, [
                                    createVNode(unref(_sfc_main$7), {
                                      for: "featured",
                                      class: "font-medium cursor-pointer"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Feature Collection")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("p", { class: "text-[11px] text-zinc-400 mt-0.5 leading-tight" }, "Promote container on front hero banners.")
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$b), {
                                  id: "featured",
                                  modelValue: unref(form).is_featured,
                                  "onUpdate:modelValue": ($event) => unref(form).is_featured = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { class: "bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-t dark:border-zinc-800 flex justify-end gap-3" }, {
                            default: withCtx(() => [
                              !unref(form).processing ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                key: 0,
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: resetForm
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(RefreshCcw), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.packages.groups")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), {
                                    type: "button",
                                    variant: "outline",
                                    size: "sm",
                                    disabled: unref(form).processing
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Cancel ")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              createVNode(unref(_sfc_main$a), {
                                type: "submit",
                                size: "sm",
                                class: "shadow-sm",
                                disabled: unref(form).processing
                              }, {
                                default: withCtx(() => [
                                  unref(form).processing ? (openBlock(), createBlock(unref(Loader2), {
                                    key: 0,
                                    class: "w-4 h-4 animate-spin mr-1.5"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" Save Group ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/EditPackageGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
