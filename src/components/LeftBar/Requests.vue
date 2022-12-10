<template>
  <ul>
    <li
      data-testid="requests-list-item"
      v-for="request in requests"
      class="px-5 py-2 flex justify-between Request items-center"
      @click="setActiveRequest(request)"
      :class="{
        Request__active: requestStore.activeRequest?.id === request.id,
      }"
    >
      <div class="flex gap-2 items-center">
        <RequestMethod :method="request.method" />
        <p>{{ request.name }}</p>
      </div>

      <Button
        @click.stop="deleteRequest(request.id, request.folder_id)"
        class="text-red-500 Button px-2 py-1 rounded-md"
        >✖</Button
      >
    </li>

    <li
      v-if="!requests.length"
      data-testid="requests-no-requests"
      class="px-5 py-2 flex justify-between Request items-center"
    >
      No requests on this folder
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useFoldersStore } from "@/store/folders";
import { MyRequest, useRequestStore } from "@/store/request";

import Button from "@/components/UI/Button.vue";
import RequestMethod from "./RequestMethod.vue";

interface Props {
  requests: MyRequest[];
}

defineProps<Props>();

const requestStore = useRequestStore();
const foldersStore = useFoldersStore();

function setActiveRequest(request: MyRequest) {
  requestStore.setActiveRequest(request);
}

function deleteRequest(request_id: string, folder_id: string) {
  foldersStore.deleteRequest(request_id, folder_id);
  requestStore.setActiveRequest(null);
}
</script>

<style scoped>
.Request {
  background-color: var(--second-bg-color);
}

.Request:hover {
  background-color: var(--border-color);
}

.Request__active {
  background-color: var(--main-color);
}

.Request__active:hover {
  background-color: var(--second-color);
}

.Button {
  background: transparent;
  border-color: transparent;
}

.Button:hover {
  background-color: var(--main-color);
}
</style>
