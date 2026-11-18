import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { a as AGENCY_CONTACTS } from "./constants-D5Z3FOm2.js";
/* empty css                  */
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$2 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$4 } from "./Textarea-BvWBAMsq.js";
import { _ as _sfc_main$5 } from "../ssr.js";
import { LoaderCircle } from "lucide-vue-next";
import { _ as _sfc_main$3 } from "./InputError-BhTWS2NZ.js";
import { useForm } from "@inertiajs/vue3";
import "radix-vue";
import "@vueuse/core";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "vue-sonner";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InquiryForm",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      fullname: "",
      email: "",
      phone: "",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "inquiry",
        class: ["relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center py-24 px-4 md:px-6", props.class]
      }, _attrs))}><div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6"><div class="w-full md:w-3/4 space-y-2"><div class="flex items-end gap-1 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ix:inquiry-filled",
        width: "28",
        height: "28",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-lg md:text-xl">INQUIRE NOW</p></div><div class="space-y-3"><h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold"> Contact Reliable International Travel Services </h2><p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]"> Ready to explore the world? Contact our travel agency for bookings, inquiries, or personalized travel planning. Our dedicated support team is ready to assist with every step of your journey. </p></div></div></div><div class="w-full flex flex-col lg:flex-row gap-8"><div class="w-full flex flex-col gap-4"><div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2"><h3 class="font-bold font-roboto text-lg md:text-xl">Satellite Address</h3><address class="flex flex-col gap-2 not-italic"><span class="flex items-center justify-start gap-2"><span class="bg-[var(--secondary-custom)] p-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:location",
        width: "24",
        height: "24",
        class: "md:w-5 md:h-5 text-[var(--tertiary-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><a target="_blank"${ssrRenderAttr("href", unref(AGENCY_CONTACTS).address.primary.link)}${ssrRenderAttr("aria-label", `View ${unref(AGENCY_CONTACTS).address.primary.label} office address on Google Maps`)} class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">${ssrInterpolate(unref(AGENCY_CONTACTS).address.primary.label)}</a></span><span class="flex items-center justify-start gap-2"><span class="bg-[var(--secondary-custom)] p-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:location",
        width: "24",
        height: "24",
        class: "md:w-5 md:h-5 text-[var(--tertiary-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><a target="_blank"${ssrRenderAttr("href", unref(AGENCY_CONTACTS).address.secondary.link)}${ssrRenderAttr("aria-label", `View ${unref(AGENCY_CONTACTS).address.secondary.label} office address on Google Maps`)} class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">${ssrInterpolate(unref(AGENCY_CONTACTS).address.secondary.label)}</a></span></address></div><div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2"><h3 class="font-bold font-roboto text-lg md:text-xl">Contact Information</h3><span class="flex items-center justify-start gap-2"><span class="bg-[var(--secondary-custom)] p-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:call",
        width: "24",
        height: "24",
        class: "md:w-5 md:h-5 text-[var(--tertiary-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><a${ssrRenderAttr("href", `tel:${unref(AGENCY_CONTACTS).phone.primary}`)}${ssrRenderAttr("aria-label", `Call ${unref(AGENCY_CONTACTS).phone.primary}`)} class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">${ssrInterpolate(unref(AGENCY_CONTACTS).phone.primary)}</a></span><span class="flex items-center justify-start gap-2"><span class="bg-[var(--secondary-custom)] p-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:call",
        width: "24",
        height: "24",
        class: "md:w-5 md:h-5 text-[var(--tertiary-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><a${ssrRenderAttr("href", `tel:${unref(AGENCY_CONTACTS).phone.secondary}`)}${ssrRenderAttr("aria-label", `Call ${unref(AGENCY_CONTACTS).phone.secondary}`)} class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">${ssrInterpolate(unref(AGENCY_CONTACTS).phone.secondary)}</a></span></div><div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2"><h3 class="font-bold font-roboto text-lg md:text-xl">Email Address</h3><span class="flex items-center justify-start gap-2"><span class="bg-[var(--secondary-custom)] p-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-email",
        width: "24",
        height: "24",
        class: "md:w-5 md:h-5 text-[var(--tertiary-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><a${ssrRenderAttr("href", `mailto:${unref(AGENCY_CONTACTS).email.primary}`)}${ssrRenderAttr("aria-label", `Send an email to ${unref(AGENCY_CONTACTS).email.primary}`)} class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">${ssrInterpolate(unref(AGENCY_CONTACTS).email.primary)}</a></span><span class="flex items-center justify-start gap-2"><span class="bg-[var(--secondary-custom)] p-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-email",
        width: "24",
        height: "24",
        class: "md:w-5 md:h-5 text-[var(--tertiary-custom)]",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><a${ssrRenderAttr("href", `mailto:${unref(AGENCY_CONTACTS).email.secondary}`)}${ssrRenderAttr("aria-label", `Send an email to ${unref(AGENCY_CONTACTS).email.secondary}`)} class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">${ssrInterpolate(unref(AGENCY_CONTACTS).email.secondary)}</a></span></div></div><div class="w-full lg:w-3/4 border border-[var(--shadow-custom)] p-6 flex flex-col gap-2"><h3 class="font-bold font-roboto text-lg md:text-xl">Ask us About your Travel?</h3><form class="flex flex-col gap-2"><div class="space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "name",
        class: "font-roboto text-[var(--muted-custom)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Fullname <span class="text-[var(--warning-custom)]"${_scopeId}>*</span>`);
          } else {
            return [
              createTextVNode(" Fullname "),
              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).fullname,
        "onUpdate:modelValue": ($event) => unref(form).fullname = $event,
        type: "text",
        id: "name",
        placeholder: "Enter your full name",
        class: "bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.fullname
      }, null, _parent));
      _push(`</div><div class="space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "email",
        class: "font-roboto text-[var(--muted-custom)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Email <span class="text-[var(--warning-custom)]"${_scopeId}>*</span>`);
          } else {
            return [
              createTextVNode(" Email "),
              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        type: "email",
        id: "email",
        placeholder: "Enter your email address",
        class: "bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "phone",
        class: "font-roboto text-[var(--muted-custom)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Phone number (Optional) `);
          } else {
            return [
              createTextVNode(" Phone number (Optional) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).phone,
        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
        type: "tel",
        id: "phone",
        placeholder: "Enter your phone number",
        class: "bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.phone
      }, null, _parent));
      _push(`</div><div class="space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "message",
        class: "font-roboto text-[var(--muted-custom)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Message <span class="text-[var(--warning-custom)]"${_scopeId}>*</span>`);
          } else {
            return [
              createTextVNode(" Message "),
              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: unref(form).message,
        "onUpdate:modelValue": ($event) => unref(form).message = $event,
        id: "message",
        rows: "3",
        placeholder: "Tell us about your concern...",
        class: "bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.message
      }, null, _parent));
      _push(`</div><div><a${ssrRenderAttr("href", _ctx.route("client.inquiry.policy"))} target="_blank" class="flex items-center gap-1"><span class="text-xs md:text-sm font-roboto text-[var(--tag-custom)] underline italic"> Why do we need your information? </span></a></div><div class="w-full flex justify-end">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        type: "submit",
        disabled: unref(form).processing,
        class: "bg-[var(--secondary-custom)] text-[var(--primary-custom)] py-2 px-4 hover:bg-[var(--tertiary-custom)] duration-75 ease-in rounded-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(form).processing) {
              _push2(ssrRenderComponent(unref(LoaderCircle), { class: "h-4 w-4 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` Send Message `);
          } else {
            return [
              unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                key: 0,
                class: "h-4 w-4 animate-spin"
              })) : createCommentVNode("", true),
              createTextVNode(" Send Message ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/InquiryForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
