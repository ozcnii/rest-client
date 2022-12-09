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

<script lang="ts" setup>
import { onBeforeMount } from "vue";
// @ts-ignore
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { getActiveRequest, getFolders, getNotActiveRequest } from "@/utils";

// import CenterBar from "./components/CenterBar/CenterBar.vue";
// import RightBar from "./components/RightBar/RightBar.vue";
import LeftBar from "@/components/LeftBar/LeftBar.vue";
import HeaderForm from "@/components/Header/HeaderForm.vue";

import { useFoldersStore } from "@/store/folders";
import { useRequestStore } from "@/store/request";

const { setFolders } = useFoldersStore();
const { setNotActiveRequest, setActiveRequest } = useRequestStore();

onBeforeMount(() => {
  const folders = getFolders();
  const activeRequest = getActiveRequest();
  const notActiveRequest = getNotActiveRequest();

  if (Array.isArray(folders)) {
    setFolders(folders);
  }

  if (activeRequest) {
    setActiveRequest(activeRequest);
  }

  if (notActiveRequest) {
    setNotActiveRequest(notActiveRequest);
  }
});
</script>
