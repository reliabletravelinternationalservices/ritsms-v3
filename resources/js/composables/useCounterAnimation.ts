import { ref, watch, onMounted } from 'vue';

export interface UseCounterAnimationOptions {
    duration?: number; // Duration in milliseconds
    delay?: number; // Delay before animation starts in milliseconds
}

export function useCounterAnimation(
    targetValue: number | string,
    options: UseCounterAnimationOptions = {}
) {
    const { duration = 1000, delay = 0 } = options;
    const animatedValue = ref<number>(0);
    let animationFrameId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const parseValue = (value: number | string): number => {
        if (typeof value === 'string') {
            const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
            return isNaN(parsed) ? 0 : parsed;
        }
        return value;
    };

    const animate = (target: number) => {
        const startValue = 0;
        const startTime = Date.now();

        const step = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            animatedValue.value = Math.floor(startValue + (target - startValue) * easeProgress);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            } else {
                animatedValue.value = target;
            }
        };

        if (delay > 0) {
            timeoutId = setTimeout(() => {
                animationFrameId = requestAnimationFrame(step);
            }, delay);
        } else {
            animationFrameId = requestAnimationFrame(step);
        }
    };

    onMounted(() => {
        const target = parseValue(targetValue);
        animate(target);
    });

    watch(
        () => targetValue,
        (newValue) => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            const target = parseValue(newValue);
            animatedValue.value = 0;
            animate(target);
        }
    );

    const cleanup = () => {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
        }
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
    };

    return {
        animatedValue,
        cleanup
    };
}
