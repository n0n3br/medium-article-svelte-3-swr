<template>
  <div>
    <p v-if="isError">An error has occurred: {{error}}</p>
    <p v-else-if="isLoading">Loading ...</p>
    <ul v-else>
      <li v-for="lib in data" :key="lib.name" @click="select(lib.name)">{{lib.name}}</li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { swr } from "../hooks/swr.js";

export default {
  setup(props, { emit }) {
    const list = swr(
      "list",
      fetch("https://api.cdnjs.com/libraries")
        .then((response) => response.json())
        .then((data) => data.results),
      []
    );
    const isLoading = computed(() => !list.data.length && list.isRevalidating);
    const isError = computed(() => list.isError);
    const error = computed(() => list.error);
    const data = computed(() => list.data);
    const select = (name) => emit("select", name);
    return { isLoading, isError, error, data, select };
  },
};
</script>

<style>
</style>