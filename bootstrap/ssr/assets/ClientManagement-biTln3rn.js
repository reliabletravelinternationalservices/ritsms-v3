import { defineComponent, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./MaintenanceOverlay-mmlm806e.js";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { Head } from "@inertiajs/vue3";
import "./CardTitle-CO_w4Cob.js";
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
import "@iconify/vue";
import "./index-xORXC0Yx.js";
import "./Input-B-ZniF4D.js";
import "./TooltipTrigger-B2yyxzkT.js";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ClientManagement",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Client Management",
        href: route("admin.users.clients")
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Client Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Client Management section is under development",
              description: "This section is currently being developed and is not yet available for use. Please check back later for updates.",
              mode: "maintenance",
              estimatedTime: "N/A"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative" }, [
                createVNode(_sfc_main$2, {
                  title: "Client Management section is under development",
                  description: "This section is currently being developed and is not yet available for use. Please check back later for updates.",
                  mode: "maintenance",
                  estimatedTime: "N/A"
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/user/client/ClientManagement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
