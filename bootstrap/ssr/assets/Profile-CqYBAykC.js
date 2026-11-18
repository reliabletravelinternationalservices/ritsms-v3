import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext, withModifiers, openBlock, createBlock, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { TransitionRoot } from "@headlessui/vue";
import { useForm, usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$c } from "./InputError-BhTWS2NZ.js";
import { h as _sfc_main$3, r as _sfc_main$4, _ as _sfc_main$5, i as _sfc_main$6, j as _sfc_main$7, k as _sfc_main$8, n as _sfc_main$9, e as _sfc_main$d, u as _sfc_main$e } from "../ssr.js";
import { _ as _sfc_main$b } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$a } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$f } from "./AppLayout-CSZsNKr7.js";
import { _ as _sfc_main$g } from "./Layout-BQS3kTSn.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "lucide-vue-next";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "@iconify/vue";
import "./TooltipTrigger-B2yyxzkT.js";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "./index-xORXC0Yx.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteUser",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const deleteUser = (e) => {
      e.preventDefault();
      form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => {
          var _a;
          return (_a = passwordInput.value) == null ? void 0 : _a.focus();
        },
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      form.clearErrors();
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        title: "Delete account",
        description: "Delete your account and all of its resources"
      }, null, _parent));
      _push(`<div class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"><div class="relative space-y-0.5 text-red-600 dark:text-red-100"><p class="font-medium">Warning</p><p class="text-sm">Please proceed with caution, this cannot be undone.</p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { variant: "destructive" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Delete account`);
                      } else {
                        return [
                          createTextVNode("Delete account")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { variant: "destructive" }, {
                      default: withCtx(() => [
                        createTextVNode("Delete account")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Are you sure you want to delete your account?`);
                            } else {
                              return [
                                createTextVNode("Are you sure you want to delete your account?")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. `);
                            } else {
                              return [
                                createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Are you sure you want to delete your account?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    for: "password",
                    class: "sr-only"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    id: "password",
                    type: "password",
                    name: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    placeholder: "Password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$c, {
                    message: unref(form).errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$5), {
                                variant: "secondary",
                                onClick: closeModal
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
                                createVNode(unref(_sfc_main$5), {
                                  variant: "secondary",
                                  onClick: closeModal
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cancel ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          variant: "destructive",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button type="submit"${_scopeId4}>Delete account</button>`);
                            } else {
                              return [
                                createVNode("button", { type: "submit" }, "Delete account")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), {
                                variant: "secondary",
                                onClick: closeModal
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cancel ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            variant: "destructive",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createVNode("button", { type: "submit" }, "Delete account")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode("form", {
                      class: "space-y-6",
                      onSubmit: deleteUser
                    }, [
                      createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Are you sure you want to delete your account?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$a), {
                          for: "password",
                          class: "sr-only"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), {
                          id: "password",
                          type: "password",
                          name: "password",
                          ref_key: "passwordInput",
                          ref: passwordInput,
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          placeholder: "Password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$c, {
                          message: unref(form).errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), {
                                variant: "secondary",
                                onClick: closeModal
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cancel ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            variant: "destructive",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createVNode("button", { type: "submit" }, "Delete account")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { variant: "destructive" }, {
                    default: withCtx(() => [
                      createTextVNode("Delete account")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("form", {
                    class: "space-y-6",
                    onSubmit: deleteUser
                  }, [
                    createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Are you sure you want to delete your account?")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$a), {
                        for: "password",
                        class: "sr-only"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), {
                        id: "password",
                        type: "password",
                        name: "password",
                        ref_key: "passwordInput",
                        ref: passwordInput,
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        placeholder: "Password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$c, {
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode(unref(_sfc_main$d), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), {
                              variant: "secondary",
                              onClick: closeModal
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          variant: "destructive",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createVNode("button", { type: "submit" }, "Delete account")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ], 32)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/DeleteUser.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: { type: Boolean },
    status: {},
    className: {}
  },
  setup(__props) {
    const breadcrumbs = [
      {
        title: "Profile settings",
        href: "/settings/profile"
      }
    ];
    const page = usePage();
    const user = page.props.auth.user;
    const form = useForm({
      name: user.name,
      email: user.email
    });
    const submit = () => {
      form.patch(route("profile.update"), {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$f, mergeProps({ breadcrumbs }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Profile settings" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$g, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    title: "Profile information",
                    description: "Update your name and email address"
                  }, null, _parent3, _scopeId2));
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { for: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    id: "name",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    required: "",
                    autocomplete: "name",
                    placeholder: "Full name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$c, {
                    class: "mt-2",
                    message: unref(form).errors.name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { for: "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email address`);
                      } else {
                        return [
                          createTextVNode("Email address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autocomplete: "username",
                    placeholder: "Email address"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$c, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (__props.mustVerifyEmail && !unref(user).email_verified_at) {
                    _push3(`<div${_scopeId2}><p class="mt-2 text-sm text-neutral-800"${_scopeId2}> Your email address is unverified. `);
                    _push3(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("verification.send"),
                      method: "post",
                      as: "button",
                      class: "focus:outline-hidden rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Click here to re-send the verification email. `);
                        } else {
                          return [
                            createTextVNode(" Click here to re-send the verification email. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</p>`);
                    if (__props.status === "verification-link-sent") {
                      _push3(`<div class="mt-2 text-sm font-medium text-green-600"${_scopeId2}> A new verification link has been sent to your email address. </div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save`);
                      } else {
                        return [
                          createTextVNode("Save")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TransitionRoot), {
                    show: unref(form).recentlySuccessful,
                    enter: "transition ease-in-out",
                    "enter-from": "opacity-0",
                    leave: "transition ease-in-out",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="text-sm text-neutral-600"${_scopeId3}>Saved.</p>`);
                      } else {
                        return [
                          createVNode("p", { class: "text-sm text-neutral-600" }, "Saved.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form></div>`);
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col space-y-6" }, [
                      createVNode(_sfc_main$2, {
                        title: "Profile information",
                        description: "Update your name and email address"
                      }),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$a), { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "name",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            required: "",
                            autocomplete: "name",
                            placeholder: "Full name"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$c, {
                            class: "mt-2",
                            message: unref(form).errors.name
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$a), { for: "email" }, {
                            default: withCtx(() => [
                              createTextVNode("Email address")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "email",
                            type: "email",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            required: "",
                            autocomplete: "username",
                            placeholder: "Email address"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$c, {
                            class: "mt-2",
                            message: unref(form).errors.email
                          }, null, 8, ["message"])
                        ]),
                        __props.mustVerifyEmail && !unref(user).email_verified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "mt-2 text-sm text-neutral-800" }, [
                            createTextVNode(" Your email address is unverified. "),
                            createVNode(unref(Link), {
                              href: _ctx.route("verification.send"),
                              method: "post",
                              as: "button",
                              class: "focus:outline-hidden rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Click here to re-send the verification email. ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          __props.status === "verification-link-sent" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm font-medium text-green-600"
                          }, " A new verification link has been sent to your email address. ")) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(unref(_sfc_main$5), {
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(TransitionRoot), {
                            show: unref(form).recentlySuccessful,
                            enter: "transition ease-in-out",
                            "enter-from": "opacity-0",
                            leave: "transition ease-in-out",
                            "leave-to": "opacity-0"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-sm text-neutral-600" }, "Saved.")
                            ]),
                            _: 1
                          }, 8, ["show"])
                        ])
                      ], 32)
                    ]),
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Profile settings" }),
              createVNode(_sfc_main$g, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col space-y-6" }, [
                    createVNode(_sfc_main$2, {
                      title: "Profile information",
                      description: "Update your name and email address"
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$a), { for: "name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), {
                          id: "name",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          required: "",
                          autocomplete: "name",
                          placeholder: "Full name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$c, {
                          class: "mt-2",
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$a), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email address")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), {
                          id: "email",
                          type: "email",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          required: "",
                          autocomplete: "username",
                          placeholder: "Email address"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$c, {
                          class: "mt-2",
                          message: unref(form).errors.email
                        }, null, 8, ["message"])
                      ]),
                      __props.mustVerifyEmail && !unref(user).email_verified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", { class: "mt-2 text-sm text-neutral-800" }, [
                          createTextVNode(" Your email address is unverified. "),
                          createVNode(unref(Link), {
                            href: _ctx.route("verification.send"),
                            method: "post",
                            as: "button",
                            class: "focus:outline-hidden rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Click here to re-send the verification email. ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ]),
                        __props.status === "verification-link-sent" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm font-medium text-green-600"
                        }, " A new verification link has been sent to your email address. ")) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode(unref(_sfc_main$5), {
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(unref(TransitionRoot), {
                          show: unref(form).recentlySuccessful,
                          enter: "transition ease-in-out",
                          "enter-from": "opacity-0",
                          leave: "transition ease-in-out",
                          "leave-to": "opacity-0"
                        }, {
                          default: withCtx(() => [
                            createVNode("p", { class: "text-sm text-neutral-600" }, "Saved.")
                          ]),
                          _: 1
                        }, 8, ["show"])
                      ])
                    ], 32)
                  ]),
                  createVNode(_sfc_main$1)
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
