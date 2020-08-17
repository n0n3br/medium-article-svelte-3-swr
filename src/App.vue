<template>
  <h1>Javascript Libraries</h1>
  <hr />
  <div class="container">
    <div>
      <Libraries @select="v => selected = v" />
    </div>
    <div>
      <div v-if="selected">
        <Library :key="selected" :name="selected" />
      </div>
    </div>
  </div>
</template>
<script>
import Libraries from "./components/Libraries.vue";
import Library from "./components/Library.vue";
import { ref } from "vue";
export default {
  components: {
    Library,
    Libraries,
  },
  setup() {
    const selected = ref(null);
    return { selected };
  },
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  padding: 24px;
}
.container {
  display: flex;
}
.container div {
  flex-grow: 1;
  flex-basis: 50%;
}
hr {
  margin: 12px 0;
}
ul {
  list-style: none;
}
ul li {
  cursor: pointer;
}
</style>
