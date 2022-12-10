import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import Component from "@/components/LeftBar/FolderIcon.vue";

const isOpenDValue = "M6 17l2-5h14l-3";
const isClosedDValue = "M22 19a2 2 0";

describe("FolderIcon", () => {
  it("opened", async () => {
    const wrapper = mount(Component, {
      props: {
        isOpen: true,
      },
    });

    const dValue = wrapper.find("path").attributes().d;

    expect(dValue.startsWith(isOpenDValue)).toBeTruthy();
  });

  it("closed", () => {
    const wrapper = mount(Component, {
      props: {
        isOpen: false,
      },
    });

    const dValue = wrapper.find("path").attributes().d;

    expect(dValue.startsWith(isClosedDValue)).toBeTruthy();
  });
});
