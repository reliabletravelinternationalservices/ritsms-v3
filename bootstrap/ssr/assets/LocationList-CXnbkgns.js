import { defineComponent, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./MotionWrapper-DwlQ79CS.js";
import { Icon } from "@iconify/vue";
import { m as getImageUrl } from "../ssr.js";
import "@vueuse/core";
import "@vue/server-renderer";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "lucide-vue-next";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LocationList",
  __ssrInlineRender: true,
  props: {
    locations: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full px-4 sm:px-6 lg:px-8" }, _attrs))}>`);
      if (__props.locations.length) {
        _push(`<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:gap-10"><!--[-->`);
        ssrRenderList(__props.locations, (location, index) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: location.id,
            delay: 0.05 * (index % 3),
            class: "h-full w-full"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<article class="group flex h-full flex-col gap-4"${_scopeId}><div class="h-64 overflow-hidden rounded-lg shadow-md sm:h-80 md:h-72 lg:h-80 xl:h-96"${_scopeId}>`);
                if (location.image) {
                  _push2(`<img${ssrRenderAttr("src", unref(getImageUrl)(location.image.file_path))}${ssrRenderAttr("alt", location.image.alt_text || location.name)} class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" loading="lazy"${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Icon), {
                    icon: "lucide:image-off",
                    class: "h-10 w-10 text-slate-400"
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="text-xs font-medium text-slate-400"${_scopeId}> No image available </span></div>`);
                }
                _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><h2 class="line-clamp-1 font-montserrat text-xl font-bold text-slate-800 md:text-2xl"${_scopeId}>${ssrInterpolate(location.name)}</h2><p class="line-clamp-3 font-roboto text-sm text-slate-600 md:text-base"${_scopeId}>${ssrInterpolate(location.description)}</p></div></article>`);
              } else {
                return [
                  createVNode("article", { class: "group flex h-full flex-col gap-4" }, [
                    createVNode("div", { class: "h-64 overflow-hidden rounded-lg shadow-md sm:h-80 md:h-72 lg:h-80 xl:h-96" }, [
                      location.image ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: unref(getImageUrl)(location.image.file_path),
                        alt: location.image.alt_text || location.name,
                        class: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110",
                        loading: "lazy"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100"
                      }, [
                        createVNode(unref(Icon), {
                          icon: "lucide:image-off",
                          class: "h-10 w-10 text-slate-400"
                        }),
                        createVNode("span", { class: "text-xs font-medium text-slate-400" }, " No image available ")
                      ]))
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("h2", { class: "line-clamp-1 font-montserrat text-xl font-bold text-slate-800 md:text-2xl" }, toDisplayString(location.name), 1),
                      createVNode("p", { class: "line-clamp-3 font-roboto text-sm text-slate-600 md:text-base" }, toDisplayString(location.description), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="mx-auto my-12 flex w-full max-w-md flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center"><div class="mb-4 rounded-full bg-amber-50 p-4 text-amber-600 shadow-sm">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "lucide:map-pin-off",
          class: "h-10 w-10"
        }, null, _parent));
        _push(`</div><h3 class="mb-1 text-lg font-semibold text-slate-800"> No Locations Found </h3><p class="max-w-xs text-sm text-slate-500"> There are currently no locations available for this destination. Please check back later. </p></div>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/location/section/LocationList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
