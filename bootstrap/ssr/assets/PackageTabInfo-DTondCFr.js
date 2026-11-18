import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { a as formatDateString, b as formatCurrency } from "../ssr.js";
import { Link } from "@inertiajs/vue3";
import { CheckCircle2, XCircle, Pencil, Calendar, FileText } from "lucide-vue-next";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "@vueuse/core";
import "vue-sonner";
import "radix-vue";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PackageTabInfo",
  __ssrInlineRender: true,
  props: {
    packageId: {},
    itineraries: {},
    inclusions: {},
    exclusions: {},
    schedules: {},
    notes: {}
  },
  setup(__props) {
    const activeTab = ref("itinerary");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden" }, _attrs))}><div class="flex border-b bg-zinc-50/50 dark:bg-zinc-900/50 dark:border-zinc-800 overflow-x-auto"><button class="${ssrRenderClass(["px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors", activeTab.value === "itinerary" ? "border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50" : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"])}"> Itineraries (${ssrInterpolate(((_a = __props.itineraries) == null ? void 0 : _a.length) || 0)}) </button><button class="${ssrRenderClass(["px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors", activeTab.value === "inclusions" ? "border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50" : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"])}"> Inclusions &amp; Exclusions </button><button class="${ssrRenderClass(["px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors", activeTab.value === "schedules" ? "border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50" : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"])}"> Batch Schedules (${ssrInterpolate(((_b = __props.schedules) == null ? void 0 : _b.length) || 0)}) </button><button class="${ssrRenderClass(["px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors", activeTab.value === "notes" ? "border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50" : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"])}"> Important Notes </button></div><div class="p-6">`);
      if (activeTab.value === "itinerary") {
        _push(`<div class="relative border-l border-zinc-200 dark:border-zinc-800 pl-6 ml-3 space-y-6"><!--[-->`);
        ssrRenderList(__props.itineraries, (day) => {
          _push(`<div class="relative"><span class="absolute -left-[35px] mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] text-white dark:bg-zinc-50 dark:text-zinc-900 font-bold">${ssrInterpolate(day.day)}</span><h4 class="text-base font-semibold text-zinc-900 dark:text-zinc-50">Day ${ssrInterpolate(day.day)}: ${ssrInterpolate(day.title)}</h4><!--[-->`);
          ssrRenderList(day.activity, (act, idx) => {
            _push(`<p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1 whitespace-pre-line">${ssrInterpolate(act)}</p>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]-->`);
        if (!((_c = __props.itineraries) == null ? void 0 : _c.length)) {
          _push(`<p class="text-sm text-zinc-500 text-center py-4">No itinerary setup yet.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "inclusions") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-3"><h4 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-1.5">`);
        _push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-green-500" }, null, _parent));
        _push(` What&#39;s Included </h4><ul class="space-y-2"><!--[-->`);
        ssrRenderList(__props.inclusions, (inc, idx) => {
          _push(`<li class="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2"><span class="text-green-500 mt-0.5">•</span> ${ssrInterpolate(inc)}</li>`);
        });
        _push(`<!--]-->`);
        if (!((_d = __props.inclusions) == null ? void 0 : _d.length)) {
          _push(`<p class="text-xs text-zinc-400 italic">None listed.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div><div class="space-y-3"><h4 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-1.5">`);
        _push(ssrRenderComponent(unref(XCircle), { class: "w-4 h-4 text-red-500" }, null, _parent));
        _push(` What&#39;s Excluded </h4><ul class="space-y-2"><!--[-->`);
        ssrRenderList(__props.exclusions, (exc, idx) => {
          _push(`<li class="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2"><span class="text-red-500 mt-0.5">•</span> ${ssrInterpolate(exc)}</li>`);
        });
        _push(`<!--]-->`);
        if (!((_e = __props.exclusions) == null ? void 0 : _e.length)) {
          _push(`<p class="text-xs text-zinc-400 italic">None listed.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "schedules") {
        _push(`<div class="space-y-5"><div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-50">Batch Travel Schedules</h3><p class="text-sm text-zinc-500 dark:text-zinc-400">Add or update schedule entries for this package.</p></div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.packages.batches.create", { id: __props.packageId }),
          class: "inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Add batch schedule `);
            } else {
              return [
                createVNode(unref(Pencil), { class: "w-4 h-4" }),
                createTextVNode(" Add batch schedule ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="overflow-x-auto rounded-3xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950"><table class="min-w-full divide-y text-left text-sm text-zinc-700 dark:text-zinc-300"><thead><tr class="text-zinc-500 dark:text-zinc-400"><th class="px-4 py-3 font-medium">Departure</th><th class="px-4 py-3 font-medium">Return</th><th class="px-4 py-3 font-medium">Price</th><th class="px-4 py-3 font-medium">Status</th><th class="px-4 py-3 text-right font-medium">Action</th></tr></thead><tbody class="divide-y divide-zinc-200 dark:divide-zinc-800"><!--[-->`);
        ssrRenderList(__props.schedules, (sched) => {
          _push(`<tr class="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"><td class="px-4 py-4"><div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 text-zinc-400" }, null, _parent));
          _push(`<div><p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">${ssrInterpolate(unref(formatDateString)(sched.departure_date))}</p><p class="text-xs text-zinc-500 dark:text-zinc-400">Departure</p></div></div></td><td class="px-4 py-4"><p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">${ssrInterpolate(sched.return_date ? unref(formatDateString)(sched.return_date) : "-")}</p><p class="text-xs text-zinc-500 dark:text-zinc-400">Return</p></td><td class="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">${ssrInterpolate(unref(formatCurrency)(sched.price, "PHP"))}</td><td class="px-4 py-4"><span class="${ssrRenderClass([sched.is_available ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300", "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"])}"><span class="${ssrRenderClass([sched.is_available ? "bg-emerald-500" : "bg-rose-500", "h-2.5 w-2.5 rounded-full"])}"></span> ${ssrInterpolate(sched.is_available ? "Available" : "Sold out")}</span>`);
          if (sched.is_limited && sched.is_available) {
            _push(`<p class="mt-1 text-xs text-amber-600 dark:text-amber-400">Limited slots</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td class="px-4 py-4 text-right"><div class="flex flex-wrap justify-end gap-2">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.packages.batches.edit", { id: __props.packageId, scheduleId: sched.id }),
            class: "inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Pencil), { class: "w-3.5 h-3.5" }, null, _parent2, _scopeId));
                _push2(` Edit `);
              } else {
                return [
                  createVNode(unref(Pencil), { class: "w-3.5 h-3.5" }),
                  createTextVNode(" Edit ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button type="button" class="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300 dark:hover:bg-rose-900"> Delete </button></div></td></tr>`);
        });
        _push(`<!--]-->`);
        if (!((_f = __props.schedules) == null ? void 0 : _f.length)) {
          _push(`<tr><td colspan="5" class="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">No batch schedules configured.</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "notes") {
        _push(`<div class="space-y-3"><h4 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-1.5">`);
        _push(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 text-zinc-400" }, null, _parent));
        _push(` Terms &amp; Conditions Notes </h4><ul class="space-y-3"><!--[-->`);
        ssrRenderList(__props.notes, (note, idx) => {
          _push(`<li class="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800">${ssrInterpolate(note)}</li>`);
        });
        _push(`<!--]-->`);
        if (!((_g = __props.notes) == null ? void 0 : _g.length)) {
          _push(`<p class="text-sm text-zinc-500 text-center py-4">No special notes added.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/section/PackageTabInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
