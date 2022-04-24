<template>
  <div class="flex grow flex-col gap-3">
    <Button @click="addHeader" class="bg-main-color"> add headers </Button>

    <div v-if="!headers?.length" class="flex justify-center">No headers</div>

    <div class="relative overflow-y-auto h-full w-full flex grow">
      <div class="list-wrapper">
        <div class="flex flex-col gap-3 items-center">
          <div v-for="header in headers" :key="header.id">
            <div class="flex gap-3 px-2">
              <Input class="w-5/12" placeholder="header" v-model="header.key" />
              <Input
                class="w-6/12"
                placeholder="value"
                v-model="header.value"
              />
              <Button
                class="min-w-2/12 bg-main-color"
                @click="deleteHeader(header.id)"
                >✖</Button
              >
            </div>
            <div class="mt-3 hr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/UI/Input.vue";
import { mapGetters, mapMutations } from "vuex";
import { defineComponent } from "vue";
import Button from "@/components/UI/Button.vue";
import { Mutations } from "../../../store/mutations";

export default defineComponent({
  components: {
    Input,
    Button,
  },

  mounted() {
    const headers = this.getActiveRequest?.headers;
    if (headers) this.headers = headers;
    else this.headers = this.getNotActiveRequest?.headers || [];
  },

  data() {
    return {
      headers: [],
    };
  },

  methods: {
    addHeader() {
      this.headers.push({
        key: "",
        value: "",
        id: Date.now(),
      });
    },

    deleteHeader(id) {
      this.headers = this.headers.filter((header) => header.id !== id);
    },

    saveHeaders() {
      const newRequest = {
        ...this.getActiveRequest,
        headers: this.headers,
      };
      this[Mutations.SAVE_REQUEST](newRequest);
      this[Mutations.SET_ACTIVE_REQUEST](newRequest);
    },

    saveNotActiveRequestHeaders() {
      const request = { ...this.getNotActiveRequest, headers: this.headers };
      this[Mutations.SET_NOT_ACTIVE_REQUEST](request);
    },

    ...mapMutations([
      `${Mutations.SAVE_REQUEST}`,
      `${Mutations.SET_ACTIVE_REQUEST}`,
      `${Mutations.SET_NOT_ACTIVE_REQUEST}`,
    ]),
  },

  watch: {
    headers: {
      handler() {
        if (this.getActiveRequest) this.saveHeaders();
        else this.saveNotActiveRequestHeaders();
      },
      deep: true,
    },

    getActiveRequest: {
      handler(value) {
        const headers = value?.headers;
        if (headers) this.headers = headers;
        else this.headers = [];
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getActiveRequest", "getNotActiveRequest"]),
  },
});
</script>

<style scoped>
.list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
