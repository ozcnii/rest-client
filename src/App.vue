<template>
  <div class="bg-main min-h-screen p-3 text-white flex">
    <HeaderForm />

    <div class="mt-16 flex gap-3 grow">
      <splitpanes>
        <pane min-size="20">
          <LeftBar />
        </pane>
        <pane min-size="20">
          <CenterBar />
        </pane>

        <pane min-size="20">
          <RightBar class="overflow-x-auto" />
        </pane>
      </splitpanes>
    </div>
  </div>
</template>

<script>
import CenterBar from "./components/CenterBar.vue";
import LeftBar from "./components/LeftBar.vue";
import RightBar from "./components/RightBar.vue";
import HeaderForm from "./components/HeaderForm.vue";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default defineComponent({
  components: {
    Splitpanes,
    Pane,
    LeftBar,
    CenterBar,
    RightBar,
    HeaderForm,
  },
  beforeMount() {
    const params = JSON.parse(localStorage.getItem("params"));
    const headers = JSON.parse(localStorage.getItem("headers"));
    if (params) {
      this.setParams(params);
    }
    if (headers) {
      this.setHeaders(headers);
    }
  },
  methods: {
    ...mapMutations(["setParams"]),
    ...mapMutations(["setHeaders"]),
  },
});
</script>

<style scoped>
.bg-main {
  background-color: var(--main-bg-color);
}
</style>
