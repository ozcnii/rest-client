<template>
  <div class="header-wrapper p-3">
    <form class="header-form flex" @submit.prevent="getData">
      <Select
        class="select"
        :options="requestStore.httpMethods"
        :default="method"
        @input="setMethod"
      />

      <Input
        :modelValue="url"
        @update:modelValue="setUrl"
        class="w-full rounded-r-none rounded-l-none"
        placeholder="URL"
      />

      <div class="flex">
        <Button
          type="button"
          @click="saveRequest"
          class="rounded-r-none rounded-l-none Options__item"
          >save</Button
        >
        <Button
          type="button"
          @click="clearActiveRequest"
          class="rounded-r-none rounded-l-none Options__item"
          >new</Button
        >
      </div>

      <Button type="submit" class="button rounded-l-none"> Send </Button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useFoldersStore } from "@/store/folders";
import { useRequestStore, Methods, MyRequest, TMethods } from "@/store/request";

import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";
import Select from "@/components/UI/Select.vue";

const foldersStore = useFoldersStore();
const requestStore = useRequestStore();

const url = ref(requestStore.activeRequest?.url || "");
const method = ref(requestStore.activeRequest?.method || Methods.GET);

function saveRequest() {
  if (!requestStore.activeRequest) {
    return;
  }

  const newRequest: MyRequest = {
    ...requestStore.activeRequest,
    method: method.value,
    url: url.value,
  };

  foldersStore.saveRequest(newRequest);
}

function setMethod(value: TMethods) {
  method.value = value;
}

function setUrl(value: string) {
  url.value = value;
}

function getData() {
  requestStore.getRequest();
  saveRequest();
}

function clearActiveRequest() {
  requestStore.setActiveRequest(null);
}

requestStore.$subscribe((_, state) => {
  url.value = state.activeRequest?.url || "";
  method.value = state.activeRequest?.method || Methods.GET;
});
</script>

<style scoped>
.select {
  width: 20%;
}
</style>
