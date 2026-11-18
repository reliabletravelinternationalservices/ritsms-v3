import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
/* empty css                  */
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1 } from "../ssr.js";
import { C as CLIENT_IMAGES, A as AGENCY_RATINGS } from "./constants-D5Z3FOm2.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AboutAgency",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 items-center justify-center min-h-screen lg:min-h-[1000px] py-12 px-4 w-full" }, _attrs))}><div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center"><div class="w-full space-y-4"><div class="flex items-center gap-1 text-[var(--tertiary-custom)]">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "akar-icons:info-fill",
        width: "24",
        height: "24",
        class: "md:w-7 md:h-7",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<p class="font-bold font-roboto text-lg md:text-xl">ABOUT US</p></div><div class="space-y-4"><div class="space-y-3"><h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold"> Why Travelers Choose Us </h2><p class="font-roboto text-xs md:text-sm text-justify"> Founded in March 2009 by Claire Baria, Reliable International Travel Services is a trusted leader in the Philippine travel industry. With over 17 years of expertise, we specialize in delivering premium, seamless, and personalized travel solutions tailored to your unique preferences. </p></div><div class="space-y-2 ml-4 text-justify"><p class="font-roboto text-xs md:text-sm whitespace-pre-line"><span class="font-bold">• Expertly Curated Itineraries:</span> From simple getaways to complex international planning, every detail is professionally handled. </p><p class="font-roboto text-xs md:text-sm whitespace-pre-line"><span class="font-bold">• VIP Treatment:</span> Our dedicated travel consultants provide personalized care, acting as your partner from the first inquiry to your return home. </p><p class="font-roboto text-xs md:text-sm whitespace-pre-line"><span class="font-bold">• 24/7 Global Support:</span> We offer round-the-clock assistance to ensure a worry-free and memorable journey. </p><p class="font-roboto text-xs md:text-sm whitespace-pre-line"><span class="font-bold">• Deep Destination Knowledge:</span> We leverage years of experience to turn your dream vacations into meaningful realities. </p></div><p class="font-roboto text-xs md:text-sm text-justify"> Whether you are seeking a bespoke tour or a seamless business trip, Reliable International Travel Services is your dependable travel agency companion for every mile of the journey. </p><div class="pt-2"><a${ssrRenderAttr("href", _ctx.route("client.about"))} class="ease-in duration-200 hover:text-[var(--primary-custom)]">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        type: "button",
        class: "bg-[var(--tertiary-custom)] font-medium hover:bg-[var(--tertiary-hover-custom)] rounded-none font-roboto flex items-center justify-center px-12 py-3 w-full md:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm md:text-base"${_scopeId}>Read About Us</span>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "ep:arrow-right-bold",
              width: "18",
              height: "18",
              class: "ml-2",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", { class: "text-sm md:text-base" }, "Read About Us"),
              createVNode(unref(Icon), {
                icon: "ep:arrow-right-bold",
                width: "18",
                height: "18",
                class: "ml-2",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</a></div></div></div><div class="w-full grid grid-cols-2 gap-1 order-first md:order-last"><div class="col-span-2"><img${ssrRenderAttr("src", unref(CLIENT_IMAGES)[0].src)} class="object-cover h-48 md:h-full w-full"${ssrRenderAttr("alt", unref(CLIENT_IMAGES)[0].alt)} loading="eager" fetchpriority="high" decoding="async"></div><div class="col-span-1"><img${ssrRenderAttr("src", unref(CLIENT_IMAGES)[1].src)} class="object-cover h-32 md:h-full w-full"${ssrRenderAttr("alt", unref(CLIENT_IMAGES)[1].alt)} loading="lazy" decoding="async"></div><div class="col-span-1"><img${ssrRenderAttr("src", unref(CLIENT_IMAGES)[2].src)} class="object-cover h-32 md:h-full w-full"${ssrRenderAttr("alt", unref(CLIENT_IMAGES)[2].alt)} loading="lazy" decoding="async"></div></div></div><div class="grid grid-cols-2 lg:grid-cols-4 w-full gap-y-8 lg:gap-y-0"><div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).experience.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).experience.value)}+</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).experience.label)}</p></span></div><div class="flex items-center justify-center lg:border-r-2 border-[var(--shadow-custom)] gap-2 px-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).tour.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).tour.value.toLocaleString())}+</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).tour.label)}</p></span></div><div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2 mt-4 lg:mt-0">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).client.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).client.value.toLocaleString())}+</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).client.label)}</p></span></div><div class="flex items-center justify-center gap-2 px-2 mt-4 lg:mt-0">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: unref(AGENCY_RATINGS).review.icon,
        width: "40",
        height: "40",
        class: "md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="flex flex-col"><p class="font-bold font-montserrat text-xl md:text-3xl">${ssrInterpolate(unref(AGENCY_RATINGS).review.value)}/5</p><p class="text-[10px] md:text-sm font-roboto uppercase">${ssrInterpolate(unref(AGENCY_RATINGS).review.label)}</p></span></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/home/section/AboutAgency.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
