import { defineComponent, resolveComponent, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-CSZsNKr7.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$3 } from "./Label-6hRdN-Dm.js";
import { _ as _sfc_main$4 } from "./Input-B-ZniF4D.js";
import { _ as _sfc_main$5 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$6 } from "./CurrencyInput-CAb2z1r8.js";
import { _ as _sfc_main$8 } from "./Textarea-BvWBAMsq.js";
import { _ as _sfc_main$7 } from "./InfoTooltip-RCL49eOv.js";
import { _ as _sfc_main$9 } from "../ssr.js";
import { LoaderCircle } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "radix-vue";
import "./TooltipTrigger-B2yyxzkT.js";
import "@vueuse/core";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "./CardTitle-CO_w4Cob.js";
import "./index-xORXC0Yx.js";
import "./TooltipProvider-D2JAfXHP.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreatePackage",
  __ssrInlineRender: true,
  setup(__props) {
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
        title: "New",
        href: route("admin.packages.create")
      }
    ];
    const form = useForm({
      name: "",
      duration: "",
      tag: "",
      description: "",
      base_price: "",
      down_payment: "",
      inclusions: "",
      exclusions: "",
      highlights: "",
      destination: "",
      itineraries: "",
      selling_start_date: "",
      selling_end_date: "",
      season: "",
      notes: "",
      is_foreign_only: false
    });
    const submit = () => {
      form.post(route("admin.packages.store"), {
        onFinish: () => {
        },
        onSuccess: () => {
          form.reset();
          toast.success("Saved successfully");
        },
        onError: () => {
          toast.error("Something went wrong");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Switch = resolveComponent("Switch");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "New Package" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"${_scopeId}><div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"${_scopeId}><div class="flex flex-col space-y-6 max-w-4xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Creating a new package",
              description: "Create a package that can be added for your service"
            }, null, _parent2, _scopeId));
            _push2(`<form class="flex flex-col gap-2"${_scopeId}><div class="grid gap-6 md:grid-cols-2"${_scopeId}><div class=""${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Name <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createTextVNode(" Name "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "name",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              autocomplete: "name",
              placeholder: "e.g. Premium Boracay Package"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "duration" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Duration <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createTextVNode(" Duration "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "duration",
              type: "number",
              class: "mt-1 block w-full",
              modelValue: unref(form).duration,
              "onUpdate:modelValue": ($event) => unref(form).duration = $event,
              autocomplete: "duration",
              placeholder: "How many days is your trip?"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.duration
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid gap-6 md:grid-cols-2"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "base_price" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Base Price <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createTextVNode(" Base Price "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              id: "base_price",
              class: "mt-1 block w-full",
              modelValue: unref(form).base_price,
              "onUpdate:modelValue": ($event) => unref(form).base_price = $event,
              autocomplete: "base_price",
              placeholder: "0.00"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.base_price
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "down_payment" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Down Payment <span class="text-[var(--muted-custom)]"${_scopeId2}>(Optional)</span>`);
                } else {
                  return [
                    createTextVNode(" Down Payment "),
                    createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              id: "down_payment",
              class: "mt-1 block w-full",
              modelValue: unref(form).down_payment,
              "onUpdate:modelValue": ($event) => unref(form).down_payment = $event,
              autocomplete: "down_payment",
              placeholder: "0.00"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.down_payment
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid gap-6 md:grid-cols-2"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "destination" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Destination <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createTextVNode(" Destination "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "destination",
              class: "mt-1 block w-full",
              modelValue: unref(form).destination,
              "onUpdate:modelValue": ($event) => unref(form).destination = $event,
              autocomplete: "destinations",
              placeholder: "e.g. Boracay, Philippines"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.destination
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "season",
              class: "flex items-center gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, { content: "Value must only: 'All Seasons', 'Winter', 'Spring', 'Summer', 'Autumn'" }, null, _parent3, _scopeId2));
                  _push3(` Season <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$7, { content: "Value must only: 'All Seasons', 'Winter', 'Spring', 'Summer', 'Autumn'" }),
                    createTextVNode(" Season "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "season",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).season,
              "onUpdate:modelValue": ($event) => unref(form).season = $event,
              autocomplete: "season",
              placeholder: "e.g. Winter"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.season
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid gap-2 md:grid-cols-2"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "selling_start_date" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Selling Start Date <span class="text-[var(--muted-custom)]"${_scopeId2}>(Optional)</span>`);
                } else {
                  return [
                    createTextVNode("Selling Start Date "),
                    createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "selling_start_date",
              type: "date",
              class: "mt-1 block w-full",
              modelValue: unref(form).selling_start_date,
              "onUpdate:modelValue": ($event) => unref(form).selling_start_date = $event,
              autocomplete: "selling_start_date",
              placeholder: "e.g. Group tour"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.selling_start_date
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "selling_end_date" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Selling End Date <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createTextVNode(" Selling End Date "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "selling_end_date",
              type: "date",
              class: "mt-1 block w-full",
              modelValue: unref(form).selling_end_date,
              "onUpdate:modelValue": ($event) => unref(form).selling_end_date = $event,
              autocomplete: "selling_end_date",
              placeholder: "e.g. Group tour"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.selling_end_date
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid gap-2 md:grid-cols-2"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "tag" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Tag <span class="text-[var(--muted-custom)]"${_scopeId2}>(Optional)</span>`);
                } else {
                  return [
                    createTextVNode("Tag "),
                    createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "tag",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).tag,
              "onUpdate:modelValue": ($event) => unref(form).tag = $event,
              autocomplete: "tag",
              placeholder: "e.g. Group tour"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.tag
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { for: "description" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Description <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createTextVNode(" Description "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "description",
              rows: "8",
              class: "mt-1 block w-full",
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              autocomplete: "description",
              placeholder: "Tell us about this package?"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-6 md:grid-cols-2"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "inclusions",
              class: "flex items-center gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, { content: "Separate each inclusion group using an empty line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }, null, _parent3, _scopeId2));
                  _push3(` Inclusions <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$7, { content: "Separate each inclusion group using an empty line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }),
                    createTextVNode(" Inclusions "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "inclusions",
              rows: "10",
              class: "mt-1 block w-full",
              modelValue: unref(form).inclusions,
              "onUpdate:modelValue": ($event) => unref(form).inclusions = $event,
              autocomplete: "inclusions",
              placeholder: "What's included to this package?"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.inclusions
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "exclusions",
              class: "flex items-center gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, { content: "Separate each exclusion group using an empty line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }, null, _parent3, _scopeId2));
                  _push3(` Exclusions <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$7, { content: "Separate each exclusion group using an empty line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }),
                    createTextVNode(" Exclusions "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "exclusions",
              rows: "10",
              class: "mt-1 block w-full",
              modelValue: unref(form).exclusions,
              "onUpdate:modelValue": ($event) => unref(form).exclusions = $event,
              autocomplete: "exclusions",
              placeholder: "What's not included in this package?"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.exclusions
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "highlights",
              class: "flex items-center gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, { content: "Separate each highlight group using a new line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }, null, _parent3, _scopeId2));
                  _push3(` Highlights <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$7, { content: "Separate each highlight group using a new line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }),
                    createTextVNode(" Highlights "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "highlights",
              rows: "10",
              class: "mt-1 block w-full",
              modelValue: unref(form).highlights,
              "onUpdate:modelValue": ($event) => unref(form).highlights = $event,
              autocomplete: "highlights",
              placeholder: "What's different about this package?"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.highlights
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "itineraries",
              class: "flex items-center gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, { content: "Each itinerary group must follow this format:\n\n                                Title of itinerary (first line)\n                                Activity details (next lines)\n\n                                Example:\n\n                                Manila to Sydney | Arrival & Free Time\n                                Depart Manila via flight...\n                                Meals included...\n\n                                Sydney City Tour & Harbour Cruise\n                                Visit Sydney Opera House\n                                Explore Bondi Beach\n                                Lunch cruise experience" }, null, _parent3, _scopeId2));
                  _push3(` Itineraries <span class="text-[var(--warning-custom)]"${_scopeId2}>*</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$7, { content: "Each itinerary group must follow this format:\n\n                                Title of itinerary (first line)\n                                Activity details (next lines)\n\n                                Example:\n\n                                Manila to Sydney | Arrival & Free Time\n                                Depart Manila via flight...\n                                Meals included...\n\n                                Sydney City Tour & Harbour Cruise\n                                Visit Sydney Opera House\n                                Explore Bondi Beach\n                                Lunch cruise experience" }),
                    createTextVNode(" Itineraries "),
                    createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "itineraries",
              rows: "10",
              class: "mt-1 block w-full",
              modelValue: unref(form).itineraries,
              "onUpdate:modelValue": ($event) => unref(form).itineraries = $event,
              autocomplete: "itineraries",
              placeholder: "Any activities included in this package?"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.itineraries
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "notes",
              class: "flex items-center gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, { content: "Use this format to each notes group.\n\n                                    Note 1.\n                                    Note 2.\n                                    Note 3." }, null, _parent3, _scopeId2));
                  _push3(` Notes <span class="text-[var(--muted-custom)]"${_scopeId2}>(Optional)</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$7, { content: "Use this format to each notes group.\n\n                                    Note 1.\n                                    Note 2.\n                                    Note 3." }),
                    createTextVNode(" Notes "),
                    createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "notes",
              rows: "4",
              class: "mt-1 block w-full",
              modelValue: unref(form).notes,
              "onUpdate:modelValue": ($event) => unref(form).notes = $event,
              autocomplete: "notes",
              placeholder: "What else the client should know about this package?"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[1.5rem]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.notes
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex w-full justify-start"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Switch, {
              id: "foreign-only",
              modelValue: unref(form).is_foreign_only,
              "onUpdate:modelValue": ($event) => unref(form).is_foreign_only = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { for: "foreign-only" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Make Package For Foreign Only`);
                } else {
                  return [
                    createTextVNode("Make Package For Foreign Only")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex w-full justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$9), {
              type: "submit",
              class: ["mt-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(ssrRenderComponent(unref(LoaderCircle), { class: "h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Create Package `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Create Package ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4" }, [
                createVNode("div", { class: "relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" }, [
                  createVNode("div", { class: "flex flex-col space-y-6 max-w-4xl" }, [
                    createVNode(_sfc_main$2, {
                      title: "Creating a new package",
                      description: "Create a package that can be added for your service"
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "flex flex-col gap-2"
                    }, [
                      createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "" }, [
                          createVNode(_sfc_main$3, { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode(" Name "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "name",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            autocomplete: "name",
                            placeholder: "e.g. Premium Boracay Package"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.name
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "duration" }, {
                            default: withCtx(() => [
                              createTextVNode(" Duration "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "duration",
                            type: "number",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).duration,
                            "onUpdate:modelValue": ($event) => unref(form).duration = $event,
                            autocomplete: "duration",
                            placeholder: "How many days is your trip?"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.duration
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "base_price" }, {
                            default: withCtx(() => [
                              createTextVNode(" Base Price "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$6, {
                            id: "base_price",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).base_price,
                            "onUpdate:modelValue": ($event) => unref(form).base_price = $event,
                            autocomplete: "base_price",
                            placeholder: "0.00"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.base_price
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "down_payment" }, {
                            default: withCtx(() => [
                              createTextVNode(" Down Payment "),
                              createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$6, {
                            id: "down_payment",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).down_payment,
                            "onUpdate:modelValue": ($event) => unref(form).down_payment = $event,
                            autocomplete: "down_payment",
                            placeholder: "0.00"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.down_payment
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "destination" }, {
                            default: withCtx(() => [
                              createTextVNode(" Destination "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "destination",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).destination,
                            "onUpdate:modelValue": ($event) => unref(form).destination = $event,
                            autocomplete: "destinations",
                            placeholder: "e.g. Boracay, Philippines"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.destination
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, {
                            for: "season",
                            class: "flex items-center gap-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$7, { content: "Value must only: 'All Seasons', 'Winter', 'Spring', 'Summer', 'Autumn'" }),
                              createTextVNode(" Season "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "season",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).season,
                            "onUpdate:modelValue": ($event) => unref(form).season = $event,
                            autocomplete: "season",
                            placeholder: "e.g. Winter"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.season
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2 md:grid-cols-2" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "selling_start_date" }, {
                            default: withCtx(() => [
                              createTextVNode("Selling Start Date "),
                              createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "selling_start_date",
                            type: "date",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).selling_start_date,
                            "onUpdate:modelValue": ($event) => unref(form).selling_start_date = $event,
                            autocomplete: "selling_start_date",
                            placeholder: "e.g. Group tour"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.selling_start_date
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "selling_end_date" }, {
                            default: withCtx(() => [
                              createTextVNode(" Selling End Date "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "selling_end_date",
                            type: "date",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).selling_end_date,
                            "onUpdate:modelValue": ($event) => unref(form).selling_end_date = $event,
                            autocomplete: "selling_end_date",
                            placeholder: "e.g. Group tour"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.selling_end_date
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2 md:grid-cols-2" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, { for: "tag" }, {
                            default: withCtx(() => [
                              createTextVNode("Tag "),
                              createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            id: "tag",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).tag,
                            "onUpdate:modelValue": ($event) => unref(form).tag = $event,
                            autocomplete: "tag",
                            placeholder: "e.g. Group tour"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.tag
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_sfc_main$3, { for: "description" }, {
                          default: withCtx(() => [
                            createTextVNode(" Description "),
                            createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$8, {
                          id: "description",
                          rows: "8",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          autocomplete: "description",
                          placeholder: "Tell us about this package?"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "min-h-[1.5rem]" }, [
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.description
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, {
                            for: "inclusions",
                            class: "flex items-center gap-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$7, { content: "Separate each inclusion group using an empty line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }),
                              createTextVNode(" Inclusions "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$8, {
                            id: "inclusions",
                            rows: "10",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).inclusions,
                            "onUpdate:modelValue": ($event) => unref(form).inclusions = $event,
                            autocomplete: "inclusions",
                            placeholder: "What's included to this package?"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.inclusions
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_sfc_main$3, {
                            for: "exclusions",
                            class: "flex items-center gap-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$7, { content: "Separate each exclusion group using an empty line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }),
                              createTextVNode(" Exclusions "),
                              createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$8, {
                            id: "exclusions",
                            rows: "10",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).exclusions,
                            "onUpdate:modelValue": ($event) => unref(form).exclusions = $event,
                            autocomplete: "exclusions",
                            placeholder: "What's not included in this package?"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "min-h-[1.5rem]" }, [
                            createVNode(_sfc_main$5, {
                              message: unref(form).errors.exclusions
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_sfc_main$3, {
                          for: "highlights",
                          class: "flex items-center gap-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$7, { content: "Separate each highlight group using a new line.\n\n                                    Hotel accommodation\n                                    Tour Guide\n                                    English speaking tour guide\n                                    Professional tour guide" }),
                            createTextVNode(" Highlights "),
                            createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$8, {
                          id: "highlights",
                          rows: "10",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).highlights,
                          "onUpdate:modelValue": ($event) => unref(form).highlights = $event,
                          autocomplete: "highlights",
                          placeholder: "What's different about this package?"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "min-h-[1.5rem]" }, [
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.highlights
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_sfc_main$3, {
                          for: "itineraries",
                          class: "flex items-center gap-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$7, { content: "Each itinerary group must follow this format:\n\n                                Title of itinerary (first line)\n                                Activity details (next lines)\n\n                                Example:\n\n                                Manila to Sydney | Arrival & Free Time\n                                Depart Manila via flight...\n                                Meals included...\n\n                                Sydney City Tour & Harbour Cruise\n                                Visit Sydney Opera House\n                                Explore Bondi Beach\n                                Lunch cruise experience" }),
                            createTextVNode(" Itineraries "),
                            createVNode("span", { class: "text-[var(--warning-custom)]" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$8, {
                          id: "itineraries",
                          rows: "10",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).itineraries,
                          "onUpdate:modelValue": ($event) => unref(form).itineraries = $event,
                          autocomplete: "itineraries",
                          placeholder: "Any activities included in this package?"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "min-h-[1.5rem]" }, [
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.itineraries
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_sfc_main$3, {
                          for: "notes",
                          class: "flex items-center gap-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$7, { content: "Use this format to each notes group.\n\n                                    Note 1.\n                                    Note 2.\n                                    Note 3." }),
                            createTextVNode(" Notes "),
                            createVNode("span", { class: "text-[var(--muted-custom)]" }, "(Optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$8, {
                          id: "notes",
                          rows: "4",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).notes,
                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                          autocomplete: "notes",
                          placeholder: "What else the client should know about this package?"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "min-h-[1.5rem]" }, [
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.notes
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "flex w-full justify-start" }, [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode(_component_Switch, {
                            id: "foreign-only",
                            modelValue: unref(form).is_foreign_only,
                            "onUpdate:modelValue": ($event) => unref(form).is_foreign_only = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$3, { for: "foreign-only" }, {
                            default: withCtx(() => [
                              createTextVNode("Make Package For Foreign Only")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", { class: "flex w-full justify-end" }, [
                        createVNode(unref(_sfc_main$9), {
                          type: "submit",
                          class: ["mt-4", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                              key: 0,
                              class: "h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" Create Package ")
                          ]),
                          _: 1
                        }, 8, ["class", "disabled"])
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/package/CreatePackage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
