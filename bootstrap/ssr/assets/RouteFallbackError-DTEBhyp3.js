import { defineComponent, ref, onMounted, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2, l as _export_sfc } from "../ssr.js";
import { _ as _sfc_main$1 } from "./index-xORXC0Yx.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RouteFallbackError",
  __ssrInlineRender: true,
  props: {
    code: { default: "404" },
    message: {}
  },
  setup(__props) {
    const props = __props;
    const isHovered = ref(false);
    const page = usePage();
    const activePlanes = ref([]);
    let planeIdCounter = 0;
    const planeColors = [
      "var(--tertiary-custom)",
      "var(--inbound-custom)",
      "var(--outbound-custom)"
    ];
    function spawnPlane() {
      if (typeof window === "undefined") return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const buffer = 200;
      const startEdge = Math.floor(Math.random() * 4);
      const edgeOffsets = [1, 2, 3];
      const endEdge = (startEdge + edgeOffsets[Math.floor(Math.random() * edgeOffsets.length)]) % 4;
      let startX = 0, startY = 0;
      let endX = 0, endY = 0;
      if (startEdge === 0) {
        startX = -buffer;
        startY = Math.random() * H;
      } else if (startEdge === 1) {
        startX = W + buffer;
        startY = Math.random() * H;
      } else if (startEdge === 2) {
        startX = Math.random() * W;
        startY = -buffer;
      } else {
        startX = Math.random() * W;
        startY = H + buffer;
      }
      if (endEdge === 0) {
        endX = -buffer;
        endY = Math.random() * H;
      } else if (endEdge === 1) {
        endX = W + buffer;
        endY = Math.random() * H;
      } else if (endEdge === 2) {
        endX = Math.random() * W;
        endY = -buffer;
      } else {
        endX = Math.random() * W;
        endY = H + buffer;
      }
      const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
      const duration = 16 + Math.random() * 10;
      const color = planeColors[Math.floor(Math.random() * planeColors.length)];
      activePlanes.value.push({
        id: planeIdCounter++,
        startX,
        startY,
        endX,
        endY,
        angle,
        duration,
        color
      });
    }
    onMounted(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          spawnPlane();
        }, i * 4500);
      }
    });
    const errorMessage = computed(() => {
      if (props.message) return props.message;
      const status = props.code.toString();
      const messages = {
        "401": "Authentication failed. Please verify your system credentials.",
        "403": "Access denied. You do not have clearance for this route.",
        "404": "Oops, Your flight path seems to have been lost in the clouds.",
        "419": "Session expired. Please refresh and try again.",
        "500": "Internal system error detected.",
        "503": "Service temporarily unavailable."
      };
      return messages[status] || "Unexpected navigation error occurred.";
    });
    const isAdminRoute = computed(() => page.url.startsWith("/admin"));
    const navigationTarget = computed(
      () => isAdminRoute.value ? route("admin.dashboard") : route("client.landing")
    );
    const navigationLabel = computed(
      () => isAdminRoute.value ? "Return to Admin Dashboard" : "Go Home"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${props.code} - Flight Status`
      }, null, _parent));
      _push(`<div class="relative min-h-screen flex items-center justify-center overflow-hidden" data-v-15d5b839><div class="absolute inset-0 bg-[var(--secondary-custom)]" data-v-15d5b839></div><div class="absolute inset-0 opacity-20" style="${ssrRenderStyle({ "background": "radial-gradient(circle at top, var(--tertiary-custom), transparent 60%)" })}" data-v-15d5b839></div><div class="absolute inset-0 bg-[radial-gradient(var(--muted-custom)_1px,transparent_1px)] [background-size:40px_40px] opacity-10" data-v-15d5b839></div><div class="absolute inset-0 pointer-events-none overflow-hidden" data-v-15d5b839><div class="cloud c1" data-v-15d5b839></div><div class="cloud c2" data-v-15d5b839></div><div class="cloud c3" data-v-15d5b839></div></div><svg class="absolute inset-0 w-full h-full opacity-20 pointer-events-none" data-v-15d5b839><path d="M-100 700 C 250 100, 700 800, 1300 150" stroke="var(--tertiary-custom)" stroke-width="2.5" stroke-dasharray="10 10" fill="none" data-v-15d5b839></path></svg><div class="absolute inset-0 pointer-events-none overflow-hidden" data-v-15d5b839><!--[-->`);
      ssrRenderList(activePlanes.value, (plane) => {
        _push(`<div class="plane" style="${ssrRenderStyle({
          "--start-x": `${plane.startX}px`,
          "--start-y": `${plane.startY}px`,
          "--end-x": `${plane.endX}px`,
          "--end-y": `${plane.endY}px`,
          "--angle": `${plane.angle}deg`,
          "--duration": `${plane.duration}s`
        })}" data-v-15d5b839><svg viewBox="0 0 640 512" class="plane-icon"${ssrRenderAttr("fill", plane.color)} data-v-15d5b839><path d="M480 192H365.71L260.61 8.47A16 16 0 0 0 246.73 0H192a16 16 0 0 0-15.79 18.59L204.35 192H96L58.35 122.82A16 16 0 0 0 44.47 112H16A16 16 0 0 0 .42 131.84L32 256 .42 380.16A16 16 0 0 0 16 400h28.47a16 16 0 0 0 13.88-10.82L96 320h108.35l-28.14 173.41A16 16 0 0 0 192 512h54.73a16 16 0 0 0 13.88-8.47L365.71 320H480c88.22 0 160-28.65 160-64s-71.78-64-160-64z" data-v-15d5b839></path></svg></div>`);
      });
      _push(`<!--]--></div><div class="${ssrRenderClass([{ "scale-[1.02]": isHovered.value }, "relative z-10 flex flex-col items-center text-center px-6 max-w-2xl"])}" data-v-15d5b839><h1 class="text-[10rem] md:text-[14rem] font-black leading-none" style="${ssrRenderStyle({ "color": "var(--primary-custom)" })}" data-v-15d5b839>${ssrInterpolate(__props.code)}</h1><div class="text-[var(--tertiary-custom)] uppercase tracking-[0.5em] text-sm font-semibold -mt-4" data-v-15d5b839> ROUTE NOT FOUND </div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        class: "mt-6 px-4 py-2 rounded-full border",
        style: { "background": "var(--secondary-custom)", "border-color": "var(--muted-custom)", "color": "var(--primary-custom)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(errorMessage.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(errorMessage.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        "as-child": "",
        size: "lg",
        onMouseenter: ($event) => isHovered.value = true,
        onMouseleave: ($event) => isHovered.value = false,
        class: "mt-10 font-bold px-8 rounded-xl shadow-xl",
        style: { "background": "var(--tertiary-custom)", "color": "var(--secondary-custom)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link), { href: navigationTarget.value }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(navigationLabel.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(navigationLabel.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link), { href: navigationTarget.value }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(navigationLabel.value), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="absolute bottom-6 text-xs tracking-[0.4em] uppercase" style="${ssrRenderStyle({ "color": "var(--muted-custom)" })}" data-v-15d5b839>${ssrInterpolate(isAdminRoute.value ? "SECURE AIRSPACE // ADMIN ROUTE" : "FLIGHT TERMINATED // LOST SIGNAL")}</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/error/RouteFallbackError.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RouteFallbackError = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15d5b839"]]);
export {
  RouteFallbackError as default
};
