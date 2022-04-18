<template>
  <div class="cursor-pointer mb-3 rounded-md overflow-hidden">
    <div class="flex justify-between items-center Folder px-3 py-2">
      <div class="flex gap-3 items-center">
        <FolderIcon :isOpen="folder.isOpen" />

        <p v-if="!isEditMode" class="py-2">
          {{ folder.name }}
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
          @click="setEditModeActive"
          class="bg-transparent hover:text-yellow-500 Button px-2 py-1 rounded-md"
          >&#9998;</Button
        >
        <Button
          v-else
          @click="setEditModeInactive"
          class="bg-transparent hover:text-yellow-500 Button px-2 py-1 rounded-md"
          >💾</Button
        >

        <Button
          @click="deleteCurrentFolder"
          class="bg-transparent hover:text-red-500 Button px-2 py-1 rounded-md"
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

<script>
import { defineComponent } from "vue";
import Requests from "./Requests.vue";
import FolderIcon from "./FolderIcon.vue";
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";
import { mapMutations } from "vuex";
import { Mutations } from "../../store/mutations";

export default defineComponent({
  props: {
    folder: Object,
  },

  data() {
    return {
      folderName: this.folder.name,
      isEditMode: false,
    };
  },

  methods: {
    setEditModeActive() {
      this.isEditMode = true;
    },

    setEditModeInactive() {
      this.isEditMode = false;
      this.setName();
    },

    setName() {
      if (this.folderName) {
        this[Mutations.setFolderName]({
          folder_id: this.folder.id,
          name: this.folderName,
        });
      }
    },

    deleteCurrentFolder() {
      this[Mutations.deleteFolder]({
        folder_id: this.folder.id,
      });
    },

    ...mapMutations([
      `${Mutations.setFolderName}`,
      `${Mutations.deleteFolder}`,
    ]),
  },

  components: { Requests, FolderIcon, Input, Button },
});
</script>

<style scoped>
.Folder {
  background-color: var(--second-bg-color);
}
.Folder:hover {
  background-color: var(--border-color);
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
