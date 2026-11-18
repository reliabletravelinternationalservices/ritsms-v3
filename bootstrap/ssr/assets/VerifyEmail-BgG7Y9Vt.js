import { defineComponent, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./TextLink-s7m92cRE.js";
import { _ as _sfc_main$2 } from "../ssr.js";
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
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const form = useForm({});
    const submit = () => {
      form.post(route("verification.send"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Verify email",
        description: "Please verify your email address by clicking on the link we just emailed to you."
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Email verification" }, null, _parent2, _scopeId));
            if (__props.status === "verification-link-sent") {
              _push2(`<div class="mb-4 text-center text-sm font-medium text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided during registration. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-6 text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              disabled: unref(form).processing,
              variant: "secondary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(ssrRenderComponent(unref(LoaderCircle), { class: "h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Resend verification email `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Resend verification email ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "mx-auto block text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log out `);
                } else {
                  return [
                    createTextVNode(" Log out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Email verification" }),
              __props.status === "verification-link-sent" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-center text-sm font-medium text-green-600"
              }, " A new verification link has been sent to the email address you provided during registration. ")) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-6 text-center"
              }, [
                createVNode(unref(_sfc_main$2), {
                  disabled: unref(form).processing,
                  variant: "secondary"
                }, {
                  default: withCtx(() => [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Resend verification email ")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("logout"),
                  method: "post",
                  as: "button",
                  class: "mx-auto block text-sm"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Log out ")
                  ]),
                  _: 1
                }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
