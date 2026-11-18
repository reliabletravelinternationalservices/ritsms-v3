import { defineComponent, mergeProps, withCtx, unref, createTextVNode, openBlock, createBlock, createCommentVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$6 } from "./TextLink-s7m92cRE.js";
import { _ as _sfc_main$5 } from "../ssr.js";
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
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Create an account",
        description: "Enter your details below to create your account"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(`<form class="flex flex-col gap-6"${_scopeId}><div class="grid gap-6"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Name`);
                } else {
                  return [
                    createTextVNode("Name")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "name",
              type: "text",
              required: "",
              autofocus: "",
              tabindex: "1",
              autocomplete: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              placeholder: "Full name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
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
              tabindex: "2",
              autocomplete: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              placeholder: "email@example.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
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
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "password",
              type: "password",
              required: "",
              tabindex: "3",
              autocomplete: "new-password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              placeholder: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "password_confirmation" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Confirm password`);
                } else {
                  return [
                    createTextVNode("Confirm password")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "password_confirmation",
              type: "password",
              required: "",
              tabindex: "4",
              autocomplete: "new-password",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              placeholder: "Confirm password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              type: "submit",
              class: "mt-2 w-full",
              tabindex: "5",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(ssrRenderComponent(unref(LoaderCircle), { class: "h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Create account `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Create account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center text-sm text-muted-foreground"${_scopeId}> Already have an account? `);
            _push2(ssrRenderComponent(_sfc_main$6, {
              href: _ctx.route("admin.login"),
              class: "underline underline-offset-4",
              tabindex: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log in`);
                } else {
                  return [
                    createTextVNode("Log in")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Register" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "flex flex-col gap-6"
              }, [
                createVNode("div", { class: "grid gap-6" }, [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "name" }, {
                      default: withCtx(() => [
                        createTextVNode("Name")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "name",
                      type: "text",
                      required: "",
                      autofocus: "",
                      tabindex: "1",
                      autocomplete: "name",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      placeholder: "Full name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.name
                    }, null, 8, ["message"])
                  ]),
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
                      tabindex: "2",
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
                    createVNode(unref(_sfc_main$2), { for: "password" }, {
                      default: withCtx(() => [
                        createTextVNode("Password")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "password",
                      type: "password",
                      required: "",
                      tabindex: "3",
                      autocomplete: "new-password",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      placeholder: "Password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "password_confirmation" }, {
                      default: withCtx(() => [
                        createTextVNode("Confirm password")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "password_confirmation",
                      type: "password",
                      required: "",
                      tabindex: "4",
                      autocomplete: "new-password",
                      modelValue: unref(form).password_confirmation,
                      "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                      placeholder: "Confirm password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.password_confirmation
                    }, null, 8, ["message"])
                  ]),
                  createVNode(unref(_sfc_main$5), {
                    type: "submit",
                    class: "mt-2 w-full",
                    tabindex: "5",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                        key: 0,
                        class: "h-4 w-4 animate-spin"
                      })) : createCommentVNode("", true),
                      createTextVNode(" Create account ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                  createTextVNode(" Already have an account? "),
                  createVNode(_sfc_main$6, {
                    href: _ctx.route("admin.login"),
                    class: "underline underline-offset-4",
                    tabindex: 6
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Log in")
                    ]),
                    _: 1
                  }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
