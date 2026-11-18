import { defineComponent, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EmployeeVerificationResult",
  __ssrInlineRender: true,
  props: {
    status: {},
    email: {}
  },
  setup(__props) {
    const props = __props;
    const statusConfig = computed(() => {
      switch (props.status) {
        case "success":
          return {
            title: "Email Verified",
            message: `Your email address <strong>${props.email}</strong> has been successfully verified. You can now access your account at Reliable International Travel Services Official Website.`,
            icon: "✅",
            color: "#16a34a"
            // Green
          };
        case "already_verified":
          return {
            title: "Email Already Verified",
            message: `The email address <strong>${props.email}</strong> has already been verified. Your account is already active, and no further action is required.`,
            icon: "ℹ️",
            color: "#2563eb"
            // Blue
          };
        case "expired":
          return {
            title: "Verification Link Expired",
            message: "This verification link has expired. Please log in again and request a new verification email to continue activating your account.",
            icon: "⏳",
            color: "#dc2626"
            // Red
          };
        default:
          return {
            title: "Something Went Wrong",
            message: "An unexpected error occurred while processing your verification request. Please try again later or contact support.",
            icon: "⚠️",
            color: "#ca8a04"
            // Amber
          };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Verification Result" }, null, _parent));
      _push(`<div class="flex min-h-screen items-center justify-center bg-zinc-100 p-6"><div class="w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"><div class="p-8 text-center text-white" style="${ssrRenderStyle({ backgroundColor: statusConfig.value.color })}"><div class="mb-4 text-5xl">${ssrInterpolate(statusConfig.value.icon)}</div><h1 class="text-2xl font-bold">${ssrInterpolate(statusConfig.value.title)}</h1></div><div class="p-8 text-center"><p class="leading-7 text-zinc-600">${statusConfig.value.message ?? ""}</p></div><div class="border-t border-zinc-200 bg-zinc-50 p-4 text-center text-xs text-zinc-500"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Reliable International Travel Services. All rights reserved. </div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/verification/employee/EmployeeVerificationResult.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
