import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";
function useCurrency() {
  const page = usePage();
  const usdToPhpRate = computed(() => page.props.settings.usd_to_php_rate);
  const convertToPeso = (usd) => usd * usdToPhpRate.value;
  const convertToUsd = (peso) => peso / usdToPhpRate.value;
  return {
    usdToPhpRate,
    convertToUsd,
    convertToPeso
  };
}
export {
  useCurrency as u
};
