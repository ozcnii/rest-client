<template>
  <div class="bg-main min-h-screen p-3 text-white flex">
    <HeaderForm />

    <div class="mt-16 flex gap-3 grow">
      <LeftBar class="left-bar" />
      <RightBar class="right-bar" />
    </div>
  </div>
</template>

<script>
import LeftBar from "./components/LeftBar.vue";
import RightBar from "./components/RightBar.vue";
import HeaderForm from "./components/HeaderForm.vue";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";

export default defineComponent({
  components: {
    LeftBar,
    RightBar,
    HeaderForm,
  },
  beforeMount() {
    const queries = JSON.parse(localStorage.getItem("queries"));
    if (queries) {
      this.setQueries(queries);
    }
  },
  methods: {
    ...mapMutations(["setQueries"]),
  },
});
</script>

<style scoped>
.bg-main {
  background-color: var(--main-bg-color);
}
.left-bar {
  width: 100%;
}
.right-bar {
  width: 60vw;
  max-width: 60vw;
  min-width: 60vw;
  overflow-x: auto;
}
</style>
