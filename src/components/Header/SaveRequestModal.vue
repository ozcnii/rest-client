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
              v-for="folder in getFolders"
              class="Folder__item rounded-md p-3 cursor-pointer flex items-center gap-3"
              @click="selectFolder(folder.id)"
            >
              <FolderIcon :isOpen="false" />
              <p>
                {{ folder.name }}
              </p>
            </li>

            <div v-if="!getFolders.length" class="text-center">
              No saved folders
            </div>
          </ul>
          <div
            v-if="requestNamePopoup"
            class="Modal__wrapper"
            @click="closePopout"
          >
            <div class="Modal__content--wrapper">
              <div class="Popout__content p-3 rounded-md" @click.stop>
                <form @submit.prevent="createRequest">
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

<script>
import { defineComponent } from "vue";
import Input from "../UI/Input.vue";
import Button from "../UI/Button.vue";
import { mapGetters, mapMutations } from "vuex";
import FolderIcon from "../LeftBar/FolderIcon.vue";
import { Mutations } from "../../store/mutations";

export default defineComponent({
  emits: ["close"],

  data() {
    return {
      folderName: "",
      requestName: "",
      requestNamePopoup: false,
      selectedFolderId: 0,
    };
  },

  methods: {
    ...mapMutations([
      `${Mutations.createFolder}`,
      `${Mutations.CREATE_REQUEST}`,
      `${Mutations.SET_NOT_ACTIVE_REQUEST}`,
      `${Mutations.SET_ACTIVE_REQUEST}`,
      `${Mutations.OPEN_FOLDER}`,
    ]),

    createRequest() {
      if (this.requestName.trim()) {
        const folder_id = this.selectedFolderId;
        const request = {
          ...this.getNotActiveRequest,
          method: this.getNotActiveRequest?.method || "GET",
          name: this.requestName,
          id: Date.now(),
          folder_id,
        };

        this[Mutations.CREATE_REQUEST]({
          folder_id,
          request,
        });

        this.closeHandler();
        this[Mutations.SET_NOT_ACTIVE_REQUEST](null);
        this[Mutations.SET_ACTIVE_REQUEST](request);
        this[Mutations.OPEN_FOLDER](folder_id);
      }
    },

    createFolderHandler() {
      if (this.folderName.trim()) {
        this[Mutations.createFolder]({
          name: this.folderName,
        });
        this.folderName = "";
      }
    },

    selectFolder(folder_id) {
      this.requestNamePopoup = true;
      this.selectedFolderId = folder_id;
    },

    closeHandler() {
      this.$emit("close");
    },

    closePopout() {
      this.requestNamePopoup = false;
    },
  },

  computed: {
    ...mapGetters(["getFolders", "getNotActiveRequest"]),
  },

  components: { Input, Button, FolderIcon },
});
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
