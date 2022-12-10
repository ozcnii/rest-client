<template>
  <div class="grow w-full flex flex-col">
    <form
      data-testid="folders-create-form"
      class="w-full flex justify-center items-center"
      @submit.prevent="create"
    >
      <Input
        placeholder="New folder name"
        v-model.trim="newFolderName"
        class="rounded-r-none w-full"
      />
      <Button class="rounded-l-none Button">Create</Button>
    </form>

    <div v-if="!foldersStore.folders.length" class="text-center mt-3">
      No saved folders
    </div>

    <div v-else class="relative mt-3 overflow-y-auto grow w-full">
      <ul class="absolute inset-0">
        <li
          v-for="folder in foldersStore.folders"
          @click="toggleIsOpenFolder(folder.id)"
          :key="folder.id"
          class="px-2"
        >
          <Folder :folder="folder" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useFoldersStore } from "@/store/folders";

import Folder from "@/components/LeftBar/Folder.vue";
import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";

const foldersStore = useFoldersStore();

const newFolderName = ref("");

function toggleIsOpenFolder(id: string) {
  foldersStore.toggleOpenFolder(id);
}

function create() {
  if (!newFolderName.value) {
    return;
  }

  foldersStore.createFolder(newFolderName.value);
  newFolderName.value = "";
}
</script>
