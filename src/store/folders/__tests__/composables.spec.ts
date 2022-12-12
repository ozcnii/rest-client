import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { nanoid } from "nanoid";

import { useFoldersStore } from "@/store/folders/composables";
import { Methods, MyRequest } from "@/store/request";

describe("usestore", () => {
  let store: ReturnType<typeof useFoldersStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useFoldersStore();
    store.reset();
  });

  it("set the name of an existing folder", () => {
    const newName = "new-folder-name";
    const currentFolder = store.folders[0];

    store.setFolderName({
      folder_id: currentFolder.id,
      name: newName,
    });

    expect(currentFolder.name).toBe(newName);
  });

  it("set the name of an non existing folder", () => {
    const newName = "new-folder-name";
    const currentFolderId = nanoid();

    store.setFolderName({
      folder_id: currentFolderId,
      name: newName,
    });

    store.folders.forEach((folder) => {
      expect(folder.name).not.toBe(newName);
    });
  });

  it("delete existing folder", () => {
    const foldersBefore = [...store.folders].length;
    const currentFolder = store.folders[0];

    store.deleteFolder(currentFolder.id);
    expect(foldersBefore).toBe(store.folders.length + 1);
  });

  it("delete non existing folder", () => {
    const foldersBefore = [...store.folders].length;
    const currentFolderId = nanoid();

    store.deleteFolder(currentFolderId);
    expect(foldersBefore).toBe(store.folders.length);
  });

  it("create folder", () => {
    const newName = "new-folder-name";
    const foldersBefore = [...store.folders].length;

    store.createFolder(newName);
    const { isOpen, name, requests } = store.folders[0];

    expect(foldersBefore).toBe(store.folders.length - 1);
    expect(isOpen).toBe(false);

    expect(name).toBe(newName);
    expect(requests).toEqual([]);
  });

  it("open existing folder", () => {
    const { id, isOpen } = store.folders[0];

    store.openFolder(id);

    expect(store.folders[0].isOpen).toBe(!isOpen);
  });

  it("open non existing folder", () => {
    const currentFolderId = nanoid();

    const initialFolders = [...store.folders];
    store.openFolder(currentFolderId);

    store.folders.forEach((folder, index) => {
      expect(folder.isOpen).toBe(initialFolders[index].isOpen);
    });
  });

  it("toggle open existing folder", () => {
    const { id, isOpen } = store.folders[0];

    store.toggleOpenFolder(id);

    expect(store.folders[0].isOpen).toBe(!isOpen);
  });

  it("toggle open non existing folder", () => {
    const currentFolderId = nanoid();

    const initialFolders = [...store.folders];
    store.toggleOpenFolder(currentFolderId);

    store.folders.forEach((folder, index) => {
      expect(folder.isOpen).toBe(initialFolders[index].isOpen);
    });
  });

  it("delete existing request", () => {
    const currentFolder = store.folders[0];

    const requestsBefore = { ...currentFolder }.requests.length;
    const currentRequest = store.folders[0].requests[0];

    store.deleteRequest(currentRequest.id, currentRequest.folder_id);
    expect(requestsBefore).toBe(currentFolder.requests.length + 1);
  });

  it("delete non existing request", () => {
    const currentFolder = store.folders[0];

    const requestsBefore = { ...currentFolder }.requests.length;
    const currentRequestId = nanoid();

    store.deleteRequest(currentRequestId, currentFolder.id);
    expect(requestsBefore).toBe(currentFolder.requests.length);
  });

  it("save existing request", () => {
    const currentFolder = store.folders[0];
    const currentRequestBefore = currentFolder.requests[0];

    const currentRequest: MyRequest = {
      folder_id: currentFolder.id,
      id: currentRequestBefore.id,
      method: Methods.GET,
      name: "some-request-name",
      url: "some-site.com/com",
    };

    store.saveRequest(currentRequest);

    expect(currentFolder.requests[0]).toEqual(currentRequest);
  });

  it("save non existing request", () => {
    const currentFolder = store.folders[0];
    const currentRequestId = nanoid();

    const currentRequest: MyRequest = {
      folder_id: currentFolder.id,
      id: currentRequestId,
      method: Methods.GET,
      name: "some-request-name",
      url: "some-site.com/com",
    };

    store.saveRequest(currentRequest);

    currentFolder.requests.forEach((request) => {
      expect(request).not.toEqual(currentRequest);
    });
  });

  it("create request", () => {
    const currentFolder = store.folders[0];

    const requestsBefore = [...currentFolder.requests].length;

    const currentRequest: MyRequest = {
      folder_id: currentFolder.id,
      id: nanoid(),
      method: Methods.GET,
      name: "some-request-name",
      url: "some-site.com/com",
    };

    store.createRequest(currentFolder.id, currentRequest);

    expect(requestsBefore).toBe(currentFolder.requests.length - 1);
    expect(currentFolder.requests.at(-1)).toEqual(currentRequest);
  });
});
