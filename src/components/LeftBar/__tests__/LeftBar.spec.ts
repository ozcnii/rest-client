import { beforeEach, describe, expect, it } from "vitest";

import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia } from "pinia";

import { useFoldersStore } from "@/store/folders";

import RootComponent from "@/components/LeftBar/LeftBar.vue";
import FolderVue from "@/components/LeftBar/Folder.vue";
import { useRequestStore } from "@/store/request";

const newFolderNameInputPlaceholder = "[placeholder='New folder name']";
const foldersCreateFormId = "[data-testid='folders-create-form']";

const folderDeleteButtonId = "[data-testid='folder-delete-button']";
const requestsListItemId = "[data-testid='requests-list-item']";
const requestsNoRequestsId = "[data-testid='requests-no-requests']";

describe("LeftBar", () => {
  let wrapper: VueWrapper<any>;
  let foldersStore: ReturnType<typeof useFoldersStore>;
  let requestStore: ReturnType<typeof useRequestStore>;

  beforeEach(async () => {
    wrapper = mount(RootComponent, {
      global: { plugins: [createPinia()] },
    });

    foldersStore = useFoldersStore();
    requestStore = useRequestStore();

    foldersStore.reset();
    requestStore.reset();
  });

  it("add new folder", async () => {
    const foldersBefore = wrapper.findAllComponents(FolderVue);

    const newFolderName = "new-folder-name";
    const newFolderNameInput = wrapper.find(newFolderNameInputPlaceholder);

    await newFolderNameInput.setValue(newFolderName);
    await wrapper.find(foldersCreateFormId).trigger("submit");

    const updatedFolderNameInput = wrapper.find<HTMLInputElement>(
      newFolderNameInputPlaceholder
    );

    const foldersAfterCreate = wrapper.findAllComponents(FolderVue);

    expect(updatedFolderNameInput.element.value).toBe("");
    expect(foldersAfterCreate.length).toBe(foldersBefore.length + 1);
    expect(foldersAfterCreate[0].text()).toContain(newFolderName);
  });

  it("delete folder", async () => {
    const foldersBefore = wrapper.findAllComponents(FolderVue);
    const firstFolder = foldersBefore[0];

    await firstFolder.find(folderDeleteButtonId).trigger("click");
    const foldersAfterCreate = wrapper.findAllComponents(FolderVue);

    expect(foldersAfterCreate.length).toBe(foldersBefore.length - 1);
  });

  it("open folder", async () => {
    const folders = wrapper.findAllComponents(FolderVue);

    const currentFolder = folders[0];
    const requestsInFolderBefore = currentFolder.findAll(requestsListItemId).length;

    await currentFolder.trigger("click");
    const requestsInFolderAfter = currentFolder.findAll(requestsListItemId).length;

    expect(requestsInFolderBefore).toBe(0);
    expect(requestsInFolderAfter).toBe(foldersStore.folders[0].requests.length);
  });

  it("new folder have 0 requests", async () => {
    const newFolderName = "new-folder-name";
    const newFolderNameInput = wrapper.find(newFolderNameInputPlaceholder);

    await newFolderNameInput.setValue(newFolderName);
    await wrapper.find(foldersCreateFormId).trigger("submit");

    const newFolder = wrapper.findAllComponents(FolderVue)[0];
    await newFolder.trigger("click");

    const requests = newFolder.findAll(requestsListItemId);
    const noRequestsItem = wrapper.find(requestsNoRequestsId);

    expect(requests.length).toBe(0);
    expect(noRequestsItem.exists()).toBeTruthy();
    expect(noRequestsItem.text()).toBe("No requests on this folder");
  });

  it("set active request", async () => {
    const currentFolder = wrapper.findComponent(FolderVue);
    await currentFolder.trigger("click");

    const currentRequest = currentFolder.findAll(requestsListItemId)[0];
    await currentRequest.trigger("click");

    expect(requestStore.activeRequest?.name).toBe(
      foldersStore.folders[0].requests[0].name
    );
  });
});
