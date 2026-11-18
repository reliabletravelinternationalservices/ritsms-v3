import { unref, mergeProps, useSSRContext, defineComponent, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./AppLayout-CSZsNKr7.js";
import { t as truncateText, _ as _sfc_main$a, a as formatDateString, o as openDeleteDialog } from "../ssr.js";
import { toast } from "vue-sonner";
import _sfc_main$5 from "./PackageImagesAsset-BF-fe_aP.js";
import _sfc_main$6 from "./PackageDescriptionAndHighlight-Cbb4_1J5.js";
import _sfc_main$7 from "./PackageTabInfo-DTondCFr.js";
import _sfc_main$8 from "./PackageAdditionalInfo-DyNozL6X.js";
import _sfc_main$9 from "./PackageSellingPeriod-BJ9H331S.js";
import { Icon } from "@iconify/css-vue";
import _sfc_main$4 from "./PackageHeaderTitle-V_56e2FB.js";
import "class-variance-authority";
import "radix-vue";
import "lucide-vue-next";
import "./Input-B-ZniF4D.js";
import "@vueuse/core";
import "./TooltipTrigger-B2yyxzkT.js";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "./index-xORXC0Yx.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "axios";
import "./TooltipProvider-D2JAfXHP.js";
const content$1 = `<path class="ypekrzfbe"/>`;
const _sfc_main$2 = {
  __name: "edit",
  __ssrInlineRender: true,
  props: ["width", "height"],
  setup(__props) {
    const viewBox = { "width": 24, "height": 24 };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Icon), mergeProps({
        width: __props.width,
        height: __props.height,
        viewBox,
        content: content$1,
        fallback: "material-symbols:edit"
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@iconify-vue/material-symbols/components/e/edit.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const content = `<path class="w5-y5xbhj"/>`;
const _sfc_main$1 = {
  __name: "delete",
  __ssrInlineRender: true,
  props: ["width", "height"],
  setup(__props) {
    const viewBox = { "width": 24, "height": 24 };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Icon), mergeProps({
        width: __props.width,
        height: __props.height,
        viewBox,
        content,
        fallback: "material-symbols:delete"
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@iconify-vue/material-symbols/components/d/delete.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageDetail",
  __ssrInlineRender: true,
  props: {
    package: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Packages",
        href: route("admin.packages")
      },
      {
        title: truncateText(props.package.name, 20),
        href: route("admin.packages.details", { id: props.package.id })
      }
    ];
    const handleRefreshMediaData = () => {
      router.reload({
        only: ["package"]
      });
    };
    const onDelete = () => {
      openDeleteDialog({
        title: "Delete package",
        message: `Are you sure you want to delete "${props.package.name}"? This will also remove all related batch schedules for this package.`,
        confirmText: "Delete package",
        cancelText: "Cancel",
        onConfirm: () => {
          router.delete(
            route("admin.packages.destroy", {
              id: props.package.id
            }),
            {
              onSuccess: () => {
                toast.success("Package deleted successfully");
              },
              onError: () => {
                toast.error("Failed to delete package");
              }
            }
          );
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Package Details" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { package: __props.package }, null, _parent2, _scopeId));
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              "package-id": __props.package.id,
              images: __props.package.images,
              "primary-image": __props.package.primary_image,
              onRefreshData: handleRefreshMediaData
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              description: __props.package.description,
              highlights_array: __props.package.highlights_array
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              "package-id": __props.package.id,
              itineraries: __props.package.itineraries_array,
              inclusions: __props.package.inclusions_array,
              exclusions: __props.package.exclusions_array,
              schedules: __props.package.schedules,
              notes: __props.package.notes_array
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              duration: Number(__props.package.duration),
              season: __props.package.season,
              base_price: Number(__props.package.base_price)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              selling_start_date: __props.package.selling_start_date,
              selling_end_date: __props.package.selling_end_date
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.packages.edit", { id: __props.package.id }),
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    variant: "outline",
                    size: "sm",
                    class: "w-full text-center font-semibold uppercase text-zinc-900 dark:text-zinc-50"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Edit</span>`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$2), { class: "w-4 h-4" }),
                          createVNode("span", null, "Edit")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), {
                      variant: "outline",
                      size: "sm",
                      class: "w-full text-center font-semibold uppercase text-zinc-900 dark:text-zinc-50"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), { class: "w-4 h-4" }),
                        createVNode("span", null, "Edit")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$a), {
              variant: "destructive",
              size: "sm",
              class: "w-full text-center font-semibold uppercase",
              onClick: onDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Delete</span>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$1), { class: "w-4 h-4" }),
                    createVNode("span", null, "Delete")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center text-xs text-zinc-400 dark:text-zinc-500 space-y-1 pt-2"${_scopeId}><p${_scopeId}>ID Reference: #${ssrInterpolate(__props.package.id)}</p><p${_scopeId}>Created: ${ssrInterpolate(unref(formatDateString)(__props.package.created_at))}</p><p${_scopeId}>Last Updated: ${ssrInterpolate(unref(formatDateString)(__props.package.updated_at))}</p></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full" }, [
                createVNode(_sfc_main$4, { package: __props.package }, null, 8, ["package"]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode(_sfc_main$5, {
                      "package-id": __props.package.id,
                      images: __props.package.images,
                      "primary-image": __props.package.primary_image,
                      onRefreshData: handleRefreshMediaData
                    }, null, 8, ["package-id", "images", "primary-image"]),
                    createVNode(_sfc_main$6, {
                      description: __props.package.description,
                      highlights_array: __props.package.highlights_array
                    }, null, 8, ["description", "highlights_array"]),
                    createVNode(_sfc_main$7, {
                      "package-id": __props.package.id,
                      itineraries: __props.package.itineraries_array,
                      inclusions: __props.package.inclusions_array,
                      exclusions: __props.package.exclusions_array,
                      schedules: __props.package.schedules,
                      notes: __props.package.notes_array
                    }, null, 8, ["package-id", "itineraries", "inclusions", "exclusions", "schedules", "notes"])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$8, {
                      duration: Number(__props.package.duration),
                      season: __props.package.season,
                      base_price: Number(__props.package.base_price)
                    }, null, 8, ["duration", "season", "base_price"]),
                    createVNode(_sfc_main$9, {
                      selling_start_date: __props.package.selling_start_date,
                      selling_end_date: __props.package.selling_end_date
                    }, null, 8, ["selling_start_date", "selling_end_date"]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.packages.edit", { id: __props.package.id }),
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$a), {
                            variant: "outline",
                            size: "sm",
                            class: "w-full text-center font-semibold uppercase text-zinc-900 dark:text-zinc-50"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), { class: "w-4 h-4" }),
                              createVNode("span", null, "Edit")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(_sfc_main$a), {
                        variant: "destructive",
                        size: "sm",
                        class: "w-full text-center font-semibold uppercase",
                        onClick: onDelete
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), { class: "w-4 h-4" }),
                          createVNode("span", null, "Delete")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "text-center text-xs text-zinc-400 dark:text-zinc-500 space-y-1 pt-2" }, [
                      createVNode("p", null, "ID Reference: #" + toDisplayString(__props.package.id), 1),
                      createVNode("p", null, "Created: " + toDisplayString(unref(formatDateString)(__props.package.created_at)), 1),
                      createVNode("p", null, "Last Updated: " + toDisplayString(unref(formatDateString)(__props.package.updated_at)), 1)
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/PackageDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
