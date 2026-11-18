import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { Image } from "lucide-vue-next";
import { m as getImageUrl } from "../ssr.js";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TitleHeader",
  __ssrInlineRender: true,
  props: {
    group: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-[400px] md:h-[200px] lg:h-[300px] relative overflow-hidden" }, _attrs))}><div class="w-full h-full absolute top-0 left-0">`);
      if (__props.group.image) {
        _push(`<img class="w-full h-full object-cover"${ssrRenderAttr("src", unref(getImageUrl)(__props.group.image.file_path))} alt="Traveler">`);
      } else {
        _push(`<div class="w-full h-full bg-gray-300 flex items-center justify-center"><span class="text-gray-400">`);
        _push(ssrRenderComponent(unref(Image), {
          width: "60",
          height: "60"
        }, null, _parent));
        _push(`</span></div>`);
      }
      _push(`<span class="absolute inset-0 bg-gradient-to-t bg-black/60 flex items-center justify-center"><div class="max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 p-6 md:p-8 text-[var(--primary-custom)]"><span class="flex flex-col items-center justify-center gap-3 text-center"><h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold tracking-wide">${ssrInterpolate(__props.group.title)}</h1>`);
      if (__props.group.description) {
        _push(`<p class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed">${ssrInterpolate(__props.group.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span><span class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"><button class="${ssrRenderClass([{ "bg-[var(--inbound-custom)]": __props.isInbound }, "w-full sm:w-auto bg-[var(--outbound-custom)] text-[var(--primary-custom)] px-6 py-2 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-hover-custom)] transition-all duration-200"])}">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "tabler:message",
        class: "text-xl"
      }, null, _parent));
      _push(`<span class="whitespace-nowrap">Message us</span></button><a href="tel:+639085721338" class="w-full"><button class="w-full sm:w-auto bg-[var(--tag-custom)] text-[var(--primary-custom)] px-6 py-2 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-hover-custom)] transition-all duration-200">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:call-outline",
        class: "text-xl"
      }, null, _parent));
      _push(`<span class="whitespace-nowrap">Call us</span></button></a><button type="button" class="w-full sm:w-auto bg-[var(--tertiary-custom)] text-[var(--primary-custom)] px-6 py-2 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-hover-custom)] transition-all duration-200">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:share-outline",
        class: "text-xl"
      }, null, _parent));
      _push(`<span class="whitespace-nowrap">Share now</span></button></span></div></span></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/group/section/TitleHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
