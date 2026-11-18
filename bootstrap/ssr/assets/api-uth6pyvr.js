import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import axios from "axios";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ApiFetchError",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    retry: { type: Function }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-[260px] w-full flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-5 py-10 text-center sm:px-8 sm:py-14" }, _attrs))}><div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "solar:cloud-cross-bold",
        class: "text-3xl text-red-500 sm:text-4xl"
      }, null, _parent));
      _push(`</div><h3 class="max-w-md text-lg font-semibold text-gray-900 sm:text-xl">${ssrInterpolate(__props.title ?? "Unable to load data")}</h3><p class="mt-2 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">${ssrInterpolate(__props.description ?? "Something went wrong while loading the data. Please try again.")}</p>`);
      if (__props.retry) {
        _push(`<button class="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-400 px-5 py-2.5 text-sm font-medium text-zinc-50 transition-all hover:opacity-90 active:scale-95 sm:px-6 sm:py-3 sm:text-base">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "solar:refresh-bold",
          class: "text-lg"
        }, null, _parent));
        _push(` Try Again </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/placeholder/error/ApiFetchError.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
export {
  _sfc_main as _,
  api as a
};
