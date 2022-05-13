<template>
  <div class="bg-main min-h-screen p-3 text-white flex">
    <HeaderForm />

    <div class="mt-16 flex gap-3 grow">
      <splitpanes>
        <pane min-size="20">
          <LeftBar />
        </pane>
        <pane min-size="0">
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
import CenterBar from "./components/CenterBar/CenterBar.vue";
import LeftBar from "./components/LeftBar/LeftBar.vue";
import RightBar from "./components/RightBar/RightBar.vue";
import HeaderForm from "./components/Header/HeaderForm.vue";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { Mutations } from './store/mutations'
import { getActiveRequest, getFolders, getNotActiveRequest } from './helpers/localStorage';

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
    const folders = getFolders();
    if (Array.isArray(folders)) this[Mutations.SET_FOLDERS](folders);

    const activeRequest = getActiveRequest();
    if (activeRequest) this[Mutations.SET_ACTIVE_REQUEST](activeRequest);

    const notActiveRequest = getNotActiveRequest();
    if (notActiveRequest) this[Mutations.SET_NOT_ACTIVE_REQUEST](notActiveRequest);
  },
  methods: {
    ...mapMutations([`${Mutations.SET_FOLDERS}`, `${Mutations.SET_ACTIVE_REQUEST}`, `${Mutations.SET_NOT_ACTIVE_REQUEST}`]),
  },
});
</script>

<style scoped>
.bg-main {
  background-color: var(--main-bg-color);
}
</style>
