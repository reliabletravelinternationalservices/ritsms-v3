import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$5 } from "./TextLink-s7m92cRE.js";
import { _ as _sfc_main$7 } from "../ssr.js";
import { _ as _sfc_main$6 } from "./Checkbox-DvuITVm1.js";
import { _ as _sfc_main$3 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$2 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$1 } from "./AuthLayout-BeA293hA.js";
import { useForm, Head } from "@inertiajs/vue3";
import { LoaderCircle } from "lucide-vue-next";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    status: {},
    canResetPassword: { type: Boolean }
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Log in to your account",
        description: "Enter your email and password below to log in"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 text-center text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="flex flex-col gap-6"${_scopeId}><div class="grid gap-6"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "email" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Email address`);
                } else {
                  return [
                    createTextVNode("Email address")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "email",
              type: "email",
              required: "",
              autofocus: "",
              tabindex: "1",
              autocomplete: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              placeholder: "email@example.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "password" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Password`);
                } else {
                  return [
                    createTextVNode("Password")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: _ctx.route("password.request"),
                class: "text-sm",
                tabindex: 5
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "password",
              type: "password",
              required: "",
              tabindex: "2",
              autocomplete: "current-password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              placeholder: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between" tabindex="3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              for: "remember",
              class: "flex items-center space-x-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "remember",
                    checked: unref(form).remember,
                    "onUpdate:checked": ($event) => unref(form).remember = $event,
                    tabindex: "4"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Remember me</span>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      id: "remember",
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event,
                      tabindex: "4"
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", null, "Remember me")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              type: "submit",
              class: "mt-4 w-full",
              tabindex: "4",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(ssrRenderComponent(unref(LoaderCircle), { class: "h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Log in `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Log in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-center text-sm font-medium text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "flex flex-col gap-6"
              }, [
                createVNode("div", { class: "grid gap-6" }, [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "email" }, {
                      default: withCtx(() => [
                        createTextVNode("Email address")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "email",
                      type: "email",
                      required: "",
                      autofocus: "",
                      tabindex: "1",
                      autocomplete: "email",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      placeholder: "email@example.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(unref(_sfc_main$2), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      __props.canResetPassword ? (openBlock(), createBlock(_sfc_main$5, {
                        key: 0,
                        href: _ctx.route("password.request"),
                        class: "text-sm",
                        tabindex: 5
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Forgot password? ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(_sfc_main$3), {
                      id: "password",
                      type: "password",
                      required: "",
                      tabindex: "2",
                      autocomplete: "current-password",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      placeholder: "Password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", {
                    class: "flex items-center justify-between",
                    tabindex: "3"
                  }, [
                    createVNode(unref(_sfc_main$2), {
                      for: "remember",
                      class: "flex items-center space-x-3"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), {
                          id: "remember",
                          checked: unref(form).remember,
                          "onUpdate:checked": ($event) => unref(form).remember = $event,
                          tabindex: "4"
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("span", null, "Remember me")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    type: "submit",
                    class: "mt-4 w-full",
                    tabindex: "4",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                        key: 0,
                        class: "h-4 w-4 animate-spin"
                      })) : createCommentVNode("", true),
                      createTextVNode(" Log in ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
