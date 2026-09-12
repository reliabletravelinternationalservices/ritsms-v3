import { SharedData } from "@/types";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

export function useCurrency() {
    const page = usePage<SharedData>();

    const usdToPhpRate = computed(() => page.props.settings.usd_to_php_rate);

    const convertToPeso = (usd: number) => usd * usdToPhpRate.value;
    const convertToUsd = (peso: number) => peso / usdToPhpRate.value;

    return {
        usdToPhpRate,
        convertToUsd,
        convertToPeso
    };
}