import { defineComponent, mergeProps, unref, useSSRContext, ref, withCtx, createVNode, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { c as cn, _ as _sfc_main$6, l as _export_sfc } from "../ssr.js";
import { route as route$1 } from "ziggy-js";
import { _ as _sfc_main$5 } from "./AppLogoIcon-B2fdtLWF.js";
import { Link } from "@inertiajs/vue3";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppTopNavigation",
  __ssrInlineRender: true,
  props: {
    email: { default: "inquiry@reliabletravelph.com" },
    inquiryLink: { default: route("client.contact") },
    instagramLink: { default: "https://www.instagram.com/reliabletravelph/" },
    facebookLink: { default: "https://www.facebook.com/reliableinternationaltravelservices" },
    tiktokLink: { default: "https://www.tiktok.com/@reliabletravelph" },
    youtubeLink: { default: "https://www.youtube.com/@reliabletravelservices" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full bg-black p-4 md:p-2" }, _attrs))}><div class="max-w-7xl flex justify-center items-center mx-auto md:grid md:grid-cols-3"><div class="hidden md:flex space-x-2 items-end justify-start">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-email",
        width: "24",
        height: "24",
        class: "text-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`<a${ssrRenderAttr("href", `mailto:${__props.email}`)} rel="noopener noreferrer"><span class="text-[var(--primary-custom)] font-medium text-sm hover:underline cursor-pointer hover:text-[var(--tertiary-custom)] duration-75">${ssrInterpolate(__props.email)}</span></a></div><div class="flex space-x-2 items-center justify-center"><span class="text-[var(--primary-custom)] text-sm">ASK A QUESTION?</span><a${ssrRenderAttr("href", __props.inquiryLink)}><span class="underline text-[var(--tertiary-custom)] text-sm font-bold hover:text-[var(--tertiary-hover-custom)] duration-75">INQUIRE NOW</span></a></div><div class="hidden md:flex space-x-2 items-end justify-end"><a${ssrRenderAttr("href", __props.instagramLink)} target="_blank">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:instagram",
        width: "24",
        height: "24",
        class: "text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a><a${ssrRenderAttr("href", __props.facebookLink)} target="_blank">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "basil:facebook-solid",
        width: "24",
        height: "24",
        class: "text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a><a${ssrRenderAttr("href", __props.tiktokLink)} target="_blank">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-tiktok",
        width: "24",
        height: "24",
        class: "text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a><a${ssrRenderAttr("href", __props.youtubeLink)} target="_blank">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:youtube",
        width: "24",
        height: "24",
        class: "text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppTopNavigation.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AppClientHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobileMenuOpen = ref(false);
    const isMobilePackagesOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full p-4 md:p-2 bg-[var(--primary-custom)] text-[var(--secondary-custom)] sticky top-0 z-20 shadow-md" }, _attrs))} data-v-3be1e767><div class="max-w-7xl mx-auto flex justify-between items-center" data-v-3be1e767><a${ssrRenderAttr("href", unref(route$1)("client.landing"))} aria-label="Reliable International Travel Services home" data-v-3be1e767>`);
      _push(ssrRenderComponent(_sfc_main$5, { class: "bg-black text-black size-10 fill-current" }, null, _parent));
      _push(`</a><nav class="hidden md:flex space-x-6 text-xs font-normal font-roboto text-[var(--muted-custom)]" data-v-3be1e767><a${ssrRenderAttr("href", unref(route$1)("client.landing"))} class="${ssrRenderClass(unref(cn)("font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.landing") }))}" data-v-3be1e767><span data-v-3be1e767>Home</span></a>`);
      _push(ssrRenderComponent(unref(Menu), {
        as: "div",
        class: "relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MenuButton), { class: "menu-button flex items-center gap-2 font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-3be1e767${_scopeId2}>Packages</span>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    class: "rotate-icon transition-transform duration-150",
                    icon: "material-symbols:keyboard-arrow-down",
                    width: "18",
                    height: "18"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Packages"),
                    createVNode(unref(Icon), {
                      class: "rotate-icon transition-transform duration-150",
                      icon: "material-symbols:keyboard-arrow-down",
                      width: "18",
                      height: "18"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg ring-1 ring-black/5 focus:outline-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(MenuItem), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a${ssrRenderAttr("href", unref(route$1)("client.inbound"))} class="${ssrRenderClass(unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.inbound") || active }))}" data-v-3be1e767${_scopeId3}> Inbound Packages</a>`);
                      } else {
                        return [
                          createVNode("a", {
                            href: unref(route$1)("client.inbound"),
                            class: unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.inbound") || active })
                          }, " Inbound Packages", 10, ["href"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MenuItem), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a${ssrRenderAttr("href", unref(route$1)("client.outbound"))} class="${ssrRenderClass([unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.outbound") || active }), "block px-4 py-2 text-sm"])}" data-v-3be1e767${_scopeId3}> Outbound Packages</a>`);
                      } else {
                        return [
                          createVNode("a", {
                            href: unref(route$1)("client.outbound"),
                            class: ["block px-4 py-2 text-sm", unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.outbound") || active })]
                          }, " Outbound Packages", 10, ["href"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(MenuItem), null, {
                      default: withCtx(({ active }) => [
                        createVNode("a", {
                          href: unref(route$1)("client.inbound"),
                          class: unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.inbound") || active })
                        }, " Inbound Packages", 10, ["href"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MenuItem), null, {
                      default: withCtx(({ active }) => [
                        createVNode("a", {
                          href: unref(route$1)("client.outbound"),
                          class: ["block px-4 py-2 text-sm", unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.outbound") || active })]
                        }, " Outbound Packages", 10, ["href"])
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
              createVNode(unref(MenuButton), { class: "menu-button flex items-center gap-2 font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75" }, {
                default: withCtx(() => [
                  createVNode("span", null, "Packages"),
                  createVNode(unref(Icon), {
                    class: "rotate-icon transition-transform duration-150",
                    icon: "material-symbols:keyboard-arrow-down",
                    width: "18",
                    height: "18"
                  })
                ]),
                _: 1
              }),
              createVNode(unref(MenuItems), { class: "absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg ring-1 ring-black/5 focus:outline-none" }, {
                default: withCtx(() => [
                  createVNode(unref(MenuItem), null, {
                    default: withCtx(({ active }) => [
                      createVNode("a", {
                        href: unref(route$1)("client.inbound"),
                        class: unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.inbound") || active })
                      }, " Inbound Packages", 10, ["href"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(MenuItem), null, {
                    default: withCtx(({ active }) => [
                      createVNode("a", {
                        href: unref(route$1)("client.outbound"),
                        class: ["block px-4 py-2 text-sm", unref(cn)("block px-4 py-2 text-sm", { "bg-[var(--primary-custom)] text-[var(--tertiary-custom)]": unref(route$1)().current("client.outbound") || active })]
                      }, " Outbound Packages", 10, ["href"])
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
      _push(`<a${ssrRenderAttr("href", unref(route$1)("client.destination"))} class="${ssrRenderClass(unref(cn)("font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.destination") }))}" data-v-3be1e767><span data-v-3be1e767>Destinations</span></a><a${ssrRenderAttr("href", unref(route$1)("client.contact"))} class="${ssrRenderClass(unref(cn)("font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.contact") }))}" data-v-3be1e767><span data-v-3be1e767>Contact us</span></a><a${ssrRenderAttr("href", unref(route$1)("client.about"))} class="${ssrRenderClass(unref(cn)("font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.about") }))}" data-v-3be1e767><span data-v-3be1e767>About us</span></a></nav><div class="hidden md:flex items-center" data-v-3be1e767><a href="#" aria-label="Open account portal" data-v-3be1e767><button class="flex items-center gap-2 px-4 py-4 text-[var(--muted-custom)] h-8 border-2 border-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] hover:border-[var(--tertiary-custom)] ease-in duration-75" data-v-3be1e767><span class="font-roboto text-xs md:text-sm" data-v-3be1e767>Account</span>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "lucide:key-round",
        width: "20",
        height: "20"
      }, null, _parent));
      _push(`</button></a></div><button class="md:hidden p-2 text-[var(--muted-custom)] transition-transform duration-200 active:scale-90"${ssrRenderAttr("aria-label", isMobileMenuOpen.value ? "Close navigation menu" : "Open navigation menu")} data-v-3be1e767>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: isMobileMenuOpen.value ? "material-symbols:close" : "material-symbols:menu",
        width: "32",
        height: "32",
        class: "size-8"
      }, null, _parent));
      _push(`</button></div>`);
      if (isMobileMenuOpen.value) {
        _push(`<div class="md:hidden bg-[var(--primary-custom)] border-t border-[var(--shadow-custom)] p-4 space-y-4 flex flex-col" data-v-3be1e767><a${ssrRenderAttr("href", unref(route$1)("client.landing"))} class="${ssrRenderClass(unref(cn)("font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.landing") }))}" data-v-3be1e767>Home</a><a${ssrRenderAttr("href", unref(route$1)("client.destination"))} class="${ssrRenderClass(unref(cn)("font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.destination") }))}" data-v-3be1e767>Destinations</a><div class="pt-2" data-v-3be1e767><button type="button" class="flex w-full items-center justify-between text-left font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] transition-colors duration-150" data-v-3be1e767><span data-v-3be1e767>Packages</span>`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: isMobilePackagesOpen.value ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down",
          width: "20",
          height: "20",
          class: "transition-transform duration-150"
        }, null, _parent));
        _push(`</button>`);
        if (isMobilePackagesOpen.value) {
          _push(`<div class="mt-2 space-y-2 pl-4" data-v-3be1e767><a${ssrRenderAttr("href", unref(route$1)("client.inbound"))} class="${ssrRenderClass(unref(cn)("block text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.inbound") }))}" data-v-3be1e767> Inbound Packages </a><a${ssrRenderAttr("href", unref(route$1)("client.outbound"))} class="${ssrRenderClass(unref(cn)("block text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.outbound") }))}" data-v-3be1e767> Outbound Packages </a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><a${ssrRenderAttr("href", unref(route$1)("client.contact"))} class="${ssrRenderClass(unref(cn)("text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.contact") }))}" data-v-3be1e767> Contact us </a><a${ssrRenderAttr("href", unref(route$1)("client.about"))} class="${ssrRenderClass(unref(cn)("text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75", { "text-[var(--tertiary-custom)]": unref(route$1)().current("client.about") }))}" data-v-3be1e767> About us </a><hr class="border-[var(--shadow-custom)]" data-v-3be1e767><a href="#" data-v-3be1e767>`);
        _push(ssrRenderComponent(_sfc_main$6, { class: "w-full text-[var(--muted-custom)] border-2 border-[var(--muted-custom)]" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-3be1e767${_scopeId}>Login</span>`);
              _push2(ssrRenderComponent(unref(Icon), {
                icon: "material-symbols:login",
                width: "20",
                height: "20"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", null, "Login"),
                createVNode(unref(Icon), {
                  icon: "material-symbols:login",
                  width: "20",
                  height: "20"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppClientHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3be1e767"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppClientFooter",
  __ssrInlineRender: true,
  props: {
    email: { default: "inquiry@reliabletravelph.com" },
    inquiryLink: { default: route$1("client.contact") },
    instagramLink: { default: "https://www.instagram.com/reliabletravelph/" },
    facebookLink: { default: "https://www.facebook.com/reliableinternationaltravelservices" },
    tiktokLink: { default: "https://www.tiktok.com/@reliabletravelph" },
    youtubeLink: { default: "https://www.youtube.com/@reliabletravelservices" }
  },
  setup(__props) {
    const appUrl = "http://127.0.0.1:8000/";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "w-full bg-[var(--secondary-custom)] px-4" }, _attrs))}><div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 md:py-24"><div class="flex flex-col gap-4"><div class="flex flex-col gap-2"><img${ssrRenderAttr("src", unref(appUrl) + "/storage/upload/agency/logo.png")} alt="Agency Logo" class="w-28 h-28 object-cover">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route$1)("client.contact")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="w-28 bg-[var(--tertiary-custom)] py-2 text-[var(--secondary-custom)] font-bold hover:bg-[var(--tertiary-hover-custom)] duration-75 ease-in" type="button"${_scopeId}>Inquire Now</button>`);
          } else {
            return [
              createVNode("button", {
                class: "w-28 bg-[var(--tertiary-custom)] py-2 text-[var(--secondary-custom)] font-bold hover:bg-[var(--tertiary-hover-custom)] duration-75 ease-in",
                type: "button"
              }, "Inquire Now")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div><h1 class="text-[var(--primary-custom)] font-normal font-roboto text-sm"><span class="text-[var(--tertiary-custom)]">GUARANTEED</span> professionally curated itineraries and a <span class="text-[var(--tertiary-custom)]">RELIABLE TRAVEL AGENCY</span></h1></div><div class="flex flex-col gap-1"><h3 class="text-[var(--primary-custom)] font-bold font-roboto text-sm">PAYMENT GATEWAYS</h3><span class="flex items-center justify-start gap-2"><img${ssrRenderAttr("src", unref(appUrl) + "/storage/upload/agency/visa_logo.png")} alt="visa" class="w-12 h-8 object-cover"><img${ssrRenderAttr("src", unref(appUrl) + "/storage/upload/agency/paypal_logo.png")} alt="paypal" class="w-12 h-8 object-cover"><img${ssrRenderAttr("src", unref(appUrl) + "/storage/upload/agency/gcash_logo.png")} alt="gcash" class="w-12 h-8 object-cover"></span></div></div><div class="flex flex-col gap-4"><h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">QUICK LINKS</h2><ul class="flex flex-col gap-2 text-[var(--primary-custom)] font-roboto text-xs w-min"><li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a${ssrRenderAttr("href", unref(route$1)("client.landing"))}>Home</a></li><li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a${ssrRenderAttr("href", unref(route$1)("client.destination"))}>Destinations</a></li><li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a${ssrRenderAttr("href", unref(route$1)("client.contact"))}>Contact Us</a></li><li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a${ssrRenderAttr("href", unref(route$1)("client.about"))}>About Us</a></li></ul></div><div class="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-4"><div class="flex flex-col gap-4"><h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">CALL US NOW</h2><span class="flex flex-col gap-2 w-full"><span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:call",
        width: "20",
        height: "20",
        class: "text-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`<a href="tel:09085721338" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">+63 908 572 1338</a></span><span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:call",
        width: "20",
        height: "20",
        class: "text-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`<a href="tel:09279275207" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">+63 927 927 5207</a></span></span></div><div class="flex flex-col gap-4"><h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">SEND US EMAIL</h2><span class="flex flex-col gap-2"><span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-email",
        width: "20",
        height: "20",
        class: "text-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`<a href="mailto:inquiry@reliabletravelph.com" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">${ssrInterpolate(__props.email)}</a></span><span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-email",
        width: "20",
        height: "20",
        class: "text-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`<a href="mailto:reliabletravelinfo@gmail.com" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">reliabletravelinfo@gmail.com</a></span></span></div><div class="sm:col-span-2 flex flex-col gap-6 lg:gap-4"><span class="flex flex-col gap-1 text-[var(--primary-custom)] font-roboto text-xs"><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:location",
        width: "20",
        height: "20",
        class: "text-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`<h4 class="font-bold font-roboto text-sm uppercase">CAVITE BRANCH</h4></span><a target="_blank" href="https://maps.app.goo.gl/sTjrppGkWkyQxLVd6" class="ml-6 underline hover:text-[var(--tertiary-custom)] duration-75 ease-in leading-relaxed">JJSS Commercial Building Brgy Navarro General Trias, Cavite, Philippines</a></span><span class="flex flex-col gap-1 text-[var(--primary-custom)] font-roboto text-xs"><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:location",
        width: "20",
        height: "20",
        class: "text-[var(--tertiary-custom)]"
      }, null, _parent));
      _push(`<h4 class="font-bold font-roboto text-sm uppercase">PANGASINAN BRANCH</h4></span><a target="_blank" href="https://maps.app.goo.gl/3VPzYr8CHG1usV2d8" class="ml-6 underline hover:text-[var(--tertiary-custom)] duration-75 ease-in leading-relaxed">Nomangonan, San Manuel, Pangasinan</a></span></div></div></div><div class="max-w-5xl mx-auto py-8 border-t border-[var(--shadow-custom)] flex flex-col md:flex-row items-center justify-between gap-6"><span class="flex space-x-4 items-center font-roboto text-xs order-2 md:order-1"><a${ssrRenderAttr("href", __props.instagramLink)} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:instagram",
        width: "24",
        height: "24",
        class: "text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a><a${ssrRenderAttr("href", __props.facebookLink)} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "basil:facebook-solid",
        width: "24",
        height: "24",
        class: "text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a><a${ssrRenderAttr("href", __props.tiktokLink)} target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok page">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "ic:baseline-tiktok",
        width: "24",
        height: "24",
        class: "text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a><a${ssrRenderAttr("href", __props.youtubeLink)} target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:youtube",
        width: "24",
        height: "24",
        class: "text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] duration-75"
      }, null, _parent));
      _push(`</a></span><span class="text-center md:text-right order-1 md:order-2"><h2 class="text-[var(--muted-custom)] font-medium font-roboto text-xs md:text-sm">Copyright © 2026 Reliable International Travel Services. All rights reserved.</h2></span></div></footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppClientFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppNavigationLayout",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[var(--primary-custom)] text-[var(--secondary-custom)]" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(ssrRenderComponent(AppHeader, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/app/AppNavigationLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ClientAppLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/ClientAppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
