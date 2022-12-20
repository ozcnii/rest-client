<template>
  <v-ace-editor
    v-model:value="body"
    lang="json"
    theme="tomorrow_night_bright"
    class="h-full rounded-md"
    :options="{ useWorker: true }"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import { VAceEditor } from "vue3-ace-editor";
// @ts-ignore
import ace from "ace-builds";
// @ts-ignore
import workerJsonUrl from "ace-builds/src-noconflict/worker-json?url";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";

import { useFoldersStore } from "@/store/folders";
import { MyNotActiveRequest, MyRequest, useRequestStore } from "@/store/request";
import { stat } from "fs";

ace.config.setModuleUrl("ace/mode/json_worker", workerJsonUrl);

const foldersStore = useFoldersStore();
const requestStore = useRequestStore();

const JSON_TAB_SIZE = 2;
const body = ref("{}");

onMounted(() => {
  const requestBody =
    requestStore.activeRequest?.body || requestStore.notActiveRequest?.body;

  if (requestBody) {
    try {
      body.value = JSON.stringify(JSON.parse(requestBody), null, JSON_TAB_SIZE);
    } catch {
      body.value = requestBody;
    }
  }
});

function saveBody() {
  if (!requestStore.activeRequest) {
    return;
  }

  const newRequest: MyRequest = {
    ...requestStore.activeRequest,
    body: body.value,
  };

  foldersStore.saveRequest(newRequest);
  requestStore.setActiveRequest(newRequest);
}

function saveNotActiveRequestBody() {
  if (!requestStore.notActiveRequest) {
    return;
  }

  const newRequest: MyNotActiveRequest = {
    ...requestStore.notActiveRequest,
    body: body.value,
  };

  requestStore.setNotActiveRequest(newRequest);
}

watch(
  body,
  () => {
    if (requestStore.activeRequest) {
      saveBody();
    }

    const notActiveRequestBody = JSON.stringify(requestStore.notActiveRequest?.body);
    const currentBody = JSON.stringify(body.value);

    if (notActiveRequestBody !== currentBody) {
      saveNotActiveRequestBody();
    }
  },
  {
    deep: true,
  }
);

requestStore.$subscribe((_, state) => {
  const requestBody = state.activeRequest?.body;

  if (!requestBody) {
    body.value = "{}";
    return;
  }

  try {
    body.value = JSON.stringify(JSON.parse(requestBody), null, JSON_TAB_SIZE);
  } catch {
    body.value = requestBody;
  }
});
</script>
