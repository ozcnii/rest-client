<template>
  <div class="flex flex-col grow">
    <ul class="flex mb-3 options-list">
      <router-link
        v-slot="{ isActive }"
        v-for="item of options"
        :to="item.link"
        :key="item.link"
        class="w-full item rounded-t-md"
      >
        <li
          class="flex py-3 justify-center"
          :class="{
            'active-item rounded-t-md': isActive,
          }"
        >
          {{ item.name }}
        </li>
      </router-link>
    </ul>

    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      options: [
        {
          name: "Body",
          link: "/body",
        },
        {
          name: "Params",
          link: "/params",
        },
        {
          name: "Headers",
          link: "/headers",
        },
      ],
    };
  },
});
</script>

<style scoped>
.options-list {
  border-bottom: 2px solid var(--border-color);
}

.item:hover {
  background-color: var(--second-bg-color);
}

.active-item {
  background-color: var(--border-color);
}
</style>
