import { defineComponent, computed, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$c } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$1, i as _sfc_main$6, j as _sfc_main$7, k as _sfc_main$8, a as _sfc_main$d } from "./AppLayout-CSZsNKr7.js";
import { _ as _sfc_main$3 } from "./index-xORXC0Yx.js";
import { a as formatDateString, _ as _sfc_main$2, o as openDeleteDialog } from "../ssr.js";
import { _ as _sfc_main$4, d as _sfc_main$5, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b } from "./CardTitle-CO_w4Cob.js";
import { usePage, useForm, Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, Pencil, CirclePlus, CircleMinus, Trash2, ShieldAlert, Shield, CheckCircle2, Mail, CircleAlert, Phone, User } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "radix-vue";
import "./Input-B-ZniF4D.js";
import "@vueuse/core";
import "./TooltipTrigger-B2yyxzkT.js";
import "@iconify/vue";
import "./AppLogoIcon-B2fdtLWF.js";
import "./BreadcrumbSeparator-BM3Ehm2Y.js";
import "@vue/server-renderer";
import "@inertiajs/vue3/server";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminAccountDetail",
  __ssrInlineRender: true,
  props: {
    admin: {}
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const isCurrentUser = computed(() => {
      const authUser = page.props.auth.user;
      return (authUser == null ? void 0 : authUser.id) === props.admin.id;
    });
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: route("admin.dashboard")
      },
      {
        title: "Admin Management",
        href: route("admin.users.admins")
      },
      {
        title: "Details",
        href: route("admin.users.admins.details", { id: props.admin.id })
      }
    ];
    const initials = computed(() => {
      return props.admin.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    });
    const statusVariant = computed(() => {
      switch (props.admin.status) {
        case "active":
          return "default";
        case "inactive":
          return "secondary";
        default:
          return "destructive";
      }
    });
    const isEmailVerified = computed(() => Boolean(props.admin.email_verified_at));
    const emailVerifiedDate = computed(() => formatDateString(props.admin.email_verified_at ?? void 0, true));
    const isSendingVerification = ref(false);
    const form = useForm({
      id: props.admin.id,
      email: props.admin.email
    });
    const sendVerificationEmail = () => {
      form.post(route("admin.verify.email.send"), {
        onStart: () => {
          isSendingVerification.value = true;
        },
        onFinish: () => {
          isSendingVerification.value = false;
        },
        onSuccess: () => {
          toast.success("Verification email sent successfully.");
        }
      });
    };
    const onDelete = () => {
      openDeleteDialog({
        title: "Delete Account",
        message: `Are you sure you want to delete "${props.admin.name}"? This action cannot be undone.`,
        confirmText: "Delete Account",
        cancelText: "Cancel",
        onConfirm: () => {
          router.delete(
            route("admin.users.admins.destroy", {
              id: props.admin.id
            }),
            {
              onSuccess: () => {
                toast.success("Account deleted successfully");
              },
              onError: () => {
                toast.error("Failed to delete account");
              }
            }
          );
        }
      });
    };
    const disableForm = useForm({
      status: "inactive"
    });
    const onStatusUpdate = (status) => {
      openDeleteDialog({
        title: `${status === "active" ? "Activate" : "Deactivate"} Account`,
        message: `Are you sure you want to ${status === "active" ? "activate" : "deactivate"} "${props.admin.name}"?`,
        confirmText: `${status === "active" ? "Activate" : "Deactivate"} Account`,
        cancelText: "Cancel",
        onConfirm: () => {
          disableForm.status = status;
          disableForm.patch(
            route("admin.users.admins.details.update", {
              id: props.admin.id
            }),
            {
              onSuccess: () => {
                toast.success(`Account ${status === "active" ? "activated" : "deactivated"} successfully`);
              },
              onError: () => {
                toast.error(`Failed to ${status === "active" ? "activate" : "deactivate"} account`);
              }
            }
          );
        }
      });
    };
    const envUrl = "http://127.0.0.1:8000/";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Account Details" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "ghost",
              "as-child": "",
              class: "gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin.users.admins")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Back to List `);
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                          createTextVNode(" Back to List ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.users.admins")
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                        createTextVNode(" Back to List ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!isCurrentUser.value) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: "outline",
                "as-child": "",
                class: "gap-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("admin.users.admins.edit", { id: props.admin.id })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Edit `);
                        } else {
                          return [
                            createVNode(unref(Pencil), { class: "h-4 w-4" }),
                            createTextVNode(" Edit ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.users.admins.edit", { id: props.admin.id })
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Pencil), { class: "h-4 w-4" }),
                          createTextVNode(" Edit ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (!isCurrentUser.value && (isEmailVerified.value && props.admin.status === "inactive")) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), {
                  onClick: ($event) => onStatusUpdate("active"),
                  variant: "outline",
                  "as-child": "",
                  class: "bg-green-700/10 border-green-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="cursor-pointer"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(CirclePlus), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(` Activate </span>`);
                    } else {
                      return [
                        createVNode("span", { class: "cursor-pointer" }, [
                          createVNode(unref(CirclePlus), { class: "h-4 w-4" }),
                          createTextVNode(" Activate ")
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (!isCurrentUser.value && (isEmailVerified.value && props.admin.status === "active")) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), {
                  onClick: ($event) => onStatusUpdate("inactive"),
                  variant: "ghost",
                  "as-child": "",
                  class: "gap-2 bg-red-700/10 border-red-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="cursor-pointer"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(CircleMinus), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(` Deactivate </span>`);
                    } else {
                      return [
                        createVNode("span", { class: "cursor-pointer" }, [
                          createVNode(unref(CircleMinus), { class: "h-4 w-4" }),
                          createTextVNode(" Deactivate ")
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (!isCurrentUser.value && !isEmailVerified.value) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), {
                  onClick: onDelete,
                  variant: "destructive",
                  "as-child": ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="cursor-pointer"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(` Delete </span>`);
                    } else {
                      return [
                        createVNode("span", { class: "cursor-pointer" }, [
                          createVNode(unref(Trash2), { class: "h-4 w-4" }),
                          createTextVNode(" Delete ")
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "outline",
                class: "gap-1.5 bg-muted/20 px-3 py-1 text-muted-foreground"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ShieldAlert), { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                    _push3(` Viewing Your Account Profile `);
                  } else {
                    return [
                      createVNode(unref(ShieldAlert), { class: "h-3.5 w-3.5" }),
                      createTextVNode(" Viewing Your Account Profile ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "pt-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "h-24 w-24 border-2 border-border" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$7), {
                                src: `${unref(envUrl)}/storage/${props.admin.avatar}`,
                                alt: props.admin.name,
                                class: "object-cover"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$8), { class: "bg-primary text-xl font-semibold text-primary-foreground" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(initials.value)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(initials.value), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$7), {
                                  src: `${unref(envUrl)}/storage/${props.admin.avatar}`,
                                  alt: props.admin.name,
                                  class: "object-cover"
                                }, null, 8, ["src", "alt"]),
                                createVNode(unref(_sfc_main$8), { class: "bg-primary text-xl font-semibold text-primary-foreground" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(initials.value), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex-1 space-y-2"${_scopeId3}><div class="flex flex-col justify-between gap-2 md:flex-row md:items-center"${_scopeId3}><div${_scopeId3}><h2 class="text-2xl font-bold tracking-tight"${_scopeId3}>${ssrInterpolate(props.admin.name)}</h2><p class="text-sm text-muted-foreground"${_scopeId3}>@${ssrInterpolate(props.admin.display_name || "No display name")}</p></div><div class="flex justify-center gap-2 md:justify-end"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: statusVariant.value,
                          class: "capitalize"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(props.admin.status)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(props.admin.status), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: "outline",
                          class: "gap-1 capitalize"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Shield), { class: "h-3 w-3 fill-primary/10 text-primary" }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(props.admin.role)}`);
                            } else {
                              return [
                                createVNode(unref(Shield), { class: "h-3 w-3 fill-primary/10 text-primary" }),
                                createTextVNode(" " + toDisplayString(props.admin.role), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (isEmailVerified.value) {
                          _push4(ssrRenderComponent(unref(_sfc_main$3), {
                            variant: "outline",
                            class: "gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(CheckCircle2), { class: "h-3 w-3" }, null, _parent5, _scopeId4));
                                _push5(` Verified `);
                              } else {
                                return [
                                  createVNode(unref(CheckCircle2), { class: "h-3 w-3" }),
                                  createTextVNode(" Verified ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left" }, [
                            createVNode(unref(_sfc_main$6), { class: "h-24 w-24 border-2 border-border" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), {
                                  src: `${unref(envUrl)}/storage/${props.admin.avatar}`,
                                  alt: props.admin.name,
                                  class: "object-cover"
                                }, null, 8, ["src", "alt"]),
                                createVNode(unref(_sfc_main$8), { class: "bg-primary text-xl font-semibold text-primary-foreground" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(initials.value), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex-1 space-y-2" }, [
                              createVNode("div", { class: "flex flex-col justify-between gap-2 md:flex-row md:items-center" }, [
                                createVNode("div", null, [
                                  createVNode("h2", { class: "text-2xl font-bold tracking-tight" }, toDisplayString(props.admin.name), 1),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, "@" + toDisplayString(props.admin.display_name || "No display name"), 1)
                                ]),
                                createVNode("div", { class: "flex justify-center gap-2 md:justify-end" }, [
                                  createVNode(unref(_sfc_main$3), {
                                    variant: statusVariant.value,
                                    class: "capitalize"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(props.admin.status), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["variant"]),
                                  createVNode(unref(_sfc_main$3), {
                                    variant: "outline",
                                    class: "gap-1 capitalize"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Shield), { class: "h-3 w-3 fill-primary/10 text-primary" }),
                                      createTextVNode(" " + toDisplayString(props.admin.role), 1)
                                    ]),
                                    _: 1
                                  }),
                                  isEmailVerified.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                    key: 0,
                                    variant: "outline",
                                    class: "gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(CheckCircle2), { class: "h-3 w-3" }),
                                      createTextVNode(" Verified ")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "pt-6" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left" }, [
                          createVNode(unref(_sfc_main$6), { class: "h-24 w-24 border-2 border-border" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$7), {
                                src: `${unref(envUrl)}/storage/${props.admin.avatar}`,
                                alt: props.admin.name,
                                class: "object-cover"
                              }, null, 8, ["src", "alt"]),
                              createVNode(unref(_sfc_main$8), { class: "bg-primary text-xl font-semibold text-primary-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(initials.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex-1 space-y-2" }, [
                            createVNode("div", { class: "flex flex-col justify-between gap-2 md:flex-row md:items-center" }, [
                              createVNode("div", null, [
                                createVNode("h2", { class: "text-2xl font-bold tracking-tight" }, toDisplayString(props.admin.name), 1),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, "@" + toDisplayString(props.admin.display_name || "No display name"), 1)
                              ]),
                              createVNode("div", { class: "flex justify-center gap-2 md:justify-end" }, [
                                createVNode(unref(_sfc_main$3), {
                                  variant: statusVariant.value,
                                  class: "capitalize"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(props.admin.status), 1)
                                  ]),
                                  _: 1
                                }, 8, ["variant"]),
                                createVNode(unref(_sfc_main$3), {
                                  variant: "outline",
                                  class: "gap-1 capitalize"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Shield), { class: "h-3 w-3 fill-primary/10 text-primary" }),
                                    createTextVNode(" " + toDisplayString(props.admin.role), 1)
                                  ]),
                                  _: 1
                                }),
                                isEmailVerified.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: 0,
                                  variant: "outline",
                                  class: "gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(CheckCircle2), { class: "h-3 w-3" }),
                                    createTextVNode(" Verified ")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid grid-cols-1 gap-6 md:grid-cols-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "md:col-span-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Contact &amp; Identity Details`);
                            } else {
                              return [
                                createTextVNode("Contact & Identity Details")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Core identity references assigned to this profile.`);
                            } else {
                              return [
                                createTextVNode("Core identity references assigned to this profile.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Contact & Identity Details")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode("Core identity references assigned to this profile.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between"${_scopeId3}><div class="flex items-center gap-3"${_scopeId3}><div class="rounded-md bg-muted p-2 text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Mail), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-0.5"${_scopeId3}><p class="text-xs font-medium text-muted-foreground"${_scopeId3}>Email Address</p><p class="font-medium text-foreground"${_scopeId3}>${ssrInterpolate(props.admin.email)}</p></div></div>`);
                        if (isEmailVerified.value) {
                          _push4(`<div class="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 shrink-0" }, null, _parent4, _scopeId3));
                          _push4(`<div class="leading-tight"${_scopeId3}><p class="text-xs font-semibold"${_scopeId3}>Email verified</p><p class="text-xs"${_scopeId3}>Verified at ${ssrInterpolate(emailVerifiedDate.value)}</p></div></div>`);
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline",
                            class: "w-full gap-2 sm:w-auto",
                            disabled: isSendingVerification.value,
                            onClick: sendVerificationEmail
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(CircleAlert), { class: "h-4 w-4 text-amber-500" }, null, _parent5, _scopeId4));
                                _push5(` ${ssrInterpolate(isSendingVerification.value ? "Sending..." : "Verify Gmail Account")}`);
                              } else {
                                return [
                                  createVNode(unref(CircleAlert), { class: "h-4 w-4 text-amber-500" }),
                                  createTextVNode(" " + toDisplayString(isSendingVerification.value ? "Sending..." : "Verify Gmail Account"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                        _push4(`</div><div class="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$c, {
                          message: unref(form).errors.email,
                          class: "mt-2 text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (!isEmailVerified.value) {
                          _push4(`<div class="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"${_scopeId3}> This admin account is not Gmail verified yet. Verification will allow the account to be marked active once you access the link sent to your email. </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$d), { class: "bg-border/60" }, null, _parent4, _scopeId3));
                        _push4(`<div class="flex items-center gap-3 text-sm"${_scopeId3}><div class="rounded-md bg-muted p-2 text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Phone), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-0.5"${_scopeId3}><p class="text-xs font-medium text-muted-foreground"${_scopeId3}>Mobile Number</p><p class="font-medium text-foreground"${_scopeId3}>${ssrInterpolate(props.admin.phone || "None provided")}</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                                createVNode(unref(Mail), { class: "h-4 w-4" })
                              ]),
                              createVNode("div", { class: "space-y-0.5" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Email Address"),
                                createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(props.admin.email), 1)
                              ])
                            ]),
                            isEmailVerified.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                            }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 shrink-0" }),
                              createVNode("div", { class: "leading-tight" }, [
                                createVNode("p", { class: "text-xs font-semibold" }, "Email verified"),
                                createVNode("p", { class: "text-xs" }, "Verified at " + toDisplayString(emailVerifiedDate.value), 1)
                              ])
                            ])) : (openBlock(), createBlock(unref(_sfc_main$2), {
                              key: 1,
                              type: "button",
                              variant: "outline",
                              class: "w-full gap-2 sm:w-auto",
                              disabled: isSendingVerification.value,
                              onClick: sendVerificationEmail
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(CircleAlert), { class: "h-4 w-4 text-amber-500" }),
                                createTextVNode(" " + toDisplayString(isSendingVerification.value ? "Sending..." : "Verify Gmail Account"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"]))
                          ]),
                          createVNode("div", { class: "flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between" }, [
                            createVNode(_sfc_main$c, {
                              message: unref(form).errors.email,
                              class: "mt-2 text-sm"
                            }, null, 8, ["message"])
                          ]),
                          !isEmailVerified.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
                          }, " This admin account is not Gmail verified yet. Verification will allow the account to be marked active once you access the link sent to your email. ")) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$d), { class: "bg-border/60" }),
                          createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
                            createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                              createVNode(unref(Phone), { class: "h-4 w-4" })
                            ]),
                            createVNode("div", { class: "space-y-0.5" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Mobile Number"),
                              createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(props.admin.phone || "None provided"), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Contact & Identity Details")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createTextVNode("Core identity references assigned to this profile.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                              createVNode(unref(Mail), { class: "h-4 w-4" })
                            ]),
                            createVNode("div", { class: "space-y-0.5" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Email Address"),
                              createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(props.admin.email), 1)
                            ])
                          ]),
                          isEmailVerified.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                          }, [
                            createVNode(unref(CheckCircle2), { class: "h-4 w-4 shrink-0" }),
                            createVNode("div", { class: "leading-tight" }, [
                              createVNode("p", { class: "text-xs font-semibold" }, "Email verified"),
                              createVNode("p", { class: "text-xs" }, "Verified at " + toDisplayString(emailVerifiedDate.value), 1)
                            ])
                          ])) : (openBlock(), createBlock(unref(_sfc_main$2), {
                            key: 1,
                            type: "button",
                            variant: "outline",
                            class: "w-full gap-2 sm:w-auto",
                            disabled: isSendingVerification.value,
                            onClick: sendVerificationEmail
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(CircleAlert), { class: "h-4 w-4 text-amber-500" }),
                              createTextVNode(" " + toDisplayString(isSendingVerification.value ? "Sending..." : "Verify Gmail Account"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"]))
                        ]),
                        createVNode("div", { class: "flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between" }, [
                          createVNode(_sfc_main$c, {
                            message: unref(form).errors.email,
                            class: "mt-2 text-sm"
                          }, null, 8, ["message"])
                        ]),
                        !isEmailVerified.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
                        }, " This admin account is not Gmail verified yet. Verification will allow the account to be marked active once you access the link sent to your email. ")) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$d), { class: "bg-border/60" }),
                        createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
                          createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                            createVNode(unref(Phone), { class: "h-4 w-4" })
                          ]),
                          createVNode("div", { class: "space-y-0.5" }, [
                            createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Mobile Number"),
                            createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(props.admin.phone || "None provided"), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`System Audit`);
                            } else {
                              return [
                                createTextVNode("System Audit")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`System logs associated with user metadata.`);
                            } else {
                              return [
                                createTextVNode("System logs associated with user metadata.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("System Audit")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode("System logs associated with user metadata.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-3 text-sm"${_scopeId3}><div class="rounded-md bg-muted p-2 text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(User), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-0.5"${_scopeId3}><p class="text-xs font-medium text-muted-foreground"${_scopeId3}>Internal Reference ID</p><p class="font-mono text-xs font-semibold"${_scopeId3}>ID-${ssrInterpolate(props.admin.id)}</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
                            createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                              createVNode(unref(User), { class: "h-4 w-4" })
                            ]),
                            createVNode("div", { class: "space-y-0.5" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Internal Reference ID"),
                              createVNode("p", { class: "font-mono text-xs font-semibold" }, "ID-" + toDisplayString(props.admin.id), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("System Audit")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createTextVNode("System logs associated with user metadata.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
                          createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                            createVNode(unref(User), { class: "h-4 w-4" })
                          ]),
                          createVNode("div", { class: "space-y-0.5" }, [
                            createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Internal Reference ID"),
                            createVNode("p", { class: "font-mono text-xs font-semibold" }, "ID-" + toDisplayString(props.admin.id), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode(unref(_sfc_main$2), {
                    variant: "ghost",
                    "as-child": "",
                    class: "gap-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.users.admins")
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                          createTextVNode(" Back to List ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    _: 1
                  }),
                  !isCurrentUser.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-2"
                  }, [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      "as-child": "",
                      class: "gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.users.admins.edit", { id: props.admin.id })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Pencil), { class: "h-4 w-4" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    }),
                    !isCurrentUser.value && (isEmailVerified.value && props.admin.status === "inactive") ? (openBlock(), createBlock(unref(_sfc_main$2), {
                      key: 0,
                      onClick: ($event) => onStatusUpdate("active"),
                      variant: "outline",
                      "as-child": "",
                      class: "bg-green-700/10 border-green-700"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "cursor-pointer" }, [
                          createVNode(unref(CirclePlus), { class: "h-4 w-4" }),
                          createTextVNode(" Activate ")
                        ])
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    !isCurrentUser.value && (isEmailVerified.value && props.admin.status === "active") ? (openBlock(), createBlock(unref(_sfc_main$2), {
                      key: 1,
                      onClick: ($event) => onStatusUpdate("inactive"),
                      variant: "ghost",
                      "as-child": "",
                      class: "gap-2 bg-red-700/10 border-red-700"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "cursor-pointer" }, [
                          createVNode(unref(CircleMinus), { class: "h-4 w-4" }),
                          createTextVNode(" Deactivate ")
                        ])
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    !isCurrentUser.value && !isEmailVerified.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                      key: 2,
                      onClick: onDelete,
                      variant: "destructive",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "cursor-pointer" }, [
                          createVNode(unref(Trash2), { class: "h-4 w-4" }),
                          createTextVNode(" Delete ")
                        ])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: "outline",
                      class: "gap-1.5 bg-muted/20 px-3 py-1 text-muted-foreground"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ShieldAlert), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" Viewing Your Account Profile ")
                      ]),
                      _: 1
                    })
                  ]))
                ]),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), { class: "pt-6" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left" }, [
                          createVNode(unref(_sfc_main$6), { class: "h-24 w-24 border-2 border-border" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$7), {
                                src: `${unref(envUrl)}/storage/${props.admin.avatar}`,
                                alt: props.admin.name,
                                class: "object-cover"
                              }, null, 8, ["src", "alt"]),
                              createVNode(unref(_sfc_main$8), { class: "bg-primary text-xl font-semibold text-primary-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(initials.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex-1 space-y-2" }, [
                            createVNode("div", { class: "flex flex-col justify-between gap-2 md:flex-row md:items-center" }, [
                              createVNode("div", null, [
                                createVNode("h2", { class: "text-2xl font-bold tracking-tight" }, toDisplayString(props.admin.name), 1),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, "@" + toDisplayString(props.admin.display_name || "No display name"), 1)
                              ]),
                              createVNode("div", { class: "flex justify-center gap-2 md:justify-end" }, [
                                createVNode(unref(_sfc_main$3), {
                                  variant: statusVariant.value,
                                  class: "capitalize"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(props.admin.status), 1)
                                  ]),
                                  _: 1
                                }, 8, ["variant"]),
                                createVNode(unref(_sfc_main$3), {
                                  variant: "outline",
                                  class: "gap-1 capitalize"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Shield), { class: "h-3 w-3 fill-primary/10 text-primary" }),
                                    createTextVNode(" " + toDisplayString(props.admin.role), 1)
                                  ]),
                                  _: 1
                                }),
                                isEmailVerified.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: 0,
                                  variant: "outline",
                                  class: "gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(CheckCircle2), { class: "h-3 w-3" }),
                                    createTextVNode(" Verified ")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-3" }, [
                  createVNode(unref(_sfc_main$4), { class: "md:col-span-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$a), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Contact & Identity Details")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode("Core identity references assigned to this profile.")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                                createVNode(unref(Mail), { class: "h-4 w-4" })
                              ]),
                              createVNode("div", { class: "space-y-0.5" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Email Address"),
                                createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(props.admin.email), 1)
                              ])
                            ]),
                            isEmailVerified.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                            }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 shrink-0" }),
                              createVNode("div", { class: "leading-tight" }, [
                                createVNode("p", { class: "text-xs font-semibold" }, "Email verified"),
                                createVNode("p", { class: "text-xs" }, "Verified at " + toDisplayString(emailVerifiedDate.value), 1)
                              ])
                            ])) : (openBlock(), createBlock(unref(_sfc_main$2), {
                              key: 1,
                              type: "button",
                              variant: "outline",
                              class: "w-full gap-2 sm:w-auto",
                              disabled: isSendingVerification.value,
                              onClick: sendVerificationEmail
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(CircleAlert), { class: "h-4 w-4 text-amber-500" }),
                                createTextVNode(" " + toDisplayString(isSendingVerification.value ? "Sending..." : "Verify Gmail Account"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"]))
                          ]),
                          createVNode("div", { class: "flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between" }, [
                            createVNode(_sfc_main$c, {
                              message: unref(form).errors.email,
                              class: "mt-2 text-sm"
                            }, null, 8, ["message"])
                          ]),
                          !isEmailVerified.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
                          }, " This admin account is not Gmail verified yet. Verification will allow the account to be marked active once you access the link sent to your email. ")) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$d), { class: "bg-border/60" }),
                          createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
                            createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                              createVNode(unref(Phone), { class: "h-4 w-4" })
                            ]),
                            createVNode("div", { class: "space-y-0.5" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Mobile Number"),
                              createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(props.admin.phone || "None provided"), 1)
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$a), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("System Audit")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode("System logs associated with user metadata.")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
                            createVNode("div", { class: "rounded-md bg-muted p-2 text-muted-foreground" }, [
                              createVNode(unref(User), { class: "h-4 w-4" })
                            ]),
                            createVNode("div", { class: "space-y-0.5" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Internal Reference ID"),
                              createVNode("p", { class: "font-mono text-xs font-semibold" }, "ID-" + toDisplayString(props.admin.id), 1)
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/user/admin/AdminAccountDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
