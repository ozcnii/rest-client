<template>
  <div class="cursor-pointer mb-3 rounded-md overflow-hidden">
    <div class="flex justify-between items-center Folder px-3 py-2">
      <div class="flex gap-3 items-center">
        <FolderIcon :isOpen="folder.isOpen" />

        <p v-if="!isEditMode" data-testid="folder-name" class="py-2">
          {{ folderName }}
        </p>

        <div v-else @click.stop>
          <Input
            placeholder="Enter folder name"
            v-model.trim="folderName"
            @keydown.enter="setEditModeInactive"
          />
        </div>
      </div>

      <div @click.stop class="flex gap-2">
        <Button
          v-if="!isEditMode"
          data-testid="folder-edit-disable-button"
          @click="setEditModeActive"
          class="hover:text-yellow-500 Button px-2 py-1 rounded-md"
          >&#9998;</Button
        >
        <Button
          v-else
          data-testid="folder-edit-enable-button"
          @click="setEditModeInactive"
          class="hover:text-yellow-500 Button px-2 py-1 rounded-md"
          >💾</Button
        >

        <Button
          data-testid="folder-delete-button"
          @click="deleteCurrentFolder"
          class="hover:text-red-500 Button px-2 py-1 rounded-md"
          >✖</Button
        >
      </div>
    </div>
    <Transition name="requests">
      <div v-if="folder.isOpen" @click.stop>
        <Requests :requests="folder.requests" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { Folder, useFoldersStore } from "@/store/folders";
import { useRequestStore } from "@/store/request";

import Requests from "@/components/LeftBar/Requests.vue";
import FolderIcon from "@/components/LeftBar/FolderIcon.vue";
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";

interface Props {
  folder: Folder;
}

const props = defineProps<Props>();

const foldersStore = useFoldersStore();
const requestStore = useRequestStore();

const folderName = ref(props.folder.name);
const isEditMode = ref(false);

function setEditModeActive() {
  isEditMode.value = true;
}

function setEditModeInactive() {
  if (!folderName.value) {
    return;
  }

  isEditMode.value = false;
  foldersStore.setFolderName({ folder_id: props.folder.id, name: folderName.value });
}

function deleteCurrentFolder() {
  foldersStore.deleteFolder(props.folder.id);
  requestStore.setActiveRequest(null);
}
</script>

<style scoped>
.Folder {
  background-color: var(--second-bg-color);
}

.Folder:hover {
  background-color: var(--border-color);
}

.Button {
  background: transparent;
  border-color: transparent;
}

.Button:hover {
  background-color: var(--main-bg-color);
}

.requests-enter-active,
.requests-leave-active {
  transition: 0.2s ease-in-out;
}

.requests-enter-from,
.requests-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
