import { defineComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import { Head } from "@inertiajs/vue3";
import { Icon } from "@iconify/vue";
import "@headlessui/vue";
import "../ssr.js";
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
import "ziggy-js";
import "./AppLogoIcon-B2fdtLWF.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InquiryResult",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Successfully Submitted" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="w-full py-16 px-4 md:py-32 md:px-8 bg-[var(--primary-custom)] min-h-[calc(100vh-80px)] flex items-center justify-center"${_scopeId}><div class="max-w-3xl mx-auto bg-[var(--primary-custom)] rounded-md h-auto w-full"${_scopeId}><div class="flex flex-col items-center justify-center mb-6 md:mb-8"${_scopeId}><span class="bg-[var(--shadow-custom)] p-2 rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "material-symbols:send",
              width: "36",
              height: "36",
              class: "text-[var(--correct-custom)]"
            }, null, _parent2, _scopeId));
            _push2(`</span><h2 class="text-base md:text-xl text-[var(--correct-custom)] font-roboto mt-2"${_scopeId}>Inquiry Received</h2></div><div class="flex flex-col items-center justify-center text-center"${_scopeId}><h1 class="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase tracking-wide leading-tight"${_scopeId}> Thank you for reaching out to us! </h1><p class="font-roboto text-sm md:text-base text-[var(--muted-custom)] max-w-xl mx-auto mt-4 leading-relaxed"${_scopeId}> We have received your inquiry and our team will get back to you as soon as possible. If you have any urgent concerns, please feel free to contact us directly at <a href="mailto:reliabletravelinfo@gmail.com" class="font-bold underline break-all hover:text-[var(--secondary-custom)] transition-colors"${_scopeId}> reliabletravelinfo@gmail.com </a>. </p></div><div class="flex items-center justify-center mt-8"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("client.landing"))} class="w-full sm:w-auto text-center px-6 py-3 bg-[var(--secondary-custom)] text-white font-medium rounded-md hover:bg-[var(--tertiary-custom)] transition duration-300 shadow-sm"${_scopeId}> Back to Home </a></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "w-full py-16 px-4 md:py-32 md:px-8 bg-[var(--primary-custom)] min-h-[calc(100vh-80px)] flex items-center justify-center" }, [
                createVNode("div", { class: "max-w-3xl mx-auto bg-[var(--primary-custom)] rounded-md h-auto w-full" }, [
                  createVNode("div", { class: "flex flex-col items-center justify-center mb-6 md:mb-8" }, [
                    createVNode("span", { class: "bg-[var(--shadow-custom)] p-2 rounded-full" }, [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:send",
                        width: "36",
                        height: "36",
                        class: "text-[var(--correct-custom)]"
                      })
                    ]),
                    createVNode("h2", { class: "text-base md:text-xl text-[var(--correct-custom)] font-roboto mt-2" }, "Inquiry Received")
                  ]),
                  createVNode("div", { class: "flex flex-col items-center justify-center text-center" }, [
                    createVNode("h1", { class: "text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase tracking-wide leading-tight" }, " Thank you for reaching out to us! "),
                    createVNode("p", { class: "font-roboto text-sm md:text-base text-[var(--muted-custom)] max-w-xl mx-auto mt-4 leading-relaxed" }, [
                      createTextVNode(" We have received your inquiry and our team will get back to you as soon as possible. If you have any urgent concerns, please feel free to contact us directly at "),
                      createVNode("a", {
                        href: "mailto:reliabletravelinfo@gmail.com",
                        class: "font-bold underline break-all hover:text-[var(--secondary-custom)] transition-colors"
                      }, " reliabletravelinfo@gmail.com "),
                      createTextVNode(". ")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-center mt-8" }, [
                    createVNode("a", {
                      href: _ctx.route("client.landing"),
                      class: "w-full sm:w-auto text-center px-6 py-3 bg-[var(--secondary-custom)] text-white font-medium rounded-md hover:bg-[var(--tertiary-custom)] transition duration-300 shadow-sm"
                    }, " Back to Home ", 8, ["href"])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/message/InquiryResult.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
