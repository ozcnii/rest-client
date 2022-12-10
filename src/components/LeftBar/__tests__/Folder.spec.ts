import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import { Folder } from "@/store/folders";
import { Methods } from "@/store/request";

import Component from "@/components/LeftBar/Folder.vue";

const folderId = "0";
const folder: Folder = {
  id: folderId,
  isOpen: false,
  name: "some-name",
  requests: [
    {
      folder_id: folderId,
      id: "1",
      method: Methods.GET,
      name: "some-name-request",
      url: "some.com",
    },
  ],
};

const enableTestId = "[data-testid='folder-edit-enable-button']";
const disableTestId = "[data-testid='folder-edit-disable-button']";
const inputPlaceholder = "[placeholder='Enter folder name']";
const folderNameTestId = "[data-testid='folder-name']";

describe("Folder", () => {
  it("change edit-mode on click", async () => {
    const wrapper = mount(Component, {
      props: { folder },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    });

    await wrapper.find(disableTestId).trigger("click");
    expect(wrapper.find(enableTestId)).toBeTruthy();
    expect(wrapper.find(disableTestId).exists()).toBeFalsy();

    await wrapper.find(enableTestId).trigger("click");
    expect(wrapper.find(disableTestId)).toBeTruthy();
    expect(wrapper.find(enableTestId).exists()).toBeFalsy();
  });

  it("save new title", async () => {
    const wrapper = mount(Component, {
      props: { folder },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    });

    const newFolderName = "new-folder-name";
    await wrapper.find(disableTestId).trigger("click");

    const input = wrapper.find<HTMLInputElement>(inputPlaceholder);
    expect(input.element.value).toBe(folder.name);

    await input.setValue(newFolderName);
    expect(input.element.value).toBe(newFolderName);

    await wrapper.find(enableTestId).trigger("click");
    expect(wrapper.find(folderNameTestId).text()).toBe(newFolderName);
  });
});
