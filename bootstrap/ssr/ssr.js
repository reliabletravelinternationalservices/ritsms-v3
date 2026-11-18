import { defineComponent, unref, mergeProps, withCtx, createVNode, useSSRContext, reactive, renderSlot, computed, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, ref, resolveDynamicComponent, createSSRApp, h as h$1 } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderVNode, ssrRenderList } from "vue/server-renderer";
import { reactiveOmit } from "@vueuse/core";
import { XIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, InfoIcon, CircleCheckIcon, X, Check, Copy } from "lucide-vue-next";
import { Toaster } from "vue-sonner";
import { useForwardPropsEmits, DialogRoot, DialogClose, DialogPortal, DialogOverlay, DialogContent, useForwardProps, DialogDescription, DialogTitle, DialogTrigger } from "radix-vue";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { Primitive } from "reka-ui";
import { Icon } from "@iconify/vue";
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = /* @__PURE__ */ new WeakMap();
var l = function(t3, e2) {
  return u.set(t3, e2), t3;
};
function c(t3) {
  return u.has(t3);
}
var a = function(t3) {
  return u.get(t3);
}, f = function(t3, e2) {
  u.set(t3, e2);
};
const p = (function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
})(), y = function(t3, e2) {
  const o2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (let e3 = 0; e3 < t3.length; ++e3) void 0 !== t3[e3] && (o2[e3] = t3[e3]);
  return o2;
}, d = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      if (c(e2)) {
        var r2 = a(e2) + 1;
        e2[r2] = o2, f(e2, r2);
      } else (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) {
    if (c(o2)) {
      for (var u2 = Object.keys(o2), p2 = n2 && n2.plainObjects ? { __proto__: null, 0: e2 } : { 0: e2 }, d2 = 0; d2 < u2.length; d2++) p2[parseInt(u2[d2], 10) + 1] = o2[u2[d2]];
      return l(p2, a(o2) + 1);
    }
    return [e2].concat(o2);
  }
  let h2 = e2;
  return s(e2) && !s(o2) && (h2 = y(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, h2);
}, h = 1024, b = function(t3, e2, o2, n2) {
  if (c(t3)) {
    var r2 = a(t3) + 1;
    return t3[r2] = e2, f(t3, r2), t3;
  }
  var i2 = [].concat(t3, e2);
  return i2.length > o2 ? l(y(i2, { plainObjects: n2 }), i2.length - 1) : i2;
}, m = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, g = Object.prototype.hasOwnProperty, w = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, v = Array.isArray, j = Array.prototype.push, $ = function(t3, e2) {
  j.apply(t3, v(e2) ? e2 : [e2]);
}, E = Date.prototype.toISOString, O = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += h) {
    const e3 = i2.length >= h ? i2.slice(t4, t4 + h) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = p[n3] : n3 < 2048 ? o3[o3.length] = p[192 | n3 >> 6] + p[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = p[224 | n3 >> 12] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = p[240 | n3 >> 18] + p[128 | n3 >> 12 & 63] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n[r], indices: false, serializeDate: function(t3) {
  return E.call(t3);
}, skipNulls: false, strictNullHandling: false }, T = {}, R = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, f2, p2, y2, d2, h2, b2, g2) {
  let w2 = t3, j2 = g2, E2 = 0, _2 = false;
  for (; void 0 !== (j2 = j2.get(T)) && !_2; ) {
    const e3 = j2.get(t3);
    if (E2 += 1, void 0 !== e3) {
      if (e3 === E2) throw new RangeError("Cyclic object value");
      _2 = true;
    }
    void 0 === j2.get(T) && (E2 = 0);
  }
  if ("function" == typeof c2 ? w2 = c2(e2, w2) : w2 instanceof Date ? w2 = p2(w2) : "comma" === o2 && v(w2) && (w2 = m(w2, function(t4) {
    return t4 instanceof Date ? p2(t4) : t4;
  })), null === w2) {
    if (i2) return l2 && !h2 ? l2(e2, O.encoder, b2, "key", y2) : e2;
    w2 = "";
  }
  if ("string" == typeof (I2 = w2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || (function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  })(w2)) return l2 ? [d2(h2 ? e2 : l2(e2, O.encoder, b2, "key", y2)) + "=" + d2(l2(w2, O.encoder, b2, "value", y2))] : [d2(e2) + "=" + d2(String(w2))];
  var I2;
  const S2 = [];
  if (void 0 === w2) return S2;
  let A2;
  if ("comma" === o2 && v(w2)) h2 && l2 && (w2 = m(w2, l2)), A2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (v(c2)) A2 = c2;
  else {
    const t4 = Object.keys(w2);
    A2 = a2 ? t4.sort(a2) : t4;
  }
  const D2 = u2 ? e2.replace(/\./g, "%2E") : e2, k2 = n2 && v(w2) && 1 === w2.length ? D2 + "[]" : D2;
  if (r2 && v(w2) && 0 === w2.length) return k2 + "[]";
  for (let e3 = 0; e3 < A2.length; ++e3) {
    const m2 = A2[e3], j3 = "object" == typeof m2 && void 0 !== m2.value ? m2.value : w2[m2];
    if (s2 && null === j3) continue;
    const O2 = f2 && u2 ? m2.replace(/\./g, "%2E") : m2, _3 = v(w2) ? "function" == typeof o2 ? o2(k2, O2) : k2 : k2 + (f2 ? "." + O2 : "[" + O2 + "]");
    g2.set(t3, E2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(T, g2), $(S2, R(j3, _3, o2, n2, r2, i2, s2, u2, "comma" === o2 && h2 && v(w2) ? null : l2, c2, a2, f2, p2, y2, d2, h2, b2, I3));
  }
  return S2;
}, _ = Object.prototype.hasOwnProperty, I = Array.isArray, S = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, A = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, D = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, k = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && _.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let a2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && a2 < o2.depth; ) {
    if (a2 += 1, !o2.plainObjects && _.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), (function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : D(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = c(r3) ? r3 : o3.allowEmptyArrays && ("" === r3 || o3.strictNullHandling && null === r3) ? [] : b([], r3, o3.arrayLimit, o3.plainObjects);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  })(l2, e2, o2, n2);
};
function N(t3, e2) {
  const o2 = /* @__PURE__ */ (function(t4) {
    return S;
  })();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? (function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, a2;
      -1 === l2 ? (c2 = e3.decoder(t5, S.decoder, s2, "key"), a2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), S.decoder, s2, "key"), a2 = m(D(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, S.decoder, s2, "value");
      })), a2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (a2 = A(a2)), t5.indexOf("[]=") > -1 && (a2 = I(a2) ? [a2] : a2);
      const f2 = _.call(o3, c2);
      f2 && "combine" === e3.duplicates ? o3[c2] = b(o3[c2], a2, e3.arrayLimit, e3.plainObjects) : f2 && "last" !== e3.duplicates || (o3[c2] = a2);
    }
    return o3;
  })(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = k(s2, n2[s2], o2, "string" == typeof t3);
    r2 = d(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : (function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return (function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    })(e3), t4;
  })(r2);
}
class x {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: N(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class C extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + (function(t3, e3) {
      let o2 = t3;
      const i2 = (function(t4) {
        if (!t4) return O;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || O.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!g.call(n, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n[o3];
        let s3, u3 = O.filter;
        if (("function" == typeof t4.filter || v(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in w ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : O.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : O.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || O.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : O.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : O.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? O.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : O.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : O.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : O.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : O.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : O.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : O.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : O.strictNullHandling };
      })(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : v(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = w[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || $(l2, R(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const p2 = l2.join(i2.delimiter);
      let y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), p2.length > 0 ? y2 + p2 : "";
    })(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new x(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new x(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2.hasOwnProperty(n2[0].name) || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      const s2 = i2.hasOwnProperty(o2[r2]) ? o2[r2] : i2.hasOwnProperty("id") ? "id" : void 0;
      if (void 0 === s2) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
      return t({}, e3, { [r2]: i2[s2] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function P(t3, e2, o2, n2) {
  const r2 = new C(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const U = { install(t3, e2) {
  const o2 = (t4, o3, n2, r2 = e2) => P(t4, o3, n2, r2);
  parseInt(t3.version) > 2 ? (t3.config.globalProperties.route = o2, t3.provide("route", o2)) : t3.mixin({ methods: { route: o2 } });
} };
const Ziggy$1 = { "url": "http://127.0.0.1:8000", "port": 8e3, "defaults": {}, "routes": { "boost.browser-logs": { "uri": "_boost/browser-logs", "methods": ["POST"] }, "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "client.landing": { "uri": "/", "methods": ["GET", "HEAD"] }, "client.destination": { "uri": "destinations", "methods": ["GET", "HEAD"] }, "client.destination.countries": { "uri": "destinations/countries", "methods": ["GET", "HEAD"] }, "client.destination.country": { "uri": "destinations/countries/{slug}", "methods": ["GET", "HEAD"], "parameters": ["slug"] }, "client.outbound": { "uri": "outbound", "methods": ["GET", "HEAD"] }, "client.outbound.group": { "uri": "outbound/groups/{slug}", "methods": ["GET", "HEAD"], "parameters": ["slug"] }, "client.outbound.package.detail": { "uri": "outbound/packages/{slug}", "methods": ["GET", "HEAD"], "parameters": ["slug"] }, "client.inbound": { "uri": "inbound", "methods": ["GET", "HEAD"] }, "client.inbound.group": { "uri": "inbound/groups/{slug}", "methods": ["GET", "HEAD"], "parameters": ["slug"] }, "client.inbound.package.detail": { "uri": "inbound/packages/{slug}", "methods": ["GET", "HEAD"], "parameters": ["slug"] }, "client.inquiry.store": { "uri": "inquiry/store", "methods": ["POST"] }, "client.inquiry.success": { "uri": "inquiry/success", "methods": ["GET", "HEAD"] }, "client.inquiry.policy": { "uri": "inquiry/policy", "methods": ["GET", "HEAD"] }, "client.contact": { "uri": "contacts", "methods": ["GET", "HEAD"] }, "client.about": { "uri": "about", "methods": ["GET", "HEAD"] }, "admin.dashboard": { "uri": "admin/dashboard", "methods": ["GET", "HEAD"] }, "admin.packages": { "uri": "admin/packages", "methods": ["GET", "HEAD"] }, "admin.packages.details": { "uri": "admin/packages/{id}/details", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.packages.create": { "uri": "admin/packages/create", "methods": ["GET", "HEAD"] }, "admin.packages.store": { "uri": "admin/packages/store", "methods": ["POST"] }, "admin.packages.edit": { "uri": "admin/packages/edit/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.packages.update": { "uri": "admin/packages/update/{id}", "methods": ["PUT"], "parameters": ["id"] }, "admin.packages.destroy": { "uri": "admin/packages/destroy/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "admin.packages.images.store": { "uri": "admin/packages/images/store/{id}", "methods": ["POST"], "parameters": ["id"] }, "admin.packages.images.update": { "uri": "admin/packages/images/update/{id}", "methods": ["PUT"], "parameters": ["id"] }, "admin.packages.batches.create": { "uri": "admin/packages/{id}/travelBatches/create", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.packages.batches.store": { "uri": "admin/packages/{id}/travelBatches/store", "methods": ["POST"], "parameters": ["id"] }, "admin.packages.batches.edit": { "uri": "admin/packages/{id}/travelBatches/{scheduleId}/edit", "methods": ["GET", "HEAD"], "parameters": ["id", "scheduleId"] }, "admin.packages.batches.update": { "uri": "admin/packages/{id}/travelBatches/{scheduleId}", "methods": ["PUT"], "parameters": ["id", "scheduleId"] }, "admin.packages.batches.destroy": { "uri": "admin/packages/{id}/travelBatches/{scheduleId}", "methods": ["DELETE"], "parameters": ["id", "scheduleId"] }, "admin.packages.groups": { "uri": "admin/packageGroups", "methods": ["GET", "HEAD"] }, "admin.packages.groups.create": { "uri": "admin/packageGroups/create", "methods": ["GET", "HEAD"] }, "admin.packages.groups.store": { "uri": "admin/packageGroups/store", "methods": ["POST"] }, "admin.packages.groups.edit": { "uri": "admin/packageGroups/edit/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.packages.groups.update": { "uri": "admin/packageGroups/update/{id}", "methods": ["PUT"], "parameters": ["id"] }, "admin.packages.groups.feature": { "uri": "admin/packageGroups/feature/{id}", "methods": ["PUT"], "parameters": ["id"] }, "admin.packages.groups.destroy": { "uri": "admin/packageGroups/destroy/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "admin.packages.groups.pin": { "uri": "admin/packageGroups/pin/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.packages.groups.pin.update": { "uri": "admin/packageGroups/pin/update/{id}", "methods": ["PUT"], "parameters": ["id"] }, "admin.destinations": { "uri": "admin/destinations", "methods": ["GET", "HEAD"] }, "admin.destinations.details": { "uri": "admin/destinations/{id}/details", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.destinations.create": { "uri": "admin/destinations/create", "methods": ["GET", "HEAD"] }, "admin.destinations.store": { "uri": "admin/destinations/store", "methods": ["POST"] }, "admin.destinations.edit": { "uri": "admin/destinations/edit/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.destinations.update": { "uri": "admin/destinations/update/{id}", "methods": ["PUT"], "parameters": ["id"] }, "admin.destinations.destroy": { "uri": "admin/destinations/destroy/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "admin.destinations.locations.create": { "uri": "admin/destinations/{destID}/locations/create", "methods": ["GET", "HEAD"], "parameters": ["destID"] }, "admin.destinations.locations.store": { "uri": "admin/destinations/{destID}/locations/store", "methods": ["POST"], "parameters": ["destID"] }, "admin.destinations.locations.edit": { "uri": "admin/destinations/{destID}/locations/edit/{id}", "methods": ["GET", "HEAD"], "parameters": ["destID", "id"] }, "admin.destinations.locations.update": { "uri": "admin/destinations/{destID}/locations/update/{id}", "methods": ["PUT"], "parameters": ["destID", "id"] }, "admin.destinations.locations.destroy": { "uri": "admin/destinations/{destID}/locations/destroy/{id}", "methods": ["DELETE"], "parameters": ["destID", "id"] }, "admin.inquiries": { "uri": "admin/inquiries", "methods": ["GET", "HEAD"] }, "admin.inquiries.details": { "uri": "admin/inquiries/{id}/details", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.inquiries.status.update": { "uri": "admin/inquiries/{id}/patch", "methods": ["PATCH"], "parameters": ["id"] }, "admin.inquiries.destroy": { "uri": "admin/inquiries/destroy/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "admin.users.admins": { "uri": "admin/users/admins", "methods": ["GET", "HEAD"] }, "admin.users.admins.create": { "uri": "admin/users/admins/create", "methods": ["GET", "HEAD"] }, "admin.users.admins.store": { "uri": "admin/users/admins/store", "methods": ["POST"] }, "admin.users.admins.destroy": { "uri": "admin/users/admins/destroy/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "admin.users.admins.details": { "uri": "admin/users/admins/details/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.users.admins.details.update": { "uri": "admin/users/admins/details/{id}/update", "methods": ["PATCH"], "parameters": ["id"] }, "admin.users.admins.edit": { "uri": "admin/users/admins/details/{id}/edit", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "admin.users.admins.update": { "uri": "admin/users/admins/details/{id}/update", "methods": ["PUT"], "parameters": ["id"] }, "admin.users.clients": { "uri": "admin/users/clients", "methods": ["GET", "HEAD"] }, "admin.bookings": { "uri": "admin/bookings", "methods": ["GET", "HEAD"] }, "admin.logs": { "uri": "admin/logs", "methods": ["GET", "HEAD"] }, "admin.verify.email.send": { "uri": "admin/verify/email", "methods": ["POST"] }, "admin.verification.verify": { "uri": "admin/verify/{hash}", "methods": ["GET", "HEAD"], "parameters": ["hash"] }, "admin.access.denied": { "uri": "admin/accessDenied", "methods": ["GET", "HEAD"] }, "admin.forgot.password": { "uri": "admin/forgot-password", "methods": ["GET", "HEAD"] }, "admin.forgot.password.send": { "uri": "admin/forgot-password", "methods": ["POST"] }, "admin.forgot.password.reset": { "uri": "admin/reset-password/{token}", "methods": ["GET", "HEAD"], "parameters": ["token"] }, "admin.password.store": { "uri": "admin/reset-password", "methods": ["POST"] }, "profile.edit": { "uri": "admin/settings/profile", "methods": ["GET", "HEAD"] }, "profile.update": { "uri": "admin/settings/profile", "methods": ["PATCH"] }, "profile.destroy": { "uri": "admin/settings/profile", "methods": ["DELETE"] }, "password.edit": { "uri": "admin/settings/password", "methods": ["GET", "HEAD"] }, "password.update": { "uri": "admin/settings/password", "methods": ["PUT"] }, "currency.edit": { "uri": "admin/settings/currency", "methods": ["GET", "HEAD"] }, "currency.update": { "uri": "admin/settings/currency", "methods": ["PUT"] }, "appearance": { "uri": "admin/settings/appearance", "methods": ["GET", "HEAD"] }, "admin.login": { "uri": "admin/login", "methods": ["GET", "HEAD"] }, "admin.login.store": { "uri": "admin/login", "methods": ["POST"] }, "admin.register": { "uri": "admin/register", "methods": ["GET", "HEAD"] }, "verification.notice": { "uri": "verify-email", "methods": ["GET", "HEAD"] }, "verification.verify": { "uri": "verify-email/{id}/{hash}", "methods": ["GET", "HEAD"], "parameters": ["id", "hash"] }, "verification.send": { "uri": "email/verification-notification", "methods": ["POST"] }, "password.confirm": { "uri": "confirm-password", "methods": ["GET", "HEAD"] }, "logout": { "uri": "logout", "methods": ["POST"] }, "storage.local": { "uri": "storage/{path}", "methods": ["GET", "HEAD"], "wheres": { "path": ".*" }, "parameters": ["path"] }, "storage.local.upload": { "uri": "storage/{path}", "methods": ["PUT"], "wheres": { "path": ".*" }, "parameters": ["path"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy$1.routes, window.Ziggy.routes);
}
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Sonner",
  __ssrInlineRender: true,
  props: {
    id: {},
    invert: { type: Boolean },
    theme: {},
    position: {},
    closeButtonPosition: {},
    hotkey: {},
    richColors: { type: Boolean },
    expand: { type: Boolean },
    duration: {},
    gap: {},
    visibleToasts: {},
    closeButton: { type: Boolean },
    toastOptions: {},
    class: {},
    style: {},
    offset: {},
    mobileOffset: {},
    dir: {},
    swipeDirections: {},
    icons: {},
    containerAriaLabel: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "toastOptions");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Toaster), mergeProps({
        class: "toaster group",
        "toast-options": {
          classes: {
            toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
          }
        }
      }, unref(delegatedProps), _attrs), {
        "success-icon": withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CircleCheckIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CircleCheckIcon), { class: "size-4" })
            ];
          }
        }),
        "info-icon": withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(InfoIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(InfoIcon), { class: "size-4" })
            ];
          }
        }),
        "warning-icon": withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TriangleAlertIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TriangleAlertIcon), { class: "size-4" })
            ];
          }
        }),
        "error-icon": withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(OctagonXIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(OctagonXIcon), { class: "size-4" })
            ];
          }
        }),
        "loading-icon": withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Loader2Icon), { class: "size-4 animate-spin" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(unref(Loader2Icon), { class: "size-4 animate-spin" })
              ])
            ];
          }
        }),
        "close-icon": withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(XIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(XIcon), { class: "size-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sonner/Sonner.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const state = reactive({
  show: false,
  title: "Confirm delete",
  message: "Are you sure you want to delete this item?",
  confirmText: "Delete",
  cancelText: "Cancel",
  onConfirm: void 0,
  loading: false
});
function openDeleteDialog(options = {}) {
  state.title = options.title ?? "Confirm delete";
  state.message = options.message ?? "Are you sure you want to delete this item?";
  state.confirmText = options.confirmText ?? "Delete";
  state.cancelText = options.cancelText ?? "Cancel";
  state.onConfirm = options.onConfirm;
  state.loading = false;
  state.show = true;
}
function closeDeleteDialog() {
  state.show = false;
  state.onConfirm = void 0;
  state.loading = false;
}
async function confirmDelete() {
  if (!state.onConfirm) {
    closeDeleteDialog();
    return;
  }
  try {
    state.loading = true;
    await state.onConfirm();
  } finally {
    state.loading = false;
    closeDeleteDialog();
  }
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/Dialog.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DialogClose",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogClose), mergeProps(props, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogClose.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const appUrl = "http://127.0.0.1:8000/";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const formatCurrency = (amount, currency = "PHP", fractions = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    // Optional: Use 'minimumFractionDigits: 0' if you don't want decimals for whole numbers
    minimumFractionDigits: fractions,
    maximumFractionDigits: 2
  }).format(amount);
};
const formatDateString = (dateStr, includeTime = false) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...includeTime && { hour: "numeric", minute: "numeric" }
  });
};
const getPackageDurationLabel = (days) => {
  if (days > 1) {
    return `${days}D${days - 1}N`;
  } else {
    return `${days} day`;
  }
};
const formatPackageDateRange = (startDate, endDate) => {
  const singleFormat = {
    day: "2-digit",
    month: "short",
    year: "numeric"
  };
  const rangeStartFormat = {
    day: "2-digit",
    month: "short"
  };
  const rangeEndFormat = {
    day: "2-digit",
    month: "short",
    year: "numeric"
  };
  if (!startDate && endDate) {
    return `Ends at ${new Date(endDate).toLocaleDateString("en-US", singleFormat)}`;
  }
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;
  const isSameDate = start.getDate() === end.getDate() && start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (!endDate || isSameDate) {
    return start.toLocaleDateString("en-US", singleFormat);
  }
  return `${start.toLocaleDateString("en-US", rangeStartFormat)} - ${end.toLocaleDateString("en-US", rangeEndFormat)}`;
};
const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
const packageSellingStatus = (endDate) => {
  const today = /* @__PURE__ */ new Date();
  const end = new Date(endDate);
  return today > end ? "ENDED" : "SELLING";
};
const getSeasonColor = (season) => {
  switch (season) {
    case "spring":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "summer":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    case "autumn":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    case "winter":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
};
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};
const formatItinerariesForEdit = (itineraries, unescapeJsonString) => {
  if (!Array.isArray(itineraries) || itineraries.length === 0) {
    return "";
  }
  return itineraries.map((item) => {
    const title = unescapeJsonString(item.title ?? "");
    const activities = Array.isArray(item.activity) ? item.activity.map(unescapeJsonString).join("\n") : unescapeJsonString(item.activity ?? "");
    return `${title}
${activities}`;
  }).join("\n\n");
};
const getImageUrl = (path) => {
  return `${appUrl}/storage/${path}`;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _2, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DialogContent), mergeProps(unref(forwarded), {
              class: unref(cn)(
                "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                props.class
              )
            }), {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span class="sr-only"${_scopeId3}>Close</span>`);
                      } else {
                        return [
                          createVNode(unref(X), { class: "h-4 w-4" }),
                          createVNode("span", { class: "sr-only" }, "Close")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                      default: withCtx(() => [
                        createVNode(unref(X), { class: "h-4 w-4" }),
                        createVNode("span", { class: "sr-only" }, "Close")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
              createVNode(unref(DialogContent), mergeProps(unref(forwarded), {
                class: unref(cn)(
                  "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                    default: withCtx(() => [
                      createVNode(unref(X), { class: "h-4 w-4" }),
                      createVNode("span", { class: "sr-only" }, "Close")
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogContent.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DialogDescription",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _2, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogDescription), mergeProps(unref(forwardedProps), {
        class: unref(cn)("text-sm text-muted-foreground", props.class)
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogDescription.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DialogFooter",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogFooter.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DialogHeader",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col gap-y-1.5 text-center sm:text-left", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogHeader.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DialogScrollContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _2, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    class: unref(cn)(
                      "relative z-50 my-8 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
                      props.class
                    )
                  }, unref(forwarded), {
                    onPointerDownOutside: (event) => {
                      const originalEvent = event.detail.originalEvent;
                      const target = originalEvent.target;
                      if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
                        event.preventDefault();
                      }
                    }
                  }), {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        _push4(ssrRenderComponent(unref(DialogClose), { class: "absolute right-3 top-3 rounded-md p-0.5 transition-colors hover:bg-secondary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(`<span class="sr-only"${_scopeId4}>Close</span>`);
                            } else {
                              return [
                                createVNode(unref(X), { class: "h-4 w-4" }),
                                createVNode("span", { class: "sr-only" }, "Close")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "default"),
                          createVNode(unref(DialogClose), { class: "absolute right-3 top-3 rounded-md p-0.5 transition-colors hover:bg-secondary" }, {
                            default: withCtx(() => [
                              createVNode(unref(X), { class: "h-4 w-4" }),
                              createVNode("span", { class: "sr-only" }, "Close")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DialogContent), mergeProps({
                      class: unref(cn)(
                        "relative z-50 my-8 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
                        props.class
                      )
                    }, unref(forwarded), {
                      onPointerDownOutside: (event) => {
                        const originalEvent = event.detail.originalEvent;
                        const target = originalEvent.target;
                        if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
                          event.preventDefault();
                        }
                      }
                    }), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default"),
                        createVNode(unref(DialogClose), { class: "absolute right-3 top-3 rounded-md p-0.5 transition-colors hover:bg-secondary" }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "h-4 w-4" }),
                            createVNode("span", { class: "sr-only" }, "Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 3
                    }, 16, ["class", "onPointerDownOutside"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, {
                default: withCtx(() => [
                  createVNode(unref(DialogContent), mergeProps({
                    class: unref(cn)(
                      "relative z-50 my-8 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
                      props.class
                    )
                  }, unref(forwarded), {
                    onPointerDownOutside: (event) => {
                      const originalEvent = event.detail.originalEvent;
                      const target = originalEvent.target;
                      if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
                        event.preventDefault();
                      }
                    }
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default"),
                      createVNode(unref(DialogClose), { class: "absolute right-3 top-3 rounded-md p-0.5 transition-colors hover:bg-secondary" }, {
                        default: withCtx(() => [
                          createVNode(unref(X), { class: "h-4 w-4" }),
                          createVNode("span", { class: "sr-only" }, "Close")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 3
                  }, 16, ["class", "onPointerDownOutside"])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogScrollContent.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _2, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTitle), mergeProps(unref(forwardedProps), {
        class: unref(cn)("text-lg font-semibold leading-none tracking-tight", props.class)
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogTitle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTrigger), mergeProps(props, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dialog/DialogTrigger.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: { type: [Boolean, null, String, Object, Array] },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(unref(buttonVariants)({ variant: __props.variant, size: __props.size }), props.class)
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/button/Button.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        "default": "h-10 px-4 py-2",
        "sm": "h-9 rounded-md px-3",
        "lg": "h-11 rounded-md px-8",
        "icon": "h-10 w-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const confirm = () => confirmDelete();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$b), mergeProps({
        open: unref(state).show,
        "onUpdate:open": (val) => unref(state).show = val
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(state).title)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(state).title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(state).title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), {
                            innerHTML: unref(state).message
                          }, null, 8, ["innerHTML"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "border-t pt-4 flex justify-end gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                variant: "secondary",
                                disabled: unref(state).loading
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(state).cancelText)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(state).cancelText), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "secondary",
                                  disabled: unref(state).loading
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(state).cancelText), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          variant: "destructive",
                          disabled: unref(state).loading,
                          onClick: confirm
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(state).loading) {
                                _push5(`<span class="mr-2 animate-spin inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white" data-v-011e891f${_scopeId4}></span>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(unref(state).confirmText)}`);
                            } else {
                              return [
                                unref(state).loading ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "mr-2 animate-spin inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(unref(state).confirmText), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                variant: "secondary",
                                disabled: unref(state).loading
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(state).cancelText), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2), {
                            variant: "destructive",
                            disabled: unref(state).loading,
                            onClick: confirm
                          }, {
                            default: withCtx(() => [
                              unref(state).loading ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "mr-2 animate-spin inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(state).confirmText), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), { class: "space-y-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(state).title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          innerHTML: unref(state).message
                        }, null, 8, ["innerHTML"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "border-t pt-4 flex justify-end gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              variant: "secondary",
                              disabled: unref(state).loading
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(state).cancelText), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2), {
                          variant: "destructive",
                          disabled: unref(state).loading,
                          onClick: confirm
                        }, {
                          default: withCtx(() => [
                            unref(state).loading ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mr-2 animate-spin inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(state).confirmText), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(unref(_sfc_main$9), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), { class: "space-y-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(state).title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        innerHTML: unref(state).message
                      }, null, 8, ["innerHTML"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$7), { class: "border-t pt-4 flex justify-end gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            variant: "secondary",
                            disabled: unref(state).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(state).cancelText), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2), {
                        variant: "destructive",
                        disabled: unref(state).loading,
                        onClick: confirm
                      }, {
                        default: withCtx(() => [
                          unref(state).loading ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "mr-2 animate-spin inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(state).confirmText), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/DeleteDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DeleteDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-011e891f"]]);
const isOpen = ref(false);
const shareUrl = ref("");
const useShareModal = () => {
  const open = (url) => {
    shareUrl.value = url || window.location.href;
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  return { isOpen, shareUrl, open, close };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ShareModal",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen: isOpen2, shareUrl: shareUrl2 } = useShareModal();
    const isCopied = ref(false);
    const socialLinks = [
      {
        name: "Messenger",
        icon: "logos:messenger",
        url: (url) => `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}`
      },
      {
        name: "Facebook",
        icon: "logos:facebook",
        url: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      },
      {
        name: "WhatsApp",
        icon: "logos:whatsapp-icon",
        url: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`
      },
      {
        name: "SMS",
        icon: "flat-color-icons:sms",
        url: (url) => `sms:?body=${encodeURIComponent(url)}`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isOpen2)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm" }, _attrs))} data-v-1ff0f0b3><div class="relative w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 overflow-hidden border border-slate-100" data-v-1ff0f0b3><div class="flex justify-between items-center mb-6" data-v-1ff0f0b3><h3 class="text-lg font-bold text-slate-800" data-v-1ff0f0b3>Share Link</h3><button class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600" data-v-1ff0f0b3>`);
        _push(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div><div class="flex items-center gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl mb-8 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all" data-v-1ff0f0b3><input type="text" readonly${ssrRenderAttr("value", unref(shareUrl2))} class="w-full px-3 py-2 bg-transparent text-sm text-slate-600 outline-none truncate" data-v-1ff0f0b3><button class="${ssrRenderClass(["flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all", isCopied.value ? "bg-green-500 text-white" : "bg-slate-800 text-white hover:bg-slate-900"])}" data-v-1ff0f0b3>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(isCopied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent);
        _push(` ${ssrInterpolate(isCopied.value ? "Copied" : "Copy")}</button></div><div class="grid grid-cols-4 gap-1" data-v-1ff0f0b3><!--[-->`);
        ssrRenderList(socialLinks, (social) => {
          _push(`<a${ssrRenderAttr("href", social.url(unref(shareUrl2)))} target="_blank" class="flex flex-col items-center gap-2 group cursor-pointer" data-v-1ff0f0b3><div class="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-200 transition-colors duration-300" data-v-1ff0f0b3>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: social.icon,
            class: ["w-8 h-8"]
          }, null, _parent));
          _push(`</div><span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors" data-v-1ff0f0b3>${ssrInterpolate(social.name)}</span></a>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ShareModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ShareModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ff0f0b3"]]);
const appName = "Reliable International Travel Services";
globalThis.route = (name, params, absolute, config) => P(name, params, absolute, config ?? Ziggy$1);
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(
      `./pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({ "./pages/Dashboard.vue": () => import("./assets/Dashboard-D3wOE-EY.js"), "./pages/Welcome.vue": () => import("./assets/Welcome-D9LvnZTF.js"), "./pages/admin/auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-1s3Qpn2l.js"), "./pages/admin/auth/InactiveAccountPage.vue": () => import("./assets/InactiveAccountPage-DOprF5nw.js"), "./pages/admin/auth/Login.vue": () => import("./assets/Login-pKtKmyrw.js"), "./pages/admin/auth/ResetPassword.vue": () => import("./assets/ResetPassword-DfKP-oS1.js"), "./pages/admin/booking/BookingManagement.vue": () => import("./assets/BookingManagement-BoVhPD0c.js"), "./pages/admin/dashboard/DashboardPage.vue": () => import("./assets/DashboardPage-ExvrX64R.js"), "./pages/admin/destination/CreateDestination.vue": () => import("./assets/CreateDestination-BZ1ZhJFI.js"), "./pages/admin/destination/CreateLocation.vue": () => import("./assets/CreateLocation-meGc3YcX.js"), "./pages/admin/destination/DestinationDetail.vue": () => import("./assets/DestinationDetail-Bi2xkz4M.js"), "./pages/admin/destination/EditDestination.vue": () => import("./assets/EditDestination-BwaCR6OS.js"), "./pages/admin/destination/EditLocation.vue": () => import("./assets/EditLocation-WvUpmJjg.js"), "./pages/admin/destination/ServiceCountry.vue": () => import("./assets/ServiceCountry-DS3I_q_E.js"), "./pages/admin/inquiry/ClientsInquiry.vue": () => import("./assets/ClientsInquiry-D5cNzFuo.js"), "./pages/admin/inquiry/InquiryDetail.vue": () => import("./assets/InquiryDetail-DvP64yL1.js"), "./pages/admin/log/ActivityLog.vue": () => import("./assets/ActivityLog-D9W3x1Aw.js"), "./pages/admin/package/CreatePackage.vue": () => import("./assets/CreatePackage-DnFpEMgy.js"), "./pages/admin/package/CreatePackageGroup.vue": () => import("./assets/CreatePackageGroup-iUpxKixd.js"), "./pages/admin/package/CreateTravelBatch.vue": () => import("./assets/CreateTravelBatch-DJzUS8Y8.js"), "./pages/admin/package/EditPackage.vue": () => import("./assets/EditPackage-D8Z_z3d6.js"), "./pages/admin/package/EditPackageGroup.vue": () => import("./assets/EditPackageGroup-Bqd_rcwr.js"), "./pages/admin/package/EditTravelBatch.vue": () => import("./assets/EditTravelBatch-BUabp9A4.js"), "./pages/admin/package/PackageDetail.vue": () => import("./assets/PackageDetail-UHbOh5e3.js"), "./pages/admin/package/PackageGroupDisplay.vue": () => import("./assets/PackageGroupDisplay-DCioSKeV.js"), "./pages/admin/package/PackageGroupPin.vue": () => import("./assets/PackageGroupPin-C7W_5Niw.js"), "./pages/admin/package/ServicePackage.vue": () => import("./assets/ServicePackage-G0k20GzW.js"), "./pages/admin/package/section/PackageAdditionalInfo.vue": () => import("./assets/PackageAdditionalInfo-DyNozL6X.js"), "./pages/admin/package/section/PackageDescriptionAndHighlight.vue": () => import("./assets/PackageDescriptionAndHighlight-Cbb4_1J5.js"), "./pages/admin/package/section/PackageHeaderTitle.vue": () => import("./assets/PackageHeaderTitle-V_56e2FB.js"), "./pages/admin/package/section/PackageImagesAsset.vue": () => import("./assets/PackageImagesAsset-BF-fe_aP.js"), "./pages/admin/package/section/PackageSellingPeriod.vue": () => import("./assets/PackageSellingPeriod-BJ9H331S.js"), "./pages/admin/package/section/PackageTabInfo.vue": () => import("./assets/PackageTabInfo-DTondCFr.js"), "./pages/admin/user/admin/AdminAccountDetail.vue": () => import("./assets/AdminAccountDetail-DIcl_MrR.js"), "./pages/admin/user/admin/AdminManagement.vue": () => import("./assets/AdminManagement-DYMeQqy_.js"), "./pages/admin/user/admin/CreateAdminAccount.vue": () => import("./assets/CreateAdminAccount-BLPavRSz.js"), "./pages/admin/user/admin/EditAdminAccount.vue": () => import("./assets/EditAdminAccount-gE_dSAGL.js"), "./pages/admin/user/client/ClientManagement.vue": () => import("./assets/ClientManagement-biTln3rn.js"), "./pages/auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-Bjm2qweh.js"), "./pages/auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-m57OijPX.js"), "./pages/auth/Login.vue": () => import("./assets/Login-DX27bwT2.js"), "./pages/auth/Register.vue": () => import("./assets/Register-DarnGxH_.js"), "./pages/auth/ResetPassword.vue": () => import("./assets/ResetPassword-CV49LYIB.js"), "./pages/auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-BgG7Y9Vt.js"), "./pages/client/about/AboutUsPage.vue": () => import("./assets/AboutUsPage-BBP77R10.js"), "./pages/client/about/section/AboutAgency.vue": () => import("./assets/AboutAgency-vy4nG9wJ.js"), "./pages/client/about/section/AgencyRating.vue": () => import("./assets/AgencyRating-CbDoe17K.js"), "./pages/client/about/section/AgencyVideo.vue": () => import("./assets/AgencyVideo-Di-n7uOh.js"), "./pages/client/about/section/TitleHeader.vue": () => import("./assets/TitleHeader-CZ_f-Lyk.js").then((n2) => n2.T), "./pages/client/contact/ContactPage.vue": () => import("./assets/ContactPage-CEvmTUbx.js"), "./pages/client/contact/section/AgencyFaq.vue": () => import("./assets/AgencyFaq-Dyja7nLn.js"), "./pages/client/contact/section/AgencyOffer.vue": () => import("./assets/AgencyOffer-D6FWzpwk.js"), "./pages/client/contact/section/SocialMedia.vue": () => import("./assets/SocialMedia-DJRbQxHO.js"), "./pages/client/country/ServiceCountryPage.vue": () => import("./assets/ServiceCountryPage-Bf905AMs.js"), "./pages/client/country/section/DestinationList.vue": () => import("./assets/DestinationList-bsiaO63F.js"), "./pages/client/country/section/TitleHeader.vue": () => import("./assets/TitleHeader-DcGdV3d3.js"), "./pages/client/destination/DestinationPage.vue": () => import("./assets/DestinationPage-7ww-xueP.js"), "./pages/client/destination/section/DestinationCarousel.vue": () => import("./assets/DestinationCarousel-C5M3j_-H.js"), "./pages/client/destination/section/FeaturedInboundPackage.vue": () => import("./assets/FeaturedInboundPackage-C42nACFj.js"), "./pages/client/destination/section/FeaturedOutboundPackage.vue": () => import("./assets/FeaturedOutboundPackage-TYARnQUq.js"), "./pages/client/destination/section/TitleHeader.vue": () => import("./assets/TitleHeader-CvDpBPVq.js").then((n2) => n2.T), "./pages/client/home/LandingPage.vue": () => import("./assets/LandingPage-BQIDY1k9.js"), "./pages/client/home/section/AboutAgency.vue": () => import("./assets/AboutAgency-rUqOgpWB.js"), "./pages/client/home/section/AgencyServices.vue": () => import("./assets/AgencyServices-CYrsPMuo.js"), "./pages/client/home/section/ClientFeedback.vue": () => import("./assets/ClientFeedback-DSVhMGsS.js"), "./pages/client/home/section/DestinationCarousel.vue": () => import("./assets/DestinationCarousel-BRaiFNnL.js"), "./pages/client/home/section/ImageCarousel.vue": () => import("./assets/ImageCarousel-WGRTy9ZH.js"), "./pages/client/home/section/InboundPackageCarousel.vue": () => import("./assets/InboundPackageCarousel-DpOjBE9B.js"), "./pages/client/home/section/InquiryForm.vue": () => import("./assets/InquiryForm-BQF3iMFZ.js"), "./pages/client/home/section/OutboundPackageCarousel.vue": () => import("./assets/OutboundPackageCarousel-CIU6sGf6.js"), "./pages/client/home/section/PartnerAgency.vue": () => import("./assets/PartnerAgency-Cx_8K46v.js"), "./pages/client/inbound/InboundPage.vue": () => import("./assets/InboundPage-z2Fkv-24.js"), "./pages/client/inbound/section/InboundFilter.vue": () => import("./assets/InboundFilter-B1--2YRV.js"), "./pages/client/inbound/section/InboundPackageDisplay.vue": () => import("./assets/InboundPackageDisplay-D-bdbpo7.js"), "./pages/client/inbound/section/InboundTitleHeader.vue": () => import("./assets/InboundTitleHeader-UNK5-e8M.js"), "./pages/client/location/LocationPage.vue": () => import("./assets/LocationPage-BPgsywjP.js"), "./pages/client/location/section/LocationList.vue": () => import("./assets/LocationList-CXnbkgns.js"), "./pages/client/location/section/TitleHeader.vue": () => import("./assets/TitleHeader-VTbwCKOz.js"), "./pages/client/message/InquiryResult.vue": () => import("./assets/InquiryResult-DSnqrX8r.js"), "./pages/client/outbound/OutboundPage.vue": () => import("./assets/OutboundPage-Cgj7P0lF.js"), "./pages/client/outbound/section/OutboundFilter.vue": () => import("./assets/OutboundFilter-2Ac2L8ho.js"), "./pages/client/outbound/section/OutboundPackageDisplay.vue": () => import("./assets/OutboundPackageDisplay-CSWcw0IY.js"), "./pages/client/outbound/section/OutboundTitleHeader.vue": () => import("./assets/OutboundTitleHeader-HynFkREz.js"), "./pages/client/package/detail/PackageDetailPage.vue": () => import("./assets/PackageDetailPage-C4TB-XbX.js"), "./pages/client/package/detail/section/PackageDescription.vue": () => import("./assets/PackageDescription-BbWp032w.js"), "./pages/client/package/detail/section/PackageExclusion.vue": () => import("./assets/PackageExclusion-DVATkuUI.js"), "./pages/client/package/detail/section/PackageHighlight.vue": () => import("./assets/PackageHighlight-w87neNFZ.js"), "./pages/client/package/detail/section/PackageIncludedServices.vue": () => import("./assets/PackageIncludedServices-DnpaiqtI.js"), "./pages/client/package/detail/section/PackageInclusion.vue": () => import("./assets/PackageInclusion-Dtn9dhiL.js"), "./pages/client/package/detail/section/PackageItinerary.vue": () => import("./assets/PackageItinerary-CNug2Llt.js"), "./pages/client/package/detail/section/PackageNote.vue": () => import("./assets/PackageNote-DZNcEw9K.js"), "./pages/client/package/detail/section/PackageRateAndPeriod.vue": () => import("./assets/PackageRateAndPeriod-BhoAqLix.js"), "./pages/client/package/detail/section/PackageTitleHeaderWithImage.vue": () => import("./assets/PackageTitleHeaderWithImage-BP95RKW8.js"), "./pages/client/package/detail/section/PackageTravelSchedule.vue": () => import("./assets/PackageTravelSchedule-ChyOgdIB.js"), "./pages/client/package/group/PackageGroupPage.vue": () => import("./assets/PackageGroupPage-CpxRsmYv.js"), "./pages/client/package/group/section/PackageList.vue": () => import("./assets/PackageList-DSLVO2yc.js"), "./pages/client/package/group/section/TitleHeader.vue": () => import("./assets/TitleHeader-BRiqXDNV.js"), "./pages/client/policy/InquiryPolicy.vue": () => import("./assets/InquiryPolicy-DEgqSRXy.js"), "./pages/error/RouteFallbackError.vue": () => import("./assets/RouteFallbackError-DTEBhyp3.js"), "./pages/settings/Appearance.vue": () => import("./assets/Appearance-B3Z1-ntt.js"), "./pages/settings/Currency.vue": () => import("./assets/Currency-IyDCyA1l.js"), "./pages/settings/Password.vue": () => import("./assets/Password-D859sSSH.js"), "./pages/settings/Profile.vue": () => import("./assets/Profile-CqYBAykC.js"), "./pages/verification/employee/EmployeeVerificationResult.vue": () => import("./assets/EmployeeVerificationResult-Ct08U4T4.js") })
    ),
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => [
          h$1(App, props),
          h$1(_sfc_main$c, { richColors: true, position: "top-right" }),
          h$1(DeleteDialog),
          h$1(ShareModal)
        ]
      }).use(plugin).use(U);
    }
  })
);
export {
  _sfc_main$2 as _,
  formatDateString as a,
  formatCurrency as b,
  cn as c,
  getSeasonColor as d,
  _sfc_main$7 as e,
  formatItinerariesForEdit as f,
  getPackageDurationLabel as g,
  _sfc_main$b as h,
  _sfc_main$9 as i,
  _sfc_main$6 as j,
  _sfc_main$4 as k,
  _export_sfc as l,
  getImageUrl as m,
  _sfc_main$8 as n,
  openDeleteDialog as o,
  packageSellingStatus as p,
  formatPackageDateRange as q,
  _sfc_main$3 as r,
  scrollToSection as s,
  truncateText as t,
  _sfc_main$a as u
};
