import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AppLogoIcon-B2fdtLWF.js";
import { Link } from "@inertiajs/vue3";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthSimpleLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10" }, _attrs))}><div class="w-full max-w-sm"><div class="flex flex-col gap-8"><div class="flex flex-col items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("client.landing"),
        class: "flex flex-col items-center gap-2 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-1 flex h-9 w-9 items-center justify-center rounded-md"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { class: "size-9 fill-current text-[var(--foreground)] dark:text-white" }, null, _parent2, _scopeId));
            _push2(`</div><span class="sr-only"${_scopeId}>${ssrInterpolate(__props.title)}</span>`);
          } else {
            return [
              createVNode("div", { class: "mb-1 flex h-9 w-9 items-center justify-center rounded-md" }, [
                createVNode(_sfc_main$2, { class: "size-9 fill-current text-[var(--foreground)] dark:text-white" })
              ]),
              createVNode("span", { class: "sr-only" }, toDisplayString(__props.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="space-y-2 text-center"><h1 class="text-xl font-medium">${ssrInterpolate(__props.title)}</h1><p class="text-center text-sm text-muted-foreground">${ssrInterpolate(__props.description)}</p></div></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/auth/AuthSimpleLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: __props.title,
        description: __props.description
      }, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/AuthLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
