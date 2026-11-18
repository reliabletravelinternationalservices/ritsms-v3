import { defineComponent, mergeProps, unref, useSSRContext, ref, computed } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
import { m as getImageUrl, g as getPackageDurationLabel, b as formatCurrency, l as _export_sfc } from "../ssr.js";
import { u as useCurrency } from "./useCurrency-Ta8J8A5v.js";
import { a as api } from "./api-uth6pyvr.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PackageCard",
  __ssrInlineRender: true,
  props: {
    package: {},
    isInbound: { type: Boolean }
  },
  setup(__props) {
    const { convertToUsd } = useCurrency();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.isInbound ? _ctx.route("client.inbound.package.detail", { slug: __props.package.slug }) : _ctx.route("client.outbound.package.detail", { slug: __props.package.slug }),
        "aria-label": `View details for ${__props.package.name} - ${__props.package.destination} package`,
        class: "carousel__item group"
      }, _attrs))}><div class="h-auto md:h-[400px] max-w-[320px] flex flex-col md:grid md:grid-rows-2 border border-[var(--shadow-custom)] overflow-hidden bg-white transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-gray-300"><div class="relative h-[180px] md:h-full overflow-hidden">`);
      if (__props.package && __props.package.primary_image) {
        _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(__props.package.primary_image.file_path))}${ssrRenderAttr("alt", `${__props.package.name} - ${__props.package.destination} travel package`)} loading="lazy" class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105">`);
      } else {
        _push(`<div class="w-full h-full bg-gray-200 flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:image-off",
          width: "48",
          height: "48",
          class: "text-gray-400"
        }, null, _parent));
        _push(`</div>`);
      }
      if (__props.package.tag != null) {
        _push(`<span class="bg-black/50 flex items-center justify-center absolute top-0 left-0 py-1 px-4 text-[var(--primary-custom)] font-roboto m-2 text-[10px] md:text-xs">${ssrInterpolate(__props.package.tag)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-3 md:p-4 flex flex-col justify-between text-left"><div><div class="flex items-center justify-between mb-2"><span class="${ssrRenderClass([__props.isInbound ? "bg-[var(--inbound-custom)]" : "bg-[var(--outbound-custom)]", "font-bold font-roboto text-[10px] md:text-xs text-[var(--primary-custom)] py-1 px-3 inline-block"])}">${ssrInterpolate(unref(getPackageDurationLabel)(__props.package.duration))}</span><span class="${ssrRenderClass([__props.isInbound ? "text-[var(--inbound-custom)]" : "text-[var(--outbound-custom)]", "flex items-center space-x-1 text-[10px] md:text-xs font-roboto"])}">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:map-marker",
        width: "16",
        height: "16"
      }, null, _parent));
      _push(`<span class="truncate max-w-[100px] md:max-w-none">${ssrInterpolate(__props.package.destination)}</span></span></div><div class="flex flex-col"><h3 class="text-lg font-bold text-[var(--color-dark)] line-clamp-1">${ssrInterpolate(__props.package.name)}</h3><p class="font-medium font-roboto text-[10px] md:text-sm text-[var(--muted-custom)] mb-4"> from <span class="font-bold text-[var(--warning-custom)] text-sm md:text-lg">${ssrInterpolate(unref(formatCurrency)(__props.isInbound ? unref(convertToUsd)(__props.package.base_price) : __props.package.base_price, __props.isInbound ? "USD" : "PHP"))}/pax</span></p><p class="font-roboto text-[11px] md:text-sm line-clamp-2 text-gray-600">${ssrInterpolate(__props.package.description)}</p></div></div></div></div></a>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/PackageCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse" }, _attrs))}><div class="relative h-36 w-full bg-gray-300"><div class="absolute left-3 top-3 h-6 w-24 rounded bg-gray-400"></div></div><div class="p-5"><div class="mb-4 flex items-center justify-between gap-3"><div class="h-8 w-16 rounded bg-gray-300"></div><div class="flex items-center gap-2 flex-1 justify-end"><div class="h-4 w-4 rounded-full bg-gray-300"></div><div class="h-4 w-36 rounded bg-gray-300"></div></div></div><div class="space-y-2"><div class="h-6 w-full rounded bg-gray-300"></div><div class="h-6 w-3/4 rounded bg-gray-300"></div></div><div class="mt-5 flex items-end gap-2"><div class="h-5 w-12 rounded bg-gray-300"></div><div class="h-7 w-36 rounded bg-gray-300"></div></div><div class="mt-5 space-y-2"><div class="h-4 w-full rounded bg-gray-200"></div><div class="h-4 w-full rounded bg-gray-200"></div><div class="h-4 w-2/3 rounded bg-gray-200"></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/skeleton/PackageCardSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PackageCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const packageService = {
  async getAll(filters = {}) {
    const { data } = await api.get("/packages", { params: filters });
    return data;
  }
};
const groupedPackageService = {
  async getAll(filters = {}) {
    const { data } = await api.get("/packages/groups", { params: filters });
    return data;
  }
};
function usePackages() {
  const pagination = ref(null);
  const packages = ref([]);
  const loading = ref(false);
  const loaded = ref(false);
  const loadingMore = ref(false);
  const error = ref(null);
  const lastFilters = ref({});
  const isLastPage = computed(() => {
    if (!pagination.value) return true;
    return pagination.value.current_page >= pagination.value.last_page;
  });
  const fetchPackages = async (filters = {}, append = false) => {
    var _a, _b;
    if (append) {
      loadingMore.value = true;
    } else {
      loading.value = true;
    }
    try {
      lastFilters.value = { ...filters };
      const response = await packageService.getAll(filters);
      pagination.value = response.data;
      if (append) {
        packages.value.push(...response.data.data);
      } else {
        packages.value = response.data.data;
      }
      loaded.value = true;
    } catch (err) {
      error.value = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) ?? err.message ?? "Failed to fetch packages.";
      if (append) {
        packages.value = [];
        pagination.value = null;
      }
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  };
  const refresh = (filters = {}) => fetchPackages({
    ...filters,
    page: 1
  });
  const loadMore = async () => {
    if (!pagination.value || isLastPage.value) return;
    await fetchPackages(
      {
        ...lastFilters.value,
        page: pagination.value.current_page + 1,
        perPage: pagination.value.per_page
      },
      true
    );
  };
  const nextPage = async () => {
    var _a;
    if (!((_a = pagination.value) == null ? void 0 : _a.next_page_url)) return;
    await fetchPackages({
      ...lastFilters.value,
      page: pagination.value.current_page + 1,
      perPage: pagination.value.per_page
    });
  };
  const prevPage = async () => {
    var _a;
    if (!((_a = pagination.value) == null ? void 0 : _a.prev_page_url)) return;
    await fetchPackages({
      ...lastFilters.value,
      page: pagination.value.current_page - 1,
      perPage: pagination.value.per_page
    });
  };
  const reset = () => {
    packages.value = [];
    loading.value = false;
    loaded.value = false;
    error.value = null;
  };
  return {
    packages,
    pagination,
    isLastPage,
    lastFilters,
    loadingMore,
    loading,
    loaded,
    error,
    loadMore,
    nextPage,
    prevPage,
    fetchPackages,
    refresh,
    reset
  };
}
function useGroupPackages() {
  const pagination = ref(null);
  const groupedPackages = ref([]);
  const loading = ref(false);
  const loadingMore = ref(false);
  const loaded = ref(false);
  const error = ref(null);
  const lastFilters = ref({});
  const isLastPage = computed(() => {
    if (!pagination.value) return true;
    return pagination.value.current_page >= pagination.value.last_page;
  });
  const fetchGroupPackages = async (filters = {}, append = false) => {
    var _a, _b;
    if (append) {
      loadingMore.value = true;
    } else {
      loading.value = true;
    }
    error.value = null;
    try {
      lastFilters.value = { ...filters };
      const response = await groupedPackageService.getAll(filters);
      pagination.value = response.data;
      if (append) {
        groupedPackages.value.push(...response.data.data);
      } else {
        groupedPackages.value = response.data.data;
      }
      loaded.value = true;
    } catch (err) {
      error.value = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) ?? err.message ?? "Failed to fetch group packages.";
      if (append) {
        groupedPackages.value = [];
        pagination.value = null;
      }
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  };
  const refresh = (filters = {}) => fetchGroupPackages({
    ...filters,
    page: 1
  });
  const loadMore = async () => {
    if (!pagination.value || isLastPage.value) return;
    await fetchGroupPackages(
      {
        ...lastFilters.value,
        page: pagination.value.current_page + 1,
        perPage: pagination.value.per_page
      },
      true
    );
  };
  const nextPage = async () => {
    var _a;
    if (!((_a = pagination.value) == null ? void 0 : _a.next_page_url)) return;
    await fetchGroupPackages({
      ...lastFilters.value,
      page: pagination.value.current_page + 1,
      perPage: pagination.value.per_page
    });
  };
  const prevPage = async () => {
    var _a;
    if (!((_a = pagination.value) == null ? void 0 : _a.prev_page_url)) return;
    await fetchGroupPackages({
      ...lastFilters.value,
      page: pagination.value.current_page - 1,
      perPage: pagination.value.per_page
    });
  };
  const reset = () => {
    groupedPackages.value = [];
    pagination.value = null;
    loading.value = false;
    loadingMore.value = false;
    loaded.value = false;
    error.value = null;
    lastFilters.value = {};
  };
  return {
    groupedPackages,
    pagination,
    loading,
    loadingMore,
    loaded,
    error,
    isLastPage,
    lastFilters,
    loadMore,
    nextPage,
    prevPage,
    fetchGroupPackages,
    refresh,
    reset
  };
}
export {
  PackageCardSkeleton as P,
  _sfc_main$1 as _,
  useGroupPackages as a,
  usePackages as u
};
