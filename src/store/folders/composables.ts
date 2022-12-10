import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { saveFolders } from "../../utils/localStorage";
import { MyRequest } from "../request";
import { initialState } from "./data";
import { FoldersState, Folder } from "./types";

export const useFoldersStore = defineStore("folders", {
  state: (): FoldersState => ({ ...initialState }),

  actions: {
    setFolderName({ folder_id, name }: { folder_id: string; name: string }) {
      const currentFolder = this.folders.find((folder) => folder.id == folder_id);

      if (!currentFolder) {
        return;
      }

      currentFolder.name = name;
      saveFolders(this.folders);
    },

    reset() {
      this.folders = [...initialState.folders];
    },

    deleteFolder(folder_id: string) {
      this.folders = this.folders.filter((folder) => folder.id !== folder_id);
      saveFolders(this.folders);
    },

    createFolder(name: string) {
      this.folders.unshift({
        id: nanoid(),
        name,
        isOpen: false,
        requests: [],
      });

      saveFolders(this.folders);
    },

    openFolder(folder_id: string) {
      const currentFolder = this.folders.find((folder) => folder.id === folder_id);

      if (!currentFolder) {
        return;
      }

      currentFolder.isOpen = true;
      saveFolders(this.folders);
    },

    toggleOpenFolder(folder_id: string) {
      const currentFolder = this.folders.find((folder) => folder.id === folder_id);

      if (!currentFolder) {
        return;
      }

      currentFolder.isOpen = !currentFolder.isOpen;
      saveFolders(this.folders);
    },

    setFolders(folders: Folder[]) {
      this.folders = folders;
    },

    deleteRequest(request_id: string, folder_id: string) {
      const currentFolder = this.folders.find((folder) => folder.id === folder_id);

      if (!currentFolder) {
        return;
      }

      currentFolder.requests = currentFolder.requests.filter(
        (request) => request.id !== request_id
      );

      saveFolders(this.folders);
    },

    saveRequest(request: MyRequest) {
      const currentFolder = this.folders.find(
        (folder) => folder.id === request.folder_id
      );

      if (!currentFolder) {
        return;
      }

      const currentRequestIndex = currentFolder.requests.findIndex(
        (req) => req.id === request.id
      );

      if (currentRequestIndex == -1) {
        return;
      }

      currentFolder.requests[currentRequestIndex] = request;
      saveFolders(this.folders);
    },

    createRequest(folder_id: string, request: MyRequest) {
      const currentFolder = this.folders.find((folder) => folder.id === folder_id);

      if (!currentFolder) {
        return;
      }

      currentFolder.requests.push(request);
      saveFolders(this.folders);
    },
  },
});
