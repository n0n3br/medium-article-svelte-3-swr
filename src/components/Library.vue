<template>
  <p v-if="isError">An error has occurred: {{error}}</p>
  <p v-else-if="isLoading">Loading ...</p>
  <div v-else>
    <ul>
      <li>Name: {{data.name}}</li>
      <li>Description: {{data.description}}</li>
      <li v-if="data.authors">Authors: {{data.authors.map(author => author.name).join(', ')}}</li>
      <li>
        Latest:
        <a :href="data.latest">{{data.latest}}</a>
      </li>
      <li v-if="data.repository">
        Repository:
        <a :href="data.repository.url">{{data.repository.url}}</a>
      </li>
      <li>License: {{data.license}}</li>

      <li v-if="data.keywords">Keywords: {{data.keywords.join(', ')}}</li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { swr } from "../hooks/swr";
export default {
  props: {
    name: { type: String },
  },
  setup(props) {
    const { name } = props;
    const info = swr(
      name,
      fetch(`https://api.cdnjs.com/libraries/${name}`).then((response) =>
        response.json()
      ),
      {}
    );
    const isLoading = computed(() => {
      return !info.data.name && info.isRevalidating;
    });
    const data = computed(() => info.data);
    const isError = computed(() => info.isError);
    const error = computed(() => info.error);
    return { data, isLoading, isError, error };
  },
};
</script>

<style>
</style>