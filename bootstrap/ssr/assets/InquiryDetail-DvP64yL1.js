import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$6 } from "./AppLayout-CSZsNKr7.js";
import { Head, router } from "@inertiajs/vue3";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$2, o as openDeleteDialog } from "../ssr.js";
import { _ as _sfc_main$3 } from "./index-xORXC0Yx.js";
import { _ as _sfc_main$4, d as _sfc_main$5 } from "./CardTitle-CO_w4Cob.js";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "radix-vue";
import "lucide-vue-next";
import "./Input-B-ZniF4D.js";
import "@vueuse/core";
import "./TooltipTrigger-B2yyxzkT.js";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InquiryDetail",
  __ssrInlineRender: true,
  props: {
    inquiry: {}
  },
  setup(__props) {
    const props = __props;
    const copiedEmail = ref(false);
    const copiedPhone = ref(false);
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Inquiries",
        href: route("admin.inquiries")
      },
      {
        title: "Details",
        href: route("admin.inquiries.details", { id: props.inquiry.id })
      }
    ];
    const handleStatusChange = (newStatus) => {
      if (props.inquiry.status === newStatus) return;
      router.patch(route("admin.inquiries.status.update", { id: props.inquiry.id }), { status: newStatus }, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Inquiry status has been ${newStatus}.`);
        },
        onError: () => {
          toast.error("Failed to update inquiry status.");
        }
      });
    };
    const handleDelete = () => {
      openDeleteDialog({
        title: "Delete inquiry Permanently",
        message: `Are you sure you want to delete this inquiry? This action cannot be undone.`,
        confirmText: "Delete inquiry",
        cancelText: "Cancel",
        onConfirm: () => {
          router.delete(route("admin.inquiries.destroy", { id: props.inquiry.id }), {
            preserveScroll: true,
            onSuccess: () => {
              toast.success("Inquiry deleted successfully");
            },
            onError: () => {
              toast.error("Failed to delete inquiry. Please try again.");
            }
          });
        }
      });
    };
    const copyToClipboard = async (text, type) => {
      try {
        await navigator.clipboard.writeText(text);
        if (type === "email") {
          copiedEmail.value = true;
          setTimeout(() => copiedEmail.value = false, 2e3);
        } else {
          copiedPhone.value = true;
          setTimeout(() => copiedPhone.value = false, 2e3);
        }
      } catch (err) {
        console.error("Fallback utility failed to execute programmatic copy context", err);
      }
    };
    const triggerEmailClient = () => {
      const baseUrl = "https://mail.google.com/mail/?view=cm&fs=1";
      const targetEmail = encodeURIComponent(props.inquiry.email);
      const subject = encodeURIComponent(
        `Regarding your Travel Inquiry`
      );
      const body = encodeURIComponent(
        `Hello ${props.inquiry.fullname},

Greetings from Reliable International Travel Services!

Thank you for reaching out to us regarding your inquiry.

────────────────────

YOUR MESSAGE:
"${props.inquiry.message}"

────────────────────

Our travel team will review your concern and respond as soon as possible.

If you have additional questions, feel free to reply to this email.

Best regards,
Reliable International Travel Services
Official Travel Support Team
`
      );
      window.open(
        `${baseUrl}&to=${targetEmail}&su=${subject}&body=${body}`,
        "_blank"
      );
    };
    const triggerPhoneDialer = () => {
      if (props.inquiry.phone) {
        window.location.href = `tel:${props.inquiry.phone}`;
      }
    };
    const getStatusStyles = (status) => {
      switch (status) {
        case "pending":
          return "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50";
        case "resolved":
          return "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50";
        case "dismissed":
          return "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800";
        default:
          return "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800";
      }
    };
    const formatLongDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Inquiry #${__props.inquiry.id} - ${__props.inquiry.fullname}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-6xl mx-auto w-full p-4 md:p-6 lg:p-8 space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-100 dark:border-zinc-900"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "icon",
              class: "h-9 w-9 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
              onClick: ($event) => unref(router).visit(_ctx.route("admin.inquiries"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "iconoir:arrow-left",
                    class: "text-lg"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Icon), {
                      icon: "iconoir:arrow-left",
                      class: "text-lg"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><div class="flex items-center gap-2.5"${_scopeId}><h1 class="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight"${_scopeId}> Inquiry #${ssrInterpolate(__props.inquiry.id)}</h1>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: "outline",
              class: ["capitalize font-medium tracking-wide text-[11px] px-2.5 py-0.5 rounded-full shadow-none", getStatusStyles(__props.inquiry.status)]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.inquiry.status)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.inquiry.status), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><p class="text-xs text-muted-foreground mt-0.5"${_scopeId}> Received on ${ssrInterpolate(formatLongDate(__props.inquiry.created_at))}</p></div></div><div class="flex items-center gap-2"${_scopeId}>`);
            if (__props.inquiry.status === "pending") {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                size: "sm",
                variant: "outline",
                class: "h-9 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900",
                onClick: ($event) => handleStatusChange("dismissed")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: "iconoir:cancel",
                      class: "mr-1.5 text-zinc-400"
                    }, null, _parent3, _scopeId2));
                    _push3(` Dismiss `);
                  } else {
                    return [
                      createVNode(unref(Icon), {
                        icon: "iconoir:cancel",
                        class: "mr-1.5 text-zinc-400"
                      }),
                      createTextVNode(" Dismiss ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                size: "sm",
                class: "h-9 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm",
                onClick: ($event) => handleStatusChange("resolved")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: "iconoir:check-circle-solid",
                      class: "mr-1.5 text-emerald-500 dark:text-emerald-600"
                    }, null, _parent3, _scopeId2));
                    _push3(` Mark as Resolved `);
                  } else {
                    return [
                      createVNode(unref(Icon), {
                        icon: "iconoir:check-circle-solid",
                        class: "mr-1.5 text-emerald-500 dark:text-emerald-600"
                      }),
                      createTextVNode(" Mark as Resolved ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                size: "sm",
                variant: "outline",
                class: "h-9 text-xs font-medium border-zinc-200 dark:border-zinc-800",
                onClick: ($event) => handleStatusChange("pending")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: "iconoir:undo",
                      class: "mr-1.5 text-zinc-400"
                    }, null, _parent3, _scopeId2));
                    _push3(` Reopen Inquiry `);
                  } else {
                    return [
                      createVNode(unref(Icon), {
                        icon: "iconoir:undo",
                        class: "mr-1.5 text-zinc-400"
                      }),
                      createTextVNode(" Reopen Inquiry ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                size: "sm",
                variant: "outline",
                class: "h-9 text-xs font-medium border-red-200 dark:border-red-800 text-red-400 hover:bg-red-50 dark:hover:bg-red-900",
                onClick: ($event) => handleDelete()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: "material-symbols:delete",
                      class: "mr-1.5 text-red-400 dark:text-red-600 hover:text-red-50"
                    }, null, _parent3, _scopeId2));
                    _push3(` Delete Permanently `);
                  } else {
                    return [
                      createVNode(unref(Icon), {
                        icon: "material-symbols:delete",
                        class: "mr-1.5 text-red-400 dark:text-red-600 hover:text-red-50"
                      }),
                      createTextVNode(" Delete Permanently ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"${_scopeId}><div class="lg:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between"${_scopeId2}><span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"${_scopeId2}> Client Message Plaintext </span></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "p-6 md:p-8" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-sm md:text-base leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800"${_scopeId3}>${ssrInterpolate(__props.inquiry.message)}</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-sm md:text-base leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800" }, toDisplayString(__props.inquiry.message), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between" }, [
                      createVNode("span", { class: "text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" }, " Client Message Plaintext ")
                    ]),
                    createVNode(unref(_sfc_main$5), { class: "p-6 md:p-8" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-sm md:text-base leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800" }, toDisplayString(__props.inquiry.message), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-5"${_scopeId2}><h2 class="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4"${_scopeId2}> Sender Meta Data </h2><div class="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-900/60 mb-5"${_scopeId2}><div class="h-10 w-10 shrink-0 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center font-bold text-sm"${_scopeId2}>${ssrInterpolate(__props.inquiry.fullname.charAt(0).toUpperCase())}</div><div class="min-w-0"${_scopeId2}><div class="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate"${_scopeId2}>${ssrInterpolate(__props.inquiry.fullname)}</div><div class="text-[11px] text-muted-foreground"${_scopeId2}>Inbound Contact Profile</div></div></div><div class="space-y-5"${_scopeId2}><div class="space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><label class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block"${_scopeId2}> Email Address </label><button class="text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition" title="Copy clean email string to paste manually"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: copiedEmail.value ? "iconoir:check" : "iconoir:copy",
                    class: ["text-xs", { "text-emerald-500": copiedEmail.value }]
                  }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(copiedEmail.value ? "Copied" : "Copy Email")}</button></div><div class="font-mono text-xs text-zinc-800 dark:text-zinc-300 break-all bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40"${_scopeId2}>${ssrInterpolate(__props.inquiry.email)}</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    onClick: triggerEmailClient,
                    size: "sm",
                    variant: "outline",
                    class: "w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Icon), {
                          icon: "iconoir:google",
                          class: "mr-2 text-zinc-400"
                        }, null, _parent4, _scopeId3));
                        _push4(` Reply via Gmail Web `);
                      } else {
                        return [
                          createVNode(unref(Icon), {
                            icon: "iconoir:google",
                            class: "mr-2 text-zinc-400"
                          }),
                          createTextVNode(" Reply via Gmail Web ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "bg-zinc-100 dark:bg-zinc-900" }, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><label class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block"${_scopeId2}> Phone Number </label>`);
                  if (__props.inquiry.phone) {
                    _push3(`<button class="text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition" title="Copy phone sequence"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: copiedPhone.value ? "iconoir:check" : "iconoir:copy",
                      class: ["text-xs", { "text-emerald-500": copiedPhone.value }]
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(copiedPhone.value ? "Copied" : "Copy Number")}</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  if (__props.inquiry.phone) {
                    _push3(`<!--[--><div class="font-mono text-xs text-zinc-800 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40"${_scopeId2}>${ssrInterpolate(__props.inquiry.phone)}</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      onClick: triggerPhoneDialer,
                      size: "sm",
                      variant: "outline",
                      class: "w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Icon), {
                            icon: "iconoir:phone",
                            class: "mr-2 text-zinc-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Call Customer Now `);
                        } else {
                          return [
                            createVNode(unref(Icon), {
                              icon: "iconoir:phone",
                              class: "mr-2 text-zinc-400"
                            }),
                            createTextVNode(" Call Customer Now ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<div class="text-xs text-zinc-400/60 italic p-3 bg-zinc-50/50 dark:bg-zinc-900/20 border border-dashed border-zinc-100 dark:border-zinc-900/60 rounded flex items-center gap-1.5"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Icon), {
                      icon: "iconoir:phone-disabled",
                      class: "text-zinc-400/40 text-sm shrink-0"
                    }, null, _parent3, _scopeId2));
                    _push3(` No phone metadata left </div>`);
                  }
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-5" }, [
                      createVNode("h2", { class: "text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4" }, " Sender Meta Data "),
                      createVNode("div", { class: "flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-900/60 mb-5" }, [
                        createVNode("div", { class: "h-10 w-10 shrink-0 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center font-bold text-sm" }, toDisplayString(__props.inquiry.fullname.charAt(0).toUpperCase()), 1),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("div", { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate" }, toDisplayString(__props.inquiry.fullname), 1),
                          createVNode("div", { class: "text-[11px] text-muted-foreground" }, "Inbound Contact Profile")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-5" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("label", { class: "text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block" }, " Email Address "),
                            createVNode("button", {
                              onClick: ($event) => copyToClipboard(__props.inquiry.email, "email"),
                              class: "text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition",
                              title: "Copy clean email string to paste manually"
                            }, [
                              createVNode(unref(Icon), {
                                icon: copiedEmail.value ? "iconoir:check" : "iconoir:copy",
                                class: ["text-xs", { "text-emerald-500": copiedEmail.value }]
                              }, null, 8, ["icon", "class"]),
                              createTextVNode(" " + toDisplayString(copiedEmail.value ? "Copied" : "Copy Email"), 1)
                            ], 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "font-mono text-xs text-zinc-800 dark:text-zinc-300 break-all bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40" }, toDisplayString(__props.inquiry.email), 1),
                          createVNode(unref(_sfc_main$2), {
                            onClick: triggerEmailClient,
                            size: "sm",
                            variant: "outline",
                            class: "w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Icon), {
                                icon: "iconoir:google",
                                class: "mr-2 text-zinc-400"
                              }),
                              createTextVNode(" Reply via Gmail Web ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), { class: "bg-zinc-100 dark:bg-zinc-900" }),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("label", { class: "text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block" }, " Phone Number "),
                            __props.inquiry.phone ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => copyToClipboard(__props.inquiry.phone, "phone"),
                              class: "text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition",
                              title: "Copy phone sequence"
                            }, [
                              createVNode(unref(Icon), {
                                icon: copiedPhone.value ? "iconoir:check" : "iconoir:copy",
                                class: ["text-xs", { "text-emerald-500": copiedPhone.value }]
                              }, null, 8, ["icon", "class"]),
                              createTextVNode(" " + toDisplayString(copiedPhone.value ? "Copied" : "Copy Number"), 1)
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          __props.inquiry.phone ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode("div", { class: "font-mono text-xs text-zinc-800 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40" }, toDisplayString(__props.inquiry.phone), 1),
                            createVNode(unref(_sfc_main$2), {
                              onClick: triggerPhoneDialer,
                              size: "sm",
                              variant: "outline",
                              class: "w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Icon), {
                                  icon: "iconoir:phone",
                                  class: "mr-2 text-zinc-400"
                                }),
                                createTextVNode(" Call Customer Now ")
                              ]),
                              _: 1
                            })
                          ], 64)) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-xs text-zinc-400/60 italic p-3 bg-zinc-50/50 dark:bg-zinc-900/20 border border-dashed border-zinc-100 dark:border-zinc-900/60 rounded flex items-center gap-1.5"
                          }, [
                            createVNode(unref(Icon), {
                              icon: "iconoir:phone-disabled",
                              class: "text-zinc-400/40 text-sm shrink-0"
                            }),
                            createTextVNode(" No phone metadata left ")
                          ]))
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/20 p-4 text-xs text-muted-foreground flex items-start gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "iconoir:info-empty",
              class: "text-sm mt-0.5 text-zinc-400 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}> Clicking <span class="font-medium text-zinc-800 dark:text-zinc-200"${_scopeId}>Reply via Gmail Web</span> safely opens an external browser tab containing pre-filled message data. </div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-6xl mx-auto w-full p-4 md:p-6 lg:p-8 space-y-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-100 dark:border-zinc-900" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "icon",
                      class: "h-9 w-9 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
                      onClick: ($event) => unref(router).visit(_ctx.route("admin.inquiries"))
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Icon), {
                          icon: "iconoir:arrow-left",
                          class: "text-lg"
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center gap-2.5" }, [
                        createVNode("h1", { class: "text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight" }, " Inquiry #" + toDisplayString(__props.inquiry.id), 1),
                        createVNode(unref(_sfc_main$3), {
                          variant: "outline",
                          class: ["capitalize font-medium tracking-wide text-[11px] px-2.5 py-0.5 rounded-full shadow-none", getStatusStyles(__props.inquiry.status)]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.inquiry.status), 1)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, " Received on " + toDisplayString(formatLongDate(__props.inquiry.created_at)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    __props.inquiry.status === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode(unref(_sfc_main$2), {
                        size: "sm",
                        variant: "outline",
                        class: "h-9 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900",
                        onClick: ($event) => handleStatusChange("dismissed")
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Icon), {
                            icon: "iconoir:cancel",
                            class: "mr-1.5 text-zinc-400"
                          }),
                          createTextVNode(" Dismiss ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(unref(_sfc_main$2), {
                        size: "sm",
                        class: "h-9 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm",
                        onClick: ($event) => handleStatusChange("resolved")
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Icon), {
                            icon: "iconoir:check-circle-solid",
                            class: "mr-1.5 text-emerald-500 dark:text-emerald-600"
                          }),
                          createTextVNode(" Mark as Resolved ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode(unref(_sfc_main$2), {
                        size: "sm",
                        variant: "outline",
                        class: "h-9 text-xs font-medium border-zinc-200 dark:border-zinc-800",
                        onClick: ($event) => handleStatusChange("pending")
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Icon), {
                            icon: "iconoir:undo",
                            class: "mr-1.5 text-zinc-400"
                          }),
                          createTextVNode(" Reopen Inquiry ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(unref(_sfc_main$2), {
                        size: "sm",
                        variant: "outline",
                        class: "h-9 text-xs font-medium border-red-200 dark:border-red-800 text-red-400 hover:bg-red-50 dark:hover:bg-red-900",
                        onClick: ($event) => handleDelete()
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Icon), {
                            icon: "material-symbols:delete",
                            class: "mr-1.5 text-red-400 dark:text-red-600 hover:text-red-50"
                          }),
                          createTextVNode(" Delete Permanently ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ], 64))
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" }, [
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode(unref(_sfc_main$4), { class: "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between" }, [
                          createVNode("span", { class: "text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" }, " Client Message Plaintext ")
                        ]),
                        createVNode(unref(_sfc_main$5), { class: "p-6 md:p-8" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-sm md:text-base leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800" }, toDisplayString(__props.inquiry.message), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode(unref(_sfc_main$4), { class: "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-5" }, [
                          createVNode("h2", { class: "text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4" }, " Sender Meta Data "),
                          createVNode("div", { class: "flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-900/60 mb-5" }, [
                            createVNode("div", { class: "h-10 w-10 shrink-0 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center font-bold text-sm" }, toDisplayString(__props.inquiry.fullname.charAt(0).toUpperCase()), 1),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("div", { class: "text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate" }, toDisplayString(__props.inquiry.fullname), 1),
                              createVNode("div", { class: "text-[11px] text-muted-foreground" }, "Inbound Contact Profile")
                            ])
                          ]),
                          createVNode("div", { class: "space-y-5" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("label", { class: "text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block" }, " Email Address "),
                                createVNode("button", {
                                  onClick: ($event) => copyToClipboard(__props.inquiry.email, "email"),
                                  class: "text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition",
                                  title: "Copy clean email string to paste manually"
                                }, [
                                  createVNode(unref(Icon), {
                                    icon: copiedEmail.value ? "iconoir:check" : "iconoir:copy",
                                    class: ["text-xs", { "text-emerald-500": copiedEmail.value }]
                                  }, null, 8, ["icon", "class"]),
                                  createTextVNode(" " + toDisplayString(copiedEmail.value ? "Copied" : "Copy Email"), 1)
                                ], 8, ["onClick"])
                              ]),
                              createVNode("div", { class: "font-mono text-xs text-zinc-800 dark:text-zinc-300 break-all bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40" }, toDisplayString(__props.inquiry.email), 1),
                              createVNode(unref(_sfc_main$2), {
                                onClick: triggerEmailClient,
                                size: "sm",
                                variant: "outline",
                                class: "w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Icon), {
                                    icon: "iconoir:google",
                                    class: "mr-2 text-zinc-400"
                                  }),
                                  createTextVNode(" Reply via Gmail Web ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(unref(_sfc_main$6), { class: "bg-zinc-100 dark:bg-zinc-900" }),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("label", { class: "text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block" }, " Phone Number "),
                                __props.inquiry.phone ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => copyToClipboard(__props.inquiry.phone, "phone"),
                                  class: "text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition",
                                  title: "Copy phone sequence"
                                }, [
                                  createVNode(unref(Icon), {
                                    icon: copiedPhone.value ? "iconoir:check" : "iconoir:copy",
                                    class: ["text-xs", { "text-emerald-500": copiedPhone.value }]
                                  }, null, 8, ["icon", "class"]),
                                  createTextVNode(" " + toDisplayString(copiedPhone.value ? "Copied" : "Copy Number"), 1)
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              __props.inquiry.phone ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode("div", { class: "font-mono text-xs text-zinc-800 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40" }, toDisplayString(__props.inquiry.phone), 1),
                                createVNode(unref(_sfc_main$2), {
                                  onClick: triggerPhoneDialer,
                                  size: "sm",
                                  variant: "outline",
                                  class: "w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Icon), {
                                      icon: "iconoir:phone",
                                      class: "mr-2 text-zinc-400"
                                    }),
                                    createTextVNode(" Call Customer Now ")
                                  ]),
                                  _: 1
                                })
                              ], 64)) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-xs text-zinc-400/60 italic p-3 bg-zinc-50/50 dark:bg-zinc-900/20 border border-dashed border-zinc-100 dark:border-zinc-900/60 rounded flex items-center gap-1.5"
                              }, [
                                createVNode(unref(Icon), {
                                  icon: "iconoir:phone-disabled",
                                  class: "text-zinc-400/40 text-sm shrink-0"
                                }),
                                createTextVNode(" No phone metadata left ")
                              ]))
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/20 p-4 text-xs text-muted-foreground flex items-start gap-2" }, [
                      createVNode(unref(Icon), {
                        icon: "iconoir:info-empty",
                        class: "text-sm mt-0.5 text-zinc-400 shrink-0"
                      }),
                      createVNode("div", null, [
                        createTextVNode(" Clicking "),
                        createVNode("span", { class: "font-medium text-zinc-800 dark:text-zinc-200" }, "Reply via Gmail Web"),
                        createTextVNode(" safely opens an external browser tab containing pre-filled message data. ")
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/inquiry/InquiryDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
