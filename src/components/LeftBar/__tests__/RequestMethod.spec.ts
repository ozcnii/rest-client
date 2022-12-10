import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import Component from "@/components/LeftBar/RequestMethod.vue";
import { requestMethodResults } from "@/components/LeftBar/__tests__/data";

describe("RequestMethod", () => {
  it.each([requestMethodResults])("color match method", ({ method, color }) => {
    const wrapper = mount(Component, { props: { method } });

    const classes = wrapper.find("p").attributes().class;

    expect(classes).toContain(color);
  });
});
