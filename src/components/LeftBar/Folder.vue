<template>
  <div class="cursor-pointer mb-3 rounded-md overflow-hidden">
    <div class="flex justify-between items-center Folder px-3 py-2">
      <div class="flex gap-3 items-center">
        <FolderIcon :isOpen="folder.isOpen" />

        <p>
          {{ folder.name }}
        </p>
      </div>

      <div @click.stop class="flex gap-2">
        <Button class="hover:text-yellow-500 Button px-2 py-1 rounded-md"
          >&#9998;</Button
        >
        <Button class="hover:text-red-500 Button px-2 py-1 rounded-md"
          >✖</Button
        >
      </div>
    </div>
    <Transition name="requests">
      <div v-if="folder.isOpen" @click.stop>
        <Requests :requests="folder.requests" />
      </div>
    </Transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Requests from "./Requests.vue";
import FolderIcon from "./FolderIcon.vue";

export default defineComponent({
  props: {
    folder: Object,
  },
  components: { Requests, FolderIcon },
});
</script>

<style scoped>
.Folder {
  background-color: var(--second-bg-color);
}

.Folder:hover {
  background-color: var(--border-color);
}

.Button:hover {
  background-color: var(--main-bg-color);
}

.requests-enter-active,
.requests-leave-active {
  transition: 0.2s ease-in-out;
}

.requests-enter-from,
.requests-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
