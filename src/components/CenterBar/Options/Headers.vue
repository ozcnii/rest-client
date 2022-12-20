<template>
  <div class="flex grow flex-col gap-3">
    <Button @click="addHeader" class="bg-main-color"> add headers </Button>

    <div v-if="!headers?.length" class="flex justify-center">No headers</div>

    <div class="relative overflow-y-auto h-full w-full flex grow">
      <div class="list-wrapper">
        <div class="flex flex-col gap-3 items-center">
          <div v-for="header in headers" :key="header.id">
            <div class="flex gap-3 px-2">
              <Input class="w-5/12" placeholder="header" v-model="header.key" />
              <Input class="w-6/12" placeholder="value" v-model="header.value" />
              <Button class="min-w-2/12 bg-main-color" @click="deleteHeader(header.id)"
                >✖</Button
              >
            </div>
            <div class="mt-3 hr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { nanoid } from "nanoid";

import { useFoldersStore } from "@/store/folders";
import { MyHeader, MyNotActiveRequest, useRequestStore } from "@/store/request";

import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";

const foldersStore = useFoldersStore();
const requestStore = useRequestStore();

const headers = ref<MyHeader[]>([]);

onMounted(() => {
  headers.value =
    requestStore.activeRequest?.headers || requestStore.notActiveRequest?.headers || [];
});

function addHeader() {
  headers.value.push({
    key: "",
    value: "",
    id: nanoid(),
  });
}

function deleteHeader(id: string) {
  headers.value = headers.value.filter((header) => header.id !== id);
}

function saveHeaders() {
  if (!requestStore.activeRequest) {
    return;
  }

  const newRequest = {
    ...requestStore.activeRequest,
    headers: headers.value,
  };

  foldersStore.saveRequest(newRequest);
  requestStore.setActiveRequest(newRequest);
}

function saveNotActiveRequestHeaders() {
  if (!requestStore.notActiveRequest) {
    return;
  }

  const newRequest: MyNotActiveRequest = {
    ...requestStore.notActiveRequest,
    headers: headers.value,
  };

  requestStore.setNotActiveRequest(newRequest);
}

watch(
  headers,
  () => {
    if (requestStore.activeRequest) {
      saveHeaders();
    }

    const notActiveRequestHeaders = JSON.stringify(requestStore.notActiveRequest?.body);
    const currentHeaders = JSON.stringify(headers.value);

    if (notActiveRequestHeaders !== currentHeaders) {
      saveNotActiveRequestHeaders();
    }
  },
  {
    deep: true,
  }
);

requestStore.$subscribe((_, state) => {
  headers.value = state.activeRequest?.headers || [];
});
</script>

<style scoped>
.list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
