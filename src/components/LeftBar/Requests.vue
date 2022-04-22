<template>
  <ul>
    <li
      v-for="request in requests"
      class="px-5 py-2 flex justify-between Request items-center"
      @click="setActiveRequest(request)"
      :class="{
        Request__active: getActiveRequest?.id === request.id,
      }"
    >
      <div class="flex gap-2 items-center">
        <RequestMethod :method="request.method" />
        <p>{{ request.name }}</p>
      </div>

      <Button
        @click.stop="deleteRequest(request.id, request.folder_id)"
        class="text-red-500 Button px-2 py-1 rounded-md"
        >✖</Button
      >
    </li>

    <li
      v-if="!requests.length"
      class="px-5 py-2 flex justify-between Request items-center"
    >
      No requests on this folder
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";
import RequestMethod from "./RequestMethod.vue";
import Button from "@/components/UI/Button.vue";
import { mapGetters, mapMutations } from "vuex";
import { Mutations } from "../../store/mutations";

export default defineComponent({
  props: {
    requests: Array,
  },
  components: { RequestMethod, Button },

  methods: {
    setActiveRequest(request) {
      this[Mutations.SET_ACTIVE_REQUEST](request);
    },

    clearActiveRequest() {
      this.setActiveRequest(null);
    },

    deleteRequest(request_id, folder_id) {
      this[Mutations.DELETE_REQUEST]({
        request_id,
        folder_id,
      });
      this.clearActiveRequest();
    },

    ...mapMutations([
      `${[Mutations.SET_ACTIVE_REQUEST]}`,
      `${[Mutations.DELETE_REQUEST]}`,
    ]),
  },

  computed: {
    ...mapGetters(["getActiveRequest"]),
  },
});
</script>

<style scoped>
.Request {
  background-color: var(--second-bg-color);
}

.Request:hover {
  background-color: var(--border-color);
}

.Request__active {
  background-color: var(--main-color);
}
.Request__active:hover {
  background-color: var(--second-color);
}

.Button {
  background: transparent;
}

.Button:hover {
  background-color: var(--main-color);
}
</style>
