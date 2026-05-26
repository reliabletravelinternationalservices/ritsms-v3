import { ref } from 'vue';

export function useSkeleton(initial = true) {
  const loading = ref(initial);

  function finish() {
    loading.value = false;
  }

  function start() {
    loading.value = true;
  }

  return { loading, finish, start };
}

export default useSkeleton;
