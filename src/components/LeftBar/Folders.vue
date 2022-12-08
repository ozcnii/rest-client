<template>
  <div class="grow w-full flex flex-col">
    <form class="w-full flex justify-center items-center" @submit.prevent="create">
      <Input
        placeholder="New folder name"
        v-model.trim="newFolderName"
        class="rounded-r-none w-full"
      />
      <Button class="rounded-l-none Button">Create</Button>
    </form>

    <div v-if="!folders.length" class="text-center mt-3">No saved folders</div>

    <div v-else class="relative mt-3 overflow-y-auto grow w-full">
      <ul class="absolute inset-0">
        <li
          v-for="folder in folders"
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

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import Folder from "./Folder.vue";
import Button from "../UI/Button.vue";
import Input from "../UI/Input.vue";
import { Mutations } from "../../store.old/mutations";

export default defineComponent({
  computed: {
    ...mapGetters({
      folders: "getFolders",
    }),
  },

  data() {
    return {
      newFolderName: "",
    };
  },

  methods: {
    toggleIsOpenFolder(id) {
      this[Mutations.TOGGLE_OPEN_FOLDER](id);
    },

    create() {
      if (this.newFolderName) {
        this[Mutations.createFolder]({ name: this.newFolderName });
        this.newFolderName = "";
      }
    },

    ...mapMutations([`${Mutations.createFolder}`, `${Mutations.TOGGLE_OPEN_FOLDER}`]),
  },
  components: { Folder, Button, Input },
});
</script>
