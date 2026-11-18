import { defineComponent, computed, mergeProps, withCtx, unref, createTextVNode, openBlock, createBlock, createCommentVNode, createVNode, withModifiers, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$6 } from "./TextLink-s7m92cRE.js";
import { _ as _sfc_main$5 } from "../ssr.js";
import { _ as _sfc_main$3 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$2 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$1 } from "./AuthLayout-BeA293hA.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { CheckCircle2, LoaderCircle } from "lucide-vue-next";
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
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const flash = computed(() => page.props.flash);
    const status = computed(() => {
      var _a;
      return ((_a = flash.value) == null ? void 0 : _a.message) ?? null;
    });
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("admin.forgot.password.send"), {
        preserveScroll: true,
        onSuccess: () => {
          form.reset("email");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Forgot password",
        description: "Enter your email to receive a password reset link"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Forgot password" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6"${_scopeId}><form${_scopeId}>`);
            if (status.value) {
              _push2(`<div class="mb-5 flex items-start gap-2.5 rounded-lg border border-emerald-200/60 bg-emerald-50/50 p-3 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-400"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500" }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm font-medium leading-relaxed"${_scopeId}>${ssrInterpolate(status.value)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid gap-2"${_scopeId}>`);
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
              name: "email",
              autocomplete: "off",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              autofocus: "",
              placeholder: "email@example.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="my-6 flex items-center justify-start"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              class: "w-full",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(ssrRenderComponent(unref(LoaderCircle), { class: "h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Email password reset link `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Email password reset link ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form><div class="space-x-1 text-center text-sm text-muted-foreground"${_scopeId}><span${_scopeId}>Or proceed to</span>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              href: _ctx.route("admin.login")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`log in`);
                } else {
                  return [
                    createTextVNode("log in")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Forgot password" }),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  status.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-5 flex items-start gap-2.5 rounded-lg border border-emerald-200/60 bg-emerald-50/50 p-3 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-400"
                  }, [
                    createVNode(unref(CheckCircle2), { class: "h-4 w-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500" }),
                    createVNode("p", { class: "text-sm font-medium leading-relaxed" }, toDisplayString(status.value), 1)
                  ])) : createCommentVNode("", true),
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
                      name: "email",
                      autocomplete: "off",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      autofocus: "",
                      placeholder: "email@example.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "my-6 flex items-center justify-start" }, [
                    createVNode(unref(_sfc_main$5), {
                      class: "w-full",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                          key: 0,
                          class: "h-4 w-4 animate-spin"
                        })) : createCommentVNode("", true),
                        createTextVNode(" Email password reset link ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ], 32),
                createVNode("div", { class: "space-x-1 text-center text-sm text-muted-foreground" }, [
                  createVNode("span", null, "Or proceed to"),
                  createVNode(_sfc_main$6, {
                    href: _ctx.route("admin.login")
                  }, {
                    default: withCtx(() => [
                      createTextVNode("log in")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
