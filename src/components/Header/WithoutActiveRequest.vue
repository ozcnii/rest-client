<template>
  <div class="header-wrapper p-3">
    <form class="header-form flex" @submit.prevent="requestStore.getRequest">
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
        required
        placeholder="URL"
      />

      <Button @click="saveRequest" class="rounded-r-none rounded-l-none Options__item"
        >save</Button
      >
      <Button class="button rounded-l-none"> Send </Button>
    </form>
  </div>

  <SaveRequestModal v-if="isShowModal" @close="closeModal" />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import { useRequestStore, Methods, MyNotActiveRequest } from "@/store/request";

import Input from "../UI/Input.vue";
import Select from "../UI/Select.vue";
import Button from "../UI/Button.vue";
import SaveRequestModal from "./SaveRequestModal.vue";

const requestStore = useRequestStore();

const url = ref(requestStore.notActiveRequest?.url || "");
const method = ref(requestStore.notActiveRequest?.method || Methods.GET);
const isShowModal = ref(false);

function saveRequest() {
  if (url.value.trim()) {
    openModal();
  }
}

function openModal() {
  isShowModal.value = true;
}

function closeModal() {
  isShowModal.value = false;
}

function setMethod(value: Methods) {
  method.value = value;
}

function setUrl(value: string) {
  url.value = value;
}

function saveNotActiveRequest() {
  const newRequest: MyNotActiveRequest = {
    ...requestStore.notActiveRequest,
    method: method.value,
    url: url.value,
  };

  requestStore.setNotActiveRequest(newRequest);
}

watch(url, saveNotActiveRequest);
watch(method, saveNotActiveRequest);
</script>

<style scoped>
.select {
  width: 20%;
}
</style>
