import { defineComponent, ref, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { useForm, Head } from "@inertiajs/vue3";
import { t as truncateText, _ as _sfc_main$8 } from "../ssr.js";
import { _ as _sfc_main$a } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$7 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6 } from "./CardTitle-CO_w4Cob.js";
import { _ as _sfc_main$c, a as _sfc_main$d, b as _sfc_main$e, c as _sfc_main$f, d as _sfc_main$g } from "./SelectValue-CdQiWiXd.js";
import { _ as _sfc_main$b } from "./InfoTooltip-RCL49eOv.js";
import { _ as _sfc_main$9 } from "./InputError-BhTWS2NZ.js";
import { Camera, X, AlertTriangle } from "lucide-vue-next";
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
import "./TooltipProvider-D2JAfXHP.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditAdminAccount",
  __ssrInlineRender: true,
  props: {
    admin: {}
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
      },
      {
        title: truncateText(props.admin.name, 20),
        href: route("admin.users.admins.details", { id: props.admin.id })
      },
      {
        title: "Edit",
        href: route("admin.users.admins.edit", { id: props.admin.id })
      }
    ];
    const form = useForm({
      _method: "PUT",
      name: props.admin.name ?? "",
      display_name: props.admin.display_name ?? "",
      email: props.admin.email ?? "",
      phone: props.admin.phone ?? "",
      role: props.admin.role,
      avatar: null
    });
    const envUrl = "http://127.0.0.1:8000/";
    const imagePreview = ref(props.admin.avatar !== null ? `${envUrl}/storage/${props.admin.avatar}` : null);
    const isEmailLocked = ref(!!props.admin.email_verified_at);
    const handleAvatarChange = (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        form.avatar = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };
    const clearAvatar = () => {
      form.avatar = null;
      if (imagePreview.value) {
        if (imagePreview.value.startsWith("blob:")) {
          URL.revokeObjectURL(imagePreview.value);
        }
        imagePreview.value = props.admin.avatar !== null ? `${envUrl}/storage/${props.admin.avatar}` : null;
      }
    };
    const submit = () => {
      form.post(route("admin.users.admins.update", { id: props.admin.id }), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Admin account updated successfully.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Admin" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-1 flex-col gap-4 p-4 mx-auto w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Admin Account`);
                            } else {
                              return [
                                createTextVNode("Edit Admin Account")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Modify account settings and permissions for this administrator.`);
                            } else {
                              return [
                                createTextVNode("Modify account settings and permissions for this administrator.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Admin Account")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Modify account settings and permissions for this administrator.")
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
                        _push4(`<form class="space-y-4"${_scopeId3}><div class="flex flex-col items-center justify-center pb-6 border-b border-border/40 gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { class: "text-sm font-medium text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Account Avatar`);
                            } else {
                              return [
                                createTextVNode("Account Avatar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex flex-col items-center justify-center gap-4"${_scopeId3}><div class="relative group flex items-center justify-center"${_scopeId3}><div class="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 transition-colors flex items-center justify-center bg-muted/30"${_scopeId3}>`);
                        if (imagePreview.value) {
                          _push4(`<img${ssrRenderAttr("src", imagePreview.value)} alt="Avatar preview" class="w-full h-full object-cover"${_scopeId3}>`);
                        } else {
                          _push4(`<div class="flex flex-col items-center text-muted-foreground"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Camera), { class: "w-6 h-6 mb-1 stroke-[1.5]" }, null, _parent4, _scopeId3));
                          _push4(`<span class="text-[10px]"${_scopeId3}>Upload</span></div>`);
                        }
                        _push4(`</div><input type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"${_scopeId3}></div>`);
                        if (unref(form).avatar || imagePreview.value && imagePreview.value !== props.admin.avatar) {
                          _push4(ssrRenderComponent(unref(_sfc_main$8), {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            class: "text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10 h-8 gap-1 px-2",
                            onClick: clearAvatar
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent5, _scopeId4));
                                _push5(` Reset Avatar `);
                              } else {
                                return [
                                  createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Reset Avatar ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$9, {
                          message: unref(form).errors.avatar
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Full Name`);
                            } else {
                              return [
                                createTextVNode("Full Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          placeholder: "eg. John Doe",
                          class: { "border-destructive": unref(form).errors.name }
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$9, {
                          message: unref(form).errors.name
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "display_name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Display Name`);
                            } else {
                              return [
                                createTextVNode("Display Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "display_name",
                          modelValue: unref(form).display_name,
                          "onUpdate:modelValue": ($event) => unref(form).display_name = $event,
                          type: "text",
                          placeholder: "eg. Travel Agent",
                          class: { "border-destructive": unref(form).errors.display_name }
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$9, {
                          message: unref(form).errors.display_name
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "role" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$b, { content: "Admin: Full Access\nAgent: Partial Access" }, null, _parent5, _scopeId4));
                              _push5(` Access Level `);
                            } else {
                              return [
                                createVNode(_sfc_main$b, { content: "Admin: Full Access\nAgent: Partial Access" }),
                                createTextVNode(" Access Level ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          modelValue: unref(form).role,
                          "onUpdate:modelValue": ($event) => unref(form).role = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$d), {
                                id: "role",
                                class: { "border-destructive": unref(form).errors.role }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), { placeholder: "Select a role" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$e), { placeholder: "Select a role" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$f), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$g), { value: "agent" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Agent`);
                                        } else {
                                          return [
                                            createTextVNode("Agent")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$g), { value: "admin" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Admin`);
                                        } else {
                                          return [
                                            createTextVNode("Admin")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$g), { value: "agent" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Agent")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$g), { value: "admin" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Admin")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$d), {
                                  id: "role",
                                  class: { "border-destructive": unref(form).errors.role }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { placeholder: "Select a role" })
                                  ]),
                                  _: 1
                                }, 8, ["class"]),
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), { value: "agent" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Agent")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$g), { value: "admin" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Admin")
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
                        }, _parent4, _scopeId3));
                        _push4(`<div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$9, {
                          message: unref(form).errors.role
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "phone" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Phone Number`);
                            } else {
                              return [
                                createTextVNode("Phone Number")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          type: "tel",
                          placeholder: "+63 9XXX XXX XXX",
                          class: { "border-destructive": unref(form).errors.phone }
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$9, {
                          message: unref(form).errors.phone
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}><div class="flex items-center gap-1.5"${_scopeId3}>`);
                        if (isEmailLocked.value) {
                          _push4(ssrRenderComponent(_sfc_main$b, { content: "Verified email addresses cannot be changed." }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { for: "email" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Email Address`);
                            } else {
                              return [
                                createTextVNode("Email Address")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "eg. username@example.com",
                          disabled: isEmailLocked.value,
                          class: { "border-destructive": unref(form).errors.email, "bg-muted opacity-80 cursor-not-allowed": isEmailLocked.value }
                        }, null, _parent4, _scopeId3));
                        if (isEmailLocked.value) {
                          _push4(`<div class="flex items-start gap-2 mt-2 p-2.5 rounded-lg border border-amber-200/60 bg-amber-50/50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(AlertTriangle), { class: "w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" }, null, _parent4, _scopeId3));
                          _push4(`<p class="text-xs leading-relaxed font-medium"${_scopeId3}> This email address is verified and cannot be modified to preserve account security. </p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div class="min-h-[1.5rem]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$9, {
                          message: unref(form).errors.email
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div></div><div class="flex justify-end gap-3 pt-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => {
                            unref(form).reset();
                            clearAvatar();
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Undo Changes `);
                            } else {
                              return [
                                createTextVNode(" Undo Changes ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(form).processing) {
                                _push5(`<span${_scopeId4}>Saving...</span>`);
                              } else {
                                _push5(`<span${_scopeId4}>Save Changes</span>`);
                              }
                            } else {
                              return [
                                unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Saving...")) : (openBlock(), createBlock("span", { key: 1 }, "Save Changes"))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></form>`);
                      } else {
                        return [
                          createVNode("form", {
                            onSubmit: withModifiers(submit, ["prevent"]),
                            class: "space-y-4"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center justify-center pb-6 border-b border-border/40 gap-2" }, [
                              createVNode(unref(_sfc_main$7), { class: "text-sm font-medium text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Account Avatar")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex flex-col items-center justify-center gap-4" }, [
                                createVNode("div", { class: "relative group flex items-center justify-center" }, [
                                  createVNode("div", { class: "w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 transition-colors flex items-center justify-center bg-muted/30" }, [
                                    imagePreview.value ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: imagePreview.value,
                                      alt: "Avatar preview",
                                      class: "w-full h-full object-cover"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex flex-col items-center text-muted-foreground"
                                    }, [
                                      createVNode(unref(Camera), { class: "w-6 h-6 mb-1 stroke-[1.5]" }),
                                      createVNode("span", { class: "text-[10px]" }, "Upload")
                                    ]))
                                  ]),
                                  createVNode("input", {
                                    type: "file",
                                    accept: "image/*",
                                    class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full",
                                    onChange: handleAvatarChange
                                  }, null, 32)
                                ]),
                                unref(form).avatar || imagePreview.value && imagePreview.value !== props.admin.avatar ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                  key: 0,
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  class: "text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10 h-8 gap-1 px-2",
                                  onClick: clearAvatar
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                    createTextVNode(" Reset Avatar ")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.avatar
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(_sfc_main$7), { for: "name" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Full Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), {
                                  id: "name",
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  type: "text",
                                  placeholder: "eg. John Doe",
                                  class: { "border-destructive": unref(form).errors.name }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$9, {
                                    message: unref(form).errors.name
                                  }, null, 8, ["message"])
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(_sfc_main$7), { for: "display_name" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Display Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), {
                                  id: "display_name",
                                  modelValue: unref(form).display_name,
                                  "onUpdate:modelValue": ($event) => unref(form).display_name = $event,
                                  type: "text",
                                  placeholder: "eg. Travel Agent",
                                  class: { "border-destructive": unref(form).errors.display_name }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$9, {
                                    message: unref(form).errors.display_name
                                  }, null, 8, ["message"])
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(_sfc_main$7), { for: "role" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$b, { content: "Admin: Full Access\nAgent: Partial Access" }),
                                    createTextVNode(" Access Level ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), {
                                  modelValue: unref(form).role,
                                  "onUpdate:modelValue": ($event) => unref(form).role = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), {
                                      id: "role",
                                      class: { "border-destructive": unref(form).errors.role }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), { placeholder: "Select a role" })
                                      ]),
                                      _: 1
                                    }, 8, ["class"]),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$g), { value: "agent" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Agent")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$g), { value: "admin" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Admin")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$9, {
                                    message: unref(form).errors.role
                                  }, null, 8, ["message"])
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(_sfc_main$7), { for: "phone" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Phone Number")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), {
                                  id: "phone",
                                  modelValue: unref(form).phone,
                                  "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                  type: "tel",
                                  placeholder: "+63 9XXX XXX XXX",
                                  class: { "border-destructive": unref(form).errors.phone }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$9, {
                                    message: unref(form).errors.phone
                                  }, null, 8, ["message"])
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("div", { class: "flex items-center gap-1.5" }, [
                                  isEmailLocked.value ? (openBlock(), createBlock(_sfc_main$b, {
                                    key: 0,
                                    content: "Verified email addresses cannot be changed."
                                  })) : createCommentVNode("", true),
                                  createVNode(unref(_sfc_main$7), { for: "email" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Email Address")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(unref(_sfc_main$a), {
                                  id: "email",
                                  modelValue: unref(form).email,
                                  "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                  type: "email",
                                  placeholder: "eg. username@example.com",
                                  disabled: isEmailLocked.value,
                                  class: { "border-destructive": unref(form).errors.email, "bg-muted opacity-80 cursor-not-allowed": isEmailLocked.value }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "class"]),
                                isEmailLocked.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-start gap-2 mt-2 p-2.5 rounded-lg border border-amber-200/60 bg-amber-50/50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400"
                                }, [
                                  createVNode(unref(AlertTriangle), { class: "w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" }),
                                  createVNode("p", { class: "text-xs leading-relaxed font-medium" }, " This email address is verified and cannot be modified to preserve account security. ")
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "min-h-[1.5rem]" }, [
                                  createVNode(_sfc_main$9, {
                                    message: unref(form).errors.email
                                  }, null, 8, ["message"])
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                              createVNode(unref(_sfc_main$8), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => {
                                  unref(form).reset();
                                  clearAvatar();
                                }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Undo Changes ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$8), {
                                type: "submit",
                                disabled: unref(form).processing
                              }, {
                                default: withCtx(() => [
                                  unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Saving...")) : (openBlock(), createBlock("span", { key: 1 }, "Save Changes"))
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
                          ], 32)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode("Edit Admin Account")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Modify account settings and permissions for this administrator.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", { class: "flex flex-col items-center justify-center pb-6 border-b border-border/40 gap-2" }, [
                            createVNode(unref(_sfc_main$7), { class: "text-sm font-medium text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Account Avatar")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex flex-col items-center justify-center gap-4" }, [
                              createVNode("div", { class: "relative group flex items-center justify-center" }, [
                                createVNode("div", { class: "w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 transition-colors flex items-center justify-center bg-muted/30" }, [
                                  imagePreview.value ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: imagePreview.value,
                                    alt: "Avatar preview",
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex flex-col items-center text-muted-foreground"
                                  }, [
                                    createVNode(unref(Camera), { class: "w-6 h-6 mb-1 stroke-[1.5]" }),
                                    createVNode("span", { class: "text-[10px]" }, "Upload")
                                  ]))
                                ]),
                                createVNode("input", {
                                  type: "file",
                                  accept: "image/*",
                                  class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full",
                                  onChange: handleAvatarChange
                                }, null, 32)
                              ]),
                              unref(form).avatar || imagePreview.value && imagePreview.value !== props.admin.avatar ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 0,
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                class: "text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10 h-8 gap-1 px-2",
                                onClick: clearAvatar
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Reset Avatar ")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "min-h-[1.5rem]" }, [
                              createVNode(_sfc_main$9, {
                                message: unref(form).errors.avatar
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Full Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                type: "text",
                                placeholder: "eg. John Doe",
                                class: { "border-destructive": unref(form).errors.name }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.name
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "display_name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Display Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "display_name",
                                modelValue: unref(form).display_name,
                                "onUpdate:modelValue": ($event) => unref(form).display_name = $event,
                                type: "text",
                                placeholder: "eg. Travel Agent",
                                class: { "border-destructive": unref(form).errors.display_name }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.display_name
                                }, null, 8, ["message"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "role" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$b, { content: "Admin: Full Access\nAgent: Partial Access" }),
                                  createTextVNode(" Access Level ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                modelValue: unref(form).role,
                                "onUpdate:modelValue": ($event) => unref(form).role = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), {
                                    id: "role",
                                    class: { "border-destructive": unref(form).errors.role }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { placeholder: "Select a role" })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$f), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$g), { value: "agent" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Agent")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$g), { value: "admin" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Admin")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.role
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("Phone Number")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                type: "tel",
                                placeholder: "+63 9XXX XXX XXX",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.phone
                                }, null, 8, ["message"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center gap-1.5" }, [
                                isEmailLocked.value ? (openBlock(), createBlock(_sfc_main$b, {
                                  key: 0,
                                  content: "Verified email addresses cannot be changed."
                                })) : createCommentVNode("", true),
                                createVNode(unref(_sfc_main$7), { for: "email" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Email Address")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(unref(_sfc_main$a), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "eg. username@example.com",
                                disabled: isEmailLocked.value,
                                class: { "border-destructive": unref(form).errors.email, "bg-muted opacity-80 cursor-not-allowed": isEmailLocked.value }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "class"]),
                              isEmailLocked.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-start gap-2 mt-2 p-2.5 rounded-lg border border-amber-200/60 bg-amber-50/50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400"
                              }, [
                                createVNode(unref(AlertTriangle), { class: "w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" }),
                                createVNode("p", { class: "text-xs leading-relaxed font-medium" }, " This email address is verified and cannot be modified to preserve account security. ")
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.email
                                }, null, 8, ["message"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                            createVNode(unref(_sfc_main$8), {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => {
                                unref(form).reset();
                                clearAvatar();
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Undo Changes ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$8), {
                              type: "submit",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Saving...")) : (openBlock(), createBlock("span", { key: 1 }, "Save Changes"))
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ], 32)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-1 flex-col gap-4 p-4 mx-auto w-full" }, [
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode("Edit Admin Account")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Modify account settings and permissions for this administrator.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", { class: "flex flex-col items-center justify-center pb-6 border-b border-border/40 gap-2" }, [
                            createVNode(unref(_sfc_main$7), { class: "text-sm font-medium text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Account Avatar")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex flex-col items-center justify-center gap-4" }, [
                              createVNode("div", { class: "relative group flex items-center justify-center" }, [
                                createVNode("div", { class: "w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 transition-colors flex items-center justify-center bg-muted/30" }, [
                                  imagePreview.value ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: imagePreview.value,
                                    alt: "Avatar preview",
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex flex-col items-center text-muted-foreground"
                                  }, [
                                    createVNode(unref(Camera), { class: "w-6 h-6 mb-1 stroke-[1.5]" }),
                                    createVNode("span", { class: "text-[10px]" }, "Upload")
                                  ]))
                                ]),
                                createVNode("input", {
                                  type: "file",
                                  accept: "image/*",
                                  class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full",
                                  onChange: handleAvatarChange
                                }, null, 32)
                              ]),
                              unref(form).avatar || imagePreview.value && imagePreview.value !== props.admin.avatar ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 0,
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                class: "text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10 h-8 gap-1 px-2",
                                onClick: clearAvatar
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(X), { class: "w-3.5 h-3.5" }),
                                  createTextVNode(" Reset Avatar ")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "min-h-[1.5rem]" }, [
                              createVNode(_sfc_main$9, {
                                message: unref(form).errors.avatar
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Full Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                type: "text",
                                placeholder: "eg. John Doe",
                                class: { "border-destructive": unref(form).errors.name }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.name
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "display_name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Display Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "display_name",
                                modelValue: unref(form).display_name,
                                "onUpdate:modelValue": ($event) => unref(form).display_name = $event,
                                type: "text",
                                placeholder: "eg. Travel Agent",
                                class: { "border-destructive": unref(form).errors.display_name }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.display_name
                                }, null, 8, ["message"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "role" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$b, { content: "Admin: Full Access\nAgent: Partial Access" }),
                                  createTextVNode(" Access Level ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                modelValue: unref(form).role,
                                "onUpdate:modelValue": ($event) => unref(form).role = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), {
                                    id: "role",
                                    class: { "border-destructive": unref(form).errors.role }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { placeholder: "Select a role" })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$f), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$g), { value: "agent" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Agent")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$g), { value: "admin" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Admin")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.role
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$7), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("Phone Number")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                type: "tel",
                                placeholder: "+63 9XXX XXX XXX",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.phone
                                }, null, 8, ["message"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center gap-1.5" }, [
                                isEmailLocked.value ? (openBlock(), createBlock(_sfc_main$b, {
                                  key: 0,
                                  content: "Verified email addresses cannot be changed."
                                })) : createCommentVNode("", true),
                                createVNode(unref(_sfc_main$7), { for: "email" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Email Address")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(unref(_sfc_main$a), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "eg. username@example.com",
                                disabled: isEmailLocked.value,
                                class: { "border-destructive": unref(form).errors.email, "bg-muted opacity-80 cursor-not-allowed": isEmailLocked.value }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "class"]),
                              isEmailLocked.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-start gap-2 mt-2 p-2.5 rounded-lg border border-amber-200/60 bg-amber-50/50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400"
                              }, [
                                createVNode(unref(AlertTriangle), { class: "w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" }),
                                createVNode("p", { class: "text-xs leading-relaxed font-medium" }, " This email address is verified and cannot be modified to preserve account security. ")
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "min-h-[1.5rem]" }, [
                                createVNode(_sfc_main$9, {
                                  message: unref(form).errors.email
                                }, null, 8, ["message"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                            createVNode(unref(_sfc_main$8), {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => {
                                unref(form).reset();
                                clearAvatar();
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Undo Changes ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$8), {
                              type: "submit",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Saving...")) : (openBlock(), createBlock("span", { key: 1 }, "Save Changes"))
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ], 32)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/user/admin/EditAdminAccount.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
