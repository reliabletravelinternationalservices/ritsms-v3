import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$6 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { _ as _sfc_main$2 } from "./Layout-BQS3kTSn.js";
import { TransitionRoot } from "@headlessui/vue";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$7 } from "../ssr.js";
import { _ as _sfc_main$5 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$4 } from "./Label-6hRdN-Dm.js";
import "class-variance-authority";
import "radix-vue";
import "lucide-vue-next";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Password",
  __ssrInlineRender: true,
  props: {
    className: {}
  },
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Password settings",
        href: "/settings/password"
      }
    ];
    const passwordInput = ref();
    const currentPasswordInput = ref();
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const updatePassword = () => {
      form.put(route("password.update"), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: (errors) => {
          if (errors.password) {
            form.reset("password", "password_confirmation");
            if (passwordInput.value instanceof HTMLInputElement) {
              passwordInput.value.focus();
            }
          }
          if (errors.current_password) {
            form.reset("current_password");
            if (currentPasswordInput.value instanceof HTMLInputElement) {
              currentPasswordInput.value.focus();
            }
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Profile settings" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Update password",
                    description: "Ensure your account is using a long, random password to stay secure"
                  }, null, _parent3, _scopeId2));
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "current_password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Current Password`);
                      } else {
                        return [
                          createTextVNode("Current Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "current_password",
                    ref_key: "currentPasswordInput",
                    ref: currentPasswordInput,
                    modelValue: unref(form).current_password,
                    "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    autocomplete: "current-password",
                    placeholder: "Current password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.current_password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`New password`);
                      } else {
                        return [
                          createTextVNode("New password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    autocomplete: "new-password",
                    placeholder: "New password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "password_confirmation" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirm password`);
                      } else {
                        return [
                          createTextVNode("Confirm password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    autocomplete: "new-password",
                    placeholder: "Confirm password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.password_confirmation
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save password`);
                      } else {
                        return [
                          createTextVNode("Save password")
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
                        _push4(`<p class="text-sm text-neutral-600"${_scopeId3}>Saved</p>`);
                      } else {
                        return [
                          createVNode("p", { class: "text-sm text-neutral-600" }, "Saved")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_sfc_main$3, {
                        title: "Update password",
                        description: "Ensure your account is using a long, random password to stay secure"
                      }),
                      createVNode("form", {
                        onSubmit: withModifiers(updatePassword, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "current_password" }, {
                            default: withCtx(() => [
                              createTextVNode("Current Password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "current_password",
                            ref_key: "currentPasswordInput",
                            ref: currentPasswordInput,
                            modelValue: unref(form).current_password,
                            "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "current-password",
                            placeholder: "Current password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.current_password
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password" }, {
                            default: withCtx(() => [
                              createTextVNode("New password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password",
                            ref_key: "passwordInput",
                            ref: passwordInput,
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "new-password",
                            placeholder: "New password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.password
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                            default: withCtx(() => [
                              createTextVNode("Confirm password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password_confirmation",
                            modelValue: unref(form).password_confirmation,
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "new-password",
                            placeholder: "Confirm password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.password_confirmation
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(unref(_sfc_main$7), {
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save password")
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
                              createVNode("p", { class: "text-sm text-neutral-600" }, "Saved")
                            ]),
                            _: 1
                          }, 8, ["show"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Profile settings" }),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$3, {
                      title: "Update password",
                      description: "Ensure your account is using a long, random password to stay secure"
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(updatePassword, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$4), { for: "current_password" }, {
                          default: withCtx(() => [
                            createTextVNode("Current Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "current_password",
                          ref_key: "currentPasswordInput",
                          ref: currentPasswordInput,
                          modelValue: unref(form).current_password,
                          "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "current-password",
                          placeholder: "Current password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.current_password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$4), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("New password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "password",
                          ref_key: "passwordInput",
                          ref: passwordInput,
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "new-password",
                          placeholder: "New password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                          default: withCtx(() => [
                            createTextVNode("Confirm password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "new-password",
                          placeholder: "Confirm password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.password_confirmation
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode(unref(_sfc_main$7), {
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save password")
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
                            createVNode("p", { class: "text-sm text-neutral-600" }, "Saved")
                          ]),
                          _: 1
                        }, 8, ["show"])
                      ])
                    ], 32)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/Password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
