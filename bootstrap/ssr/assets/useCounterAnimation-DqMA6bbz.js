import { ref, onMounted, watch } from "vue";
function useCounterAnimation(targetValue, options = {}) {
  const { duration = 1e3, delay = 0 } = options;
  const animatedValue = ref(0);
  let animationFrameId = null;
  let timeoutId = null;
  const parseValue = (value) => {
    if (typeof value === "string") {
      const parsed = parseFloat(value.replace(/[^0-9.-]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return value;
  };
  const animate = (target) => {
    const startValue = 0;
    const startTime = Date.now();
    const step = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
export {
  useCounterAnimation as u
};
