import { defineComponent, computed, withCtx, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ClientAppLayout-CjNikXpw.js";
import _sfc_main$2 from "./PackageTitleHeaderWithImage-BP95RKW8.js";
import _sfc_main$3 from "./PackageRateAndPeriod-BhoAqLix.js";
import _sfc_main$4 from "./PackageIncludedServices-DnpaiqtI.js";
import PackageTravelSchedule from "./PackageTravelSchedule-ChyOgdIB.js";
import _sfc_main$5 from "./PackageDescription-BbWp032w.js";
import PackageHighlight from "./PackageHighlight-w87neNFZ.js";
import _sfc_main$6 from "./PackageItinerary-CNug2Llt.js";
import _sfc_main$7 from "./PackageInclusion-Dtn9dhiL.js";
import _sfc_main$8 from "./PackageExclusion-DVATkuUI.js";
import _sfc_main$9 from "./PackageNote-DZNcEw9K.js";
import _sfc_main$a from "./InquiryForm-BQF3iMFZ.js";
import "@iconify/vue";
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
import "./Banner-CPbdlVa7.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./ImagePreviewModal-ClUZaSKV.js";
import "embla-carousel-vue";
import "./useCurrency-Ta8J8A5v.js";
import "./AccordionTrigger-BwG7gcww.js";
import "./constants-D5Z3FOm2.js";
/* empty css                  */
import "./Label-6hRdN-Dm.js";
import "./Input-B-ZniF4D.js";
import "./Textarea-BvWBAMsq.js";
import "./InputError-BhTWS2NZ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageDetailPage",
  __ssrInlineRender: true,
  props: {
    package: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const dynamicBreadcrumbs = computed(() => {
      const crumbs = [
        { title: "Home", href: route("client.landing") }
      ];
      if (props.isInbound) {
        crumbs.push({ title: "Inbound", href: route("client.inbound") });
      } else {
        crumbs.push({ title: "Outbound", href: route("client.outbound") });
      }
      crumbs.push({ title: props.package.name, href: "" });
      return crumbs;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              package: __props.package,
              isInbound: __props.isInbound,
              breadcrumbs: dynamicBreadcrumbs.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              package: __props.package,
              isInbound: __props.isInbound
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { package: __props.package }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(PackageTravelSchedule, {
              package: __props.package,
              isInbound: __props.isInbound
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, { package: __props.package }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(PackageHighlight, {
              package: __props.package,
              isInbound: __props.isInbound
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              package: __props.package,
              isInbound: __props.isInbound
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, { package: __props.package }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, { package: __props.package }, null, _parent2, _scopeId));
            if (__props.package.notes_array && __props.package.notes_array.length > 0) {
              _push2(ssrRenderComponent(_sfc_main$9, { package: __props.package }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$a, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                package: __props.package,
                isInbound: __props.isInbound,
                breadcrumbs: dynamicBreadcrumbs.value
              }, null, 8, ["package", "isInbound", "breadcrumbs"]),
              createVNode(_sfc_main$3, {
                package: __props.package,
                isInbound: __props.isInbound
              }, null, 8, ["package", "isInbound"]),
              createVNode(_sfc_main$4, { package: __props.package }, null, 8, ["package"]),
              createVNode(PackageTravelSchedule, {
                package: __props.package,
                isInbound: __props.isInbound
              }, null, 8, ["package", "isInbound"]),
              createVNode(_sfc_main$5, { package: __props.package }, null, 8, ["package"]),
              createVNode(PackageHighlight, {
                package: __props.package,
                isInbound: __props.isInbound
              }, null, 8, ["package", "isInbound"]),
              createVNode(_sfc_main$6, {
                package: __props.package,
                isInbound: __props.isInbound
              }, null, 8, ["package", "isInbound"]),
              createVNode(_sfc_main$7, { package: __props.package }, null, 8, ["package"]),
              createVNode(_sfc_main$8, { package: __props.package }, null, 8, ["package"]),
              __props.package.notes_array && __props.package.notes_array.length > 0 ? (openBlock(), createBlock(_sfc_main$9, {
                key: 0,
                package: __props.package
              }, null, 8, ["package"])) : createCommentVNode("", true),
              createVNode(_sfc_main$a)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/client/package/detail/PackageDetailPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
