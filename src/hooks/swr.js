import { reactive, readonly, toRefs, watchEffect } from "vue";
const cache = {};
export const swr = (key, promise, initialValue = null) => {
  const state = reactive({
    data:
      cache[key] || localStorage.getItem(`swr-${key}`)
        ? JSON.parse(localStorage.getItem(`swr-${key}`))
        : initialValue,
    isRevalidating: true,
    isError: false,
    error: null,
  });
  promise
    .then((response) => {
      cache[key] = response;
      state.data = response;
      state.isRevalidating = false;
    })
    .catch((err) => {
      state.isRevalidating = false;
      state.isError = true;
      state.error = err.message;
    });
  watchEffect(() => {
    try {
      localStorage.setItem(`swr-${key}`, JSON.stringify(state.data));
    } catch (error) {
      console.log(error);
    }
  });
  return readonly(toRefs(state));
};
