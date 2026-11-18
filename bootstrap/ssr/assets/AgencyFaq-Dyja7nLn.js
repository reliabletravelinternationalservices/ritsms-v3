import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4 } from "./AccordionTrigger-BwG7gcww.js";
import "reka-ui";
import "@vueuse/core";
import "../ssr.js";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "lucide-vue-next";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AgencyFaq",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-12 md:py-40 w-full px-4" }, _attrs))}><div class="max-w-5xl w-full"><div class="w-full flex flex-col items-center gap-8 md:gap-12"><div class="flex flex-col items-center text-center space-y-4 max-w-3xl"><h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase"> Frequently Asked <span class="text-[var(--tertiary-custom)]">Questions</span></h2><p class="text-sm md:text-base font-roboto text-[var(--muted-custom)]"> Everything you need to know about our travel services and booking process. </p></div><div class="w-full">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        type: "single",
        collapsible: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              value: "item-1",
              class: "border-[var(--shadow-custom)]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`What&#39;s included in your packages?`);
                      } else {
                        return [
                          createTextVNode("What's included in your packages?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Our packages are hassle-free, but inclusions vary depending on destination and promo. `);
                      } else {
                        return [
                          createTextVNode(" Our packages are hassle-free, but inclusions vary depending on destination and promo. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("What's included in your packages?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Our packages are hassle-free, but inclusions vary depending on destination and promo. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              value: "item-2",
              class: "border-[var(--shadow-custom)]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Do you offer installment plans?`);
                      } else {
                        return [
                          createTextVNode("Do you offer installment plans?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Yes, we offer flexible installment plans. You can secure your slot with a small reservation fee, then pay the remaining balance in installments before your travel date. `);
                      } else {
                        return [
                          createTextVNode(" Yes, we offer flexible installment plans. You can secure your slot with a small reservation fee, then pay the remaining balance in installments before your travel date. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("Do you offer installment plans?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Yes, we offer flexible installment plans. You can secure your slot with a small reservation fee, then pay the remaining balance in installments before your travel date. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              value: "item-3",
              class: "border-[var(--shadow-custom)]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`What other services do you offer?`);
                      } else {
                        return [
                          createTextVNode("What other services do you offer?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` We offer complete travel services for a hassle-free experience. Domestic &amp; International Tour Packages, Visa Processing Assistance, Passport Assistance, Hotel Reservations, Cruise Bookings and more! `);
                      } else {
                        return [
                          createTextVNode(" We offer complete travel services for a hassle-free experience. Domestic & International Tour Packages, Visa Processing Assistance, Passport Assistance, Hotel Reservations, Cruise Bookings and more! ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("What other services do you offer?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" We offer complete travel services for a hassle-free experience. Domestic & International Tour Packages, Visa Processing Assistance, Passport Assistance, Hotel Reservations, Cruise Bookings and more! ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              value: "item-4",
              class: "border-[var(--shadow-custom)]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`How do I contact customer support?`);
                      } else {
                        return [
                          createTextVNode("How do I contact customer support?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` You can reach our customer support team via phone, email, or live chat on our website. We are available 24/7 to assist you with any questions or concerns. `);
                      } else {
                        return [
                          createTextVNode(" You can reach our customer support team via phone, email, or live chat on our website. We are available 24/7 to assist you with any questions or concerns. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("How do I contact customer support?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" You can reach our customer support team via phone, email, or live chat on our website. We are available 24/7 to assist you with any questions or concerns. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              value: "item-5",
              class: "border-[var(--shadow-custom)]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`What payment methods do you accept?`);
                      } else {
                        return [
                          createTextVNode("What payment methods do you accept?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` We accept all major credit cards, debit cards, and bank transfers. Please note that some payment methods may have additional processing times. `);
                      } else {
                        return [
                          createTextVNode(" We accept all major credit cards, debit cards, and bank transfers. Please note that some payment methods may have additional processing times. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("What payment methods do you accept?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" We accept all major credit cards, debit cards, and bank transfers. Please note that some payment methods may have additional processing times. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), {
                value: "item-1",
                class: "border-[var(--shadow-custom)]"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("What's included in your packages?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Our packages are hassle-free, but inclusions vary depending on destination and promo. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$2), {
                value: "item-2",
                class: "border-[var(--shadow-custom)]"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("Do you offer installment plans?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Yes, we offer flexible installment plans. You can secure your slot with a small reservation fee, then pay the remaining balance in installments before your travel date. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$2), {
                value: "item-3",
                class: "border-[var(--shadow-custom)]"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("What other services do you offer?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" We offer complete travel services for a hassle-free experience. Domestic & International Tour Packages, Visa Processing Assistance, Passport Assistance, Hotel Reservations, Cruise Bookings and more! ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$2), {
                value: "item-4",
                class: "border-[var(--shadow-custom)]"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("How do I contact customer support?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" You can reach our customer support team via phone, email, or live chat on our website. We are available 24/7 to assist you with any questions or concerns. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$2), {
                value: "item-5",
                class: "border-[var(--shadow-custom)]"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("What payment methods do you accept?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" We accept all major credit cards, debit cards, and bank transfers. Please note that some payment methods may have additional processing times. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/contact/section/AgencyFaq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
