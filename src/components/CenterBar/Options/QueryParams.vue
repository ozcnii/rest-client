<template>
  <div class="flex grow flex-col gap-3">
    <Button @click="addQueryParam" class="bg-main-color"> add query params </Button>

    <div v-if="!params?.length" class="flex justify-center">No query params</div>

    <div class="relative overflow-y-auto h-full w-full">
      <div class="list-wrapper">
        <div class="flex flex-col gap-3 items-center">
          <div v-for="param in params" :key="param.id">
            <div class="flex gap-3 px-2">
              <Input class="w-5/12" placeholder="param" v-model="param.key" />
              <Input class="w-6/12" placeholder="value" v-model="param.value" />
              <Button class="min-w-2/12 bg-main-color" @click="deleteQueryParam(param.id)"
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
import { MyNotActiveRequest, MyParam, MyRequest, useRequestStore } from "@/store/request";

import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";

const foldersStore = useFoldersStore();
const requestStore = useRequestStore();

const params = ref<MyParam[]>([]);

onMounted(() => {
  params.value =
    requestStore.activeRequest?.params || requestStore.notActiveRequest?.params || [];
});

function addQueryParam() {
  params.value.push({
    id: nanoid(),
    value: "",
    key: "",
  });
}

function deleteQueryParam(id: string) {
  params.value = params.value.filter((param) => param.id !== id);
}

function saveParams() {
  if (!requestStore.activeRequest) {
    return;
  }

  const newRequest: MyRequest = {
    ...requestStore.activeRequest,
    params: params.value,
  };

  foldersStore.saveRequest(newRequest);
}

function saveNotActiveRequestParams() {
  if (!requestStore.notActiveRequest) {
    return;
  }

  const newRequest: MyNotActiveRequest = {
    ...requestStore.notActiveRequest,
    params: params.value,
  };

  requestStore.setNotActiveRequest(newRequest);
}

watch(
  params,
  () => {
    if (requestStore.activeRequest) {
      saveParams();
    }

    const notActiveRequestParams = JSON.stringify(requestStore.notActiveRequest?.params);
    const currentParams = JSON.stringify(params.value);

    if (notActiveRequestParams !== currentParams) {
      saveNotActiveRequestParams();
    }
  },
  {
    deep: true,
  }
);

requestStore.$subscribe((_, state) => {
  params.value = state.activeRequest?.params || [];
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
