<template>
  <teleport to="body">
    <div class="Modal__wrapper" @click="closeHandler">
      <div class="Modal__content--wrapper">
        <div class="Modal__content p-3 overflow-y-auto rounded-md" @click.stop>
          <div class="mb-5 flex justify-center gap-3 items-center flex-col">
            <p>Select folder or</p>
            <form @submit.prevent="createFolderHandler">
              <Input
                placeholder="Enter new folder name "
                v-model.trim="folderName"
                required
                class="rounded-r-none"
              />
              <Button class="Button rounded-l-none">Create new folder</Button>
            </form>
          </div>
          <ul class="flex flex-col gap-3">
            <li
              v-for="folder in foldersStore.folders"
              class="Folder__item rounded-md p-3 cursor-pointer flex items-center gap-3"
              @click="selectFolder(folder.id)"
            >
              <FolderIcon :isOpen="false" />
              <p>
                {{ folder.name }}
              </p>
            </li>

            <div v-if="!foldersStore.folders.length" class="text-center">
              No saved folders
            </div>
          </ul>
          <div v-if="requestNamePopoup" class="Modal__wrapper" @click="closePopout">
            <div class="Modal__content--wrapper">
              <div class="Popout__content p-3 rounded-md" @click.stop>
                <form @submit.prevent="createRequestHandler">
                  <Input
                    autofocus
                    placeholder="Enter new request name "
                    v-model.trim="requestName"
                    required
                    class="rounded-r-none"
                  />
                  <Button class="Button rounded-l-none">Create request</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { nanoid } from "nanoid";

import { useFoldersStore } from "@/store/folders";
import { Methods, MyRequest, useRequestStore } from "@/store/request";

import Input from "../UI/Input.vue";
import Button from "../UI/Button.vue";
import FolderIcon from "../LeftBar/FolderIcon.vue";

interface Emits {
  (e: "close"): void;
}

const emit = defineEmits<Emits>();

const foldersStore = useFoldersStore();
const requestStore = useRequestStore();

const folderName = ref("");
const requestName = ref("");
const requestNamePopoup = ref(false);
const selectedFolderId = ref("");

function createRequestHandler() {
  if (!requestName.value.trim()) {
    return;
  }

  const folder_id = selectedFolderId.value;

  const request: MyRequest = {
    ...requestStore.notActiveRequest,
    url: requestStore.notActiveRequest?.url || "",
    method: requestStore.notActiveRequest?.method || Methods.GET,
    name: requestName.value,
    id: nanoid(),
    folder_id,
  };

  foldersStore.createRequest(folder_id, request);
  closeHandler();

  requestStore.setActiveRequest(request);
  foldersStore.openFolder(folder_id);
}

function createFolderHandler() {
  if (!folderName.value.trim()) {
    return;
  }

  foldersStore.createFolder(folderName.value);
  folderName.value = "";
}

function selectFolder(folder_id: string) {
  requestNamePopoup.value = true;
  selectedFolderId.value = folder_id;
}

function closeHandler() {
  emit("close");
}

function closePopout() {
  requestNamePopoup.value = false;
}
</script>

<style scoped>
.Modal__wrapper {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
}

.Modal__content--wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: white;
}

.Modal__content {
  border: 1px solid var(--border-color);
  background-color: var(--main-bg-color);
  max-height: 60vh;
  height: 60vh;
  max-width: 65vw;
  width: 65vw;
  position: relative;
}

.Popout__content {
  border: 1px solid var(--border-color);
  background-color: var(--main-bg-color);
}

.Folder__item {
  background-color: var(--second-bg-color);
}

.Folder__item:hover {
  background-color: var(--border-color);
}
</style>
