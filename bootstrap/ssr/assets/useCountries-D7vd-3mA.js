import { ref, computed } from "vue";
import { a as api } from "./api-uth6pyvr.js";
const countryService = {
  async getAll(filters = {}) {
    const { data } = await api.get("/countries", {
      params: filters
    });
    return data;
  }
};
function useCountry() {
  const countries = ref([]);
  const pagination = ref(null);
  const loading = ref(false);
  const loadingMore = ref(false);
  const loaded = ref(false);
  const error = ref(null);
  const lastFilters = ref({});
  const isLastPage = computed(() => {
    if (!pagination.value) return true;
    return pagination.value.current_page >= pagination.value.last_page;
  });
  const fetchCountries = async (filters = {}, append = false) => {
    var _a, _b;
    if (append) {
      loadingMore.value = true;
    } else {
      loading.value = true;
    }
    error.value = null;
    try {
      lastFilters.value = { ...filters };
      const response = await countryService.getAll(filters);
      pagination.value = response.data;
      if (append) {
        countries.value.push(...response.data.data);
      } else {
        countries.value = response.data.data;
      }
      loaded.value = true;
    } catch (err) {
      error.value = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) ?? err.message ?? "Failed to fetch countries.";
      if (!append) {
        countries.value = [];
        pagination.value = null;
      }
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  };
  const refresh = (filters = {}) => fetchCountries({
    ...filters,
    page: 1
  });
  const loadMore = async () => {
    if (!pagination.value || isLastPage.value) return;
    await fetchCountries(
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
    await fetchCountries({
      ...lastFilters.value,
      page: pagination.value.current_page + 1,
      perPage: pagination.value.per_page
    });
  };
  const prevPage = async () => {
    var _a;
    if (!((_a = pagination.value) == null ? void 0 : _a.prev_page_url)) return;
    await fetchCountries({
      ...lastFilters.value,
      page: pagination.value.current_page - 1,
      perPage: pagination.value.per_page
    });
  };
  const reset = () => {
    countries.value = [];
    pagination.value = null;
    loading.value = false;
    loadingMore.value = false;
    loaded.value = false;
    error.value = null;
    lastFilters.value = {};
  };
  return {
    countries,
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
    fetchCountries,
    refresh,
    reset
  };
}
export {
  useCountry as u
};
