import { defineComponent, computed, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$7 } from "../ssr.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5, e as _sfc_main$6 } from "./CardTitle-CO_w4Cob.js";
import { ShieldAlert, LogOut } from "lucide-vue-next";
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
  __name: "InactiveAccountPage",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const currentUser = computed(() => {
      var _a;
      return (_a = page.props.auth) == null ? void 0 : _a.user;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Inactive Account" }, null, _parent));
      _push(`<div class="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "max-w-md w-full border border-border/60 shadow-lg" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "text-center pt-8" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mx-auto w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ShieldAlert), { class: "w-6 h-6 stroke-[2]" }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-2xl font-bold tracking-tight text-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Account Access Restricted `);
                      } else {
                        return [
                          createTextVNode(" Account Access Restricted ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm text-muted-foreground mt-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Your Account is currently inactive. Access will be available once your account has been reviewed and activated. `);
                      } else {
                        return [
                          createTextVNode(" Your Account is currently inactive. Access will be available once your account has been reviewed and activated. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "mx-auto w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4" }, [
                      createVNode(unref(ShieldAlert), { class: "w-6 h-6 stroke-[2]" })
                    ]),
                    createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold tracking-tight text-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode(" Account Access Restricted ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), { class: "text-sm text-muted-foreground mt-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" Your Account is currently inactive. Access will be available once your account has been reviewed and activated. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "text-center space-y-4 px-6 pb-6 text-sm text-muted-foreground" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive-foreground text-center"${_scopeId2}> The account <span class="font-semibold"${_scopeId2}>&quot;${ssrInterpolate(((_a = currentUser.value) == null ? void 0 : _a.email) || ((_b = currentUser.value) == null ? void 0 : _b.name) || "User")}&quot;</span> is currently inactive. Please contact your system administrator to request account activation. </div><div class="p-4 rounded-lg bg-muted/50 border border-border/40 text-left space-y-2 text-muted-foreground"${_scopeId2}><p class="font-medium text-foreground"${_scopeId2}>Why can&#39;t I access the system?</p><p class="text-xs leading-relaxed"${_scopeId2}> Your account has not been activated or has been temporarily disabled by an administrator. You will be able to access the administrator portal once your account status is changed to <span class="font-semibold text-foreground"${_scopeId2}>Active</span>. </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive-foreground text-center" }, [
                      createTextVNode(" The account "),
                      createVNode("span", { class: "font-semibold" }, '"' + toDisplayString(((_c = currentUser.value) == null ? void 0 : _c.email) || ((_d = currentUser.value) == null ? void 0 : _d.name) || "User") + '"', 1),
                      createTextVNode(" is currently inactive. Please contact your system administrator to request account activation. ")
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted/50 border border-border/40 text-left space-y-2 text-muted-foreground" }, [
                      createVNode("p", { class: "font-medium text-foreground" }, "Why can't I access the system?"),
                      createVNode("p", { class: "text-xs leading-relaxed" }, [
                        createTextVNode(" Your account has not been activated or has been temporarily disabled by an administrator. You will be able to access the administrator portal once your account status is changed to "),
                        createVNode("span", { class: "font-semibold text-foreground" }, "Active"),
                        createTextVNode(". ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex flex-col gap-2 border-t border-border/40 bg-muted/20 p-6 rounded-b-xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "default",
                    "as-child": "",
                    class: "w-full gap-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Link), {
                          href: _ctx.route("logout"),
                          method: "post",
                          as: "button",
                          type: "button"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent5, _scopeId4));
                              _push5(` Sign Out `);
                            } else {
                              return [
                                createVNode(unref(LogOut), { class: "w-4 h-4" }),
                                createTextVNode(" Sign Out ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Link), {
                            href: _ctx.route("logout"),
                            method: "post",
                            as: "button",
                            type: "button"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(LogOut), { class: "w-4 h-4" }),
                              createTextVNode(" Sign Out ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), {
                      variant: "default",
                      "as-child": "",
                      class: "w-full gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: _ctx.route("logout"),
                          method: "post",
                          as: "button",
                          type: "button"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(LogOut), { class: "w-4 h-4" }),
                            createTextVNode(" Sign Out ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "text-center pt-8" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "mx-auto w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4" }, [
                    createVNode(unref(ShieldAlert), { class: "w-6 h-6 stroke-[2]" })
                  ]),
                  createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold tracking-tight text-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode(" Account Access Restricted ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), { class: "text-sm text-muted-foreground mt-2" }, {
                    default: withCtx(() => [
                      createTextVNode(" Your Account is currently inactive. Access will be available once your account has been reviewed and activated. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "text-center space-y-4 px-6 pb-6 text-sm text-muted-foreground" }, {
                default: withCtx(() => {
                  var _a, _b;
                  return [
                    createVNode("div", { class: "p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive-foreground text-center" }, [
                      createTextVNode(" The account "),
                      createVNode("span", { class: "font-semibold" }, '"' + toDisplayString(((_a = currentUser.value) == null ? void 0 : _a.email) || ((_b = currentUser.value) == null ? void 0 : _b.name) || "User") + '"', 1),
                      createTextVNode(" is currently inactive. Please contact your system administrator to request account activation. ")
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted/50 border border-border/40 text-left space-y-2 text-muted-foreground" }, [
                      createVNode("p", { class: "font-medium text-foreground" }, "Why can't I access the system?"),
                      createVNode("p", { class: "text-xs leading-relaxed" }, [
                        createTextVNode(" Your account has not been activated or has been temporarily disabled by an administrator. You will be able to access the administrator portal once your account status is changed to "),
                        createVNode("span", { class: "font-semibold text-foreground" }, "Active"),
                        createTextVNode(". ")
                      ])
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "flex flex-col gap-2 border-t border-border/40 bg-muted/20 p-6 rounded-b-xl" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), {
                    variant: "default",
                    "as-child": "",
                    class: "w-full gap-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Link), {
                        href: _ctx.route("logout"),
                        method: "post",
                        as: "button",
                        type: "button"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(LogOut), { class: "w-4 h-4" }),
                          createTextVNode(" Sign Out ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/admin/auth/InactiveAccountPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
