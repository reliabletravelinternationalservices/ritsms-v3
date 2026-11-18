import { defineComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./TooltipTrigger-B2yyxzkT.js";
import "./TooltipProvider-D2JAfXHP.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InfoTooltip",
  __ssrInlineRender: true,
  props: {
    content: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button type="button" class="inline-flex items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Icon), {
                    icon: "fluent:info-20-regular",
                    class: "text-[var(--muted-custom)] text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(`</button>`);
                } else {
                  return [
                    createVNode("button", {
                      type: "button",
                      class: "inline-flex items-center"
                    }, [
                      createVNode(unref(Icon), {
                        icon: "fluent:info-20-regular",
                        class: "text-[var(--muted-custom)] text-sm"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "max-w-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm whitespace-pre-line text-muted-foreground"${_scopeId2}>${ssrInterpolate(__props.content)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm whitespace-pre-line text-muted-foreground" }, toDisplayString(__props.content), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode("button", {
                    type: "button",
                    class: "inline-flex items-center"
                  }, [
                    createVNode(unref(Icon), {
                      icon: "fluent:info-20-regular",
                      class: "text-[var(--muted-custom)] text-sm"
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$3), { class: "max-w-sm" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-sm whitespace-pre-line text-muted-foreground" }, toDisplayString(__props.content), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/InfoTooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
