import { defineComponent, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import { Icon } from "@iconify/vue";
import "@headlessui/vue";
import "../ssr.js";
import "@vue/server-renderer";
import "@inertiajs/vue3";
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
  __name: "InquiryPolicy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-3xl mx-auto px-4 py-12 text-zinc-800 dark:text-zinc-200"${_scopeId}><div class="text-center mb-10"${_scopeId}><div class="inline-block p-3 rounded-full bg-indigo-50 text-[var(--tag-custom)] mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "streamline-plump:user-protection-check",
              width: "24",
              height: "24",
              class: "md:w-10 md:h-10",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl"${_scopeId}> Why We Ask for Your Information </h1><p class="text-sm text-zinc-800 dark:text-zinc-400 mt-2 max-w-xl mx-auto"${_scopeId}> We keep our process transparent. Here is exactly why your details are necessary when you send us a message. </p></div><div class="space-y-6"${_scopeId}><div class="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm"${_scopeId}><h2 class="text-base font-semibold text-zinc-900 mb-2 flex items-center gap-2"${_scopeId}><span${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "ic:baseline-message",
              width: "24",
              height: "24",
              class: "md:w-5 md:h-5 text-[var(--tag-custom)]",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`</span> To Respond to Your Inquiries </h2><p class="text-sm text-zinc-800 leading-relaxed"${_scopeId}> We collect your contact information solely to respond to your inquiries and provide the travel assistance you requested. Your email address and phone number allow our travel consultants to send quotations, customized itineraries, booking details, and important travel updates related to your request. </p></div><div class="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm"${_scopeId}><h2 class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800 mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "mdi:message-check",
              width: "24",
              height: "24",
              class: "md:w-5 md:h-5 text-[var(--tag-custom)]",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` What We Collect &amp; How We Use It </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm"${_scopeId}><div class="p-3 rounded-lg bg-zinc-100"${_scopeId}><span class="font-semibold text-zinc-900"${_scopeId}>Full Name</span><p class="text-xs text-zinc-800 mt-0.5"${_scopeId}>So we know who we are addressing in our replies.</p></div><div class="p-3 rounded-lg bg-zinc-100"${_scopeId}><span class="font-semibold text-zinc-900"${_scopeId}>Email Address</span><p class="text-xs text-zinc-800 mt-0.5"${_scopeId}>The primary inbox where we will send your travel options and quotes.</p></div><div class="p-3 rounded-lg bg-zinc-100"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}><span class="font-semibold text-zinc-900"${_scopeId}>Phone Number</span><span class="text-[10px] px-1 bg-zinc-300 rounded text-zinc-600"${_scopeId}>Optional</span></div><p class="text-xs text-zinc-800 mt-0.5"${_scopeId}>Used only if you want an instant callback or text update.</p></div><div class="p-3 rounded-lg bg-zinc-100"${_scopeId}><span class="font-semibold text-zinc-900"${_scopeId}>Your Message</span><p class="text-xs text-zinc-800 mt-0.5"${_scopeId}>Your specific questions, destinations, or travel budgets.</p></div></div></div><div class="bg-indigo-50/40 border border-indigo-100 rounded-xl p-5 flex items-start gap-3"${_scopeId}><span class="text-lg mt-0.5" aria-hidden="true"${_scopeId}>⚖️</span><div${_scopeId}><h2 class="text-xs font-bold text-zinc-900 uppercase tracking-wide"${_scopeId}>Data Privacy Act of 2012 (R.A. 10173)</h2><p class="text-xs text-zinc-600 leading-relaxed mt-1"${_scopeId}> We are committed to operating transparently and keeping your trust. In absolute compliance with the <span class="font-semibold"${_scopeId}>Philippine Republic Act No. 10173</span>, your secure personal data metrics are never sold, shared, or distributed to third-party ad networks. It remains entirely confidential. </p></div></div><div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"${_scopeId}><div${_scopeId}><h2 class="text-sm font-semibold text-zinc-900"${_scopeId}>Still Have Doubts About Our Credentials?</h2><p class="text-xs text-zinc-500 dark:text-zinc-600"${_scopeId}>Verify our business details or read community reviews.</p></div><div class="flex items-center gap-2 w-full sm:w-auto"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("client.about"))} class="text-center w-1/2 sm:w-auto text-xs font-medium px-3 py-2 border border-zinc-300 hover:bg-zinc-200 rounded-md transition text-[var(--secondary-custom)]"${_scopeId}> Learn More About Us </a><a href="https://www.facebook.com/reliableinternationaltravelservices" target="_blank" rel="noopener noreferrer" class="text-center w-1/2 sm:w-auto text-xs font-medium px-3 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-md shadow-sm transition"${_scopeId}> Our Facebook Page </a></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-3xl mx-auto px-4 py-12 text-zinc-800 dark:text-zinc-200" }, [
                createVNode("div", { class: "text-center mb-10" }, [
                  createVNode("div", { class: "inline-block p-3 rounded-full bg-indigo-50 text-[var(--tag-custom)] mb-3" }, [
                    createVNode(unref(Icon), {
                      icon: "streamline-plump:user-protection-check",
                      width: "24",
                      height: "24",
                      class: "md:w-10 md:h-10",
                      "aria-hidden": "true"
                    })
                  ]),
                  createVNode("h1", { class: "text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl" }, " Why We Ask for Your Information "),
                  createVNode("p", { class: "text-sm text-zinc-800 dark:text-zinc-400 mt-2 max-w-xl mx-auto" }, " We keep our process transparent. Here is exactly why your details are necessary when you send us a message. ")
                ]),
                createVNode("div", { class: "space-y-6" }, [
                  createVNode("div", { class: "bg-white p-6 rounded-xl border border-zinc-200 shadow-sm" }, [
                    createVNode("h2", { class: "text-base font-semibold text-zinc-900 mb-2 flex items-center gap-2" }, [
                      createVNode("span", null, [
                        createVNode(unref(Icon), {
                          icon: "ic:baseline-message",
                          width: "24",
                          height: "24",
                          class: "md:w-5 md:h-5 text-[var(--tag-custom)]",
                          "aria-hidden": "true"
                        })
                      ]),
                      createTextVNode(" To Respond to Your Inquiries ")
                    ]),
                    createVNode("p", { class: "text-sm text-zinc-800 leading-relaxed" }, " We collect your contact information solely to respond to your inquiries and provide the travel assistance you requested. Your email address and phone number allow our travel consultants to send quotations, customized itineraries, booking details, and important travel updates related to your request. ")
                  ]),
                  createVNode("div", { class: "bg-white p-6 rounded-xl border border-zinc-200 shadow-sm" }, [
                    createVNode("h2", { class: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800 mb-4" }, [
                      createVNode(unref(Icon), {
                        icon: "mdi:message-check",
                        width: "24",
                        height: "24",
                        class: "md:w-5 md:h-5 text-[var(--tag-custom)]",
                        "aria-hidden": "true"
                      }),
                      createTextVNode(" What We Collect & How We Use It ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm" }, [
                      createVNode("div", { class: "p-3 rounded-lg bg-zinc-100" }, [
                        createVNode("span", { class: "font-semibold text-zinc-900" }, "Full Name"),
                        createVNode("p", { class: "text-xs text-zinc-800 mt-0.5" }, "So we know who we are addressing in our replies.")
                      ]),
                      createVNode("div", { class: "p-3 rounded-lg bg-zinc-100" }, [
                        createVNode("span", { class: "font-semibold text-zinc-900" }, "Email Address"),
                        createVNode("p", { class: "text-xs text-zinc-800 mt-0.5" }, "The primary inbox where we will send your travel options and quotes.")
                      ]),
                      createVNode("div", { class: "p-3 rounded-lg bg-zinc-100" }, [
                        createVNode("div", { class: "flex items-center gap-1.5" }, [
                          createVNode("span", { class: "font-semibold text-zinc-900" }, "Phone Number"),
                          createVNode("span", { class: "text-[10px] px-1 bg-zinc-300 rounded text-zinc-600" }, "Optional")
                        ]),
                        createVNode("p", { class: "text-xs text-zinc-800 mt-0.5" }, "Used only if you want an instant callback or text update.")
                      ]),
                      createVNode("div", { class: "p-3 rounded-lg bg-zinc-100" }, [
                        createVNode("span", { class: "font-semibold text-zinc-900" }, "Your Message"),
                        createVNode("p", { class: "text-xs text-zinc-800 mt-0.5" }, "Your specific questions, destinations, or travel budgets.")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-indigo-50/40 border border-indigo-100 rounded-xl p-5 flex items-start gap-3" }, [
                    createVNode("span", {
                      class: "text-lg mt-0.5",
                      "aria-hidden": "true"
                    }, "⚖️"),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xs font-bold text-zinc-900 uppercase tracking-wide" }, "Data Privacy Act of 2012 (R.A. 10173)"),
                      createVNode("p", { class: "text-xs text-zinc-600 leading-relaxed mt-1" }, [
                        createTextVNode(" We are committed to operating transparently and keeping your trust. In absolute compliance with the "),
                        createVNode("span", { class: "font-semibold" }, "Philippine Republic Act No. 10173"),
                        createTextVNode(", your secure personal data metrics are never sold, shared, or distributed to third-party ad networks. It remains entirely confidential. ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-sm font-semibold text-zinc-900" }, "Still Have Doubts About Our Credentials?"),
                      createVNode("p", { class: "text-xs text-zinc-500 dark:text-zinc-600" }, "Verify our business details or read community reviews.")
                    ]),
                    createVNode("div", { class: "flex items-center gap-2 w-full sm:w-auto" }, [
                      createVNode("a", {
                        href: _ctx.route("client.about"),
                        class: "text-center w-1/2 sm:w-auto text-xs font-medium px-3 py-2 border border-zinc-300 hover:bg-zinc-200 rounded-md transition text-[var(--secondary-custom)]"
                      }, " Learn More About Us ", 8, ["href"]),
                      createVNode("a", {
                        href: "https://www.facebook.com/reliableinternationaltravelservices",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "text-center w-1/2 sm:w-auto text-xs font-medium px-3 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-md shadow-sm transition"
                      }, " Our Facebook Page ")
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/policy/InquiryPolicy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
