<template>
  <div class="header-wrapper p-3">
    <WithActiveRequest v-if="getActiveRequest" />
    <WithoutActiveRequest v-else />
  </div>
</template>

<script>
import Input from "../UI/Input.vue";
import Select from "../UI/Select.vue";
import Button from "../UI/Button.vue";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import WithActiveRequest from "./WithActiveRequest.vue";
import WithoutActiveRequest from "./WithoutActiveRequest.vue";

export default defineComponent({
  components: {
    Input,
    Select,
    Button,
    WithActiveRequest,
    WithoutActiveRequest,
  },

  computed: {
    ...mapGetters(["getActiveRequest"]),
  },
});
</script>

<style scoped>
.header-wrapper {
  z-index: 1;
  background-color: var(--main-bg-color);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
</style>
