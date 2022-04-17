<template>
  <div class="w-full flex flex-col items-center">
    <Folders />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Folders from "./Folders.vue";

export default defineComponent({
  components: { Folders },
});
</script>
