import { defineComponent, computed, mergeProps, useSSRContext, unref, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AppLayout-CSZsNKr7.js";
import { Head } from "@inertiajs/vue3";
import "class-variance-authority";
import "radix-vue";
import "../ssr.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "lucide-vue-next";
import "vue-sonner";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "@iconify/vue";
import "./Input-B-ZniF4D.js";
import "./TooltipTrigger-B2yyxzkT.js";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "./index-xORXC0Yx.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PlaceholderPattern",
  __ssrInlineRender: true,
  setup(__props) {
    const patternId = computed(() => `pattern-${Math.random().toString(36).substring(2, 9)}`);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20",
        fill: "none"
      }, _attrs))}><defs><pattern${ssrRenderAttr("id", patternId.value)} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M-1 5L5 -1M3 9L8.5 3.5" stroke-width="0.5"></path></pattern></defs><rect stroke="none"${ssrRenderAttr("fill", `url(#${patternId.value})`)} width="100%" height="100%"></rect></svg>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/PlaceholderPattern.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    name: {}
  },
  setup(__props) {
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: "/dashboard"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"${_scopeId}><div class="grid auto-rows-min gap-4 md:grid-cols-3"${_scopeId}><div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div><div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div><div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4" }, [
                createVNode("div", { class: "grid auto-rows-min gap-4 md:grid-cols-3" }, [
                  createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                    createVNode(_sfc_main$1)
                  ]),
                  createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                    createVNode(_sfc_main$1)
                  ]),
                  createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                    createVNode(_sfc_main$1)
                  ])
                ]),
                createVNode("div", { class: "relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min" }, [
                  createVNode(_sfc_main$1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
