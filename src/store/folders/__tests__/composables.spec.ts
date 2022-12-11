import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useFoldersStore } from "@/store/folders/composables";
import { nanoid } from "nanoid";
import { Methods, MyRequest } from "@/store/request";

describe("useFoldersStore", () => {
  let foldersStore: ReturnType<typeof useFoldersStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    foldersStore = useFoldersStore();
    foldersStore.reset();
  });

  it("set the name of an existing folder", () => {
    const newName = "new-folder-name";
    const currentFolder = foldersStore.folders[0];

    foldersStore.setFolderName({
      folder_id: currentFolder.id,
      name: newName,
    });

    expect(currentFolder.name).toBe(newName);
  });

  it("set the name of an non existing folder", () => {
    const newName = "new-folder-name";
    const currentFolderId = nanoid();

    foldersStore.setFolderName({
      folder_id: currentFolderId,
      name: newName,
    });

    foldersStore.folders.forEach((folder) => {
      expect(folder.name).not.toBe(newName);
    });
  });

  it("delete existing folder", () => {
    const foldersBefore = [...foldersStore.folders].length;
    const currentFolder = foldersStore.folders[0];

    foldersStore.deleteFolder(currentFolder.id);
    expect(foldersBefore).toBe(foldersStore.folders.length + 1);
  });

  it("delete non existing folder", () => {
    const foldersBefore = [...foldersStore.folders].length;
    const currentFolderId = nanoid();

    foldersStore.deleteFolder(currentFolderId);
    expect(foldersBefore).toBe(foldersStore.folders.length);
  });

  it("create folder", () => {
    const newName = "new-folder-name";
    const foldersBefore = [...foldersStore.folders].length;

    foldersStore.createFolder(newName);
    const { isOpen, name, requests } = foldersStore.folders[0];

    expect(foldersBefore).toBe(foldersStore.folders.length - 1);
    expect(isOpen).toBe(false);

    expect(name).toBe(newName);
    expect(requests).toEqual([]);
  });

  it("open existing folder", () => {
    const { id, isOpen } = foldersStore.folders[0];

    foldersStore.openFolder(id);

    expect(foldersStore.folders[0].isOpen).toBe(!isOpen);
  });

  it("open non existing folder", () => {
    const currentFolderId = nanoid();

    const initialFolders = [...foldersStore.folders];
    foldersStore.openFolder(currentFolderId);

    foldersStore.folders.forEach((folder, index) => {
      expect(folder.isOpen).toBe(initialFolders[index].isOpen);
    });
  });

  it("toggle open existing folder", () => {
    const { id, isOpen } = foldersStore.folders[0];

    foldersStore.toggleOpenFolder(id);

    expect(foldersStore.folders[0].isOpen).toBe(!isOpen);
  });

  it("toggle open non existing folder", () => {
    const currentFolderId = nanoid();

    const initialFolders = [...foldersStore.folders];
    foldersStore.toggleOpenFolder(currentFolderId);

    foldersStore.folders.forEach((folder, index) => {
      expect(folder.isOpen).toBe(initialFolders[index].isOpen);
    });
  });

  it("delete existing request", () => {
    const currentFolder = foldersStore.folders[0];

    const requestsBefore = { ...currentFolder }.requests.length;
    const currentRequest = foldersStore.folders[0].requests[0];

    foldersStore.deleteRequest(currentRequest.id, currentRequest.folder_id);
    expect(requestsBefore).toBe(currentFolder.requests.length + 1);
  });

  it("delete non existing request", () => {
    const currentFolder = foldersStore.folders[0];

    const requestsBefore = { ...currentFolder }.requests.length;
    const currentRequestId = nanoid();

    foldersStore.deleteRequest(currentRequestId, currentFolder.id);
    expect(requestsBefore).toBe(currentFolder.requests.length);
  });

  it("save existing request", () => {
    const currentFolder = foldersStore.folders[0];
    const currentRequestBefore = currentFolder.requests[0];

    const currentRequest: MyRequest = {
      folder_id: currentFolder.id,
      id: currentRequestBefore.id,
      method: Methods.GET,
      name: "some-request-name",
      url: "some-site.com/com",
    };

    foldersStore.saveRequest(currentRequest);

    expect(currentFolder.requests[0]).toEqual(currentRequest);
  });

  it("save non existing request", () => {
    const currentFolder = foldersStore.folders[0];
    const currentRequestId = nanoid();

    const currentRequest: MyRequest = {
      folder_id: currentFolder.id,
      id: currentRequestId,
      method: Methods.GET,
      name: "some-request-name",
      url: "some-site.com/com",
    };

    foldersStore.saveRequest(currentRequest);

    currentFolder.requests.forEach((request) => {
      expect(request).not.toEqual(currentRequest);
    });
  });

  it("create request", () => {
    const currentFolder = foldersStore.folders[0];

    const requestsBefore = [...currentFolder.requests].length;

    const currentRequest: MyRequest = {
      folder_id: currentFolder.id,
      id: nanoid(),
      method: Methods.GET,
      name: "some-request-name",
      url: "some-site.com/com",
    };

    foldersStore.createRequest(currentFolder.id, currentRequest);

    expect(requestsBefore).toBe(currentFolder.requests.length - 1);
    expect(currentFolder.requests.at(-1)).toEqual(currentRequest);
  });
});
