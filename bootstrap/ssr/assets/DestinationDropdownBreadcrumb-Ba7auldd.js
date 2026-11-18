import { ref, onMounted, onBeforeUnmount, defineComponent, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createVNode, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, e as _sfc_main$5 } from "./BreadcrumbSeparator-BM3Ehm2Y.js";
import { Icon } from "@iconify/vue";
import { c as cn } from "../ssr.js";
const useDestinationDropdownBreadcrumb = () => {
  const openIndex = ref(null);
  const toggleDropdown = (index) => {
    openIndex.value = openIndex.value === index ? null : index;
  };
  const closeDropdown = () => {
    openIndex.value = null;
  };
  const handleClickOutside = (e) => {
    const target = e.target;
    if (!target.closest(".dropdown-wrapper")) {
      closeDropdown();
    }
  };
  onMounted(() => document.addEventListener("click", handleClickOutside));
  onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
  return {
    openIndex,
    toggleDropdown,
    closeDropdown
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DestinationDropdownBreadcrumb",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const { openIndex, toggleDropdown, closeDropdown } = useDestinationDropdownBreadcrumb();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.items, (item, index) => {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (index === __props.items.length - 1) {
                            _push4(`<!--[-->`);
                            if (item.dropdown) {
                              _push4(`<div class="relative dropdown-wrapper"${_scopeId3}><button class="flex items-center gap-1 ease-in duration-200 hover:text-[var(--primary-custom)]"${_scopeId3}>${ssrInterpolate(item.title)} <span${_scopeId3}>`);
                              _push4(ssrRenderComponent(unref(Icon), {
                                icon: "gridicons:dropdown",
                                width: "24",
                                height: "24",
                                class: unref(cn)(
                                  "transition-transform duration-200",
                                  unref(openIndex) === index && "rotate-180"
                                )
                              }, null, _parent4, _scopeId3));
                              _push4(`</span></button>`);
                              if (unref(openIndex) === index) {
                                _push4(`<div class="absolute mt-2 w-40 text-[var(--secondary-custom)] font-bold bg-[var(--primary-custom)] border border-[var(--primary-custom)] shadow z-10"${_scopeId3}><!--[-->`);
                                ssrRenderList(item.dropdown, (d, i) => {
                                  _push4(`<div class="px-3 py-2 hover:bg-[var(--shadow-custom)] cursor-pointer"${_scopeId3}><span${_scopeId3}>${ssrInterpolate(d.label)}</span></div>`);
                                });
                                _push4(`<!--]--></div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                            } else {
                              _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(item.title)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(item.title), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            }
                            _push4(`<!--]-->`);
                          } else {
                            _push4(`<a${ssrRenderAttr("href", item.href ?? "#")} class="ease-in duration-200 hover:text-[var(--primary-custom)]"${_scopeId3}>${ssrInterpolate(item.title)}</a>`);
                          }
                        } else {
                          return [
                            index === __props.items.length - 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              item.dropdown ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "relative dropdown-wrapper"
                              }, [
                                createVNode("button", {
                                  onClick: ($event) => unref(toggleDropdown)(index),
                                  class: "flex items-center gap-1 ease-in duration-200 hover:text-[var(--primary-custom)]"
                                }, [
                                  createTextVNode(toDisplayString(item.title) + " ", 1),
                                  createVNode("span", null, [
                                    createVNode(unref(Icon), {
                                      icon: "gridicons:dropdown",
                                      width: "24",
                                      height: "24",
                                      class: unref(cn)(
                                        "transition-transform duration-200",
                                        unref(openIndex) === index && "rotate-180"
                                      )
                                    }, null, 8, ["class"])
                                  ])
                                ], 8, ["onClick"]),
                                unref(openIndex) === index ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute mt-2 w-40 text-[var(--secondary-custom)] font-bold bg-[var(--primary-custom)] border border-[var(--primary-custom)] shadow z-10"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.dropdown, (d, i) => {
                                    return openBlock(), createBlock("div", {
                                      key: i,
                                      class: "px-3 py-2 hover:bg-[var(--shadow-custom)] cursor-pointer",
                                      onClick: ($event) => {
                                        var _a;
                                        (_a = d.action) == null ? void 0 : _a.call(d);
                                        unref(closeDropdown)();
                                      }
                                    }, [
                                      createVNode("span", null, toDisplayString(d.label), 1)
                                    ], 8, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ])) : (openBlock(), createBlock(unref(_sfc_main$4), { key: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1024))
                            ], 64)) : (openBlock(), createBlock("a", {
                              key: 1,
                              href: item.href ?? "#",
                              class: "ease-in duration-200 hover:text-[var(--primary-custom)]"
                            }, toDisplayString(item.title), 9, ["href"]))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (index !== __props.items.length - 1) {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), null, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            index === __props.items.length - 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              item.dropdown ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "relative dropdown-wrapper"
                              }, [
                                createVNode("button", {
                                  onClick: ($event) => unref(toggleDropdown)(index),
                                  class: "flex items-center gap-1 ease-in duration-200 hover:text-[var(--primary-custom)]"
                                }, [
                                  createTextVNode(toDisplayString(item.title) + " ", 1),
                                  createVNode("span", null, [
                                    createVNode(unref(Icon), {
                                      icon: "gridicons:dropdown",
                                      width: "24",
                                      height: "24",
                                      class: unref(cn)(
                                        "transition-transform duration-200",
                                        unref(openIndex) === index && "rotate-180"
                                      )
                                    }, null, 8, ["class"])
                                  ])
                                ], 8, ["onClick"]),
                                unref(openIndex) === index ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute mt-2 w-40 text-[var(--secondary-custom)] font-bold bg-[var(--primary-custom)] border border-[var(--primary-custom)] shadow z-10"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.dropdown, (d, i) => {
                                    return openBlock(), createBlock("div", {
                                      key: i,
                                      class: "px-3 py-2 hover:bg-[var(--shadow-custom)] cursor-pointer",
                                      onClick: ($event) => {
                                        var _a;
                                        (_a = d.action) == null ? void 0 : _a.call(d);
                                        unref(closeDropdown)();
                                      }
                                    }, [
                                      createVNode("span", null, toDisplayString(d.label), 1)
                                    ], 8, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ])) : (openBlock(), createBlock(unref(_sfc_main$4), { key: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1024))
                            ], 64)) : (openBlock(), createBlock("a", {
                              key: 1,
                              href: item.href ?? "#",
                              class: "ease-in duration-200 hover:text-[var(--primary-custom)]"
                            }, toDisplayString(item.title), 9, ["href"]))
                          ]),
                          _: 2
                        }, 1024),
                        index !== __props.items.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 })) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                    return openBlock(), createBlock(Fragment, { key: index }, [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          index === __props.items.length - 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            item.dropdown ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "relative dropdown-wrapper"
                            }, [
                              createVNode("button", {
                                onClick: ($event) => unref(toggleDropdown)(index),
                                class: "flex items-center gap-1 ease-in duration-200 hover:text-[var(--primary-custom)]"
                              }, [
                                createTextVNode(toDisplayString(item.title) + " ", 1),
                                createVNode("span", null, [
                                  createVNode(unref(Icon), {
                                    icon: "gridicons:dropdown",
                                    width: "24",
                                    height: "24",
                                    class: unref(cn)(
                                      "transition-transform duration-200",
                                      unref(openIndex) === index && "rotate-180"
                                    )
                                  }, null, 8, ["class"])
                                ])
                              ], 8, ["onClick"]),
                              unref(openIndex) === index ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "absolute mt-2 w-40 text-[var(--secondary-custom)] font-bold bg-[var(--primary-custom)] border border-[var(--primary-custom)] shadow z-10"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.dropdown, (d, i) => {
                                  return openBlock(), createBlock("div", {
                                    key: i,
                                    class: "px-3 py-2 hover:bg-[var(--shadow-custom)] cursor-pointer",
                                    onClick: ($event) => {
                                      var _a;
                                      (_a = d.action) == null ? void 0 : _a.call(d);
                                      unref(closeDropdown)();
                                    }
                                  }, [
                                    createVNode("span", null, toDisplayString(d.label), 1)
                                  ], 8, ["onClick"]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ])) : (openBlock(), createBlock(unref(_sfc_main$4), { key: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1024))
                          ], 64)) : (openBlock(), createBlock("a", {
                            key: 1,
                            href: item.href ?? "#",
                            class: "ease-in duration-200 hover:text-[var(--primary-custom)]"
                          }, toDisplayString(item.title), 9, ["href"]))
                        ]),
                        _: 2
                      }, 1024),
                      index !== __props.items.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 })) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/DestinationDropdownBreadcrumb.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
